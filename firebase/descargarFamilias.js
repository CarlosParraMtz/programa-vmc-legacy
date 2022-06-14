import {
    collection,
    getDocs,
    getFirestore,
    query,
    orderBy
} from "firebase/firestore";
import config from "./config";

export default async function descargarFamilias() {
    const db = getFirestore(config)

    let lista = []
    const q = query(collection(db, `congregaciones/Del Bosque/familias`), orderBy("familia"))
    const n = await getDocs(q);
    n.forEach((doc) => {
        lista.push({
            id: doc.id,
            apellidos: doc.data().familia,
            miembros: (doc.data().miembros == undefined ? [] : doc.data.miembros)
        })
    })
    return lista;
}