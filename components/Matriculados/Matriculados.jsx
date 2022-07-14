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
import { useRecoilValue, useRecoilState } from 'recoil';
import matriculadosState from '../../Recoil/matriculadosState';
import familiasState from '../../Recoil/familiasState';
import userState from '../../Recoil/userState';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import TarjetaColapsable from './TarjetaColapsable';
import eliminarMatriculado from '../../firebase/eliminarMatriculado';
import actualizarFamilia from '../../firebase/actualizarFamilia';



export default function Matriculados() {

    const [open, setOpen] = useState(false);
    const [matriculados, setMatriculados] = useRecoilState(matriculadosState)
    const [familias, setFamilias] = useRecoilState(familiasState)
    const [loading, setLoading] = useState(false)

    const [datosDialog, setDatosDialog] = useState(null)

    const user = useRecoilValue(userState)

    async function borrarMtr(id) {
        setLoading(true)
        await eliminarMatriculado(user.data.congregacion.id, id)
        let nuevosMtr = [...matriculados]
        const borrado = nuevosMtr.find(i => i.id === id)
        nuevosMtr.splice(nuevosMtr.findIndex(i => i.id === id), 1)
        setMatriculados(nuevosMtr)

        if (borrado.familia.id != '') {
            let nuevasFamilias = [...familias]
            const fb = nuevasFamilias.find(fam => fam.id === borrado.familia.id)
            let familiaDelBorrado = [...fb.miembros]
            familiaDelBorrado.splice(familiaDelBorrado.findIndex(m => m.id === borrado.id), 1)
            let nuevaFamDelBorrado = { ...fb, miembros: familiaDelBorrado }
            nuevasFamilias.splice(
                nuevasFamilias.findIndex(f => f.id === nuevaFamDelBorrado.id), 1, nuevaFamDelBorrado
            )
            setFamilias(nuevasFamilias)
            await actualizarFamilia(user.data.congregacion.id, nuevaFamDelBorrado, nuevaFamDelBorrado.id)
        }
        setLoading(false)
        //TODO: Falta agregar lo que hace cuando está en loading
    }



    //* Esto convierte la fecha en un texto fácil de leer
    const formatoFecha = (fecha) => {
        let date = new Date(fecha)
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
        const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]
        const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
        return `${dias[date.getDay()]} ${date.getDate()} de ${meses[date.getMonth()]} de ${date.getFullYear()}`
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
            <List sx={{ width: "100%", maxHeight: "100%", overflow: "auto" }} disablePadding>


                {
                    matriculados.map((matriculado) => <TarjetaColapsable key={matriculado.id} titulo={matriculado.nombre} >
                        {matriculado.familia.id != '' &&
                            <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left" }}>
                                <b>Familia:</b> {matriculado.familia.apellidos}
                            </Typography>
                        }

                        <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left", mt: 1.5 }}>
                            <b>Ultima asignación:</b>
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left" }}>
                            {matriculado.ultimaAsignacion.tipo}, el {formatoFecha(matriculado.ultimaAsignacion.fecha)}, en la sala {matriculado.ultimaAsignacion.sala}
                        </Typography>

                        <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left", mt: 1.5 }}>
                            <b>Se puede asignar a:</b>
                        </Typography>

                        {matriculado.posiblesAsignaciones['Lectura'] && <Typography> • Lectura </Typography>}
                        {matriculado.posiblesAsignaciones['Ayudante'] && <Typography> • Ayudante </Typography>}
                        {matriculado.posiblesAsignaciones['Primera conversación'] && <Typography> • Primera conversación </Typography>}
                        {matriculado.posiblesAsignaciones['Revisita'] && <Typography> • Revisita </Typography>}
                        {matriculado.posiblesAsignaciones['Curso bíblico'] && <Typography> • Curso bíblico </Typography>}
                        {matriculado.posiblesAsignaciones['Discurso'] && <Typography> • Discurso </Typography>}

                        <Box sx={{ display: 'flex', justifyContent: 'center' }} >

                            <Tooltip title='Editar matriculado' placement='top' arrow>
                                <IconButton
                                    onClick={() => {
                                        setDatosDialog(matriculado);
                                        setOpen(true)
                                    }}
                                    sx={{ mr: 1, background: "#5b3c88", "&:hover": { background: "#6b4c88" } }}
                                >
                                    <EditIcon sx={{ color: 'white' }} />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title='Eliminar matriculado' placement='top' arrow>
                                <IconButton
                                    onClick={() => borrarMtr(matriculado.id)}
                                    sx={{ background: "#5b3c88", "&:hover": { background: "#6b4c88" } }}
                                >
                                    <DeleteIcon sx={{ color: 'white' }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </TarjetaColapsable>)
                }

                <DialogAgregarUno useOpen={[open, setOpen]} useData={[datosDialog, setDatosDialog]} />

            </List>

        </>
    )
}