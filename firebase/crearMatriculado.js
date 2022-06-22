import {
    collection,
    setDoc,
    doc,
    getFirestore
} from "firebase/firestore";
import config from "./config";

export default async function crearMatriculado(congregacion, data) {
    const db = getFirestore(config)
    const direccionMatriculados = doc(collection(
        db,
        `congregaciones/${congregacion.nombre}-${congregacion.ciudad}-${congregacion.estado}-${congregacion.pais}/matriculados`
        ));
    await setDoc(direccionMatriculados, data)
}