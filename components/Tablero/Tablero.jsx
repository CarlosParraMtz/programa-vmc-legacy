import { useState } from 'react'
import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	IconButton,
	List,
	ListItemButton,
	ListItemText,
	Stack,
	TextField,
	Typography
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import Controles from './Controles';
import FechaDeAsignaciones from './FechaDeAsignaciones';
import { useEffect } from 'react';

import { useRecoilValue } from 'recoil';
import userState from '../../Recoil/userState'

import descargarUltimoPeriodo from '../../firebase/descargarUltimoPeriodo';
import eliminarPeriodo from '../../firebase/eliminarPeriodo';
import descargarPeriodos from '../../firebase/descargarPeriodos';
import actualizarPeriodo from '../../firebase/actualizarPeriodo';
import crearPeriodo from '../../firebase/crearPeriodo';


export default function Tablero() {

	const user = useRecoilValue(userState)

	const dataInicial = { periodo: '', fechas: [], id: '', timestamp: '' }
	const [data, setData] = useState({ ...dataInicial })
	const [dataOld, setDataOld] = useState({ ...dataInicial })

	const [editando, setEditando] = useState(false)

	const [periodo, setPeriodo] = useState('')

	const [dialogConfirmaEliminar, setDialogConfirmaEliminar] = useState(false)
	const [dialogListaPeriodos, setDialogListaPeriodos] = useState(false)
	const [listaDePeriodos, setListaDePeriodos] = useState([])





	//* Estas dos funciones actualizan la data cuando el usuario cambia los
	//* campos de entrada en este componente.
	const agregarFecha = () => {
		setEditando(true)
		let _data = { ...data }
		_data.fechas.push({ fecha: '2022-07-01', asignaciones: [] })
		setData(_data)
	}
	const cambiarPeriodo = () => {
		let _data = { ...data, periodo }
		setData(_data)
	}






	//* Esto ocurre cada vez que el componente es cargado por primera vez,
	//* por ejemplo, cada vez que el usuario abre o actualiza la página.
	useEffect(() => {
		const dataLS = localStorage.getItem('periodo/data')
		if (dataLS) { setData(JSON.parse(dataLS)) }
		else { obtenerUltimoPeriodo() }

		const dataOldLS = localStorage.getItem('periodo/data_old')
		if (dataOldLS) { setDataOld(JSON.parse(dataOldLS)) }

		const editandoLS = localStorage.getItem('periodo/editando')
		if (editandoLS) { setEditando(JSON.parse(editandoLS)) }
	}, [])







	//* Estas acciones ocurren cada vez que data es actualizado desde aquí,
	//* o desde cualquiera de los hijos de este componente.
	useEffect(() => {
		setPeriodo(data.periodo);
		localStorage.setItem('periodo/data', JSON.stringify(data));
	}, [data])










	//* Acciones en la base de datos

	async function obtenerUltimoPeriodo() {
		const ultimaData = await descargarUltimoPeriodo(user.data.congregacion.id);
		if (ultimaData) { setData(ultimaData) }
		else {
			setData({ ...dataInicial });
			setEditando(true);
		}
	}

	async function obtenerPeriodos() {
		const periodos = await descargarPeriodos(user.data.congregacion.id)
		setListaDePeriodos([...periodos])
	}

	async function confirmaBorrarPeriodo() {
		await eliminarPeriodo(user.data.congregacion.id, data.id)
	}

	async function obtenerUnPeriodo() { } //TODO

	async function guardarOActualizar() {
		//* Se evalúa si el periodo actual ya tiene un ID. 
		//* Si no es así, se crea un nuevo registro en la base de datos,
		//* y al ejecutar la función, esta retorna el id y su marca de 
		//* tiempo, que se agrega a la copia local del registro.
		//* Si sí tiene un ID, entonces se actualiza el registro que se
		//* acaba de guardar.
		//TODO: terminar esta función
		if (data.id === '') {
			//* Se va a crear un periodo
			const res = await crearPeriodo(user.data.congregacion.id, data)
			let _data = { ...data, id: res.id, timestamp: res.timestamp }
			setData(_data)
			localStorage.setItem('periodo/data', JSON.stringify(_data))
		} else {
			//* Se va a actualizar el periodo
			await actualizarPeriodo(user.data.congregacion.id, { ...data }, data.id)
		}
	}







	//* Comportamiento de los botones de la barra de herramientas

	const activarEdicion = () => {
		setDataOld({ ...data })
		localStorage.setItem('periodo/data_old', JSON.stringify({ ...data }))
		setEditando(true)
		localStorage.setItem('periodo/editando', JSON.stringify(true))
	}

	const agregarPeriodo = () => {
		activarEdicion()
		setData({ ...dataInicial })
	}

	const borrarPeriodo = () => { setDialogConfirmaEliminar(true) }

	const verListaDePeriodos = () => {
		obtenerPeriodos()
		setDialogListaPeriodos(true)
	}

	const cancelarEdicion = () => {
		setData({ ...dataOld })
		localStorage.setItem('periodo/data', JSON.stringify({ ...dataOld }))
		setEditando(false)
		localStorage.setItem('periodo/editando', JSON.stringify(false))
		setDataOld({ ...dataInicial })
		localStorage.setItem('periodo/data_old', JSON.stringify({ ...dataInicial }))
	}

	const guardar = () => {
		setEditando(false)
		localStorage.setItem('periodo/editando', JSON.stringify(false))
		setDataOld({ ...data })
		localStorage.setItem('periodo/data_old', JSON.stringify({ ...data }))

		guardarOActualizar()
	}


	const generarAsignaciones = () => { 
		console.log('generando!')
		const mtr = [...matriculados]
	}









	//* Comportamiento de botones en dialogs
	const confirmaEliminar = () => { }

	const cerrarDialogConfirmaEliminar = () => { }


	const abrirPeriodo = (periodo) => {
		setData({ ...periodo })
		setDataOld({ ...periodo })
		setDialogListaPeriodos(false)
	}

	const cerrarDialogListaPeriodos = () => { setDialogListaPeriodos(false) }







	return (
		<>
			<Controles
				useEditando={[editando, setEditando]}
				funciones={[agregarPeriodo, activarEdicion, borrarPeriodo,
					guardar, cancelarEdicion, generarAsignaciones, verListaDePeriodos]}
			/>


			<Box sx={{ width: '100%', p: 2 }} id="tablero" >
				<Stack spacing={2} >
					{
						editando
							? <TextField
								type='text'
								sx={{ maxWidth: '400px' }}
								value={periodo}
								onChange={e => setPeriodo(e.target.value)}
								onBlur={cambiarPeriodo}
								label='Periodo'
								autoFocus
								variant='standard'
								placeholder='Ej. Julio 2022, Julio y agosto 2022, etc.'
							/>
							: <Box sx={{ display: 'flex' }}>
								<Typography variant='h4' ><strong>{data.periodo === '' ? 'Periodo sin título' : data.periodo}</strong></Typography>
								<IconButton onClick={activarEdicion} >
									<EditIcon />
								</IconButton>
							</Box>
					}



					{
						data.fechas.map((fecha, indexFechas) => (
							<FechaDeAsignaciones
								key={indexFechas}
								useData={[data, setData]}
								indexFechas={indexFechas}
								useEditando={[editando, setEditando]}
								activarEdicion={activarEdicion}
							/>
						))
					}

					<Box sx={{ width: '100%' }} >
						<Button
							sx={{
								display: 'flex', alignItems: 'center', justifyContent: 'center',
								width: '100%', height: '100%',
								color: '#555',
								background: '#cfcfcf',
								"&:hover": { background: '#c7c7c7' }
							}}
							onClick={agregarFecha}
						>
							<AddIcon sx={{ mr: 1 }} />
							<Typography sx={{ color: '#555' }} ><b>Agregar fecha de asignaciones</b></Typography>
						</Button>
					</Box>

				</Stack>
			</Box>






			<Dialog open={dialogListaPeriodos} onClose={cerrarDialogListaPeriodos} >
				<DialogTitle sx={{ background: '#5b3c88', color: 'white' }} >
					Seleccionar periodo para revisar:
				</DialogTitle>
				<DialogContent>
					<List>
						{
							listaDePeriodos.map(periodo => (
								<ListItemButton key={periodo.id}
									onClick={() => abrirPeriodo(periodo)}
									disabled={data.id === periodo.id}
								>
									<ListItemText
										primary={<b>{periodo.periodo}</b>}
										secondary={data.id === periodo.id ? "Periodo actual" : ""}
									/>
								</ListItemButton>
							))
						}
					</List>
				</DialogContent>

			</Dialog>

		</>
	)
}
