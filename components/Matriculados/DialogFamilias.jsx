import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from '@mui/material'

export default function DialogFamilias() {
    return (
        <Dialog>
            <DialogTitle sx={{ background: '#5b3c88' }}>
                <Typography sx={{ color: 'white' }} >Agregar familia:</Typography>
            </DialogTitle>
            <DialogContent>
                <TextField />
            </DialogContent>
        </Dialog>
    )
}
