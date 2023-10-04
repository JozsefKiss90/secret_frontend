import { Box, TextField, Button } from "@mui/material"
import Navbar from "./Navbar"
import { SecretFormPropsCreate }  from '../types/types'

const SecretFormCreate : React.FC<SecretFormPropsCreate> = ({ secret, warning, isLoading, feedback, handleInputChange, handleSubmit }) => {
     
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
                marginTop: '20px'
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField
                    sx={{ backgroundColor: 'white', '.MuiInputBase-root': {color: 'black'} }}
                    label="Secret"
                    name="secret_text"
                    value={secret.secret_text || ''}
                    onChange={handleInputChange}
                    required
                    />
                <TextField
                    sx={{ backgroundColor: 'white', '.MuiInputBase-root': {color: 'black'} }}
                    label="Expire After Views"
                    type="number"
                    name="expireAfterViews"
                    value={secret.expireAfterViews || ''}
                    onChange={handleInputChange}
                />
                <TextField
                    sx={{ backgroundColor: 'white', '.MuiInputBase-root': {color: 'black'} }}
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
            {warning && (
                <div style={{marginTop:'10px', color:'red',  textAlign:'center' }}>
                    Secret text is required!
                </div>
            )}
            {feedback && (
                <h3 style={{marginTop:'10px', color:'green',  textAlign:'center' }}>
                    {feedback}
                </h3>
            )}
            {isLoading && 
            <h3 style={{textAlign:'center' }}>
                Loading...
            </h3>
        }
        </div> 
    )
}

export default SecretFormCreate