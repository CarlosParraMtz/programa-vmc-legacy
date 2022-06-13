import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Menu from '../components/Inicio/Menu'
import Typography from '@mui/material/Typography'
import {
	Box,
	Button,
} from '@mui/material/';
import Link from 'next/link';
import Router from 'next/router';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

import {
	getFirestore,
	collection,
	doc,
	setDoc,
	getDoc,
	getDocs,
	updateDoc,
	query,
	limitToLast,
	orderBy,
} from "firebase/firestore";
import firebaseApp from '../firebase/config';
import { useRecoilState } from 'recoil';
import userState from '../Recoil/userState';
import matriculadosState from '../Recoil/matriculadosState'
import { useState, useEffect } from 'react'

import descargarMatriculados from '../firebase/descargarMatriculados';

const BotonGoogle = ({ onClick }) => <Button
	size="large"
	variant="outlined"
	onClick={onClick}
	startIcon={<Image src="/g-login.png" width={25} height={25} />}
	sx={{
		padding: 2,
		border: "solid 1px #ccc",
		color: "#ddd",
		"&:hover": {
			border: "solid 1px white",
			color: "white",
			background: "RGBA(255, 255, 255, 0.1)"
		}
	}}
>
	Ingresar con google
</Button>




export default function Home() {

	const db = getFirestore(firebaseApp);
	const auth = getAuth(firebaseApp);
	const googleProvider = new GoogleAuthProvider();

	const [cargando, setCargando] = useState(false);
	const [user, setUser] = useRecoilState(userState);
	const [matriculados, setMatriculados] = useRecoilState(matriculadosState);



	async function checarLogin() {
		const auth = getAuth()
		await onAuthStateChanged(auth, async (usuario) => {
			if (usuario) {

				const newSesion = {
					logeado: true,
					uid: usuario.uid,
					congregacion: "",
					nombre: usuario.displayName,
					email: usuario.email
				}
				setUser(newSesion)
				const matr = await descargarMatriculados()
				setMatriculados(matr)
			}
		})

	}

	useEffect(() => { checarLogin() }, [])



	const login = async () => {
		setCargando(true)
		await signInWithPopup(auth, googleProvider)
			.then((result) => {
				const datosUsuario = result.user;

				const newSesion = {
					logeado: true,
					uid: datosUsuario.uid,
					congregacion: "",
					nombre: datosUsuario.displayName,
					email: datosUsuario.email
				}
				setUser(newSesion);
				const matr = descargarMatriculados()
				setMatriculados(matr)
			})
		setCargando(false)

	}

	


	useEffect(() => {
		if (user.logeado) {
			Router.push("/asignaciones")
		}
	}, [user])



	return (
		<div className={styles.container}>
			<div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "#5b3c88", zIndex: "-1" }} />

			<Head>
				<title>Programa VMC</title>
				<meta name="description" content="Asignaciones estudiantiles para VMC" />
				<link rel="icon" href="/favicon.ico" />
				<link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css' />
			</Head>

			<main className={styles.main}>
				<Typography variant="h3" sx={{ color: "white", fontFamily: "sans", mb: 2 }}>
					<b>Bienvenido</b>
				</Typography>

				<BotonGoogle onClick={login} />

				<Typography
					sx={{
						width: "90%",
						maxWidth: "700px",
						mt: 2,
						textAlign: "center",
						color: "white",
					}}
					variant="h6" >
					Para poder acceder al generador automático de asignaciones para la reunión Vida y Ministerio Cristianos,
					inicie sesión con su cuenta de google. Al hacerlo, confirma que está de acuerdo con las condiciones de uso.
				</Typography>


			</main>

			<footer style={{
				background: "#222",
				position: "fixed",
				bottom: 0,
				left: 0,
				width: "100%",
				padding: "10px"
			}} >

				<Box sx={{
					margin: "0 auto",
					maxWidth: "200px",
					textAlign: "center",
				}} >
					<Link href="/condiciones" >
						<a className={styles.btnCondiciones}>
							Condiciones de uso
						</a>
					</Link>
				</Box>
			</footer>

		</div>
	)
}

