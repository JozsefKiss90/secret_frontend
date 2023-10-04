import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

type Secret = {
    secret_text?: string;
    remaining_views?: number;
    expires_at?: number;
} | undefined;

type SecretTableProps = {
    secret: Secret;
};

const SecretTable: React.FC<SecretTableProps> = ({ secret }) => {
    return (
        <TableContainer   sx={{ 
            padding: '30px', 
            marginTop: '10px', 
            marginLeft: 'auto', 
            marginRight: 'auto',
        }}>
            <Table 
                 sx={{
                    marginTop: '10px',
                    maxWidth: 650,
                    marginLeft: 'auto', 
                    marginRight: 'auto',
                    '& td, & th': {
                        border: '2px solid #ccc',
                        textAlign:'center',
                        verticalAlign:'center'
                    }
                }} 
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight:'bold'}}>Attribute</TableCell>
                        <TableCell sx={{fontWeight:'bold'}}>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            Secret Text
                        </TableCell>
                        <TableCell>{secret.secret_text}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            Expires At
                        </TableCell>
                        <TableCell>
                            {secret.expires_at && secret.secret_text
                                ? secret.expires_at 
                                : !secret.expires_at && !secret.secret_text ?
                                "" :
                                "Not specified"
                            }
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            Remaining Views
                        </TableCell>
                        <TableCell>
                            {secret.remaining_views && secret.secret_text
                                ? secret.remaining_views 
                                : !secret.remaining_views && !secret.secret_text ?
                                "" :
                                "Not specified"
                            }
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SecretTable;
