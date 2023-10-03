import { Box, TextField, Button } from "@mui/material"
import Navbar from "./Navbar"

type Secret = {
    secret_text?: string
    expireAfterViews?: number
    expireAfter?: number
  } | undefined

type SecretFormProps = {
    secret: Secret,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
};

const SecretForm : React.FC<SecretFormProps> = ({ secret, handleInputChange, handleSubmit }) => {
     
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

export default SecretForm