import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import {
    Box,
    Button,
    Grid,
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

const db = getFirestore(config)


export default function Asignaciones() {

    const [mes, setMes] = useState(null)
    const [layout, setLayout] = useRecoilState(layoutState)
    const [edicion, setEdicion] = useState(false)

  
    return (
        <Grid container sx={{maxWidth:'1200px', m:'0 auto'}} >
            <Grid item xs={12} sm={3} sx={{background:'yellow'}} >
                Columna de matriculados, familias y configuraciones
            </Grid>
            <Grid item xs={12} sm={9} sx={{background:'green'}} >
                Columna para el componente del mes
            </Grid>

        </Grid>
    )
}
