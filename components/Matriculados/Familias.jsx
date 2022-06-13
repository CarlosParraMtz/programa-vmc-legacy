import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from '@mui/material';
import { useRecoilState } from 'recoil';
import familiasState from '../../Recoil/familiasState';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import TarjetaColapsable from './TarjetaColapsable';

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
                {familias.map(fam => (
                    <TarjetaColapsable key={fam.id} titulo={fam.apellidos} >
                        <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left", mt: 1.5 }}>
                            <b>Miembros:</b>
                        </Typography>

                        {fam.miembros.map((ind, index) => <Typography key={index}> • {ind} </Typography>)}
                        {fam.miembros.length === 0 && <Typography><b>No hay matriculados enlistados en esta familia.</b></Typography>}
                    </TarjetaColapsable>
                ))}
            </List>
        </>
    )
}