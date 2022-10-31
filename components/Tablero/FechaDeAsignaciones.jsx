//* Módulos
import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil';

//* Material UI
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

//* Componentes
import Asignaciones from './Asignaciones';

//* Recoil
import configState from '../../Recoil/configState'



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
        return date.toLocaleDateString(
            'es-ES',
            { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        ).replace(/^\w/, (c) => c.toUpperCase())
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
        let dataN = { ...data }
        let salas = []
        for (var i = 0; i < config.salas; i++) { salas.push({ asignados: [] }) }
        dataN.fechas[indexFechas].asignaciones.push({ tipo: '', descripcion: '', salas })
        setData(dataN)
    }




    return (
        <Box sx={{ width: '100%', boxShadow: '1px 1px 4px #777' }} >
            <Box sx={{ p: 1, background: '#9b7cc8', display: 'flex', alignItems: 'center', color: "white" }} >

                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'start', p:1 }} >
                    {editando && <Input type='date' value={data.fechas[indexFechas].fecha} onChange={cambiarFecha} sx={{ mr: 3, color:"white" }} />}
                    <Typography variant={editando ? 'caption' : ''} >{formatoFecha()}</Typography>
                </Box>

                {editando &&
                    <IconButton sx={{ ml: 'auto' }} onClick={eliminarFecha} >
                        <CloseIcon sx={{ color: "white" }} />
                    </IconButton>
                }
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

                {
                    data.fechas[indexFechas].asignaciones.length === 0 &&
                    <Typography sx={{ color: "#444", textAlign: "center" }} >
                        <b>
                            No hay asignaciones programadas.
                            {
                                !editando &&
                                <>
                                    {" Puede"}
                                    <span onClick={activarEdicion} style={{ color: "#5b3c88", cursor: "pointer" }} >
                                        {" activar el modo de edición para agregar una."}
                                    </span>
                                </>
                            }
                        </b>
                    </Typography>
                }

                {
                    editando &&
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} >
                        <Chip onClick={agregarAsignacion} label={<b>Agregar asignación</b>} icon={<HistoryEduIcon />} sx={{ m: '0 auto', width: '100%' }} />
                    </Box>
                }


            </Box>
        </Box>
    )
}
