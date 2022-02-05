import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import {
    Button,
    Paper,
    Typography,
} from '@mui/material'
import AgregarAsignacionesDialog from './AgregarAsignacionesDialog';
import HojaMes from './HojaMes';

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
            <AgregarAsignacionesDialog />
        </>
    )
}
