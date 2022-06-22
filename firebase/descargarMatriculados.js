import { collection, getFirestore, getDocs, query, orderBy } from "firebase/firestore";
import config from "./config";
const db = getFirestore(config)
export default async function descargarMatriculados(congregacion) {
    let matriculadosDescargados = []
    const q = query(collection(
        db,
        `congregaciones/${congregacion.nombre}-${congregacion.ciudad}-${congregacion.estado}-${congregacion.pais}/matriculados`
    ), orderBy("nombre"))
    const n = await getDocs(q);
    n.forEach((doc) => {
        const agregar = {
            id: doc.id,
            asignacionesAnteriores: [],
            nombre: doc.data().nombre,
            genero: doc.data().genero,
            familia: doc.data().familia,
            ultimaAsignacion: doc.data().ultimaAsignacion,
            posiblesAsignaciones: doc.data().posiblesAsignaciones,
            ayudantesAnteriores: doc.data().ayudantesAnteriores
        }
        matriculadosDescargados.push(agregar)
    })

    return matriculadosDescargados;
}