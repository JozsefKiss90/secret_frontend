import { useState } from "react"
import { GetSecret }  from '../types/types'

export const useRetrieveSecrets = () => {
  const [hash, setHash] = useState<string>('')
  const [secret, setSecret] = useState<GetSecret>()
  const [isXmlResponse, setIsXmlResponse] = useState<boolean>(false)
  const [warningMessage, setWarningMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const localUrl = process.env.NEXT_PUBLIC_URL

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
      setWarningMessage('Input required!')
      return  
  }
   
    const url = process.env.NODE_ENV === "production" ? `${apiUrl}${hash}/` : `${localUrl}${hash}/`
    setIsLoading(true)
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);

    try { 
      const response = await fetch(`${apiUrl}${hash}/`, {
          headers: {
              'Accept': isXmlResponse ? 'application/xml' : 'application/json', 
          },
      })
      const contentType = response.headers.get('content-type')

      if (!response.ok) {
          let errorDetail = 'An unexpected error occurred. Please try again.'
          if (contentType && contentType.includes('application/json')) {
              const errorData = await response.json()
              errorDetail = errorData.detail
          } else if (contentType && contentType.includes('application/xml')) {
              const text = await response.text()
              const parser = new DOMParser()
              const xmlDoc = parser.parseFromString(text, "text/xml")
              errorDetail = xmlDoc.getElementsByTagName("detail")[0]?.textContent || errorDetail
          }
          setWarningMessage(getUserFriendlyMessage(response.status, errorDetail))
          setSecret({})
          return
      }
  
      if (contentType && contentType.includes('application/json')) {
          const data = await response.json()
          setSecret(data)
          setWarningMessage('')
      } else if (contentType && contentType.includes('application/xml')) {
          const text = await response.text()
          const parser = new DOMParser()
          const xmlDoc = parser.parseFromString(text, "text/xml")
          
          const secret_text = xmlDoc.getElementsByTagName("secret_text")[0]?.textContent || ''
          const expires_at = xmlDoc.getElementsByTagName("expires_at")[0]?.innerHTML || null
          const remaining_views = parseInt(xmlDoc.getElementsByTagName("remaining_views")[0]?.textContent || '0', 10)
          
          setSecret({
              secret_text,
              remaining_views,
              expires_at
          })   
          setWarningMessage('')
      } else {
          console.error('Unexpected content type', contentType)
          setWarningMessage('Unexpected content type')
      }
    } catch (error) {
        console.error('Failed to submit secret', error)
        setWarningMessage('Unexpected content type')
    } finally {
      setIsLoading(false) 
    }
  }

  return {
    hash,
    secret,
    warningMessage,
    isXmlResponse,
    isLoading,
    handleInputChange,
    handleToggleChange,
    handleSubmit,
  }
}
