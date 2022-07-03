import { Box, } from '@mui/material'
import Tablero from '../Tablero/Tablero'
import SideBar from './Col1/SideBar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';



export default function Asignaciones() {

    const theme = useTheme();
    const esLG = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <Box container sx={{ maxWidth: '1200px', m: '0 auto', display: 'flex', alignItems: 'start' }} >
            {esLG &&
                <Box sx={{ width: '350px' }} >
                    <SideBar />
                </Box>
            }
            <Box sx={{ background: '#f8f8f8' }} >
                <Tablero />
            </Box>

        </Box>
    )
}
