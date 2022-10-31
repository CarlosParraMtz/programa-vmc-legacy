import React from 'react'
import {
    Box,
    IconButton,
    Tooltip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import NoteIcon from '@mui/icons-material/Note';
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export default function Controles({ dataId, useEditando, funciones }) {

    const [editando, setEditando] = useEditando
    const [agregarPeriodo, activarEdicion, borrarPeriodo, guardar, cancelarEdicion, generarAsignaciones, verListaDePeriodos] = funciones;

    const btnStyle = { borderRadius: '0px' }
    const estiloBtn = { background: "#5b3c88", "&:hover": { background: "#6b4c88" } }


    return (
        <Box sx={{ background: '#ddd', display: 'flex', mb: 0, position: "sticky", top:0, zIndex:3 }} >
            {
                !editando
                    ? (
                        <>

                            <Tooltip title='Agregar periodo' >
                                <span>
                                    <IconButton sx={btnStyle} size='large' onClick={agregarPeriodo} disabled={dataId === ''}>
                                        <AddIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>

                            <Tooltip title='Editar datos del mes' >
                                <span>
                                    <IconButton sx={btnStyle} size='large' onClick={activarEdicion} >
                                        <EditIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>

                            <Tooltip title='Borrar periodo' >
                                <span>
                                    <IconButton sx={btnStyle} size='large' onClick={borrarPeriodo} disabled={dataId === ''} >
                                        <DeleteIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>

                            <Tooltip title='Ver lista de periodos' >
                                <span>
                                    <IconButton sx={btnStyle} size='large' onClick={verListaDePeriodos} >
                                        <FormatListBulletedIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>

                        </>
                    ) : (
                        <>
                            <Tooltip title='Guardar' >
                                <span>
                                    <IconButton sx={btnStyle} size='large' onClick={guardar} >
                                        <SaveIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                            <Tooltip title='Cancelar' >
                                <span>
                                    <IconButton sx={btnStyle} size='large' onClick={cancelarEdicion} >
                                        <CancelIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>

                            <Tooltip title='Generar asignaciones' >
                                <span>
                                    <IconButton
                                        onClick={generarAsignaciones}
                                        sx={{ ...estiloBtn, ...btnStyle }}
                                        size='large'
                                    >
                                        <NoteIcon sx={{ color: 'white' }} />
                                    </IconButton>
                                </span>
                            </Tooltip>

                        </>
                    )
            }




        </Box>
    )
}
