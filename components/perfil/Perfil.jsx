import { useState } from 'react';
import {
    Button,
    Divider,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useRecoilState } from 'recoil';
import userState from '../../Recoil/userState';
import crearPerfil from '../../firebase/crearPerfil';
import { useRouter } from 'next/router';

export default function Perfil({ data = null }) {

    const [user, setUser] = useRecoilState(userState)
    const [congregacion, setCongregacion] = useState({
        nombre: '',
        ciudad: '',
        estado: '',
        pais: ''
    })
    const [asignaciones, setAsignaciones] = useState({
        salas: 2
    })

    const Router = useRouter()

    function vaciarDialog() { setCongregacion({ nombre: '', ciudad: '', estado: '', pais: '' }) }
    function rellenarDialog(datos) { setCongregacion(datos) }


    const submit = async (e) => {
        e.preventDefault()
        if (data) {
            //TODO: Aquí va la configuración para actualizar el perfil
            alert('Aún no hay forma de actualizar')
        } else {
            await crearPerfil(user.email, { congregacion, asignaciones })
        }
        setUser({ ...user, congregacion })
        Router.push('/')
    }


    return (
        <form onSubmit={submit} >
            <Stack direction='column' spacing={2} >
                <Divider>
                    <Typography>Información de la congregación:</Typography>
                </Divider>
                <TextField
                    fullWidth
                    label='Nombre de la congregación:'
                    value={congregacion.nombre}
                    onChange={(e) => {
                        let nuevaCong = { ...congregacion }
                        nuevaCong.nombre = e.target.value;
                        setCongregacion(nuevaCong)
                    }}
                />

                <TextField
                    fullWidth
                    label='Ciudad:'
                    value={congregacion.ciudad}
                    onChange={(e) => {
                        let nuevaCong = { ...congregacion }
                        nuevaCong.ciudad = e.target.value;
                        setCongregacion(nuevaCong)
                    }}
                />

                <TextField
                    fullWidth
                    label='Estado o provincia:'
                    value={congregacion.estado}
                    onChange={(e) => {
                        let nuevaCong = { ...congregacion }
                        nuevaCong.estado = e.target.value;
                        setCongregacion(nuevaCong)
                    }}
                />

                <TextField
                    fullWidth
                    label='País:'
                    value={congregacion.pais}
                    onChange={(e) => {
                        let nuevaCong = { ...congregacion }
                        nuevaCong.pais = e.target.value;
                        setCongregacion(nuevaCong)
                    }}
                />


                <Divider>
                    <Typography>Asignaciones:</Typography>
                </Divider>


{
    //TODO: Agregar botones para seleccionar la cantidad de salas.
}


                <Button type='submit'
                    startIcon={<SaveIcon />}
                    variant='contained'
                    sx={{
                        background: "#5b3c88",
                        "&:hover": { background: "#6b4c88" }
                    }}
                >
                    Guardar
                </Button>
            </Stack>
        </form>
    )
}