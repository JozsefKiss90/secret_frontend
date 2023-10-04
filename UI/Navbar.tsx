import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar = () => {
  const router = useRouter();

  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/" passHref>
          <Button
            color="inherit"
            sx={
              {fontSize:'1.2rem'}
            }
          >
           Secret Server
          </Button>
        </Link>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
       
        </Typography>
        <Link href="/secret_create" passHref>
          <Button color="inherit" 
                  disabled={router.pathname === '/secret_create'}
            >
            Create Secret
          </Button>
        </Link>
        <Link href="/secret_retrieve" passHref>
          <Button
            color="inherit"
            disabled={router.pathname === '/secret_retrieve'}
          >
            Retrieve Secret
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
