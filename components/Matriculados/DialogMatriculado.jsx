import { useState, useEffect } from 'react'
import {
    Button,
    Card,
    CardHeader,
    CardContent,
    Divider,
    ListSubheader,
    Paper,
    TextField,
    Typography,
    Grid,
    CircularProgress,
} from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
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


export default function DialogAgregarUno({ useOpen, editando = false, data = null }) {


    const [open, setOpen] = useOpen;

    const [nombre, setNombre] = useState("")
    const [genero, setGenero] = useState("hombre")
    const [familia, setFamilia] = useState('');
    const [nuevaFamilia, setNuevaFamilia] = useState("")


    const [ultimasAsignaciones, setUltimasAsignaciones] = useState([])
    const [fechaUltimaAsignacion, setFechaUltimaAsignacion] = useState('2022-01-01')
    const [ultimaSala, setUltimaSala] = useState("A")
    const [tipoDeUltimaAsignacion, setTipoDeUltimaAsignacion] = useState('Ayudante')

    const [posiblesAsignaciones, setPosiblesAsignaciones] = useState({
        "Ayudante": false,
        "Primera conversación": false,
        "Revisita": false,
        "Curso bíblico": false,
        "Discurso": false,
        "Lectura": false
    })

    const [loading, setLoading] = useState(false)


    const matriculados = useRecoilValue(matriculadosState);
    const [familias, setFamilias] = useRecoilState(familiasState);

    const [ayudantesAnteriores, setAyudantesAnteriores] = useState([])
    const [posiblesAyudantes, setPosiblesAyudantes] = useState([])
    const [posible, setPosible] = useState("")
    const [dialogAgregarAyudante, setDialogAgregarAyudante] = useState(false)

    function vaciarDialog() {
        setNombre('');
        setGenero('');
        setFamilia('');
        setFechaUltimaAsignacion('2022-01-01')
        setUltimaSala('A');
        setTipoDeUltimaAsignacion('Ayudante')
        setPosiblesAsignaciones({
            "Ayudante": false,
            "Primera conversación": false,
            "Revisita": false,
            "Curso bíblico": false,
            "Discurso": false,
            "Lectura": false
        })
        setAyudantesAnteriores([])
        setPosiblesAyudantes([])
        setPosible("")
    }

    function rellenarDialog(data) {
        setNombre(data.nombre);
        setGenero(data.genero);
        setFamilia(data.familia);
        setFechaUltimaAsignacion(data.fechaUltimaAsignacion)
        setUltimaSala(data.ultimaSala);
        setTipoDeUltimaAsignacion(data.tipoDeUltimaAsignacion)
        setPosiblesAsignaciones(data.posiblesAsignaciones)
        setAyudantesAnteriores(data.ayudantesAnteriores)
        setPosiblesAyudantes([])
        setPosible("")
    }

    useEffect(() => {
        if (data != null) {
            rellenarDialog(data)
        }
    }, [open])

    const obtenerPosiblesAyudantes = () => {

        const mismoGenero = matriculados.filter(mtr => mtr.genero == genero)
        const sinElActual = mismoGenero.filter(mtr => mtr.nombre == nombre)
        // const excluyendoLosQueYaEstan = sinElActual.filter(mtr => {
        //     ayudantesAnteriores.find(i => i == mtr.nombre)
        // })
        let sinNombresQueYaEstan = []
        sinElActual.forEach((cadaUno) => {
            const f = ayudantesAnteriores.find(i => i == cadaUno)
            if (!f) {
                sinNombresQueYaEstan.push(cadaUno)
            }
        })
        setPosiblesAyudantes(sinNombresQueYaEstan)
    }

    useEffect(() => {
        obtenerPosiblesAyudantes()
    }, [dialogAgregarAyudante])

    const agregarAyudanteAnterior = (e) => {
        e.preventDefault()
        let arr = [...ayudantesAnteriores]
        arr.push(posible)
        setAyudantesAnteriores(arr)
        setPosible("")
        obtenerPosiblesAyudantes()
        cerrarDialog()
    }

    const cerrarDialog = () => {
        setPosible("")
        setDialogAgregarAyudante(false)
    }

    const borrarAyudante = (id) => {
        let arr = [...ayudantesAnteriores];
        arr.splice(id, 1)
        setAyudantesAnteriores(arr)
    }




    useEffect(() => {
        if (familia != "nuevaFamilia") {
            setNuevaFamilia('')
        }
    }, [familia])




    //* Para seleccionar las posibles asignaciones

    const cambiarChecked = (tipo) => {
        let obj = {}
        obj[tipo] = !posiblesAsignaciones[tipo];
        setPosiblesAsignaciones({
            ...posiblesAsignaciones,
            ...obj
        })
    }




    return (
        <Dialog open={open} onClose={() => setOpen(false)} >
            <form>
                <DialogTitle>Agrega un matriculado</DialogTitle>
                <DialogContent sx={{ overflow: "auto" }} >
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

                    <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                        <InputLabel>Familia</InputLabel>
                        <Select
                            value={familia}
                            label="Familia"
                            onChange={e => setFamilia(e.target.value)}
                        >
                            {familias.map((fam) => <MenuItem key={fam.id} value={fam.id}>{fam.apellidos}</MenuItem>)}
                            <MenuItem value={"nuevaFamilia"}>Agregar familia...</MenuItem>
                        </Select>
                    </FormControl>

                    {
                        familia === "nuevaFamilia" &&
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nueva familia"
                            type="text"
                            fullWidth
                            variant="outlined"
                            sx={{ mb: 1 }}
                            value={nuevaFamilia}
                            onChange={(e) => setNuevaFamilia(e.target.value)}
                        />
                    }



                    <Divider sx={{ mt: 2, mb: 1 }}> Última asignación </Divider>


                    <TextField
                        margin="dense"
                        id="name"
                        label="Fecha de última asignación"
                        type="date"
                        defaultValue="2022-01-01"
                        fullWidth
                        onChange={e => setFechaUltimaAsignacion(e.target.value)}
                        variant="outlined"
                    />

                    <Grid container spacing={0} sx={{ width: "100%" }}>
                        <Grid item sm={4} xs={12}>
                            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                                <InputLabel>Sala de última asignación</InputLabel>
                                <Select
                                    value={ultimaSala}
                                    label="Sala de última asignación"
                                    onChange={e => setUltimaSala(e.target.value)}
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
                                    onChange={e => setTipoDeUltimaAsignacion(e.target.value)}
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
                            <ListItemButton onClick={() => setDialogAgregarAyudante(true)} >
                                <ListItemText primary="Agregar ayudante..." />
                            </ListItemButton>
                        </ListItem>

                        <Dialog open={dialogAgregarAyudante} onClose={cerrarDialog}>
                            <DialogTitle>
                                Selecciona un ayudante de la lista:
                            </DialogTitle>
                            <DialogContent>
                                <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                                    <InputLabel>Ayudante</InputLabel>
                                    <Select
                                        value={posible}
                                        label="Ayudante"
                                        onChange={(e) => setPosible(e.target.value)}
                                    >
                                        {
                                            posiblesAyudantes.map((nombre, index) => (
                                                <MenuItem value={nombre} key={index} >
                                                    {nombre}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={agregarAyudanteAnterior}
                                    variant="contained"
                                    sx={{
                                        background: "#5b3c88",
                                        "&:hover": {
                                            background: "#6b4c88"
                                        }
                                    }}
                                    disabled={posible == "" ? true : false} >
                                    Agregar
                                </Button>
                                <Button onClick={cerrarDialog}>
                                    Cancelar
                                </Button>
                            </DialogActions>

                        </Dialog>

                        {
                            ayudantesAnteriores.map((ayudante, index) => (
                                <ListItem key={index} dense >
                                    <ListItemIcon>
                                        <IconButton onClick={() => borrarAyudante(index)} >
                                            <Delete />
                                        </IconButton>
                                    </ListItemIcon>
                                    <ListItemText primary={ayudante} />

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