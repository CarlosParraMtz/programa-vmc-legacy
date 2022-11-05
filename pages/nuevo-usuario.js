import Layout from '../components/Layout';
import { Paper, Typography } from '@mui/material';
import Perfil from '../components/perfil/Perfil';

export default function nuevoUsuario() {
    return (
        <Layout>
            <Paper elevation={10} sx={{ m: '10px auto', p: 2, maxWidth: '600px' }} >
                <Typography sx={{ textAlign: 'center', mb:3 }} variant='h5' >Bienvenido</Typography>
                <Typography sx={{ textAlign: 'center', mb:3 }} >
                Para empezar a utilizar esta aplicación, se necesitan los siguientes datos:
                </Typography>
                <Perfil />
            </Paper>
        </Layout>
    )
}