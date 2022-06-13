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


    const Elemento = ({ data }) => {
        const [open, setOpen] = useState(false)
        return (
            <>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => setOpen(!open)}>
                        <ListItemText primary={<b>{data.nombre}</b>} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>

                <Collapse in={open} sx={{
                    py: (open ? 2 : 0), px: 2, background: '#fafafa', transition: '500ms ',
                    boxShadow: (open ? 'inset 0px 0px 0px #aaa' : 'inset 0px 3px 10px #444')
                }} >

                    <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left" }}>
                        <b>Familia:</b> {data.familia}
                    </Typography>

                    <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left", mt: 1.5 }}>
                        <b>Ultima asignación:</b>
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left" }}>
                        {data.tipoDeUltimaAsignacion}, el {data.ultimaAsignacion}, en la sala {data.ultimaSala}
                    </Typography>

                    <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left", mt: 1.5 }}>
                        <b>Se puede asignar a:</b>
                    </Typography>

                    {data.arrayPosiblesAsignaciones.map((asignacion, index) => <Typography key={index}> {asignacion} </Typography>)}

                    <Box sx={{ display: 'flex', justifyContent: 'center' }} >
                        <Tooltip title='Eliminar matriculado' placement='top' arrow>
                            <IconButton size='small' sx={{ background: "#5b3c88", "&:hover": { background: "#6b4c88" } }}>
                                <DeleteIcon sx={{ color: 'white' }} fontSize='small' />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Collapse>
            </>
        )
    }






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
                {matriculados.map((matriculado) => <Elemento data={matriculado} key={matriculado.id} />)}
            </List>

            <DialogAgregarUno useOpen={[open, setOpen]} editando={editando} data={datosDialog} />
        </>
    )
}