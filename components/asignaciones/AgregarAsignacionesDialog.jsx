import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import layoutState from '../../Recoil/layoutState';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AsignacionesSemana from './dialog/AsignacionesSemana';
import {
    collection,
    setDoc,
    doc,
    getFirestore,
    serverTimestamp,
    getDocs,
    query,
    orderBy,
    deleteDoc,
} from "firebase/firestore";
import config from "../../firebase/config";
const db = getFirestore(config)


export default function AgregarAsignacionesDialog() {

    const [layout, setLayout] = useRecoilState(layoutState);
    const [mes, setMes] = useState("")
    const [semanas, setSemanas] = useState(0);
    const [secciones, setSecciones] = useState(1)
    const [seccionActual, setSeccionActual] = useState(1)
    const [semana1, setSemana1] = useState({
        asignacion1: "",
        asignacion2: "",
        asignacion3: "",
        asignacion4: "",
        asignacion5: "",
        fecha: '2022-01-01'
    });
    const [semana2, setSemana2] = useState({
        asignacion1: "",
        asignacion2: "",
        asignacion3: "",
        asignacion4: "",
        asignacion5: "",
        fecha: '2022-01-01'
    });
    const [semana3, setSemana3] = useState({
        asignacion1: "",
        asignacion2: "",
        asignacion3: "",
        asignacion4: "",
        asignacion5: "",
        fecha: '2022-01-01'
    });
    const [semana4, setSemana4] = useState({
        asignacion1: "",
        asignacion2: "",
        asignacion3: "",
        asignacion4: "",
        asignacion5: "",
        fecha: '2022-01-01'
    });
    const [semana5, setSemana5] = useState({
        asignacion1: "",
        asignacion2: "",
        asignacion3: "",
        asignacion4: "",
        asignacion5: "",
        fecha: '2022-01-01'
    });


    function limpiarDatos() {
        setMes("")
        setSemanas(0)
        setSecciones(1)
        setSeccionActual(1)
        setSemana1({ asignacion1: "", asignacion2: "", asignacion3: "", asignacion4: "", fecha: '2022-01-01' })
        setSemana2({ asignacion1: "", asignacion2: "", asignacion3: "", asignacion4: "", fecha: '2022-01-01' })
        setSemana3({ asignacion1: "", asignacion2: "", asignacion3: "", asignacion4: "", fecha: '2022-01-01' })
        setSemana4({ asignacion1: "", asignacion2: "", asignacion3: "", asignacion4: "", fecha: '2022-01-01' })
        setSemana5({ asignacion1: "", asignacion2: "", asignacion3: "", asignacion4: "", fecha: '2022-01-01' })
    }


    const cerrarDialog = () => {
        setLayout({ ...layout, agregarAsignacionesDialog: false })
        limpiarDatos()
    }

    const aumentarSemana = () => {
        if (semanas < 5) {
            setSemanas(semanas + 1)
            setSecciones(secciones + 1)
        }
    }

    const reducirSemana = () => {
        if (semanas > 1) {
            setSemanas(semanas - 1)
            setSecciones(secciones - 1)
        }
    }





    async function guardarSemanas() {
        const asignacionesPorSemana = [semana1, semana2, semana3, semana4, semana5,]
        if (semana5.asignacion1 == "") {
            asignacionesPorSemana.splice(4, 1)
        }
        const data = { semanas: asignacionesPorSemana, asignacionesGeneradas: false }
        const direccionMeses = doc(collection(db, "congregaciones/Del Bosque/meses"), mes);
        await setDoc(direccionMeses, data);
        cerrarDialog()
    }


    return (
        <Dialog
            open={layout.agregarAsignacionesDialog}
            onClose={cerrarDialog}
            maxWidth="sm" >
            <DialogContent>
                <DialogContentText>
                    {"Agrega las asignaciones para: "}
                    <TextField
                        variant="standard"
                        size='small'
                        value={mes}
                        placeholder="Ej. Marzo 2022"
                        onChange={e => setMes(e.target.value)}
                    />
                </DialogContentText>

                <br />

                {seccionActual == 1 &&
                    <Box sx={{ display: "flex", width: "100%", alignItems: "center", mb: 2 }}>
                        <Typography>Semanas: </Typography>
                        <Box sx={{ display: "flex", ml: "auto" }} >
                            <IconButton onClick={reducirSemana} >
                                <ArrowDropDownIcon />
                            </IconButton>

                            <Typography variant="h4">{semanas}</Typography>

                            <IconButton onClick={aumentarSemana} >
                                <ArrowDropUpIcon />
                            </IconButton>
                        </Box>
                    </Box>
                }

                {seccionActual == 2 && <AsignacionesSemana semana={semana1} setSemana={setSemana1} titulo="Semana 1" />}
                {seccionActual == 3 && <AsignacionesSemana semana={semana2} setSemana={setSemana2} titulo="Semana 2" />}
                {seccionActual == 4 && <AsignacionesSemana semana={semana3} setSemana={setSemana3} titulo="Semana 3" />}
                {seccionActual == 5 && <AsignacionesSemana semana={semana4} setSemana={setSemana4} titulo="Semana 4" />}
                {seccionActual == 6 && <AsignacionesSemana semana={semana5} setSemana={setSemana5} titulo="Semana 5" />}

            </DialogContent>

            <DialogActions>
                {
                    seccionActual == 1 &&
                    <Button onClick={cerrarDialog} variant="outlined" >Cerrar</Button>
                }
                {
                    seccionActual > 1 &&
                    <Button onClick={() => setSeccionActual(seccionActual - 1)} variant="contained" >Anterior</Button>
                }
                {
                    seccionActual < secciones &&
                    <Button onClick={() => setSeccionActual(seccionActual + 1)} variant="contained" >Siguiente</Button>
                }
                {
                    (seccionActual != 1) && (seccionActual == secciones) &&
                    <Button variant="contained" onClick={guardarSemanas} >Guardar</Button>
                }
            </DialogActions>
        </Dialog>
    )
}
