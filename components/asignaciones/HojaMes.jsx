import { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
} from '@mui/material';

export default function HojaMes({ meses, posicionActual }) {

    const semanas = meses[posicionActual].semanas


    return (
        <Paper sx={{ maxWidth: "1024px", p: 2, m: '10px auto' }}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>{meses[posicionActual].mes}</Typography>

            {
                semanas.map(semana => {
                    const dia = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
                    const fecha = new Date(semana.fecha)
                    fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset())
                    const diaSemana = fecha.getDay()
                    const diaNum = fecha.getDate();
                    const textoFecha = `${dia[diaSemana]} ${diaNum}`;
                    return (
                        <>
                            <Typography><b>Fecha:</b> {textoFecha} </Typography>
                            {
                                semana.asignacion1 != "" &&
                                <Box sx={{ background: "#bbb", p:1, m:1, borderRadius:"10px" }} >
                                    {semana.asignacion1}
                                </Box>
                            }
                        </>
                    )
                })
            }

        </Paper>
    )
}