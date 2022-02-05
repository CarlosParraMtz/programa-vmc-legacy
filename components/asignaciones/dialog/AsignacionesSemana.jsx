import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material'


function Selection({ label, value, onChange }) {
    return (
        <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={label}
                onChange={onChange}
            >
                <MenuItem value={""}>Seleccionar</MenuItem>
                <MenuItem value={"Lectura"}>Lectura</MenuItem>
                <MenuItem value={"Primera conversación"}>Primera conversación</MenuItem>
                <MenuItem value={"Revisita"}>Revisita</MenuItem>
                <MenuItem value={"Curso bíblico"}>Curso bíblico</MenuItem>
                <MenuItem value={"Discurso"}>Discurso</MenuItem>
            </Select>
        </FormControl>
    )
}


export default function AsignacionesSemana({ semana, setSemana, titulo }) {
    return (
        <Box>
            <Typography sx={{ mb: 1 }} ><b>{titulo}</b></Typography>



            <TextField
                margin="dense"
                id="name"
                label="Fecha de esta reunión"
                type="date"
                value={semana.fecha}
                fullWidth
                onChange={e => setSemana({ ...semana, fecha: e.target.value })}
                variant="outlined"
            />
            


            <Selection
                label="Asignación 1"
                value={semana.asignacion1}
                onChange={e => setSemana({ ...semana, asignacion1: e.target.value })}
            />

            {
                semana.asignacion1 != "" &&
                <Selection
                    label="Asignación 2"
                    value={semana.asignacion2}
                    onChange={e => setSemana({ ...semana, asignacion2: e.target.value })}
                />
            }
            {
                semana.asignacion2 != "" &&
                <Selection
                    label="Asignación 3"
                    value={semana.asignacion3}
                    onChange={e => setSemana({ ...semana, asignacion3: e.target.value })}
                />
            }
            {
                semana.asignacion3 != "" &&
                <Selection
                    label="Asignación 4"
                    value={semana.asignacion4}
                    onChange={e => setSemana({ ...semana, asignacion4: e.target.value })}
                />
            }
            {
                semana.asignacion4 != "" &&
                <Selection
                    label="Asignación 5"
                    value={semana.asignacion5}
                    onChange={e => setSemana({ ...semana, asignacion5: e.target.value })}
                />
            }


        </Box>
    )
}