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
import Sala from './Sala';

export default function Asignaciones({ useData, indexFechas, indexAsignacion }) {

    const [data, setData] = useData
    //* Aquí es data.fechas[indexFechas].asignaciones[indexAsignacion]

    const tableSM = 12
    const tableXS = 12
    const tableLG = 3

    const borrarAsignacion = () => {
        let dataN = { ...data }
        dataN.fechas[indexFechas].asignaciones.splice(indexAsignacion, 1)
        setData(dataN)
    }

    const agregarSala = () => {
        let dataN = { ...data }
        dataN.fechas[indexFechas].asignaciones[indexAsignacion].salas.push({asignados:[""]})
        setData(dataN)
    }

    return (
        <Grid container sx={{ background: '#e7e7e7', p: 1, borderRadius: '8px', justifyContent: 'start', mb: 1 }} >
            <Grid item lg={tableLG} sm={tableSM} xs={tableXS} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '3px', p: 0.5 }} >
                <Box sx={{ p: 1, background: '#cfcfcf', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >

                    <Typography sx={{ ml: 1 }} >
                        <strong>
                            Primera conversación
                        </strong>
                    </Typography>

                    <IconButton sx={{ ml: 'auto' }} size='small' onClick={borrarAsignacion} >
                        <CloseIcon />
                    </IconButton>

                </Box>
            </Grid>

            {
                data.fechas[indexFechas].asignaciones[indexAsignacion].salas.map((sala, index) => (
                    <Sala
                        key={index}
                        indexFechas={indexFechas}
                        indexAsignacion={indexAsignacion}
                        indexSala={index}
                        useData={useData}
                    />
                ))
            }



            {
                data.fechas[indexFechas].asignaciones[indexAsignacion].salas.length < 3 &&
                <Grid item lg={tableLG} sm={tableSM} xs={tableXS} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '3px', p: 0.5 }} >
                    <Button
                        sx={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: '100%', height: '100%',
                            color: '#555',
                            background: '#cfcfcf',
                            "&:hover": { background: '#c7c7c7' }
                        }}
                        onClick={agregarSala}
                    >
                        <AddIcon />
                        <Typography sx={{ color: '#555' }} ><b>Agregar sala</b></Typography>
                    </Button>
                </Grid>
            }

        </Grid >
    )
}
