import React from 'react';
import { useRouter } from 'next/router'
import {
    Button,
    Paper,
    Typography,
} from '@mui/material'
import AgregarAsignacionesDialog from './AgregarAsignacionesDialog';

export default function Asignaciones() {

    const Router = useRouter()


    return (
        <>
            <Paper sx={{ maxWidth: "1024px", p: 2, m: '10px auto' }}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>Marzo 2022</Typography>



            </Paper>

            <AgregarAsignacionesDialog />
        </>
    )
}
