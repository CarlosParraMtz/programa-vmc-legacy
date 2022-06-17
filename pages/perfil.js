import Layout from '../components/Layout';
import { Paper, Typography } from '@mui/material';
import Perfil from '../components/perfil/Perfil';

export default function perfil() {
    return (
        <Layout>
            <Paper elevation={10} sx={{ m: '10px auto', p: 2, maxWidth: '600px' }} >
                <Typography sx={{ textAlign: 'center', mb:3 }} variant='h5' >Para continuar, se necesita completar los siguientes datos:</Typography>
                <Perfil />
            </Paper>
        </Layout>
    )
}