import { useState } from 'react'
import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Tooltip,
    Typography
} from '@mui/material';
import { useRecoilState } from 'recoil';

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import familiasState from '../../Recoil/familiasState';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import TarjetaColapsable from './TarjetaColapsable';
import DialogFamilias from './DialogFamilias';

export default function Familias() {

    const [familias, setFamilias] = useRecoilState(familiasState)
    const [dialogAgregar, setDialogAgregar] = useState(false)
    const [data, setData] = useState(null)

    return (
        <>
            <List disablePadding >
                <ListItemButton onClick={() => setDialogAgregar(true)} >
                    <ListItemIcon sx={{ pl: 2 }} >
                        <GroupAddIcon />
                    </ListItemIcon>
                    <ListItemText primary='Agregar familia' />
                </ListItemButton>
            </List>
            <List disablePadding sx={{ width: "100%", maxHeight: "390px", overflow: "auto" }} >
                {familias.map(fam => (
                    <TarjetaColapsable key={fam.id} titulo={fam.apellidos} >
                        <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left", mt: 1.5 }}>
                            <b>Miembros:</b>
                        </Typography>

                        {fam.miembros.map((ind, index) => <Typography key={index}> • {ind} </Typography>)}
                        {fam.miembros.length === 0 && <Typography sx={{ color: '#888' }} ><b>No hay matriculados enlistados en esta familia.</b></Typography>}

                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} >

                            <Tooltip title='Editar familia' placement='top' arrow>
                                <IconButton
                                    onClick={() => {
                                        setData(fam)
                                        setDialogAgregar(true)
                                    }}
                                    sx={{ mr: 1, background: "#5b3c88", "&:hover": { background: "#6b4c88" } }}>
                                    <EditIcon sx={{ color: 'white' }} fontSize='small' />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title='Eliminar familia con todos sus matriculados' placement='top' arrow>
                                <IconButton size='small' sx={{ background: "#5b3c88", "&:hover": { background: "#6b4c88" } }}>
                                    <DeleteIcon sx={{ color: 'white' }} fontSize='small' />
                                </IconButton>
                            </Tooltip>

                        </Box>
                    </TarjetaColapsable>
                ))}
            </List>

            <DialogFamilias useOpen={[dialogAgregar, setDialogAgregar]} data={data} />
        </>
    )
}