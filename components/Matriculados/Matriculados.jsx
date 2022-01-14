import { useState, useEffect } from 'react'
import {
    Box,
    Button,
    Card,
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


const Elemento = ({ data }) => {

    const [open, setOpen] = useState(false)

    return (
        <>

            <Collapse in={!open}>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => setOpen(!open)}>
                        <ListItemText primary={data.nombre} secondary="Click para más información" />
                    </ListItemButton>
                </ListItem>
            </Collapse>

            <Collapse in={open}>
                <Card onClick={() => setOpen(false)} >
                    <CardHeader title={data.nombre} sx={{ background: "#5b3c88", color: "white" }} />

                    <CardContent>
                        <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left" }}>
                            Familia: <b>{data.familia}</b>
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left" }}>
                            Ultima asignación:
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left" }}>
                            <b>{data.tipoDeUltimaAsignacion}, el {data.ultimaAsignacion}, en la sala {data.ultimaSala}</b>
                        </Typography>
                    </CardContent>
                </Card>
            </Collapse>
            <Divider sx={{ m: 0 }} />
        </>
    )
}



export default function Matriculados() {

    const [open, setOpen] = useState(false);
    const [matriculados, setMatriculados] = useState([])
    const [cargando, setCargando] = useState(false)


    const handleClickOpen = () => {
        setOpen(true);
    };


    const consultarBaseDeDatos = async () => {
        setCargando(true)

        let matriculadosDescargados = []

        const q = query(collection(db, `congregaciones/Del Bosque/matriculados`), orderBy("nombre"))
        const n = await getDocs(q);
        n.forEach((doc) => {

            //* TimeStamp de última asignación
            const fecha = doc.data().timeStampUltimaAsignacion

            const agregar = {
                id: doc.id,
                nombre: doc.data().nombre,
                genero: doc.data().genero,
                familia: doc.data().familia,
                ultimaAsignacion: fecha,
                ultimaSala: doc.data().ultimaSala,
                tipoDeUltimaAsignacion: doc.data().tipoDeUltimaAsignacion,
                posiblesAsignaciones: doc.data().posiblesAsignaciones
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
                    maxWidth: "920px",
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
                                <b>No hay datos.</b>
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
                                Agregar información</Button>
                        </CardContent>
                    </Card>
                ) : (
                    <List fullWidth sx={{ width: "100%", maxHeight: "100%", overflow: "auto" }} disablePadding>
                        {
                            matriculados.map((matriculado) => {
                                return <Elemento data={matriculado} key={matriculado.id} />
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
                <Box sx={{ background: "#5b3c88", width: "100vw", height: "100vh", position: "fixed", top:0, left:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                    <CircularProgress sx={{color:"white"}} />
                    <Typography variant="h6" sx={{textAlign:"center", color:"white"}} ><b>Cargando...</b></Typography>
                </Box>
            }
        </>
    )
}