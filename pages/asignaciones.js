import React from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router'

export default function asignaciones() {

  const router = useRouter()


  return (
    <Layout>

      <button onClick={() => router.push("/matriculados")} >Matriculados</button>

    </Layout>
  )
}
