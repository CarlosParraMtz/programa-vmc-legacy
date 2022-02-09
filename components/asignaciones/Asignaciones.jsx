import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import {
    Box,
    Button,
    Paper,
    Typography,
} from '@mui/material'
import AgregarAsignacionesDialog from './AgregarAsignacionesDialog';
import HojaMes from './HojaMes';
import { useRecoilState } from 'recoil';
import layoutState from '../../Recoil/layoutState';

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


export default function Asignaciones() {

    const [meses, setMeses] = useState([])
    const [posicionActual, setPosicionActual] = useState(0)
    const [layout, setLayout] = useRecoilState(layoutState)

    const descargarSemanas = async () => {

        let mesesDescargados = []

        const q = query(collection(db, `congregaciones/Del Bosque/meses`))
        const n = await getDocs(q);
        n.forEach((doc) => {

            const agregar = {
                mes: doc.id,
                semanas: doc.data().semanas
            }
            mesesDescargados.push(agregar)
        })

        setMeses(mesesDescargados)
    }

    useEffect(() => {
        descargarSemanas()
    }, [])

    return (
        <>
            {meses.length > 0 &&
                <HojaMes meses={meses} posicionActual={posicionActual} />
            }
            {
                meses.length == 0 &&
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
                    <Button onClick={() => setLayout({ ...layout, agregarAsignacionesDialog: true })}
                    >Agregalas ahora</Button>
                </Box>
            }
            <AgregarAsignacionesDialog />
        </>
    )
}
