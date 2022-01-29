import React from 'react';
import { useRouter } from 'next/router'


export default function Asignaciones() {
    const router = useRouter()
    return (
        <div>
            <button onClick={() => router.push("/matriculados")} >Matriculados</button>
        </div>
    )
}
