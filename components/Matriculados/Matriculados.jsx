import { useState } from 'react'
import {
    Button,
    Card,
    CardHeader,
    CardContent,
    Paper,
    TextField,
    Typography,
} from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



export default function Matriculados() {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Paper
                sx={{
                    width: "100%",
                    maxWidth: "1120px",
                    m: "10px auto",
                    p: 1,
                    minHeight: "900px",
                    background: "#e7e7e5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap"
                }}
                elevation={20}>

                <Card sx={{ maxWidth: "250px" }}>
                    <CardContent>
                        <Typography sx={{ textAlign: "center" }}>
                            <b>No hay datos.</b>
                        </Typography>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleClickOpen}
                            sx={{
                                background: "#5b3c88",
                                "&:hover": {
                                    background: "#6b4c88"
                                }
                            }}>
                            Agregar información</Button>
                    </CardContent>
                </Card>
            </Paper>




            {
                // * Dialog para agregar a un matriculado            
            }

            <Dialog open={open} onClose={handleClose}>
                <form>
                    <DialogTitle>Agrega un matriculado</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Agrega todos los datos para evitar errores en la generación automática de asignaciones.
                        </DialogContentText>
                        <TextField
                            autoFocus

                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} type="submit" >Cancel</Button>
                        <Button onClick={handleClose}>Subscribe</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}