import {
    collection,
    setDoc,
    doc,
    getFirestore
} from "firebase/firestore";
import config from "./config";

export default async function crearMatriculado(data, id) {
    const db = getFirestore(config)
    await updateDoc(doc(db, `congregaciones/Del Bosque/matriculados`, id), data)
}