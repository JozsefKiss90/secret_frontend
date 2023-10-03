import React, { useState } from "react"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Navbar from "../UI/Navbar";

type Secret = {
    secret_text?: string
    expireAfterViews?: number
    expireAfter?: number
  } | undefined
  
export default function SecretFrom(){

    const [secret, setSecret] = useState<Secret>({})
      
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSecret((prevSecret) => ({ ...prevSecret, [name]: value }))
      }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!secret.secret_text) {
            console.error('Secret text is required')
            return
          }

        const url = 'http://127.0.0.1:8000/api/secret/'
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
      
            const data = await response.json()
            console.log('Secret submitted', data)
          } catch (error) {
            console.error('Failed to submit secret', error)
          }
    }
     
    return (
        <div>
            <Navbar/>
            <Box
                component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField
                    label="Secret"
                    name="secret_text"
                    value={secret.secret_text || ''}
                    onChange={handleInputChange}
                    required
                    />
                <TextField
                    label="Expire After Views"
                    type="number"
                    name="expireAfterViews"
                    value={secret.expireAfterViews || ''}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Expire After (minutes)"
                    type="number"
                    name="expireAfter"
                    value={secret.expireAfter || ''}
                    onChange={handleInputChange}
                />
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </Box>
        </div>
    )
}