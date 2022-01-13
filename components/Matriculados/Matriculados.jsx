import { useState, useEffect } from 'react'
import {
    Button,
    Card,
    CardContent,
    Paper,
    Typography,
} from '@mui/material'
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





export default function Matriculados() {

    const [open, setOpen] = useState(false);
    const [matriculados, setMatriculados] = useState([])


    const handleClickOpen = () => {
        setOpen(true);
    };


    const consultarBaseDeDatos = async () => {

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
                tipoDeUltimaAsignacion: doc.data().tipoDeUltimaAsignacion,
                posiblesAsignaciones: doc.data().posiblesAsignaciones
            }
            matriculadosDescargados.push(agregar)
        })

        setMatriculados(matriculadosDescargados)
    }


    useEffect(() => {
        consultarBaseDeDatos()
    }, [])




    return (
        <>
            <Paper
                sx={{
                    width: "100%",
                    maxWidth: "1120px",
                    m: "10px auto",
                    p: 1,
                    minHeight: "900px",
                    background: "#e7e7e5",
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "start",
                    flexWrap: "wrap"
                }}
                elevation={20}>



                <Card sx={{ maxWidth: "250px" }}>
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

                {
                    matriculados.map((matriculado) => {
                        return (
                            <Card key={matriculado.id} sx={{m:1}}>
                                <CardContent>
                                    <Typography sx={{ textAlign: "center" }}>
                                        <b>{matriculado.nombre}</b>
                                    </Typography>
                                </CardContent>
                            </Card>
                        )
                    })
                }


            </Paper>




            <DialogAgregarUno open={open} setOpen={setOpen} consultar={consultarBaseDeDatos} />

        </>
    )
}