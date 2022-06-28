import { useState, useEffect } from 'react'
import {
    Box,
    Button,
    Chip,
    Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton,
    List, ListItem, ListItemButton, ListItemText,
    Menu, MenuItem,
    Stack,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRecoilValue, useRecoilState } from 'recoil';
import matriculadosState from '../../Recoil/matriculadosState';
import userState from '../../Recoil/userState';
import familiasState from '../../Recoil/familiasState';
import SaveIcon from '@mui/icons-material/Save';
import { v4 as uuid } from 'uuid'
import crearFamilia from '../../firebase/crearfamilia';
import actualizarFamilia from '../../firebase/actualizarFamilia';
import actualizarMatriculado from '../../firebase/actualizarMatriculado';



export default function DialogFamilias({ useOpen, useData = [null, null] }) {


    const [open, setOpen] = useOpen;
    const [data, setData] = useData;

    const [apellidos, setApellidos] = useState('')
    const [miembros, setMiembros] = useState([])

    const [matriculados, setMatriculados] = useRecoilState(matriculadosState)
    const [familias, setFamilias] = useRecoilState(familiasState)

    const user = useRecoilValue(userState)

    const [opciones, setOpciones] = useState([])

    const [error, setError] = useState(false)
    const [errorCode, setErrorCode] = useState('')

    const [anchorEl, setAnchorEl] = useState(null);
    const menuAbierto = Boolean(anchorEl);
    const abrirMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const cerrarMenu = () => {
        setAnchorEl(null);
    };


    function rellenarDialog(datos) {
        setApellidos(datos.apellidos)
        setMiembros(datos.miembros)
    }

    function vaciarDialog() {
        setApellidos('')
        setMiembros([])
    }

    useEffect(() => {
        if (data != null) {
            rellenarDialog(data)
        }
    }, [open, data])



    function eliminarMiembro(id) {
        let nuevosMiembros = [...miembros]
        nuevosMiembros.splice(nuevosMiembros.findIndex(miembro => miembro.id === id), 1)
        setMiembros(nuevosMiembros)
    }

    const desplegarMenuIntegrantes = (e) => {
        let filtrados = matriculados.filter(mtr => {
            const f = miembros.find(m => m.id == mtr.id)
            if (f || mtr.familia !== '') { return false }
            return true
        })
        setOpciones(filtrados)
        abrirMenu(e)
    }

    function seleccionarIntegrante(id, nombre) {
        let nuevosMiembros = [...miembros]
        nuevosMiembros.push({ id, nombre })
        setMiembros(nuevosMiembros)
        cerrarMenu()
    }


    //* El objeto que se prepara para enviarse
    const objFamilia = {
        apellidos,
        miembros
    }

    const guardar = async () => {
        if (apellidos === '') {
            setError(true)
            setErrorCode('apellido')
            return;
        }

        let nuevosMtr = [...matriculados]
        let nuevasFam = [...familias]

        //* Aquí se actualiza la información acerca de la familia
        if (data) {
            await actualizarFamilia(user.data.congregacion, objFamilia, data.id)
            let datoAnterior = nuevasFam.find(fam => fam.id === data.id)
            await datoAnterior.miembros.forEach(async (miembro) => {
                const seConserva = objFamilia.miembros.find(i => i.id === miembro.id)
                if (!seConserva) {
                    let nuevoMtr = { ...miembro, familia: '' };
                    await actualizarMatriculado(user.data.congregacion, nuevoMtr, miembro.id)
                    nuevosMtr.splice(nuevosMtr.findIndex(mtr => mtr.id === miembro.id), 1, nuevoMtr)
                }
            })
            nuevasFam.splice(nuevasFam.findIndex(i => i.id === data.id), 1, { ...objFamilia, id: data.id })
            setFamilias(nuevasFam)
            setData(null)
        } else {
            const id = uuid()
            await crearFamilia(user.data.congregacion, objFamilia, id)
            nuevasFam.push({ ...objFamilia, id })
            let nuevoOrden = nuevasFam.sort((x, y) => x.apellidos.localeCompare(y.apellidos))
            setFamilias(nuevoOrden)
        }


        //* Aquí se actualiza la data de los matriculados que fueron agregados a esta familia
        const mtrEnEstaFamilia = nuevosMtr.filter((mtr) => {
            const encontrado = objFamilia.miembros.find(miembro => miembro.id === mtr.id)
            if (encontrado) { return true }
            return false
        })
        await mtrEnEstaFamilia.forEach(async mtr=>{
            const nuevoObj = {...mtr, familia: apellidos}
            await actualizarMatriculado(user.data.congregacion, nuevoObj, mtr.id)
            nuevosMtr.splice(nuevosMtr.findIndex(i=>i.id===mtr.id), 1, nuevoObj)
        })


        setMatriculados(nuevosMtr)
        vaciarDialog()
        setError(false)
        setErrorCode('')
        setOpen(false)
    }


    const cancelar = () => {
        vaciarDialog()
        setOpen(false)
    }

    return (
        <Dialog open={open} onClose={cancelar} maxWidth='sm' fullWidth >
            <DialogTitle sx={{ background: '#5b3c88', display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ color: 'white' }} >Agregar familia:</Typography>
                <Tooltip title='Cancelar y cerrar' >
                    <IconButton size='small' sx={{ ml: 'auto' }} onClick={cancelar} >
                        <CloseIcon sx={{ color: 'white' }} fontSize='small' />
                    </IconButton>
                </Tooltip>
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }} >
                <Stack spacing={1} sx={{ p: 1 }} >
                    <TextField
                        size='small'
                        label='Apellidos'
                        value={apellidos}
                        color={(error && errorCode === 'apellido') ? 'error' : 'primary'}
                        helperText={(error && errorCode === 'apellido') ? 'Este campo no puede quedar vacío' : ''}
                        focused={(error && errorCode === 'apellido')}
                        onChange={e => setApellidos(e.target.value)}
                        fullWidth
                        autoFocus
                    />
                    <Box sx={{ border: 'solid 1px #' }} >
                        <Typography><b>Integrantes:</b></Typography>
                        <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >

                            {miembros.length === 0 && <Typography sx={{ color: '#888', mb: 1 }} >
                                <strong>Esta familia no tiene integrantes todavía</strong>
                            </Typography>}

                            {miembros.map(miembro => (
                                <ListItem
                                    key={miembro.id}
                                    divider
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            onClick={() => eliminarMiembro(miembro.id)}
                                            sx={{ background: "#5b3c88", "&:hover": { background: "#6b4c88" } }}
                                        >
                                            <DeleteIcon sx={{ color: 'white' }} />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText primary={<b>{miembro.nombre}</b>} />
                                </ListItem>
                            ))}
                            <Tooltip title='Agregar un integrante para esta familia' >
                                <Chip
                                    label={<AddIcon fontSize='small' />}
                                    sx={{ mt: 1 }}
                                    variant='outlined'
                                    onClick={desplegarMenuIntegrantes} />
                            </Tooltip>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={menuAbierto}
                                onClose={cerrarMenu}
                            >
                                {opciones.map(op => <MenuItem
                                    key={op.id}
                                    onClick={() => seleccionarIntegrante(op.id, op.nombre)}
                                >
                                    {op.nombre}
                                </MenuItem>)}
                                {opciones.length === 0 && <Box sx={{ p: 1, maxWidth: '300px', color: '#888' }} >
                                    <Typography><strong>No hay más opciones para agregar.</strong></Typography>
                                    <Typography><strong>Agrega más matriculados o elimina un miembro de otra familia</strong></Typography>
                                </Box>
                                }
                            </Menu>
                        </List>
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    sx={{ background: "#5b3c88", "&:hover": { background: "#6b4c88" } }}
                    onClick={guardar}
                    startIcon={<SaveIcon sx={{ color: 'white' }} />}
                >
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
