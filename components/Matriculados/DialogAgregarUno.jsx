import { useState } from 'react'
import {
    Button,
    Card,
    CardHeader,
    CardContent,
    Divider,
    Paper,
    TextField,
    Typography,
    Grid,
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
import CommentIcon from '@mui/icons-material/Comment';
import {
    collection,
    setDoc,
    doc,
    getFirestore,
    serverTimestamp,
} from "firebase/firestore";
import config from "../../firebase/config";


const PosiblesAsignaciones = ({ tipo, nombre, checked, cambiarChecked }) => {
    return (
        <ListItem disablePadding >
            <ListItemButton dense onClick={() => { cambiarChecked(tipo) }}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked}
                        disableRipple
                        onChange={() => cambiarChecked(tipo)}
                    />
                </ListItemIcon>
                <ListItemText id={tipo} primary={nombre} />
            </ListItemButton>
        </ListItem>
    )
}


export default function DialogAgregarUno({ open, setOpen, consultar }) {

    const [nombre, setNombre] = useState("")
    const [genero, setGenero] = useState("hombre")
    const [familia, setFamilia] = useState('');
    const [nuevaFamilia, setNuevaFamilia] = useState("")

    const [timeStampUltimaAsignacion, setTimeStampUltimaAsignacion] = useState("")
    const [ultimaSala, setUltimaSala] = useState("A")
    const [tipoDeUltimaAsignacion, setTipoDeUltimaAsignacion] = useState('A')

    const [posiblesAsignaciones, setPosiblesAsignaciones] = useState({
        A: false,
        PC: false,
        R: false,
        CB: false,
        D: false,
        L: false
    })



    const handleChange = (event) => {
        setFamilia(event.target.value);
    };

    const cambiarTipo = (event) => {
        setTipoDeUltimaAsignacion(event.target.value);
    };

    const cambiarUltimaSala = (event) => {
        setUltimaSala(event.target.value);
    };

    const cambiarGenero = (event) => {
        setGenero(event.target.value);
    };

    const cambiarFechaUltimaAsignacion = e => {
        const date = new Date(e.target.value)
        setTimeStampUltimaAsignacion(date.valueOf())
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //* Para crear matriculado
    const db = getFirestore(config)
    const crearMatriculado = async (e) => {

        e.preventDefault()

        const direccionMatriculados = doc(collection(db, "congregaciones/Del Bosque/matriculados"));
        const direccionFamilias = doc(collection(db, "congregaciones/Del Bosque/familias"));
        if(nuevaFamilia != "") {
            await setDoc(direccionFamilias, {
                familia: nuevaFamilia
            })
        }

        function seCreoFamilia() {
            if (nuevaFamilia != "") {
                return nuevaFamilia
            }
            return familia
        }

        await setDoc(direccionMatriculados, {
            nombre,
            genero,
            familia: seCreoFamilia(),
            timeStampUltimaAsignacion,
            ultimaSala,
            tipoDeUltimaAsignacion,
            posiblesAsignaciones,
        });


        setNombre('');
        setGenero('');
        setFamilia('');
        setTimeStampUltimaAsignacion('')
        setUltimaSala('');
        setTipoDeUltimaAsignacion('A')
        setPosiblesAsignaciones({
            A: false,
            PC: false,
            R: false,
            CB: false,
            D: false,
            L: false
        })

        consultar();
        handleClose();
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



    return (
        <Dialog open={open} onClose={handleClose}>
            <form>
                <DialogTitle>Agrega un matriculado</DialogTitle>
                <DialogContent sx={{ maxHeight: "500px", overflow: "auto" }}>
                    <DialogContentText>
                        Agrega todos los datos para evitar errores en la generación automática de asignaciones.
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
                        <InputLabel id="demo-simple-select-label">Género</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={genero}
                            label="Género"
                            onChange={cambiarGenero}
                        >

                            <MenuItem value={"hombre"}>Hombre</MenuItem>
                            <MenuItem value={"mujer"}>Mujer</MenuItem>

                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                        <InputLabel id="demo-simple-select-label">Familia</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={familia}
                            label="Familia"
                            onChange={handleChange}
                        >

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
                            onChange={(e)=>setNuevaFamilia(e.target.value)}
                        />
                    }



                    <Divider sx={{ mt: 2, mb: 1 }}> Última asignación </Divider>


                    <TextField
                        margin="dense"
                        id="name"
                        label="Fecha de última asignación"
                        type="date"
                        defaultValue="2021-01-01"
                        fullWidth
                        onChange={cambiarFechaUltimaAsignacion}
                        variant="outlined"
                    />

                    <Grid container spacing={1} sx={{ width: "100%" }}>
                        <Grid item sm={4} xs={12}>
                            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                                <InputLabel id="demo-simple-select-label">Sala de última asignación</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={ultimaSala}
                                    label="Sala de última asignación"
                                    onChange={cambiarUltimaSala}
                                >

                                    <MenuItem value={"A"}>A</MenuItem>
                                    <MenuItem value={"B"}>B</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={8} xs={12}>
                            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                                <InputLabel id="demo-simple-select-label">Tipo de última asignación</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tipoDeUltimaAsignacion}
                                    label="Tipo de última asignación"
                                    onChange={cambiarTipo}
                                >

                                    <MenuItem value={"A"}>Ayudante</MenuItem>
                                    <MenuItem value={"PC"}>Primera conversación</MenuItem>
                                    <MenuItem value={"R"}>Revisita</MenuItem>
                                    <MenuItem value={"CB"}>Curso bíblico</MenuItem>
                                    <MenuItem value={"D"}>Discurso</MenuItem>
                                    <MenuItem value={"L"}>Lectura</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>



                    <Divider sx={{ mt: 2, mb: 1 }}> Futuras asignaciones </Divider>

                    <Typography variant="subtitle2" sx={{ color: "#777", fontSize: "12px" }}>Tipo de asignaciones que puede tener:</Typography>
                    <List fullWidth sx={{ m: "0 auto", bgcolor: 'background.paper' }}>
                        <PosiblesAsignaciones tipo="A" nombre="Ayudante" checked={posiblesAsignaciones.A} cambiarChecked={cambiarChecked} />
                        <PosiblesAsignaciones tipo="PC" nombre="Primera conversación" checked={posiblesAsignaciones.PC} cambiarChecked={cambiarChecked} />
                        <PosiblesAsignaciones tipo="R" nombre="Revisita" checked={posiblesAsignaciones.R} cambiarChecked={cambiarChecked} />
                        <PosiblesAsignaciones tipo="CB" nombre="Curso bíblico" checked={posiblesAsignaciones.CB} cambiarChecked={cambiarChecked} />
                        <PosiblesAsignaciones tipo="D" nombre="Discurso" checked={posiblesAsignaciones.D} cambiarChecked={cambiarChecked} />
                        <PosiblesAsignaciones tipo="L" nombre="Lectura" checked={posiblesAsignaciones.L} cambiarChecked={cambiarChecked} />
                    </List>



                </DialogContent>
                <DialogActions>
                    <Button onClick={crearMatriculado} variant="contained" type="submit" >Guardar</Button>
                    <Button onClick={handleClose}>cerrar</Button>
                </DialogActions>
            </form>
        </Dialog>
    )

}