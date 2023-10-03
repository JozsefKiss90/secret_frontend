import { useState } from "react"

export type Secret = {
  secret_text?: string
  remaining_views?: number
  expires_at?: number
} | undefined 

export const useRetrieveSecrets = () => {
  const [hash, setHash] = useState<string>('')
  const [secret, setSecret] = useState<Secret>()
  const [isXmlResponse, setIsXmlResponse] = useState<boolean>(true)
  const [warningMessage, setWarningMessage] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHash(e.target.value)
  }

  const handleToggleChange = () => {
    setIsXmlResponse(prev => !prev)
  }

  const getUserFriendlyMessage = (statusCode: number, detail: string): string => {
    switch (statusCode) {
        case 404:
            return `${detail}`
        case 410:
          return `${detail}`
        case 400:
            return `${detail}`
        case 500:
            return 'Internal server error. Please try again later.'
        default:
            return 'An unexpected error occurred. Please try again.'
    }
  }    

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

  if (!hash) {
      console.error('Input required')
      return  
  }

    const url = `https://secret-server-api-a8ae5f120a2a.herokuapp.com/api/secret/${hash}/`
    //const url = `http://127.0.0.1:8000/api/secret/${hash}/`
  try { 
    const response = await fetch(url, {
        headers: {
            'Accept': isXmlResponse ? 'application/xml' : 'application/json', 
        },
    })
    if (!response.ok) {
      const errorData = await response.json()
      console.error('Error submitting secret', response)
      setWarningMessage(getUserFriendlyMessage(response.status, errorData.detail))
      return
    }
    
    const contentType = response.headers.get('content-type')

      if (contentType && contentType.includes('application/json')) {
          const data = await response.json()
          setSecret(data)
      } else if (contentType && contentType.includes('application/xml')) {
          const text = await response.text()
          const parser = new DOMParser()
          const xmlDoc = parser.parseFromString(text, "text/xml")
          
          const secret_text = xmlDoc.getElementsByTagName("secret_text")[0]?.textContent || ''
          const expires_at = parseInt(xmlDoc.getElementsByTagName("expires_at")[0]?.textContent) || null
          const remaining_views = parseInt(xmlDoc.getElementsByTagName("remaining_views")[0]?.textContent || '0', 10)

          setSecret({
              secret_text,
              remaining_views,
              expires_at
          })   
      } 
      else {
          console.error('Unexpected content type', contentType)
      }
    } catch (error) {
      console.error('Failed to submit secret', error)
    }
}

  return {
    hash,
    secret,
    warningMessage,
    isXmlResponse,
    handleInputChange,
    handleToggleChange,
    handleSubmit,
  }
}
