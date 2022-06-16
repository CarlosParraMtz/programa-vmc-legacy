import { useState } from 'react'
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
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRecoilValue } from 'recoil'
import matriculadosState from '../../Recoil/matriculadosState'
import SaveIcon from '@mui/icons-material/Save'


export default function DialogFamilias({ useOpen, data }) {


    const [open, setOpen] = useOpen;
    const [apellidos, setApellidos] = useState('')
    const [miembros, setMiembros] = useState([{ id: 1, nombre: 'carlos' }])

    const matriculados = useRecoilValue(matriculadosState)
    const [opciones, setOpciones] = useState([])


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

    function eliminarMiembro(id) {
        let nuevosMiembros = [...miembros]
        nuevosMiembros.splice(nuevosMiembros.findIndex(miembro => miembro.id === id), 1)
        setMiembros(nuevosMiembros)
    }

    const desplegarMenuIntegrantes = (e) => {
        let filtrados = matriculados.filter(mtr => {
            const f = miembros.find(m => m.id == mtr.id)
            if (f || mtr.familia !== '' ) { return false }
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

    const guardar = () => {
//TODO: Aquí se agrega la parte de actualizar a los matriculados para que tengan la misma familia
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
                        onChange={e => setApellidos(e.target.value)}
                        fullWidth
                        autoFocus
                    />
                    <Box sx={{border:'solid 1px #'}} >
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