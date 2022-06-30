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
import Tablero from '../Tablero/Index'

import SideBar from './Col1/SideBar';



export default function Asignaciones() {

    const [mes, setMes] = useState(null)
    const [edicion, setEdicion] = useState(false)


    return (
        <Grid container sx={{ maxWidth: '1200px', m: '0 auto' }} >
            <Grid item xs={12} sm={3} sx={{ background: 'yellow' }} >
                <SideBar />
            </Grid>
            <Grid item xs={12} sm={9} sx={{ background: '#f8f8f8' }} >
                <Tablero />
            </Grid>

        </Grid>
    )
}
