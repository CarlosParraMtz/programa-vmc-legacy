//* Módulos
import { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';

//* Material UI
import {
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import useMediaQuery from '@mui/material/useMediaQuery';

//* Componentes
import Sala from './Sala';

export default function Asignaciones({ useData, indexFechas, indexAsignacion, useEditando }) {

    const theme = useTheme();
    const esLG = useMediaQuery(theme.breakpoints.up('lg'));

    const [data, setData] = useData
    //* Aquí es data.fechas[indexFechas].asignaciones[indexAsignacion]

    const [editando, setEditando] = useEditando;

    const [tipo, setTipo] = useState('')
    const [descripcion, setDescripcion] = useState('')

    const tableSM = 12
    const tableXS = 12
    const tableLG = 12

    const borrarAsignacion = () => {
        let dataN = { ...data }
        dataN.fechas[indexFechas].asignaciones.splice(indexAsignacion, 1)
        setData(dataN)
    }

    const agregarSala = () => {
        let dataN = { ...data }
        dataN.fechas[indexFechas].asignaciones[indexAsignacion].salas.push({ asignados: [] })
        setData(dataN)
    }


    const cambiarTipo = () => {
        let _data = { ...data }
        _data.fechas[indexFechas].asignaciones[indexAsignacion].tipo = tipo;
        setData(_data)
    }

    const cambiarDescripcion = () => {
        let _data = { ...data }
        _data.fechas[indexFechas].asignaciones[indexAsignacion].descripcion = descripcion;
        setData(_data)
    }


    useEffect(() => {
        setTipo(data.fechas[indexFechas].asignaciones[indexAsignacion].tipo)
        setDescripcion(data.fechas[indexFechas].asignaciones[indexAsignacion].descripcion)
    }, [data, indexAsignacion, indexFechas])



    return (
        <Grid container sx={{ background: '#e7e7e7', p: 1, borderRadius: '8px', justifyContent: 'start', mb: 1 }} >
            <Grid item lg={tableLG} sm={tableSM} xs={tableXS} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '3px', p: 0.5 }} >
                <Box sx={{ p: 1, background: '#cfcfcf', width: '100%', height: '100%', display: 'flex', alignItems: 'start', justifyContent: 'left' }} >


                    {editando
                        ? <Box sx={{ display: 'flex', flexDirection: 'column', width:"100%" }} >
                            <Box sx={{display:"flex"}} >
                                <FormControl fullWidth size="small" >
                                    <InputLabel>Tipo</InputLabel>
                                    <Select
                                        value={tipo}
                                        label="Tipo"
                                        onChange={e => setTipo(e.target.value)}
                                        onBlur={cambiarTipo}
                                        size="small"
                                        sx={{ maxWidth: (esLG ? '240px' : '260px') }}
                                    >
                                        <MenuItem value={"Lectura"}>Lectura</MenuItem>
                                        <MenuItem value={"Primera conversación"}>Primera conversación</MenuItem>
                                        <MenuItem value={"Revisita"}>Revisita</MenuItem>
                                        <MenuItem value={"Curso bíblico"}>Curso bíblico</MenuItem>
                                        <MenuItem value={"Discurso"}>Discurso</MenuItem>
                                    </Select>
                                </FormControl>
                                <IconButton sx={{ ml: 'auto' }} size='small' onClick={borrarAsignacion} >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Box>
                            <TextField
                                value={descripcion}
                                variant='standard'
                                size='small'
                                multiline
                                fullWidth
                                onChange={e => setDescripcion(e.target.value)}
                                onBlur={cambiarDescripcion}
                                label='Descripción'
                            />
                        </Box>


                        : <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                            <Typography sx={{ ml: 1 }} >
                                <strong>
                                    {
                                        data.fechas[indexFechas].asignaciones[indexAsignacion].tipo === ''
                                            ? "Sin título"
                                            : data.fechas[indexFechas].asignaciones[indexAsignacion].tipo
                                    }
                                </strong>
                            </Typography>
                            <Typography sx={{ ml: 1 }} >
                                {
                                    data.fechas[indexFechas].asignaciones[indexAsignacion].descripcion == ""
                                        ? "Sin descripción"
                                        : data.fechas[indexFechas].asignaciones[indexAsignacion].descripcion
                                }
                            </Typography>
                        </Box>
                    }


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
                        useEditando={useEditando}
                    />
                ))
            }



            {
                data.fechas[indexFechas].asignaciones[indexAsignacion].salas.length < 3 && editando &&
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
