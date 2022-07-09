import {
    collection,
    getDocs,
    getFirestore,
    query,
    orderBy,
    limitToLast
} from "firebase/firestore";
import config from "./config";

export default async function descargarUltimoPeriodo(congregacion) {
    const db = getFirestore(config)

    let lista = []
    
    const q = query(collection(db, `congregaciones/${congregacion}/periodos`),
        orderBy("timestamp"), limitToLast(1))
    
        const n = await getDocs(q);
    
    n.forEach((doc) => {
        lista.push(doc.data())
    })
    
    
    
    if (lista.length === 1) {
        return lista[0];
    }

    return null
}