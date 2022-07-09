import {
    collection,
    getDocs,
    getFirestore,
    query,
    orderBy
} from "firebase/firestore";
import config from "./config";

export default async function descargarPeriodos(congregacion) {
    const db = getFirestore(config)
    let lista = []
    const q = query(collection(db, `congregaciones/${congregacion}/periodos`), orderBy("timestamp"))
    const n = await getDocs(q);
    n.forEach((doc) => { lista.push({ ...doc.data() }) })
    return lista;
}