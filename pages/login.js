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
import matriculadosState from '../Recoil/matriculadosState';
import familiasState from '../Recoil/familiasState';
import { useState, useEffect } from 'react'

import descargarMatriculados from '../firebase/descargarMatriculados';
import descargarFamilias from '../firebase/descargarFamilias'

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




export default function Login() {

	const db = getFirestore(firebaseApp);
	const auth = getAuth(firebaseApp);
	const googleProvider = new GoogleAuthProvider();

	const [cargando, setCargando] = useState(false);
	const [user, setUser] = useRecoilState(userState);
	const [matriculados, setMatriculados] = useRecoilState(matriculadosState);
	const [familias, setFamilias] = useRecoilState(familiasState);



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
				const fams = await descargarFamilias()
				setMatriculados(matr)
				setFamilias(fams)
			}
		})

	}

	useEffect(() => { checarLogin() }, [])



	const login = async () => {
		setCargando(true)
		await signInWithPopup(auth, googleProvider)
			.then(async (result) => {
				const datosUsuario = result.user;

				const newSesion = {
					logeado: true,
					uid: datosUsuario.uid,
					congregacion: "",
					nombre: datosUsuario.displayName,
					email: datosUsuario.email
				}
				setUser(newSesion);
				const matr = await descargarMatriculados()
				const fams = await descargarFamilias()
				setMatriculados(matr)
				setFamilias(fams)
			})
		setCargando(false)

	}




	useEffect(() => {
		if (user.logeado) {
			Router.push("/")
		}
	}, [user])



	return (
		<div className={styles.container}>
			<div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "#5b3c88", zIndex: "-1" }} />



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

