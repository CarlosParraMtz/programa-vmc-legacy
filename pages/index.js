import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Menu from '../components/Inicio/Menu'
import Typography from '@mui/material/Typography'


export default function Home() {
  return (
    <div className={styles.container}>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "#5b3c88", zIndex: "-1" }} />

      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Asignaciones estudiantiles para VMC" />
        <link rel="icon" href="/favicon.ico" />
        <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'/>
      </Head>

      <main className={styles.main}>
        <Typography variant="h4" sx={{color:"white"}}>
          <b>Bienvenido</b>
        </Typography>
        <Menu />

      </main>
    </div>
  )
}
