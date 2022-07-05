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
import { useRecoilState, useRecoilValue } from 'recoil';
import userState from '../../Recoil/userState';
import matriculadosState from '../../Recoil/matriculadosState';

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import familiasState from '../../Recoil/familiasState';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import TarjetaColapsable from './TarjetaColapsable';
import DialogFamilias from './DialogFamilias';

import eliminarFamilia from '../../firebase/eliminarFamilia';
import eliminarMatriculado from '../../firebase/eliminarMatriculado';

export default function Familias() {

    const [familias, setFamilias] = useRecoilState(familiasState);
    const [dialogAgregar, setDialogAgregar] = useState(false);
    const [data, setData] = useState(null);
    const [matriculados, setMatriculados] = useRecoilState(matriculadosState);
    const user = useRecoilValue(userState);
    const [loading, setLoading] = useState(false);

    async function borrarFam(id) {
        setLoading(true)
        await eliminarFamilia(user.data.congregacion.id, id)
        let nuevasFam = [...familias]
        let nuevosMtr = [...matriculados]

        const eliminando = nuevasFam.find(i=>i.id===id)
        await eliminando.miembros.forEach(async (miembro)=>{
            await eliminarMatriculado(user.data.congregacion.id, miembro.id)
            nuevosMtr.splice(nuevosMtr.findIndex(i=>i.id===miembro.id), 1)
        })

        nuevasFam.splice(nuevasFam.findIndex(i => i.id === id), 1)
        setFamilias(nuevasFam)
        setMatriculados(nuevosMtr)


        setLoading(false)
        //TODO: Falta agregar lo que hace cuando está en loading
    }

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

                        {fam.miembros.map(ind => <Typography key={ind.id}> • {ind.nombre} </Typography>)}
                        {fam.miembros.length === 0 && <Typography sx={{ color: '#888' }} ><b>No hay matriculados enlistados en esta familia.</b></Typography>}

                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} >

                            <Tooltip title='Editar familia' placement='top' arrow>
                                <IconButton
                                    onClick={() => {
                                        setData(fam)
                                        setDialogAgregar(true)
                                    }}
                                    sx={{ mr: 1, background: "#5b3c88", "&:hover": { background: "#6b4c88" } }}>
                                    <EditIcon sx={{ color: 'white' }} />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title='Eliminar familia con todos sus integrantes (¡Esta acción no se puede deshacer!)' placement='top' arrow>
                                <IconButton
                                    onClick={()=>borrarFam(fam.id)}
                                    sx={{ background: "#5b3c88", "&:hover": { background: "#6b4c88" } }}
                                >
                                    <DeleteIcon sx={{ color: 'white' }} />
                                </IconButton>
                            </Tooltip>

                        </Box>
                    </TarjetaColapsable>
                ))}
            </List>

            <DialogFamilias useOpen={[dialogAgregar, setDialogAgregar]} useData={[data, setData]} />
        </>
    )
}