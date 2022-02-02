import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import layoutState from '../../Recoil/layoutState';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function AgregarAsignacionesDialog() {

    const [layout, setLayout] = useRecoilState(layoutState);
    const [semanas, setSemanas] = useState(0);





    return (
        <Dialog
            open={layout.agregarAsignacionesDialog}
            onClose={() => setLayout({ ...layout, AgregarAsignacionesDialog: false })}>
            <DialogContent>
                <DialogContentText>
                    {"Agrega las asignaciones para este mes."}
                </DialogContentText>

                <Box sx={{display:"flex"}} >
                    <IconButton>
                        <ArrowDropDownIcon />
                    </IconButton>

                    <Typography variant="h4">1</Typography>

                    <IconButton>
                        <ArrowDropUpIcon />
                    </IconButton>
                </Box>

            </DialogContent>

            <DialogActions>
            </DialogActions>
        </Dialog>
    )
}
