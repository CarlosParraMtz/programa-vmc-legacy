//* Módulos
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil'

import matriculadosState from '../../Recoil/matriculadosState';

//* Material UI
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//* Funciones
import obtenerDiaDeHoy from '../../functions/obtenerDiaDeHoy';


export default function DialogAgregarAsignacionReciente({
    useOpen,
    ayudantes,
    useUltimasAsignaciones,
    useAyudantesAnteriores,
    editar = null }) {

    const emptyForm = {
        tipo: "",
        sala: "",
        fecha: obtenerDiaDeHoy(),
        acompañante: ""
    }
    const [open, setOpen] = useOpen;
    const [asignacion, setAsignacion] = useState(emptyForm)
    const [ultimasAsignaciones, setUltimasAsignaciones] = useUltimasAsignaciones;
    const [ayudantesAnteriores, setAyudantesAnteriores] = useAyudantesAnteriores;

    const matriculados = useRecoilValue(matriculadosState)



    //* Detecta edición
    useEffect(() => {
        if (editar != null) { setAsignacion(editar.data) }
    }, [open])




    //* Comportamiento de botones
    const cerrar = () => {
        setAsignacion(emptyForm);
        setOpen(false);
    }

    const guardar = () => {
        let ua = [...ultimasAsignaciones];
        if (editar != null) { ua.splice(editar.index, 1, asignacion) }
        else { ua.push(asignacion); }
        const uao = ua.sort((x, y) => y.fecha.localeCompare(x.fecha));
        setUltimasAsignaciones(uao)

        if (!(asignacion.tipo === "Discurso" || asignacion.tipo === "Lectura")) {
            const mtr = matriculados.find(m => m.id === asignacion.acompañante)
            setAyudantesAnteriores([...ayudantesAnteriores].concat(
                { id: mtr.id, nombre: mtr.nombre }
            ))
        }
        cerrar();
    }


    return (
        <Dialog open={open} onClose={cerrar} fullWidth maxWidth="xs" >
            <DialogTitle sx={{ background: "#5b3c88", color: "white", mb: 2 }} >
                <Typography>Agregar asignación</Typography>
            </DialogTitle>
            <DialogContent>

                <TextField
                    margin="dense"
                    id="name"
                    label="Fecha"
                    type="date"
                    size="small"
                    defaultValue={obtenerDiaDeHoy()}
                    fullWidth
                    onChange={e => setAsignacion({ ...asignacion, fecha: e.target.value })}
                    variant="outlined"
                />


                <Stack direction="row" spacing={1} alignItems="center" >
                    <FormControl fullWidth sx={{ mb: 1, mt: 1 }} size="small" >
                        <InputLabel>Tipo</InputLabel>
                        <Select
                            value={asignacion.tipo}
                            label="Tipo"
                            size="small"
                            onChange={e => setAsignacion({ ...asignacion, tipo: e.target.value })}
                        >
                            <MenuItem value={"Ayudante"}>Ayudante</MenuItem>
                            <MenuItem value={"Primera conversación"}>Primera conversación</MenuItem>
                            <MenuItem value={"Revisita"}>Revisita</MenuItem>
                            <MenuItem value={"Curso bíblico"}>Curso bíblico</MenuItem>
                            <MenuItem value={"Discurso"}>Discurso</MenuItem>
                            <MenuItem value={"Lectura"}>Lectura</MenuItem>
                        </Select>
                    </FormControl>


                    <FormControl fullWidth sx={{ mb: 1, mt: 1 }} size="small">
                        <InputLabel>Sala</InputLabel>
                        <Select
                            value={asignacion.sala}
                            label="Sala"
                            size="small"
                            onChange={e => {
                                setAsignacion({ ...asignacion, sala: e.target.value })
                            }}
                        >
                            <MenuItem value={"A"}>A</MenuItem>
                            <MenuItem value={"B"}>B</MenuItem>
                        </Select>
                    </FormControl>

                </Stack>

                {
                    asignacion.tipo != "" && !(asignacion.tipo === "Discurso" || asignacion.tipo === "Lectura") &&
                    <FormControl fullWidth sx={{ mb: 1, mt: 1 }} size="small" >
                        <InputLabel>{asignacion.tipo == "Ayudante" ? "Ayudante de:" : "Ayudante:"}</InputLabel>
                        <Select
                            value={asignacion.acompañante}
                            label={asignacion.tipo == "Ayudante" ? "Ayudante de:" : "Ayudante:"}
                            size="small"
                            onChange={e => setAsignacion({ ...asignacion, acompañante: e.target.value })}
                        >
                            {
                                ayudantes.map(ayudante => (
                                    <MenuItem
                                        key={ayudante.id}
                                        value={ayudante.id}
                                        dense
                                    >
                                        {ayudante.nombre}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                }


            </DialogContent>
            <DialogActions>
                <Tooltip title="Regresar" placement='top' arrow >
                    <IconButton onClick={cerrar}>
                        <ArrowBackIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Guardar" placement='top' arrow >
                    <IconButton onClick={guardar} sx={{
                        background: "#5b3c88",
                        "&:hover": { background: "#6b4c88" }
                    }} >
                        <CheckIcon sx={{ color: "white" }} />
                    </IconButton>
                </Tooltip>
            </DialogActions>
        </Dialog>
    )
}
