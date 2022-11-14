//* Módulos
import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { v4 as uuid } from 'uuid';
import mapearCompañeros from '../Tablero/functions/mapearCompañeros';

//* Material UI
import {
    Box,
    Button,
    Card,
    CardHeader,
    CardContent,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Menu,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Tooltip,
    Typography,
    Grid,
    CircularProgress,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';
import CommentIcon from '@mui/icons-material/Comment';

//* Recoil atoms
import matriculadosState from '../../Recoil/matriculadosState';
import familiasState from '../../Recoil/familiasState';
import userState from '../../Recoil/userState';

//* Funciones
import crearMatriculado from '../../firebase/crearMatriculado'
import actualizarMatriculado from '../../firebase/actualizarMatriculado'
import obtenerDiaDeHoy from '../../functions/obtenerDiaDeHoy';
import obtenerTextoFecha from '../../functions/obtenerTextoFecha';

//* Componentes
import DialogAgregarAsignacionReciente from './DialogAgregarAsignacionReciente';
import AsignacionReciente from './AsignacionReciente';


const PosiblesAsignaciones = ({ nombre, checked, cambiarChecked, disabled = false }) => {
    return (
        <ListItem disablePadding >
            <ListItemButton dense onClick={() => { cambiarChecked(nombre) }} disabled={disabled} >
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


export default function DialogAgregarUno({ useOpen, useData = [null, null] }) {

    const [data, setData] = useData

    const [open, setOpen] = useOpen;

    const user = useRecoilValue(userState)

    const [nombre, setNombre] = useState("")
    const [genero, setGenero] = useState("hombre")
    const [posiblesAsignaciones, setPosiblesAsignaciones] = useState({
        "Ayudante": false,
        "Primera conversación": false,
        "Revisita": false,
        "Curso bíblico": false,
        "Discurso": false,
        "Lectura": false
    })
    useEffect(() => {
        if (genero === "mujer") {
            setPosiblesAsignaciones({
                ...posiblesAsignaciones,
                Discurso: false,
                Lectura: false
            })
        }
    }, [genero])
    const [observaciones, setObservaciones] = useState('')


    const [asignacionesAnteriores, setAsignacionesAnteriores] = useState([])
    const [dialogAgregarAsignacionOpen, setDialogAgregarAsignacionOpen] = useState(false)

    const [loading, setLoading] = useState(false)
    const [matriculados, setMatriculados] = useRecoilState(matriculadosState);
    const [posiblesAyudantes, setPosiblesAyudantes] = useState([])
    const [posible, setPosible] = useState("")
    const [ayudantesDialog, setAyudantesDialog] = useState([])

    const [ayudantesAnteriores, setAyudantesAnteriores] = useState([])

    useEffect(() => {
        const ayudantes = asignacionesAnteriores
            .filter(aa => (!(aa.tipo === "Lectura" || aa.tipo === "Discurso")))
            .map((aa, i, array) => {
                const ayudante = matriculados.find(m => m.id === aa.acompañante)
                const arrayIDs = array.map(ar => ar.nombre)
                if (arrayIDs.includes(ayudante.nombre)) { return }
                return { nombre: ayudante.nombre, id: ayudante.id }
            })
        setAyudantesAnteriores(ayudantes);
    }, [asignacionesAnteriores])

    function vaciarDialog() {
        setNombre('');
        setGenero('');
        setAsignacionesAnteriores([])

        setPosiblesAsignaciones({
            "Ayudante": false,
            "Primera conversación": false,
            "Revisita": false,
            "Curso bíblico": false,
            "Discurso": false,
            "Lectura": false
        })
        setObservaciones("");
    }

    function rellenarDialog(data) {
        setNombre(data.nombre);
        setGenero(data.genero);
        setAsignacionesAnteriores(data.asignacionesAnteriores)
        setPosiblesAsignaciones(data.posiblesAsignaciones)
        setObservaciones(data.observaciones)
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
        if (data) { setData(null) }
        vaciarDialog()
        setOpen(false)
    }




    //* Para operaciones con la base de datos

    const matriculadoData = {
        nombre,
        genero,
        posiblesAsignaciones,
        familia: {
            apellidos: (data ? data.familia.apellidos : ""),
            id: (data ? data.familia.id : "")
        },
        asignacionesAnteriores,
        observaciones
    }





    const guardar = async () => {

        setLoading(true)
        /* 
        *   Si el dialog se llamó desde el botón para crear uno, data es null, y por lo tanto se está creando uno.
        *   Si se llamó desde el botón de editar matriculado, entonces data es la información de ese matriculado,
        *   y lo que hará al guardar será una actualización de este.
        */

        if (data) {
            await actualizarMatriculado(user.data.congregacion.id, matriculadoData, data.id)
            setData(null)
        } else {
            const id = uuid()
            await crearMatriculado(user.data.congregacion.id, matriculadoData, id)
        }

        vaciarDialog()
        setOpen(false)
        setLoading(false)
    }


    const buscarAcompañante = (id) => {
        const a = matriculados.find(mtr => mtr.id === id);
        return a.nombre;
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
                        Agrega un matriculado {nombre != '' && ` - ${nombre}`}
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


















                    <Divider sx={{ mt: 2, mb: 1 }}> Asignaciones recientes </Divider>

                    <Box sx={{ background: "#f0f0f0", borderRadius: "5px" }}>
                        <List sx={{ maxHeight: "400px", overflow: "auto", pt: 0 }} >
                            <ListItemButton
                                divider
                                onClick={() => {
                                    const a = matriculados.filter(mtr => !(mtr.nombre == nombre || mtr.genero != genero))
                                    setAyudantesDialog(a)
                                    setDialogAgregarAsignacionOpen(true)
                                }}
                                sx={{ position: "sticky", top: 0, background: "#f0f0f0", zIndex: 2 }}
                            >
                                <ListItemText primary="Añadir asignación..." />
                            </ListItemButton>
                            {
                                asignacionesAnteriores.map((asignacion, i) => (
                                    <AsignacionReciente
                                        key={i}
                                        asignacion={asignacion}
                                        i={i}
                                        ayudantesDialog={ayudantesDialog}
                                        useUltimasAsignaciones={[asignacionesAnteriores, setAsignacionesAnteriores]}
                                        buscarAcompañante={buscarAcompañante}
                                    />
                                ))
                            }


                        </List>
                    </Box>

                    <DialogAgregarAsignacionReciente
                        useOpen={[dialogAgregarAsignacionOpen, setDialogAgregarAsignacionOpen]}
                        ayudantes={ayudantesDialog}
                        useUltimasAsignaciones={[asignacionesAnteriores, setAsignacionesAnteriores]}
                    />


                    <List dense subheader={
                        <ListSubheader>
                            Ayudantes anteriores:
                        </ListSubheader>
                    }>
                        {

                            ayudantesAnteriores.map((a, i) => (
                                <ListItem key={i} dense >
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
                        <PosiblesAsignaciones nombre="Discurso" checked={posiblesAsignaciones["Discurso"]} cambiarChecked={cambiarChecked} disabled={genero === "mujer"} />
                        <PosiblesAsignaciones nombre="Lectura" checked={posiblesAsignaciones["Lectura"]} cambiarChecked={cambiarChecked} disabled={genero === "mujer"} />
                    </List>




                    <Divider sx={{ mt: 2, mb: 1 }}> Observaciones </Divider>


                    <TextField
                        multiline
                        rows={4}
                        fullWidth
                        value={observaciones}
                        onChange={e => setObservaciones(e.target.value)}
                        placeholder='Limitaciones, razones por las que no ha pasado, etc...'
                    />

                </DialogContent>

                <DialogActions sx={{ position: "sticky", bottom: 0, background: "white", zIndex: 10 }} >

                    <Button
                        onClick={guardar}
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
                        onClick={cancelarYCerrar}
                        sx={{ color: "#5b3c88", "&:hover": { color: "#6b4c88" } }} >
                        cerrar
                    </Button>

                </DialogActions>
            </form>
        </Dialog>
    )

}