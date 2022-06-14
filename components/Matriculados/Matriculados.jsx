import { useState, useEffect } from 'react'
import {
    Box,
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemButton,
    ListItemText,
    Tooltip,
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DialogAgregarUno from './DialogMatriculado';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';    
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useRecoilState } from 'recoil';
import matriculadosState from '../../Recoil/matriculadosState';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import TarjetaColapsable from './TarjetaColapsable';



export default function Matriculados() {

    const [open, setOpen] = useState(false);
    const [matriculados, setMatriculados] = useRecoilState(matriculadosState)
    const [cargando, setCargando] = useState(false)

    const [editando, setEditando] = useState()
    const [datosDialog, setDatosDialog] = useState(null)

    const [posiblesAsignaciones, setPosiblesAsignaciones] = useState({
        "Ayudante": false,
        "Primera conversación": false,
        "Revisita": false,
        "Curso bíblico": false,
        "Discurso": false,
        "Lectura": false
    })


    return (
        <>
            <List disablePadding >
                <ListItemButton onClick={() => setOpen(true)} >
                    <ListItemIcon sx={{ pl: 2 }} >
                        <AddReactionIcon />
                    </ListItemIcon>
                    <ListItemText primary='Agregar uno' />
                </ListItemButton>
            </List>
            <List sx={{ width: "100%", maxHeight: "390px", overflow: "auto" }} disablePadding>


                {
                    matriculados.map((matriculado) => <TarjetaColapsable key={matriculado.id} titulo={matriculado.nombre} >
                        <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left" }}>
                            <b>Familia:</b> {matriculado.familia}
                        </Typography>

                        <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left", mt: 1.5 }}>
                            <b>Ultima asignación:</b>
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left" }}>
                            {matriculado.tipoDeUltimaAsignacion}, el {matriculado.ultimaAsignacion}, en la sala {matriculado.ultimaSala}
                        </Typography>

                        <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left", mt: 1.5 }}>
                            <b>Se puede asignar a:</b>
                        </Typography>

                        {matriculado.arrayPosiblesAsignaciones.map((asignacion, index) => <Typography key={index}> • {asignacion} </Typography>)}

                        <Box sx={{ display: 'flex', justifyContent: 'center' }} >

                            <Tooltip title='Editar familia' placement='top' arrow>
                                <IconButton size='small' sx={{ mr: 1, background: "#5b3c88", "&:hover": { background: "#6b4c88" } }}>
                                    <EditIcon sx={{ color: 'white' }} fontSize='small' />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title='Eliminar matriculado' placement='top' arrow>
                                <IconButton size='small' sx={{ background: "#5b3c88", "&:hover": { background: "#6b4c88" } }}>
                                    <DeleteIcon sx={{ color: 'white' }} fontSize='small' />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </TarjetaColapsable>
                    )
                }
            </List>

            <DialogAgregarUno useOpen={[open, setOpen]} editando={editando} data={datosDialog} />
        </>
    )
}