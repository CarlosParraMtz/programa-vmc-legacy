import { useState } from 'react'
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import Controles from './Controles';
import FechaDeAsignaciones from './FechaDeAsignaciones';
import { useEffect } from 'react';


export default function Tablero() {

	const [data, setData] = useState({
		periodo: '',
		fechas: [],
		id: '',
		timestamp: ''
	})
	const [editando, setEditando] = useState(false)
	const [periodo, setPeriodo] = useState('')



	//* Estas dos funciones actualizan la data cuando el usuario cambia las
	//* opciones en el tablero.
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




	//* Estas acciones ocurren cada vez que data es actualizado desde aquí,
	//* o desde cualquiera de los hijos de este componente.
	useEffect(() => {
		setPeriodo(data.periodo);
		localStorage.setItem('periodo/data', JSON.stringify(data));
	}, [data])


	

	//* Esto ocurre cada vez que el componente es cargado por primera vez,
	//* por ejemplo, cada vez que el usuario abre o actualiza la página.
	useEffect(() => {
		const dataLS = localStorage.getItem('periodo/data')
		if (dataLS) { setData(JSON.parse(dataLS)) }
	}, [])

	return (
		<>
			<Controles
				useEditando={[editando, setEditando]}
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
								<IconButton onClick={() => setEditando(true)} >
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
		</>
	)
}
