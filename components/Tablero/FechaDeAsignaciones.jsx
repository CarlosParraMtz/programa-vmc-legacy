import React from 'react'
import {
	Box,
	Button,
	Chip,
	Divider,
	Grid,
	IconButton,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function FechaDeAsignaciones() {

	const theme = useTheme();
	const esLG = useMediaQuery(theme.breakpoints.up('lg'));

	const tableSM = 12
	const tableXS = 12
	const tableLG = 3    

    return (
        <Box sx={{ width: '100%', boxShadow: '1px 1px 4px #777' }} >
            <Box sx={{ p: 1, background: '#cfcfcf', display: 'flex', alignItems: 'center' }} >
                <Typography>Jueves, 6 de enero de 2022</Typography>

                <IconButton sx={{ ml: 'auto' }} >
                    <CloseIcon />
                </IconButton>

            </Box>

            <Box sx={{ width: '100%', p: 2 }} >

                <Grid container sx={{ background: '#e7e7e7', p: 1, borderRadius: '8px', justifyContent: 'start' }} >
                    <Grid item lg={tableLG} sm={tableSM} xs={tableXS} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '3px', p: 0.5 }} >
                        <Box sx={{ p: 1, background: '#cfcfcf', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >

                            <Typography sx={{ ml: 1 }} >
                                <strong>
                                    Primera conversación
                                </strong>
                            </Typography>

                            <IconButton sx={{ ml: 'auto' }} size='small' >
                                <CloseIcon />
                            </IconButton>

                        </Box>
                    </Grid>
                    <Grid item lg={tableLG} sm={tableSM} xs={tableXS} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '3px', p: 0.5 }} >
                        <Grid container>
                            <Grid item lg={12} sm={4} xs={12} >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: '#cfcfcf', p: 0.7, pl: 1 }} >
                                    <Typography sx={{ textAlign: 'left' }} >
                                        <strong>Sala A</strong>
                                    </Typography>
                                    <IconButton sx={{ ml: 'auto' }} size='small' >
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid item lg={12} sm={4} xs={12} >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: '#fff', p: 0.7, pl: 1 }} >
                                    <Typography sx={{ textAlign: 'center' }} >
                                        Meredith de la Llave
                                    </Typography>
                                    <IconButton sx={{ ml: 'auto' }} size='small' >
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid item lg={12} sm={4} xs={12} sx={{ borderBottom: 'solid 1px #cdcdcd' }} >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: '#fff', p: 0.7, pl: 1 }} >
                                    <Typography sx={{ textAlign: 'center' }} >
                                        Mishel de Parra
                                    </Typography>
                                    <IconButton sx={{ ml: 'auto' }} size='small' >
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            </Grid>

                        </Grid>
                    </Grid>


                    <Grid item lg={tableLG} sm={tableSM} xs={tableXS} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '3px', p: 0.5 }} >
                        <Grid container>
                            <Grid item lg={12} sm={4} xs={12} >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: '#cfcfcf', p: 0.7, pl: 1 }} >
                                    <Typography sx={{ textAlign: 'left' }} >
                                        <strong>Sala B</strong>
                                    </Typography>
                                    <IconButton sx={{ ml: 'auto' }} size='small' >
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid item lg={12} sm={4} xs={12} >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: '#fff', p: 0.7, pl: 1 }} >
                                    <Typography sx={{ textAlign: 'center' }} >
                                        Meredith de la Llave
                                    </Typography>
                                    <IconButton sx={{ ml: 'auto' }} size='small' >
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid item lg={12} sm={4} xs={12} sx={{ borderBottom: 'solid 1px #cdcdcd' }} >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: '#fff', p: 0.7, pl: 1 }} >
                                    <Typography sx={{ textAlign: 'center' }} >
                                        Mishel de Parra
                                    </Typography>
                                    <IconButton sx={{ ml: 'auto' }} size='small' >
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item lg={tableLG} sm={tableSM} xs={tableXS} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '3px', p: 0.5 }} >
                        <Button
                            sx={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                width: '100%', height: '100%',
                                color: '#555',
                                background: '#cfcfcf',
                                "&:hover": { background: '#c7c7c7' }
                            }}
                        >
                            <AddIcon />
                            <Typography sx={{ color: '#555' }} ><b>Agregar sala</b></Typography>
                        </Button>
                    </Grid>


                </Grid>

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} >
                    <Chip label={<b>Agregar asignación</b>} icon={<HistoryEduIcon />} sx={{ m: '0 auto', width: '100%' }} />
                </Box>

            </Box>
        </Box>
    )
}
