import { useState } from 'react'
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    TextField,
    Tooltip,
    Typography
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'


export default function DialogFamilias({ useOpen, data }) {


    const [open, setOpen] = useOpen;
    const [apellidos, setApellidos] = useState('')
    const [miembros, setMiembros] = useState([{ id: 1, nombre: 'carlos' }])


    return (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth='sm' fullWidth >
            <DialogTitle sx={{ background: '#5b3c88', display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ color: 'white' }} >Agregar familia:</Typography>
                <IconButton size='small' sx={{ ml: 'auto' }} >
                    <CloseIcon sx={{ color: 'white' }} fontSize='small' />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }} >
                <Stack spacing={1} sx={{ p: 1 }} >
                    <TextField
                        size='small'
                        label='Apellidos'
                        value={apellidos}
                        onChange={e => setApellidos(e.target.value)}
                        fullWidth
                    />
                    <Typography><b>Miembros:</b></Typography>
                    <List sx={{display:'flex', flexDirection:'column', alignItems:'center'}} >
                        {miembros.map(miembro => (
                            <ListItem
                                key={miembro.id}
                                divider
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        sx={{ background: "#5b3c88", "&:hover": { background: "#6b4c88" } }}
                                    >
                                        <DeleteIcon sx={{ color: 'white' }} />
                                    </IconButton>
                                }
                            >
                                <ListItemText primary={<b>{miembro.nombre}</b>} />
                            </ListItem>
                        ))}
                        <Chip label={<AddIcon fontSize='small' />} sx={{mt:1}} variant='outlined' />
                    </List>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}
