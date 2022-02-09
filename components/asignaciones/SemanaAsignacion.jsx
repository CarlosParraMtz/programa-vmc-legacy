import {
    Box,
} from '@mui/material';

export default function SemanaAsignacion({asignacion}) {
    return (
        <Box sx={{ background: "#ddd", width: "fit-content", p: 1, m: 1, borderRadius: "10px" }} >
            {asignacion}
        </Box>
    )
}