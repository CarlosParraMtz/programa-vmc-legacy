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
import crearPerfil from '../../firebase/crearPerfil';
import { useRouter } from 'next/router';
import HelpIcon from '@mui/icons-material/Help';

export default function Perfil({ data = null }) {

    const [user, setUser] = useRecoilState(userState)
    const [congregacion, setCongregacion] = useState({
        nombre: '',
        ciudad: '',
        estado: '',
        pais: ''
    })
    const [configuraciones, setConfiguraciones] = useState({
        salas: 2
    })

    const [error, setError] = useState(false)
    const [errorCode, setErrorCode] = useState('')

    const Router = useRouter()

    function vaciarDialog() { setCongregacion({ nombre: '', ciudad: '', estado: '', pais: '' }) }
    function rellenarDialog(datos) { setCongregacion(datos) }


    useEffect(() => { if (data) { rellenarDialog(data) } }, [])

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


        localStorage.setItem('user/configuraciones', JSON.stringify(configuraciones))
        if (data) {
            //TODO: Aquí va la configuración para actualizar el perfil
            alert('Aún no hay forma de actualizar')
        } else {
            await crearPerfil(user.email, { congregacion, configuraciones })
        }
        setUser({ ...user, congregacion })
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

                    <Typography><strong>Cantidad de salas por defecto:</strong></Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', width: 'fit-content', ml: 'auto' }} >
                        <ToggleButtonGroup
                            value={configuraciones.salas}
                            exclusive
                            onChange={(_, n) => {
                                let na = { ...configuraciones }
                                na.salas = n
                                setConfiguraciones(na)
                            }}
                        >
                            <ToggleButton value={1}>
                                <Typography><strong>1</strong></Typography>
                            </ToggleButton>
                            <ToggleButton value={2}>
                                <Typography><strong>2</strong></Typography>

                            </ToggleButton>
                            <ToggleButton value={3}>
                                <Typography><strong>3</strong></Typography>

                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
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