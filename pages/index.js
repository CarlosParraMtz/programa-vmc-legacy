import React from 'react';
import Layout from '../components/Layout';
import Asignaciones from '../components/asignaciones/Asignaciones';
import { useRecoilValue } from 'recoil'
import userState from '../Recoil/userState';

export default function Home() {
  const user = useRecoilValue(userState)
  return (
    <Layout>
      {user.logeado && <Asignaciones />}
    </Layout>
  )
}
