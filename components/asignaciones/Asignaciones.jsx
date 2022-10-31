import { Box, } from '@mui/material'
import Tablero from '../Tablero/Tablero'
import SideBar from './Col1/SideBar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';



export default function Asignaciones() {

    const theme = useTheme();
    const esMD = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Box container sx={{ maxWidth: '1200px', m: '0 auto', display: 'flex', alignItems: 'start' }} >
            {esMD &&
                <Box sx={{ minWidth: '300px', maxWidth:'300px' }} >
                    <SideBar />
                </Box>
            }
            <Box sx={{ background: '#f8f8f8', width:'100%', p:0, maxHeight:"calc(100vh - 65px)", overflow:"auto" }} >
                <Tablero />
            </Box>

        </Box>
    )
}
