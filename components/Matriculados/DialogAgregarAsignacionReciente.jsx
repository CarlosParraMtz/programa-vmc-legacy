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

    const [error, setError] = useState("")

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
        if ((!(asignacion.tipo === "Discurso" || asignacion.tipo === "Lectura")
            && asignacion.acompañante === ""
        ) || asignacion.fecha === ""
            || asignacion.sala === ""
            || asignacion.tipo === "") {
            setError(true)
            return
        }

        let ua = [...ultimasAsignaciones];
        if (editar != null) { ua.splice(editar.index, 1, asignacion) }
        else { ua.push(asignacion); }
        const uao = ua.sort((x, y) => y.fecha.localeCompare(x.fecha));
        setUltimasAsignaciones(uao)

        
        setError(false);
        cerrar();
    }


    return (
        <Dialog open={open} onClose={cerrar} fullWidth maxWidth="xs" >
            <DialogTitle sx={{ background: "#5b3c88", color: "white", mb: 2 }} >
                <Typography>Agregar asignación</Typography>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={guardar} >

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

                        required
                        error={error && asignacion.fecha == ""}
                        helperText={error && asignacion.fecha == "" && "Fecha incorrecta"}
                    />


                    <Stack direction="row" spacing={1} alignItems="center" >
                        <FormControl
                            fullWidth
                            sx={{ mb: 1, mt: 1 }}
                            size="small"
                            required
                            error={error && asignacion.tipo === ""}
                            helperText={error && asignacion.tipo === "" && "Se debe escoger un tipo de asignación"}
                        >
                            <InputLabel>Tipo</InputLabel>
                            <Select
                                value={asignacion.tipo}
                                label="Tipo"
                                size="small"
                                onChange={e => setAsignacion({ ...asignacion, tipo: e.target.value })}

                                helperText={error && asignacion.tipo === "" && "Se debe escoger un tipo de asignación"}

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

                                required
                                error={error && asignacion.sala === ""}
                                helperText={asignacion.sala === "" && "Se debe escoger una sala"}
                            >
                                <MenuItem value={"A"}>A</MenuItem>
                                <MenuItem value={"B"}>B</MenuItem>
                            </Select>
                        </FormControl>

                    </Stack>

                    {
                        asignacion.tipo != "" && !(asignacion.tipo === "Discurso" || asignacion.tipo === "Lectura") &&
                        <FormControl
                            fullWidth
                            sx={{ mb: 1, mt: 1 }}
                            size="small"

                            required
                            error={error && asignacion.acompañante === ""}
                            helperText={error && asignacion.acompañante === "" && "Se debe elegir un acompañante"}
                        >
                            <InputLabel>{asignacion.tipo == "Ayudante" ? "Ayudante de:" : "Ayudante:"}</InputLabel>
                            <Select
                                value={asignacion.acompañante}
                                label={asignacion.tipo == "Ayudante" ? "Ayudante de:" : "Ayudante:"}
                                size="small"
                                required
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

                </form>
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
