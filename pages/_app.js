import '../styles/globals.css'
import { RecoilRoot } from 'recoil';
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Head>
        <title>Programa VMC</title>
        <meta name="description" content="Asignaciones estudiantiles para VMC" />
        <link rel="icon" href="/favicon.ico" />
        <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css' />
      </Head>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
