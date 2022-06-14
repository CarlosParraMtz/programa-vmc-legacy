import {
    collection,
    setDoc,
    doc,
    getFirestore
} from "firebase/firestore";
import config from "./config";

export default async function crearMatriculado(data) {
    const db = getFirestore(config)
    const direccionMatriculados = doc(collection(db, "congregaciones/Del Bosque/matriculados"));
    await setDoc(direccionMatriculados, data)
}