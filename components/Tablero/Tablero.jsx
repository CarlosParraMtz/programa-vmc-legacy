import { useState } from 'react'
import {
	Box,
	Button,
	Chip,
	Divider,
	Grid,
	IconButton,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Controles from './Controles';
import FechaDeAsignaciones from './FechaDeAsignaciones';


export default function Tablero() {

	const theme = useTheme();
	const esLG = useMediaQuery(theme.breakpoints.up('lg'));

	const tableSM = 12
	const tableXS = 12
	const tableLG = 3

	const [data, setData] = useState({
		periodo: 'Julio 2022',
		fechas: [
			{
				fecha: '07-07-2022',
				asignaciones: [
					{
						tipo: 'lectura',
						descripcion: '',
						asignacionesPorSalas: [
							[
								"Nombre de asignado",
								"nombre de ayudante"
							],
							[
								"Nombre de asignado",
								"nombre de ayudante"
							]
						]
					}
				]
			}
		]
	})


	return (
		<>
			<Controles />


			<Box sx={{ width: '100%', p: 2 }} >
				<Stack spacing={2} >


					<Typography variant='h4' >
						<strong>
							{data.periodo}
						</strong>
					</Typography>


					{
						data.fechas.map((fecha, index) => <FechaDeAsignaciones key={index} />)
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
						>
							<AddIcon />
							<Typography sx={{ color: '#555' }} ><b>Agregar fecha de asignaciones</b></Typography>
						</Button>
					</Box>

				</Stack>
			</Box>
		</>
	)
}
