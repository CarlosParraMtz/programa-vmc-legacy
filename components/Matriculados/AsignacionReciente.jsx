//* Módulos
import { useState } from 'react';

//* MUI
import {
    Box,
    ListItem,
    Stack,
    Typography,
    IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';

//* Componentes
import DialogAgregarAsignacionReciente from './DialogAgregarAsignacionReciente';

//* Funciones
import obtenerTextoFecha from '../../functions/obtenerTextoFecha';

export default function AsignacionReciente({ asignacion, i, ayudantesDialog, useUltimasAsignaciones, buscarAcompañante }) {

    const [open, setOpen] = useState(false)
    const [ultimasAsignaciones, setUltimasAsignaciones] = useUltimasAsignaciones

    return (
        <ListItem key={i} divider >
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }} >
                <Box sx={{ display: "flex", flexDirection: "column", p: 1 }} >
                    <Typography variant="body1" >
                        <b>{asignacion.tipo} </b>
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1} >
                        <Stack>
                            <Typography>
                                <b>Fecha:</b>
                            </Typography>
                            <Typography>
                                {obtenerTextoFecha(asignacion.fecha)}
                            </Typography>
                        </Stack>
                        <Typography>
                            <b>Sala:</b> {asignacion.sala}
                        </Typography>
                        {!(asignacion.tipo === "Discurso" || asignacion.tipo === "Lectura") &&
                            <Typography>
                                <b>{asignacion.tipo == "Ayudante" ? "Ayudante de: " : "Ayudante: "} </b> {buscarAcompañante(asignacion.acompañante)}
                            </Typography>
                        }
                    </Stack>
                </Box>
                <Box sx={{ ml: "auto" }}>
                    <IconButton onClick={() => setOpen(true)} >
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => {
                        let a = [...ultimasAsignaciones]
                        a.splice(i, 1)
                        setUltimasAsignaciones(a)
                    }} >
                        <Delete />
                    </IconButton>
                </Box>
            </Box>

            <DialogAgregarAsignacionReciente
                useOpen={[open, setOpen]}
                ayudantes={ayudantesDialog}
                useUltimasAsignaciones={useUltimasAsignaciones}
                editar={{ data: asignacion, index: i }}
            />
        </ListItem>
    )
}
