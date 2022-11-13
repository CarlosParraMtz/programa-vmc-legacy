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
                    onClick={() => { if (pestaña === tab) { setPestaña(-1) } else { setPestaña(tab) } }}
                    selected={pestaña === tab}
                >
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

        <List disablePadding sx={{ width: '100%', background: '#ddd' }} >

            <SideTab tab={0} texto='Matriculados' icon={<AccountCircleIcon />} >
                <Matriculados />
            </SideTab>

            <SideTab tab={1} texto='No estudiantiles' icon={<AccountCircleIcon />} >
                {/* 
                    //TODO Aquí irán los que pueden pasar asignaciones que no son esudiantiles
                */}
            </SideTab>

            <SideTab tab={2} texto='Familias' icon={<PeopleAltIcon />} >
                <Familias />
            </SideTab>

            <SideTab tab={3} texto='Configuración' icon={<SettingsIcon />} >
                Configuraciones
            </SideTab>



        </List>

    )
}