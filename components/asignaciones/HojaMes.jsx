import { useState } from 'react';
import {
    Box,
    Button,
    Paper,
    Typography,
} from '@mui/material';
import SemanaAsignacion from './SemanaAsignacion';
import { useRouter } from 'next/router';

export default function HojaMes({ meses, posicionActual }) {

    const Router = useRouter()

    const semanas = meses[posicionActual].semanas
    const generadas = meses[posicionActual].asignacionesGeneradas

    const bsx = {
        background: "#5b3c88",
        "&:hover": { background: "#6b4c88" }
    }


    return (
        <Paper sx={{ maxWidth: "1024px", p: 2, m: '10px auto', boxShadow: "3px 3px 15px" }}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>{meses[posicionActual].mes}</Typography>

            <Button variant="contained" onClick={() => Router.push('/matriculados')} sx={{ ...bsx, ml: 1 }} >Ver matriculados</Button>
            {!generadas && <Button variant="contained" sx={{ ...bsx, ml: 1 }} >Generar asignaciones para este mes</Button>}


            {
                semanas.map(semana => {
                    const dia = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
                    const fecha = new Date(semana.fecha)
                    fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset())
                    const diaSemana = fecha.getDay()
                    const diaNum = fecha.getDate();
                    const textoFecha = `${dia[diaSemana]} ${diaNum}`;
                    return (
                        <Box key={semana.fecha} sx={{ background: "#eee", p: 2, m: 1, borderRadius: "10px" }} >
                            <Typography><b>Fecha:</b> {textoFecha} </Typography>
                            {semana.asignacion1 != "" && <SemanaAsignacion asignacion={semana.asignacion1} />}
                            {semana.asignacion2 != "" && <SemanaAsignacion asignacion={semana.asignacion2} />}
                            {semana.asignacion3 != "" && <SemanaAsignacion asignacion={semana.asignacion3} />}
                            {semana.asignacion4 != "" && <SemanaAsignacion asignacion={semana.asignacion4} />}
                            {semana.asignacion5 != "" && <SemanaAsignacion asignacion={semana.asignacion5} />}
                        </Box>
                    )
                })
            }

        </Paper >
    )
}