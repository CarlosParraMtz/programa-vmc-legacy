import {
    setDoc,
    doc,
    collection,
    getFirestore,
    serverTimestamp
} from "firebase/firestore";
import config from "./config";

export default async function crearPeriodo(congregacion, data) {
    const db = getFirestore(config)


    const nuevoPeriodo = doc(collection(db, `congregaciones/${congregacion}/periodos`));
    const timestamp = serverTimestamp()
    await setDoc(nuevoPeriodo, { ...data, id: nuevoPeriodo.id, timestamp });
    return { id: nuevoPeriodo.id, timestamp }
}