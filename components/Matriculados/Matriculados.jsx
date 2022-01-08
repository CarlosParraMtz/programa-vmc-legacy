import { useState } from 'react'
import {
    Button,
    Card,
    CardHeader,
    CardContent,
    Divider,
    Paper,
    TextField,
    Typography,
    Grid,
} from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';



export default function Matriculados() {

    const [open, setOpen] = useState(false);

    const [familia, setFamilia] = useState('');
    const [tipoDeUltimaAsignacion, setTipoDeUltimaAsignacion] = useState('A')
    const [ultimaSala, setUltimaSala] = useState("A")
    const [genero, setGenero] = useState("hombre")
    const [timeStampUltimaAsignacion, setTimeStampUltimaAsignacion] = useState("")

    const handleChange = (event) => {
        setFamilia(event.target.value);
    };

    const cambiarTipo = (event) => {
        setTipoDeUltimaAsignacion(event.target.value);
    };

    const cambiarUltimaSala = (event) => {
        setUltimaSala(event.target.value);
    };

    const cambiarGenero = (event) => {
        setGenero(event.target.value);
    };

    const cambiarFechaUltimaAsignacion = e => {
        const date = new Date(e.target.value)
        setTimeStampUltimaAsignacion(date.valueOf())
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e) => {
        e.preventDefault()
        setOpen(false);
    };



    //* Para seleccionar las posibles asignaciones

    const [checked, setChecked] = useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
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
                    <DialogContent sx={{ maxHeight: "500px", overflow: "auto" }}>
                        <DialogContentText>
                            Agrega todos los datos para evitar errores en la generación automática de asignaciones.
                        </DialogContentText>

                        <Divider sx={{ mt: 1, mb: 1 }}> Datos básicos </Divider>


                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nombre"
                            type="text"
                            fullWidth
                            variant="outlined"
                            xs={{ mt: 1, mb: 1 }}
                        />

                        <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                            <InputLabel id="demo-simple-select-label">Género</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={genero}
                                label="Género"
                                onChange={cambiarGenero}
                            >

                                <MenuItem value={"hombre"}>Hombre</MenuItem>
                                <MenuItem value={"mujer"}>Mujer</MenuItem>

                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                            <InputLabel id="demo-simple-select-label">Familia</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={familia}
                                label="Familia"
                                onChange={handleChange}
                            >

                                <MenuItem value={"nuevaFamilia"}>Agregar familia...</MenuItem>
                            </Select>
                        </FormControl>

                        {
                            familia === "nuevaFamilia" &&
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Nueva familia"
                                type="text"
                                fullWidth
                                variant="outlined"
                                sx={{ mb: 1 }}
                            />
                        }



                        <Divider sx={{ mt: 2, mb: 1 }}> Última asignación </Divider>


                        <TextField
                            margin="dense"
                            id="name"
                            label="Fecha de última asignación"
                            type="date"
                            defaultValue="2021-01-01"
                            fullWidth
                            onChange={cambiarFechaUltimaAsignacion}
                            variant="outlined"
                        />

                        <Grid container spacing={1} sx={{ width: "100%" }}>
                            <Grid item sm={4} xs={12}>
                                <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                                    <InputLabel id="demo-simple-select-label">Sala de última asignación</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={ultimaSala}
                                        label="Sala de última asignación"
                                        onChange={cambiarUltimaSala}
                                    >

                                        <MenuItem value={"A"}>A</MenuItem>
                                        <MenuItem value={"B"}>B</MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sm={8} xs={12}>
                                <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                                    <InputLabel id="demo-simple-select-label">Tipo de última asignación</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={tipoDeUltimaAsignacion}
                                        label="Tipo de última asignación"
                                        onChange={cambiarTipo}
                                    >

                                        <MenuItem value={"A"}>Ayudante</MenuItem>
                                        <MenuItem value={"PC"}>Primera conversación</MenuItem>
                                        <MenuItem value={"R"}>Revisita</MenuItem>
                                        <MenuItem value={"CB"}>Curso bíblico</MenuItem>
                                        <MenuItem value={"D"}>Discurso</MenuItem>
                                        <MenuItem value={"L"}>Lectura</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>



                        <Divider sx={{ mt: 2, mb: 1 }}> Futuras asignaciones </Divider>

                        <Typography variant="subtitle2" sx={{ color: "#777", fontSize: "12px" }}>Tipo de asignaciones que puede tener:</Typography>
                        <List sx={{ width: '100%',m:"0 auto", maxWidth: 360, bgcolor: 'background.paper' }}>

                            {["Ayudante", "Primera conversación", "Revisita", "Curso bíblico", "Discurso", "Lectura"].map((value, index) => {
                                const labelId = `checkbox-list-label-${value}`;

                                return (
                                    <ListItem
                                        key={index}
                                        disablePadding
                                    >
                                        <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(value) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId} primary={value} />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>



                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} type="submit" >Guardar</Button>
                        <Button onClick={handleClose}>Subscribe</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}