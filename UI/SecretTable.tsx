import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { SecretTableProps }  from '../types/types'


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
                        <TableCell sx={{fontWeight:'bold', color: '#434343'}}>Attribute</TableCell>
                        <TableCell sx={{fontWeight:'bold', color: '#434343'}}>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{color: '#434343'}} component="th" scope="row">
                            Secret Text
                        </TableCell>
                        <TableCell sx={{color: '#434343'}}>{secret.secret_text}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{color: '#434343'}} component="th" scope="row">
                            Expires At
                        </TableCell>
                        <TableCell sx={{color: '#434343'}}>
                            {secret.expires_at && secret.secret_text
                                ? secret.expires_at 
                                : !secret.expires_at && !secret.secret_text ?
                                "" :
                                "Not specified"
                            }
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{color: '#434343'}} component="th" scope="row">
                            Remaining Views
                        </TableCell>
                        <TableCell sx={{color: '#434343'}}>
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
