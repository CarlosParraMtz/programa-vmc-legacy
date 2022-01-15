import { useState, useEffect } from 'react'
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    Collapse,
    Divider,
    Fab,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
    Tooltip,
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DialogAgregarUno from './DialogAgregarUno';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useRecoilState } from 'recoil';
import matriculadosState from '../../Recoil/matriculadosState';

import DialogEditar from './DialogEditar';

import {
    collection,
    doc,
    getFirestore,
    getDocs,
    //limitToLast,
    query,
    orderBy,
    deleteDoc,
} from "firebase/firestore";
import config from "../../firebase/config";

const db = getFirestore(config)


const Elemento = ({ data, consultar }) => {

    const [open, setOpen] = useState(false)



    const borrarMatriculado = async() => {

        await deleteDoc(doc(db, `congregaciones/Del Bosque/matriculados`, data.id))
        consultar()
    }



    return (
        <>

            <Collapse in={!open}>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => setOpen(!open)}>
                        <ListItemText primary={<b>{data.nombre}</b>} />
                        <ExpandMore />
                    </ListItemButton>
                </ListItem>
            </Collapse>

            <Collapse in={open}>
                <Card >
                    <CardHeader title={data.nombre} sx={{ background: "#5b3c88", color: "white", maxHeight: "50px", pr: 3 }} onClick={() => setOpen(false)} action={<ExpandLess />} />

                    <CardContent>
                        <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left" }}>
                            <b>Familia:</b> {data.familia}
                        </Typography>

                        <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left", mt: 1.5 }}>
                            <b>Ultima asignación:</b>
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left" }}>
                            {data.tipoDeUltimaAsignacion}, el {data.ultimaAsignacion}, en la sala {data.ultimaSala}
                        </Typography>

                        <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left", mt: 1.5 }}>
                            <b>Se puede asignar a:</b>
                        </Typography>

                        {
                            data.arrayPosiblesAsignaciones.map((asignacion, index) => {
                                return (
                                    <Typography key={index}>
                                        {asignacion}
                                    </Typography>
                                )
                            })
                        }

                    </CardContent>
                    <CardActions>
                        <Box sx={{ m: "0 auto" }}>

                            <DialogEditar consultar={consultar} data={data} />

                            <Button
                                onClick={borrarMatriculado}
                                variant="contained"
                                startIcon={<DeleteIcon />}
                                sx={{
                                    m: 1,
                                    background: "#5b3c88",
                                    "&:hover": {
                                        background: "#6b4c88"
                                    }
                                }} >
                                Borrar
                            </Button>

                        </Box>
                    </CardActions>

                </Card>
            </Collapse>
            <Divider />
        </>
    )
}



export default function Matriculados() {

    const [open, setOpen] = useState(false);
    const [matriculados, setMatriculados] = useRecoilState(matriculadosState)
    const [cargando, setCargando] = useState(false)


    const handleClickOpen = () => {
        setOpen(true);
    };


    const consultarBaseDeDatos = async () => {
        setCargando(true)

        let matriculadosDescargados = []
        const mesDelAño = [
            "enero",
            "febrero",
            "marzo",
            "abril",
            "mayo",
            "junio",
            "julio",
            "agosto",
            "septiembre",
            "octubre",
            "noviembre",
            "diciembre"
        ]

        const q = query(collection(db, `congregaciones/Del Bosque/matriculados`), orderBy("nombre"))
        const n = await getDocs(q);
        n.forEach((doc) => {
            const fecha = new Date(doc.data().timeStampUltimaAsignacion)
            const año = fecha.getFullYear();
            const diaNum = fecha.getDate();
            const mes = fecha.getMonth();
            const textoFecha = `${diaNum} de ${mesDelAño[mes]} del ${año}`;


            let posibles = []
            let json = doc.data().posiblesAsignaciones
            for (var i in json) {
                if (json[i]) {
                    posibles.push(i)
                }
            }

            const mesT = mes < 9 ? `0${mes + 1}` : mes + 1
            const diaT = diaNum < 9 ? `0${diaNum + 1}` : diaNum + 1
            const valueCalendar = `${año}-${mesT}-${diaT}`

            const agregar = {
                id: doc.id,
                nombre: doc.data().nombre,
                genero: doc.data().genero,
                familia: doc.data().familia,
                ultimaAsignacion: textoFecha,
                timeStampUltimaAsignacion: doc.data().timeStampUltimaAsignacion,
                defaultValueCalendar: valueCalendar,
                ultimaSala: doc.data().ultimaSala,
                tipoDeUltimaAsignacion: doc.data().tipoDeUltimaAsignacion,
                posiblesAsignaciones: json,
                arrayPosiblesAsignaciones: posibles
            }
            matriculadosDescargados.push(agregar)
        })

        setMatriculados(matriculadosDescargados)
        setCargando(false)
    }


    useEffect(() => {
        consultarBaseDeDatos()
    }, [])




    return (
        <>
            <Paper
                sx={{
                    width: "100%",
                    m: "10px auto",
                    p: 1,
                    height: "87vh",
                    background: "#e7e7e5",
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "start",
                    flexWrap: "wrap"
                }}
                elevation={20}>


                {matriculados.length == 0 ? (
                    <Card sx={{ maxWidth: "250px", m: "auto auto" }}>
                        <CardContent>
                            <Typography sx={{ textAlign: "center" }}>
                                <b>No hay matriculados registrados todavía.</b>
                            </Typography>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleClickOpen}
                                sx={{
                                    background: "#5b3c88",
                                    "&:hover": {
                                        background: "#6b4c88"
                                    }
                                }}>
                                Agrega uno</Button>
                        </CardContent>
                    </Card>
                ) : (
                    <List sx={{ width: "100%", maxHeight: "100%", overflow: "auto" }} disablePadding>
                        {
                            matriculados.map((matriculado) => {
                                return <Elemento data={matriculado} key={matriculado.id} consultar={consultarBaseDeDatos} />
                            })
                        }
                    </List>
                )}



            </Paper>



            <Tooltip title="Agregar uno">
                <Fab onClick={() => setOpen(true)}
                    sx={{
                        background: "#5b3c88",
                        position: "fixed",
                        bottom: 30,
                        right: 20,
                        "&:hover": {
                            background: "#6b4c88"
                        }
                    }}>
                    <AddIcon sx={{ color: "white" }} />
                </Fab>
            </Tooltip>

            <DialogAgregarUno open={open} setOpen={setOpen} consultar={consultarBaseDeDatos} />

            {cargando &&
                <Box sx={{ background: "#5b3c88", width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <CircularProgress sx={{ color: "white" }} />
                    <Typography variant="h6" sx={{ textAlign: "center", color: "white" }} ><b>Cargando...</b></Typography>
                </Box>
            }
        </>
    )
}