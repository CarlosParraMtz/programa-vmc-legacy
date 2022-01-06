import Head from 'next/head'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'

export default function Layout({ children }) {
    return (
        <>

            <Head>
                <title>Programa VMC</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css' />
            </Head>

            <AppBar position="static" sx={{ background: "#5b3c88" }}>
                <Toolbar>
                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, width:"30px", height:"30px" }}
                    >
                        <i className="fi fi-rr-menu-dots-vertical" style={{fontSize:"15px"}} />
                    
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Matriculados
                    </Typography>

                    <Link href="/">
                        <Tooltip title="Volver al inicio" arrow placement='left'>
                            <IconButton sx={{ width: "30px", height: "30px" }}>
                                <i className="fi fi-rr-home" style={{ color: "white", fontSize: "15px" }} />
                            </IconButton>
                        </Tooltip>
                    </Link>
                </Toolbar>
            </AppBar>

            <main>{children}</main>
        </>
    )
}