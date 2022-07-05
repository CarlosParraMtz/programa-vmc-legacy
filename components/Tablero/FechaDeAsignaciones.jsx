import React from 'react'
import {
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { useRecoilValue } from 'recoil';
import configState from '../../Recoil/configState'


import Asignaciones from './Asignaciones';

export default function FechaDeAsignaciones({ useData, indexFechas }) {

    const [data, setData] = useData
    //* En este componente estamos en data.fechas[indexFechas]

    const config = useRecoilValue(configState)


    const eliminarFecha = () => {
        let dataN = { ...data }
        dataN.fechas.splice(indexFechas, 1)
        setData(dataN)
    }

    const agregarAsignacion = () => {
        let dataN = { ...data }
        let salas = []
        for (var i = 0; i < config.salas; i++) { salas.push({asignados:[""]}) }
        dataN.fechas[indexFechas].asignaciones.push({ tipo: 'lectura', descripcion: '', salas })
        setData(dataN)
    }


    return (
        <Box sx={{ width: '100%', boxShadow: '1px 1px 4px #777' }} >
            <Box sx={{ p: 1, background: '#cfcfcf', display: 'flex', alignItems: 'center' }} >
                <Typography>Jueves, 6 de enero de 2022</Typography>

                <IconButton sx={{ ml: 'auto' }} onClick={eliminarFecha} >
                    <CloseIcon />
                </IconButton>

            </Box>

            <Box sx={{ width: '100%', p: 2 }} >

                {
                    data.fechas[indexFechas].asignaciones.map((asignacion, index) => <Asignaciones
                        key={index}
                        indexAsignacion={index}
                        indexFechas={indexFechas}
                        useData={useData}
                    />)
                }


                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} >
                    <Chip onClick={agregarAsignacion} label={<b>Agregar asignación</b>} icon={<HistoryEduIcon />} sx={{ m: '0 auto', width: '100%' }} />
                </Box>

            </Box>
        </Box>
    )
}
