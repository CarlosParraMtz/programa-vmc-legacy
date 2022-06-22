import { useState } from 'react'
import {
    Box,
    Collapse,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

export default function TarjetaColapsable({ children, titulo }) {
    const [open, setOpen] = useState(false)
    return (
        <>
            <ListItem disablePadding dense>
                <ListItemButton onClick={() => setOpen(!open)}>
                    <ListItemText primary={<b>{titulo}</b>} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </ListItem>

            <Collapse in={open} sx={{
                px: 2, background: '#fafafa', transition: '500ms ',
                boxShadow: (open ? 'inset 0px 0px 0px #aaa' : 'inset 0px 3px 10px #444')
            }} >
                <Box sx={{ width: '100%', height: '100%', pb: (open ? 2 : 0), pt:2 }} >
                    {children}
                </Box>
            </Collapse>
        </>
    )
}
