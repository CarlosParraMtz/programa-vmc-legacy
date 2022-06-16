import { useState, useEffect } from 'react'
import {
    Button,
    Card,
    CardHeader,
    CardContent,
    Divider,
    ListSubheader,
    Menu,
    MenuItem,
    Paper,
    TextField,
    Tooltip,
    Typography,
    Grid,
    CircularProgress,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';
import CommentIcon from '@mui/icons-material/Comment';

import { useRecoilValue, useRecoilState } from 'recoil';
import matriculadosState from '../../Recoil/matriculadosState';
import familiasState from '../../Recoil/familiasState';

import crearMatriculado from '../../firebase/crearMatriculado'
import actualizarMatriculado from '../../firebase/actualizarMatriculado'


const PosiblesAsignaciones = ({ nombre, checked, cambiarChecked }) => {
    return (
        <ListItem disablePadding >
            <ListItemButton dense onClick={() => { cambiarChecked(nombre) }}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked}
                        disableRipple
                        onChange={() => cambiarChecked(nombre)}
                    />
                </ListItemIcon>
                <ListItemText id={nombre} primary={nombre} />
            </ListItemButton>
        </ListItem>
    )
}


export default function DialogAgregarUno({ useOpen, data = null, setData = () => { } }) {


    const [open, setOpen] = useOpen;

    const [nombre, setNombre] = useState("")
    const [genero, setGenero] = useState("hombre")
    const [ultimaAsignacion, setUltimaAsignacion] = useState({
        fecha: '2022-01-01',
        sala: 'A',
        tipo: 'Ayudante'
    })
    const [posiblesAsignaciones, setPosiblesAsignaciones] = useState({
        "Ayudante": false,
        "Primera conversación": false,
        "Revisita": false,
        "Curso bíblico": false,
        "Discurso": false,
        "Lectura": false
    })


    const [ultimasAsignaciones, setUltimasAsignaciones] = useState([])



    const [loading, setLoading] = useState(false)


    const matriculados = useRecoilValue(matriculadosState);

    const [ayudantesAnteriores, setAyudantesAnteriores] = useState([])
    const [posiblesAyudantes, setPosiblesAyudantes] = useState([])
    const [posible, setPosible] = useState("")

    function vaciarDialog() {
        setNombre('');
        setGenero('');
        setUltimaAsignacion({
            fecha: '2022-01-01',
            sala: 'A',
            tipo: 'Ayudante'
        })
        setPosiblesAsignaciones({
            "Ayudante": false,
            "Primera conversación": false,
            "Revisita": false,
            "Curso bíblico": false,
            "Discurso": false,
            "Lectura": false
        })
        setAyudantesAnteriores([])
    }

    function rellenarDialog(data) {
        setNombre(data.nombre);
        setGenero(data.genero);
        setUltimaAsignacion(data.ultimaAsignacion)
        setPosiblesAsignaciones(data.posiblesAsignaciones)
        setAyudantesAnteriores(data.ayudantesAnteriores)
    }

    useEffect(() => {
        if (data != null) {
            rellenarDialog(data)
        }
    }, [open, data])


    const [anchorEl, setAnchorEl] = useState(null);
    const menuAbierto = Boolean(anchorEl);
    const abrirMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const cerrarMenu = () => {
        setAnchorEl(null);
    };

    const desplegarMenuPosiblesAyudantes = e => {
        const filtrados = matriculados.filter(mtr => {
            const f = ayudantesAnteriores.find(a => a.id == mtr.id)
            if (f || mtr.nombre == nombre || mtr.genero != genero) { return false }
            return true
        })
        setPosiblesAyudantes(filtrados)
        abrirMenu(e)
    }

    const agregarAyudanteAnterior = (nombre, id) => {
        let arr = [...ayudantesAnteriores]
        arr.push({ id, nombre })
        setAyudantesAnteriores(arr)
        setPosiblesAyudantes([])
        cerrarMenu()
    }

    const borrarAyudante = (id) => {
        let arr = [...ayudantesAnteriores];
        arr.splice(ayudantesAnteriores.findIndex(a => a.id === id), 1)
        setAyudantesAnteriores(arr)
    }





    //* Para seleccionar las posibles asignaciones

    const cambiarChecked = (tipo) => {
        let obj = {}
        obj[tipo] = !posiblesAsignaciones[tipo];
        setPosiblesAsignaciones({
            ...posiblesAsignaciones,
            ...obj
        })
    }



    const cancelarYCerrar = () => {
        vaciarDialog()
        setOpen(false)
    }




    //* Para operaciones con la base de datos

    const matriculadoData = {
        nombre,
        genero,
        ultimaAsignacion,
        ayudantesAnteriores,
        posiblesAsignaciones
    }

    const guardar = () => {
        
    }


    return (
        <Dialog open={open} onClose={cancelarYCerrar} fullWidth maxWidth='sm' >
            <form>
                <DialogTitle
                    sx={{
                        background: '#5b3c88',
                        display: 'flex',
                        alignItems: 'center',
                        position: 'sticky', top: 0, zIndex: 3
                    }} >
                    <Typography sx={{ color: 'white' }} >
                        Agrega un matriculado
                    </Typography>
                    <Tooltip title='Cancelar y cerrar' >
                        <IconButton size='small' sx={{ ml: 'auto' }} onClick={cancelarYCerrar} >
                            <CloseIcon sx={{ color: 'white' }} fontSize='small' />
                        </IconButton>
                    </Tooltip>
                </DialogTitle>
                <DialogContent >
                    <DialogContentText sx={{ textAlign: "center" }}>
                        Agrega todos los datos cuidadosamente para evitar errores en la generación automática de asignaciones.
                    </DialogContentText>

                    <Divider sx={{ mt: 1, mb: 1 }}> Datos básicos </Divider>


                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre"
                        type="text"
                        fullWidth
                        variant="outlined"
                        xs={{ mt: 1, mb: 1 }}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                    <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                        <InputLabel>Género</InputLabel>
                        <Select
                            value={genero}
                            label="Género"
                            onChange={e => setGenero(e.target.value)}
                        >
                            <MenuItem value={"hombre"}>Hombre</MenuItem>
                            <MenuItem value={"mujer"}>Mujer</MenuItem>
                        </Select>
                    </FormControl>


                    <Divider sx={{ mt: 2, mb: 1 }}> Última asignación </Divider>


                    <TextField
                        margin="dense"
                        id="name"
                        label="Fecha de última asignación"
                        type="date"
                        defaultValue="2022-01-01"
                        fullWidth
                        onChange={e => {
                            let ult = { ...ultimaAsignacion }
                            ult.fecha = e.target.value
                            setUltimaAsignacion(ult)
                        }}
                        variant="outlined"
                    />

                    <Grid container spacing={0} sx={{ width: "100%" }}>
                        <Grid item sm={4} xs={12}>
                            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                                <InputLabel>Sala de última asignación</InputLabel>
                                <Select
                                    value={ultimaSala}
                                    label="Sala de última asignación"
                                    onChange={e => {
                                        let ult = { ...ultimaAsignacion }
                                        ult.sala = e.target.value
                                        setUltimaAsignacion(ult)
                                    }}
                                >
                                    <MenuItem value={"A"}>A</MenuItem>
                                    <MenuItem value={"B"}>B</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={8} xs={12}>
                            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                                <InputLabel>Tipo de última asignación</InputLabel>
                                <Select
                                    value={tipoDeUltimaAsignacion}
                                    label="Tipo de última asignación"
                                    onChange={e => {
                                        let ult = { ...ultimaAsignacion }
                                        ult.tipo = e.target.value
                                        setUltimaAsignacion(ult)
                                    }}
                                >

                                    <MenuItem value={"Ayudante"}>Ayudante</MenuItem>
                                    <MenuItem value={"Primera conversación"}>Primera conversación</MenuItem>
                                    <MenuItem value={"Revisita"}>Revisita</MenuItem>
                                    <MenuItem value={"Curso bíblico"}>Curso bíblico</MenuItem>
                                    <MenuItem value={"Discurso"}>Discurso</MenuItem>
                                    <MenuItem value={"Lectura"}>Lectura</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <List dense subheader={
                        <ListSubheader>
                            Ayudantes anteriores:
                        </ListSubheader>
                    }>
                        <ListItem dense>
                            <ListItemButton onClick={desplegarMenuPosiblesAyudantes} >
                                <ListItemText primary="Agregar ayudante..." />
                            </ListItemButton>
                        </ListItem>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={menuAbierto}
                            onClose={cerrarMenu}
                        >
                            {posiblesAyudantes.map((op, i) => <MenuItem
                                key={i}
                                onClick={() => agregarAyudanteAnterior(op.nombre, op.id)}
                            >
                                {op.nombre}
                            </MenuItem>)}
                        </Menu>

                        {
                            ayudantesAnteriores.map((a) => (
                                <ListItem key={a.id} dense >
                                    <ListItemIcon>
                                        <IconButton onClick={() => borrarAyudante(a.id)} >
                                            <Delete />
                                        </IconButton>
                                    </ListItemIcon>
                                    <ListItemText primary={a.nombre} />

                                </ListItem>
                            ))
                        }
                    </List>



                    <Divider sx={{ mt: 2, mb: 1 }}> Futuras asignaciones </Divider>

                    <Typography variant="subtitle2" sx={{ color: "#777", fontSize: "12px" }}>Tipo de asignaciones que puede tener:</Typography>
                    <List sx={{ m: "0 auto", bgcolor: 'background.paper' }}>
                        <PosiblesAsignaciones nombre="Ayudante" checked={posiblesAsignaciones["Ayudante"]} cambiarChecked={cambiarChecked} />
                        <PosiblesAsignaciones nombre="Primera conversación" checked={posiblesAsignaciones["Primera conversación"]} cambiarChecked={cambiarChecked} />
                        <PosiblesAsignaciones nombre="Revisita" checked={posiblesAsignaciones["Revisita"]} cambiarChecked={cambiarChecked} />
                        <PosiblesAsignaciones nombre="Curso bíblico" checked={posiblesAsignaciones["Curso bíblico"]} cambiarChecked={cambiarChecked} />
                        <PosiblesAsignaciones nombre="Discurso" checked={posiblesAsignaciones["Discurso"]} cambiarChecked={cambiarChecked} />
                        <PosiblesAsignaciones nombre="Lectura" checked={posiblesAsignaciones["Lectura"]} cambiarChecked={cambiarChecked} />
                    </List>



                </DialogContent>
                <DialogActions>

                    <Button
                        onClick={crearMatriculado}
                        variant="contained"
                        disabled={loading ? true : false}
                        type="submit"
                        sx={{
                            background: "#5b3c88",
                            "&:hover": { background: "#6b4c88" }
                        }} >
                        {!loading ? "Guardar" : <CircularProgress size={25} sx={{ color: "white" }} />}
                    </Button>

                    <Button
                        onClick={() => setOpen(false)}
                        sx={{ color: "#5b3c88", "&:hover": { color: "#6b4c88" } }} >
                        cerrar
                    </Button>

                </DialogActions>
            </form>
        </Dialog>
    )

}