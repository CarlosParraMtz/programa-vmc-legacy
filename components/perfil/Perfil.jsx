import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Divider,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useRecoilState } from 'recoil';
import userState from '../../Recoil/userState';
import crearCongregacion from '../../firebase/crearCongregacion';
import actualizarPerfil from '../../firebase/actualizarPerfil';
import { useRouter } from 'next/router';
import HelpIcon from '@mui/icons-material/Help';

export default function Perfil() {

    const [user, setUser] = useRecoilState(userState)
    const [congregacion, setCongregacion] = useState({
        nombre: '',
        ciudad: '',
        estado: '',
        pais: ''
    })
 

    const [error, setError] = useState(false)
    const [errorCode, setErrorCode] = useState('')

    const Router = useRouter()


    const submit = async (e) => {
        e.preventDefault()
        if (congregacion.nombre === '') {
            setError(true)
            setErrorCode('nombre')
            return;
        }
        if (congregacion.ciudad === '') {
            setError(true)
            setErrorCode('ciudad')
            return;
        }
        if (congregacion.estado === '') {
            setError(true)
            setErrorCode('estado')
            return;
        }
        if (congregacion.pais === '') {
            setError(true)
            setErrorCode('pais')
            return;
        }


        const id = await crearCongregacion(congregacion)
        const congInfo = { ...congregacion, id: id }
        console.log(congInfo)
        await actualizarPerfil(user.email, congInfo, configuraciones)
        setUser({ ...user, congregacion: congInfo })


        setError(false)
        setErrorCode('')
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
                    focused={errorCode === 'nombre'}
                    color={errorCode === 'nombre' ? 'error' : 'primary'}
                    helperText={errorCode === 'nombre' ? 'El campo de nombre no puede quedar vacío' : ''}
                    onChange={(e) => {
                        let nuevaCong = { ...congregacion }
                        nuevaCong.nombre = e.target.value;
                        setCongregacion(nuevaCong)
                    }}
                />

                <TextField
                    fullWidth
                    label='Ciudad:'
                    focused={errorCode === 'ciudad'}
                    color={errorCode === 'ciudad' ? 'error' : 'primary'}
                    helperText={errorCode === 'ciudad' ? 'Este campo no puede quedar vacío' : ''}
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
                    focused={errorCode === 'estado'}
                    color={errorCode === 'estado' ? 'error' : 'primary'}
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
                    focused={errorCode === 'pais'}
                    color={errorCode === 'pais' ? 'error' : 'primary'}
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


                <Box sx={{ display: 'flex', alignItems: 'center' }} >
                    <Tooltip
                        title='Este dato se puede cambiar manualmente para cada semana de asignaciones.'
                        placement='top'
                        arrow
                    >
                        <HelpIcon fontSize='small' sx={{ color: '#bbb', mr: 1 }} />
                    </Tooltip>

                    
                </Box>



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