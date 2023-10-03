import React from "react"
import { Box, TextField, Switch, FormControlLabel, Button } from "@mui/material"

type SecretFormProps = {
    hash: string
    warningMessage: string
    isXmlResponse: boolean
    isLoading:boolean
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleToggleChange: () => void
    handleSubmit: (e: React.FormEvent) => void
}

const SecretFormRetrieve: React.FC<SecretFormProps> = ({ hash, warningMessage, isXmlResponse, isLoading, handleInputChange, handleToggleChange, handleSubmit }) => {
    return (
      <div>
          <Box 
            component="form"
            sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: '20px'
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <TextField
                label="Hash"
                name="hash_promp"
                value={hash}
                onChange={handleInputChange} 
            />
            <FormControlLabel
                control={<Switch checked={isXmlResponse} onChange={handleToggleChange} name="responseFormat" />}
                label="XML Response"
            />
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Box>
        {warningMessage && (
            <div style={{marginTop:'10px', color:'red',  textAlign:'center' }}>
                {warningMessage}
            </div>
        )}
        {isLoading && 
            <h3 style={{textAlign:'center' }}>
                Loading...
            </h3>
        }
      </div>
    )
}

export default SecretFormRetrieve
