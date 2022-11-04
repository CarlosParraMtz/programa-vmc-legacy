import Head from 'next/head'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useRecoilState } from 'recoil';
import userState from '../Recoil/userState';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DialogSideBar from './asignaciones/Col1/DialogSideBar';
import logout from '../firebase/logout';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Layout({ children }) {

    const theme = useTheme();
    const esMD = useMediaQuery(theme.breakpoints.up('md'));

    const [user, setUser] = useRecoilState(userState)
    const router = useRouter()
    const ruta = router.pathname


    useEffect(() => {
        if (!user.logeado) {
            router.push('/login')
        }
    }, [user])

   

    const hacerLogout = () => {
        logout()
        setUser({
            logeado: false,
            uid: "",
            data: {
                congregacion: {
                    id: '',
                    nombre: '',
                    ciudad: '',
                    estado: '',
                    pais: ''
                }
            },
            nombre: "",
            email: ""
        })
        localStorage.clear()
    }

    return (
        <>

            <Head>
                <title>Programa VMC</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css' />
            </Head>

            <AppBar position="static" sx={{ background: "#5b3c88", position: 'sticky', top: 0, zIndex: 1000 }}>
                <Toolbar sx={{ width: '100%', maxWidth: '1200px', m: '0 auto' }} >

                    {
                        (ruta === '/' && !esMD) && <DialogSideBar />
                    }

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {ruta == '/' && 'Asignaciones'}
                    </Typography>

                    {user.logeado &&
                        <Tooltip title="Cerrar sesión" arrow placement='left'>
                            <IconButton onClick={hacerLogout}>
                                <LogoutIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip>
                    }
                </Toolbar>
            </AppBar>

            <main>{children}</main>


        </>
    )
}