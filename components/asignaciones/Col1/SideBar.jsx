import { useState } from 'react'
import {
    Box,
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

import Matriculados from '../../Matriculados/Matriculados';
import Familias from '../../Matriculados/Familias';


export default function SideBar() {

    const [pestaña, setPestaña] = useState(0)


    function SideTab({ tab, texto, icon, children }) {
        return (
            <>
                <ListItemButton
                    onClick={() => {
                        if (pestaña === tab) {
                            setPestaña(-1)
                        } else {
                            setPestaña(tab)
                        }
                    }}
                    selected={pestaña === tab} >
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={texto} />
                </ListItemButton>
                <Collapse in={pestaña === tab} sx={{ background: '#eee', transition: '1000ms' }} >
                    {children}
                </Collapse>
            </>
        )
    }


    return (
        <Box sx={{ width: '100%', background: '#ddd' }} >
            <List disablePadding >

                <SideTab tab={0} texto='Matriculados' icon={<AccountCircleIcon />} >
                    <Matriculados />
                </SideTab>

                <SideTab tab={1} texto='Familias' icon={<PeopleAltIcon />} >
                    <Familias />
                </SideTab>

                <SideTab tab={2} texto='Configuración' icon={<SettingsIcon />} >
                    Configuraciones
                </SideTab>



            </List>
        </Box>
    )
}