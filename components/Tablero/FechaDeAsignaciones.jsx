import { useState, useEffect } from 'react'
import {
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    IconButton,
    Input,
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

export default function FechaDeAsignaciones({ useData, indexFechas, useEditando, activarEdicion }) {

    const [data, setData] = useData
    //* En este componente estamos en data.fechas[indexFechas]
    const [editando, setEditando] = useEditando


    const cambiarFecha = e => {
        let _data = { ...data }
        _data.fechas[indexFechas].fecha = e.target.value;
        setData(_data)
    }

    //* Esta función convierte la fecha guardada en Data en texto fácil de leer
    const formatoFecha = () => {
        let date = new Date(data.fechas[indexFechas].fecha)
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
        const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
        const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
        return `${dias[date.getDay()]}, ${date.getDate()} de ${meses[date.getMonth()]} de ${date.getFullYear()}`
    }




    //* Esta función borra el componente completo, con todos sus hijos.
    const eliminarFecha = () => {
        let dataN = { ...data }
        dataN.fechas.splice(indexFechas, 1)
        setData(dataN)
    }


    //* Esto es para la parte de agregar una asignación en esta fecha
    const config = useRecoilValue(configState)
    const agregarAsignacion = () => {
        activarEdicion()
        let dataN = { ...data }
        let salas = []
        for (var i = 0; i < config.salas; i++) { salas.push({ asignados: [""] }) }
        dataN.fechas[indexFechas].asignaciones.push({ tipo: '', descripcion: '', salas })
        setData(dataN)
    }




    return (
        <Box sx={{ width: '100%', boxShadow: '1px 1px 4px #777' }} >
            <Box sx={{ p: 1, background: '#cfcfcf', display: 'flex', alignItems: 'center' }} >

                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'start' }} >
                    {editando && <Input type='date' value={data.fechas[indexFechas].fecha} onChange={cambiarFecha} sx={{ mr: 3 }} />}
                    <Typography variant={editando ? 'caption' : ''} >{formatoFecha()}</Typography>
                </Box>

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
                        useEditando={useEditando}
                    />)
                }


                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} >
                    <Chip onClick={agregarAsignacion} label={<b>Agregar asignación</b>} icon={<HistoryEduIcon />} sx={{ m: '0 auto', width: '100%' }} />
                </Box>

            </Box>
        </Box>
    )
}
