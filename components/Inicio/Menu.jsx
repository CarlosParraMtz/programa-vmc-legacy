import Link from 'next/link'
import { Box, Button, Typography } from '@mui/material';


function BotonLink({ url, texto, iconClass }) {
    return (
        <Link href={url} >

            <Button variant="outlined" sx={{
                width: 250,
                height: 100,
                color: "white",
                borderColor: "white",
                m: 1,
                "&:hover": {
                    borderColor: "black",
                    color: "black",
                    background: "white"
                }
            }}>


                <Typography sx={{ mr: 1, fontSize: "30px" }}>
                    <i className={iconClass} />
                </Typography>

                <Typography>
                    <b>{texto}</b>
                </Typography>
            </Button>

        </Link>
    )
}


export default function Menu() {
    return (
        <Box sx={{ display: "flex", mt: 3 }}>

            <BotonLink
                url="/matriculados"
                texto="Ver matriculados"
                iconClass="fi fi-rr-graduation-cap"
            />

            <BotonLink
                url="/asignaciones"
                texto="Ver asignaciones"
                iconClass="fi fi-rr-book-alt"
            />

        </Box>
    )
}