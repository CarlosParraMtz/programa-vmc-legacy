import {
    Dialog,
    DialogTitle,
} from '@mui/material';

export default function DialogTema({ open, onClose, titulo, children }) {

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle sx={{ background: '#5b3c88', color: 'white' }} >
                {titulo}
            </DialogTitle>
            {children}
        </Dialog>
    )
}
