import { useState } from "react"

type Secret = {
    secret_text?: string
    expireAfterViews?: number
    expireAfter?: number
  } | undefined

export const useCreateSecrets = () => {

    const [secret, setSecret] = useState<Secret>({})
    const [warning, setWarning] = useState<boolean>(false)
    const [feedback, setFeedback] = useState<string>() 

    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const localUrl = process.env.NEXT_PUBLIC_URL

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSecret((prevSecret) => ({ ...prevSecret, [name]: value }))
      }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!secret.secret_text) {
            console.error('Secret text is required!')
            setWarning(true)
            setFeedback('')
            return
          }

        const url = process.env.NODE_ENV === "production" ? apiUrl : localUrl

        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(secret as Record<string, string>)
          }  
        
        try {
            const response = await fetch(url, options)
            if (!response.ok) {
              console.error('Error submitting secret', response)
              return
            }
            setFeedback('Success!')
            const data = await response.json()
            console.log('Secret submitted', data)
          } catch (error) {
            console.error('Failed to submit secret', error)
          }
    }    

    return {
        secret,
        warning,
        feedback,
        handleInputChange,
        handleSubmit,
      }
}

export default useCreateSecrets