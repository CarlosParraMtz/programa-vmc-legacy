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

export default function Controles({ useEditando }) {

    const [editando, setEditando] = useEditando

    const btnStyle = { borderRadius: '0px' }
    const estiloBtn = { background: "#5b3c88", "&:hover": { background: "#6b4c88" } }


    return (
        <Box sx={{ background: '#ddd', display: 'flex', mb: 1 }} >
            {
                !editando
                    ? (
                        <>
                            <Tooltip title='Mes anterior' >
                                <span>
                                    <IconButton sx={btnStyle} size='large' >
                                        <ArrowBackIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>

                            <Tooltip title='Mes siguiente' >
                                <span>
                                    <IconButton sx={btnStyle} size='large' >
                                        <ArrowForwardIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>

                            <Tooltip title='Agregar mes' >
                                <span>
                                    <IconButton sx={btnStyle} size='large'>
                                        <AddIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>

                            <Tooltip title='Editar datos del mes' >
                                <span>
                                    <IconButton sx={btnStyle} size='large' onClick={() => setEditando(true)} >
                                        <EditIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>

                            <Tooltip title='Borrar mes' >
                                <span>
                                    <IconButton sx={btnStyle} size='large' >
                                        <DeleteIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>

                            <Tooltip title='Generar asignaciones' >
                                <span>
                                    <IconButton sx={{ ...estiloBtn, position: 'relative', top: 10, ml: 1, color: 'white' }}>
                                        <NoteIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            <Tooltip title='Guardar' >
                                <span>
                                    <IconButton sx={btnStyle} size='large' onClick={() => setEditando(false)} >
                                        <SaveIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                            <Tooltip title='Cancelar' >
                                <span>
                                    <IconButton sx={btnStyle} size='large' onClick={() => setEditando(false)} >
                                        <CancelIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </>
                    )
            }




        </Box>
    )
}
