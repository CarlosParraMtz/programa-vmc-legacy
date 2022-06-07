import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import {
    Box,
    Button,
    Paper,
    Typography,
} from '@mui/material'
import { useRecoilState } from 'recoil';
import layoutState from '../../Recoil/layoutState';

import {
    collection,
    doc,
    getFirestore,
    getDocs,
    limitToLast,
    query,
    orderBy,
    deleteDoc,
} from "firebase/firestore";
import config from "../../firebase/config";
import HojaDeAsignaciones from './HojaDeAsignaciones';

const db = getFirestore(config)


export default function Asignaciones() {

    const [mes, setMes] = useState(null)
    const [layout, setLayout] = useRecoilState(layoutState)
    const [edicion, setEdicion] = useState(false)

    const descargarSemanas = async () => {
        let mesesDescargados = []
        const q = query(collection(db, `congregaciones/Del Bosque/meses`), limitToLast(1), orderBy("timeStamp"))
        const n = await getDocs(q);
        n.forEach((doc) => {
            const agregar = {
                mes: doc.id,
                semanas: doc.data().semanas
            }
            mesesDescargados.push(agregar)
        })
        if (!n.empty) {
            setMes(mesesDescargados)
        }
    }
    useEffect(() => {
        descargarSemanas()
    }, [])

    return (
        <>

            {
                !edicion &&
                <>
                    {
                        (mes == null) &&
                        <Box sx={{
                            m: "10px auto",
                            background: "#ddd",
                            borderRadius: "10px",
                            width: "fit-content",
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"
                        }} >
                            <Typography>Aún no hay asignaciones.</Typography>
                            <Button onClick={() => setEdicion(true)} >Agregar ahora</Button>
                        </Box>
                    }
                </>
            }

            {
                edicion && <HojaDeAsignaciones />
            }
        </>
    )
}
