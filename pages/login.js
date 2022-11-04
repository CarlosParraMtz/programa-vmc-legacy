//* Módulos
import { useState, useEffect } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import firebaseApp from '../firebase/config';
import { useRecoilState } from 'recoil';

import Head from 'next/head'
import Router from 'next/router';
import Image from 'next/image'
import Link from 'next/link';

//* Recoil
import userState from '../Recoil/userState';
import familiasState from '../Recoil/familiasState';

//* Funciones
import descargarMatriculados from '../firebase/descargarMatriculados';
import descargarFamilias from '../firebase/descargarFamilias'
import comprobarConfigUsuario from '../firebase/comprobarConfigUsuario'

//*Estilos
import {
	Box, Button, Card, CardContent, CircularProgress, Typography
} from '@mui/material/';





const BotonGoogle = ({ onClick }) => <Button
	size="large"
	variant="outlined"
	onClick={onClick}
	startIcon={<Image src="/g-login.png" width={25} height={25} />}
	sx={{
		padding: 2,
		border: "solid 1px #ccc",
		color: "#333",
		background: "RGBA(0, 0, 0, 0.1)",
		my: 7,
		"&:hover": {
			border: "solid 1px white",
			color: "white",
			background: "RGBA(0, 0, 0, 0.8)"
		}
	}}
>
	Ingresar con google
</Button>




export default function Login() {

	const auth = getAuth(firebaseApp);
	const googleProvider = new GoogleAuthProvider();

	const [loading, setLoading] = useState(false);
	const [user, setUser] = useRecoilState(userState);
	const [familias, setFamilias] = useRecoilState(familiasState);



	async function checarLogin() {
		setLoading(true);

		const auth = getAuth()
		await onAuthStateChanged(auth, async (usuario) => {
			if (usuario) {

				let dataCong;
				const congreLS = localStorage.getItem('user/congregacion')
				if (congreLS) { dataCong = JSON.parse(congreLS); }
				else { dataCong = await comprobarConfigUsuario(usuario.email) }

				const newSesion = {
					logeado: true,
					uid: usuario.uid,
					data: {
						config: {},
						congregacion: dataCong
					},
					nombre: usuario.displayName,
					email: usuario.email
				}
				setUser(newSesion)

				if (newSesion.data.congregacion.nombre === '') {
					Router.push('/nuevo-usuario')
				} else {
					const fams = await descargarFamilias(newSesion.data.congregacion.id)
					setFamilias(fams)
					Router.push('/')
				}
			}
			setLoading(false)
		})

		
	}

	useEffect(() => { checarLogin() }, [])



	const login = async () => {
		setLoading(true)
		await signInWithPopup(auth, googleProvider)
			.then(async (result) => {
				const datosUsuario = result.user;

				let dataCong;
				const congreLS = localStorage.getItem('user/congregacion')
				if (congreLS) { dataCong = JSON.parse(congreLS) }
				else { dataCong = await comprobarConfigUsuario(datosUsuario.email) }

				const usuario = {
					logeado: true,
					uid: datosUsuario.uid,
					data: {
						config: {},
						congregacion: dataCong
					},
					nombre: datosUsuario.displayName,
					email: datosUsuario.email
				}
				setUser(usuario);

				if (usuario.data.congregacion.nombre === '') {
					Router.push('/nuevo-usuario')
				} else {
					const fams = await descargarFamilias(usuario.data.congregacion.id)
					setFamilias(fams)
					Router.push('/')
				}
			})
		setLoading(false)
	}




	return (
		<>
			<main id="login-page">

				<div className="img-container" />
				<div className="content-container">
					<Card sx={{					
						maxWidth: "400px",
						width: "100%",
						minHeight: "400px",
						background: "#fafafa",
						boxShadow: "3px 3px 6px #2f2f2f",
						display:"flex",
						alignItems:"center",
						justifyContent:"center"
					}} >
						<CardContent sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							height:"100%",
							justifyContent:"center",
						}} >

							{
								loading
									? <>
										<CircularProgress sx={{color:"#444"}} />
										<Typography sx={{color:"#888", mt:5}} > <b><em>Cargando...</em></b> </Typography>
									</>
									: <>
										<Typography variant="h4" sx={{ color: "#3a3a3a" }} >
											<b>Programa VMC</b>
										</Typography>

										<Typography sx={{ textAlign: "center", my: 3 }} variant="body1" >
											Inicie sesión con google.
										</Typography>

										<BotonGoogle onClick={login} />

										<Typography sx={{ textAlign: "center", color: "#777" }} variant="body1" >
											Al iniciar sesión confirma que está de acuerdo con las condiciones de uso.
										</Typography>
									</>
							}



						</CardContent>
					</Card>
				</div>

			</main>

			<footer style={{
				background: "#222",
				position: "fixed",
				bottom: 0,
				left: 0,
				width: "100%",
				padding: "15px"
			}} >

				<Box sx={{
					margin: "0 auto",
					maxWidth: "200px",
					textAlign: "center",
				}} >
					<Link href="/condiciones" >
						<a className="boton-condiciones" >
							Condiciones de uso
						</a>
					</Link>
				</Box>
			</footer>

		</>
	)
}

