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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Delete';

export default function Sala({ indexFechas, indexAsignacion, indexSala, useData, useEditando }) {

    const [data, setData] = useData;
    //* Aquí es data.fechas[indexFechas].asignaciones[indexAsignacion].salas[indexSala]

    const [editando, setEditando] = useEditando;

    function nombrarSala() {
        const a = { 0: 'Sala A', 1: 'Sala B', 2: 'Sala C' }
        return a[indexSala]
    }

    const eliminarSala = () => {
        let dataN = { ...data };
        dataN.fechas[indexFechas].asignaciones[indexAsignacion].salas.splice(indexSala, 1)
        setData(dataN)
    }
    

    return (
        <Grid item lg={4} sm={4} xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '3px', p: 0.5, height: '100%' }} >
            <Grid container>
                <Grid item lg={12} sm={12} xs={12} >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: '#cfcfcf', p: 0.7, pl: 1 }} >
                        <Typography sx={{ textAlign: 'left' }} >
                            <strong>{nombrarSala()}</strong>
                        </Typography>
                        {
                            editando &&
                            <IconButton sx={{ ml: 'auto' }} size='small' onClick={eliminarSala} >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        }
                    </Box>
                </Grid>

                {
                    data.fechas[indexFechas].asignaciones[indexAsignacion].salas[indexSala].asignados.map((asignado) => {

                        return (
                            <Grid
                                key={asignado.id}
                                item
                                lg={12}
                                sm={data.fechas[indexFechas].asignaciones[indexAsignacion].salas[indexSala].length === 1 ? 8 : 4}
                                xs={12}
                            >

                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: '#fff', p: 0.7, pl: 1 }} >

                                    <Typography >
                                        {asignado.nombre}
                                    </Typography>

                                    {
                                        editando &&
                                        <IconButton sx={{ ml: 'auto' }} size='small' >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    }

                                </Box>

                            </Grid>
                        )
                    })
                }

                {
                    data.fechas[indexFechas].asignaciones[indexAsignacion].salas[indexSala].asignados.length === 0 &&
                    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }} >
                        <Typography sx={{ textAlign: "center", color: "#444" }} >
                            <b>No asignado</b>
                        </Typography>
                    </Box>
                }

            </Grid>
        </Grid >
    )
}
