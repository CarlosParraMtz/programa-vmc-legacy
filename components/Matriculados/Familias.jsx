import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { useRecoilState } from 'recoil';
import familiasState from '../../Recoil/familiasState';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

export default function Familias() {

    const [familias, setFamilias] = useRecoilState(familiasState)

    return (
        <>
            <List disablePadding >
                <ListItemButton >
                    <ListItemIcon sx={{ pl: 2 }} >
                        <GroupAddIcon />
                    </ListItemIcon>
                    <ListItemText primary='Agregar familia' />
                </ListItemButton>
            </List>
            <List disablePadding>
                {familias.map((familia, i) => (
                    <div key={i}></div>
                ))}
            </List>
        </>
    )
}