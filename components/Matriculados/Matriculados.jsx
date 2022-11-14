//* Módulos
import { useState, useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil';

//* Material UI
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import WarningIcon from '@mui/icons-material/Warning';

//* Componentes
import DialogAgregarUno from './DialogMatriculado';
import TarjetaColapsable from './TarjetaColapsable';

//* Recoil atoms
import matriculadosState from '../../Recoil/matriculadosState';
import familiasState from '../../Recoil/familiasState';
import userState from '../../Recoil/userState';

//* Funciones
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
        return date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }




    function noPuedePasarAsignaciones(m) {
        return (
            !m.posiblesAsignaciones['Lectura'] &&
            !m.posiblesAsignaciones['Ayudante'] &&
            !m.posiblesAsignaciones['Primera conversación'] &&
            !m.posiblesAsignaciones['Revisita'] &&
            !m.posiblesAsignaciones['Curso bíblico'] &&
            !m.posiblesAsignaciones['Discurso']
        );
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
            <List sx={{ width: "100%", maxHeight: "calc(100vh - 304px)", overflow: "auto" }} disablePadding>


                {
                    matriculados.map((matriculado) => <TarjetaColapsable
                        key={matriculado.id}
                        titulo={
                            <span
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                {noPuedePasarAsignaciones(matriculado) && <WarningIcon sx={{ mr: 1, color: 'red' }} fontSize='small' />}
                                {matriculado.nombre}
                            </span>
                        }
                        advertencia={noPuedePasarAsignaciones(matriculado)}
                    >
                        {matriculado.familia.id != '' &&
                            <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left" }}>
                                <b>Familia:</b> {matriculado.familia.apellidos}
                            </Typography>
                        }

                        {
                            matriculado.asignacionesAnteriores.length > 0 &&
                            <>
                                <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left", mt: 1.5 }}>
                                    <b>Ultima asignación:</b>
                                </Typography>
                                <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left" }}>
                                    {matriculado.asignacionesAnteriores[0].tipo},
                                    el {formatoFecha(matriculado.asignacionesAnteriores[0].fecha)},
                                    en la sala {matriculado.asignacionesAnteriores[0].sala}
                                </Typography>
                            </>
                        }

                        {noPuedePasarAsignaciones(matriculado)
                            ? <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left", mt: 1.5, color: 'red' }}>
                                <b>No puede pasar asignaciones</b>
                            </Typography>
                            : <>
                                <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left", mt: 1.5 }}>
                                    <b>Se puede asignar a:</b>
                                </Typography>

                                {matriculado.posiblesAsignaciones['Lectura'] && <Typography> • Lectura </Typography>}
                                {matriculado.posiblesAsignaciones['Ayudante'] && <Typography> • Ayudante </Typography>}
                                {matriculado.posiblesAsignaciones['Primera conversación'] && <Typography> • Primera conversación </Typography>}
                                {matriculado.posiblesAsignaciones['Revisita'] && <Typography> • Revisita </Typography>}
                                {matriculado.posiblesAsignaciones['Curso bíblico'] && <Typography> • Curso bíblico </Typography>}
                                {matriculado.posiblesAsignaciones['Discurso'] && <Typography> • Discurso </Typography>}
                            </>
                        }
                        {
                            matriculado.observaciones != '' &&
                            <>
                                <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left", mt: 1.5 }}>
                                    <b>Observaciones:</b>
                                </Typography>
                                <Typography variant="subtitle2" sx={{ fontSize: "1em", textAlign: "left" }} component='p' >
                                    {matriculado.observaciones}
                                </Typography>
                            </>
                        }

                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} >

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