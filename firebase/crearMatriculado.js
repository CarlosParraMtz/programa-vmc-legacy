import {
    collection,
    setDoc,
    doc,
    getFirestore
} from "firebase/firestore";
import config from "./config";

export default async function crearMatriculado(congregacion, data, id) {
    const db = getFirestore(config)
    await setDoc(doc(
        db,
        `congregaciones/${congregacion}/matriculados`,
        id
    ), data)
}