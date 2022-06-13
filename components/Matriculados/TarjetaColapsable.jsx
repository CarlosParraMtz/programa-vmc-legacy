import {useState} from 'react'
import {
    Collapse,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

export default function TarjetaColapsable({children, titulo}) {
    const [open, setOpen] = useState(false)
    return (
        <>
            <ListItem disablePadding>
                <ListItemButton onClick={() => setOpen(!open)}>
                    <ListItemText primary={<b>{titulo}</b>} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </ListItem>

            <Collapse in={open} sx={{
                py: (open ? 2 : 0), px: 2, background: '#fafafa', transition: '500ms ',
                boxShadow: (open ? 'inset 0px 0px 0px #aaa' : 'inset 0px 3px 10px #444')
            }} >
               {children}
            </Collapse>
        </>
    )
}
