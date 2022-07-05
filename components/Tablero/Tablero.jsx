import { useState } from 'react'
import { Box, Button, IconButton, Input, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import Controles from './Controles';
import FechaDeAsignaciones from './FechaDeAsignaciones';
import { useEffect } from 'react';


export default function Tablero() {

	const [data, setData] = useState({ periodo: 'Julio 2022', fechas: [] })
	const [editando, setEditando] = useState(false)
	const [periodo, setPeriodo] = useState('')


	const agregarFecha = () => {
		let _data = { ...data }
		_data.fechas.push({ fecha: '07-07-22', asignaciones: [] })
		setData(_data)
	}

	const cambiarPeriodo = () => {
		let _data = { ...data, periodo }
		setData(_data)
	}

	useEffect(() => {
		setPeriodo(data.periodo)
	}, [data])


	return (
		<>
			<Controles
				useEditando={[editando, setEditando]}
			/>


			<Box sx={{ width: '100%', p: 2 }} id="tablero" >
				<Stack spacing={2} >
					{
						editando
							? <Input type='text' sx={{ maxWidth: '400px' }} value={periodo} onChange={e => setPeriodo(e.target.value)} onBlur={cambiarPeriodo} />
							: <Box sx={{display:'flex'}}>
							<Typography variant='h4' ><strong>{data.periodo}</strong></Typography>
							<IconButton onClick={()=>setEditando(true)} >
								<EditIcon />
							</IconButton>
							</Box>
					}



					{data.fechas.map((fecha, indexFechas) => <FechaDeAsignaciones key={indexFechas} useData={[data, setData]} indexFechas={indexFechas} />)}

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
