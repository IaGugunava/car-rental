import emailjs from '@emailjs/browser'

export const useEmailJS = () => {
  const config = useRuntimeConfig()

  const serviceId = config.public.emailjsServiceId as string
  const publicKey = config.public.emailjsPublicKey as string

  // Initialize EmailJS
  if (publicKey) {
    emailjs.init(publicKey)
  }

  const sendEmail = async (templateId: string, templateParams: Record<string, any>) => {
    if (!serviceId || !templateId || !publicKey) {
      throw new Error('EmailJS configuration is missing')
    }

    try {
      const response = await emailjs.send(serviceId, templateId, templateParams)
      return { success: true, response }
    } catch (error) {
      console.error('EmailJS Error:', error)
      return { success: false, error }
    }
  }

  return {
    sendEmail
  }
}
