import {
    collection,
    getDocs,
    getFirestore,
    query,
    orderBy
} from "firebase/firestore";
import config from "./config";

export default async function descargarFamilias(congregacion) {
    const db = getFirestore(config)

    let lista = []
    const q = query(collection(
        db,
        `congregaciones/${congregacion}/familias`
        ), orderBy("apellidos"))
    const n = await getDocs(q);
    n.forEach((doc) => {
        lista.push({
            id: doc.id,
            apellidos: doc.data().apellidos,
            miembros: doc.data().miembros
        })
    })
    return lista;
}