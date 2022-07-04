import {
    doc,
    updateDoc,
    getFirestore
} from "firebase/firestore";
import config from "./config";

export default async function actualizarMatriculado(congregacion, data, id) {
    const db = getFirestore(config)
    await updateDoc(doc(
        db,
        `congregaciones/${congregacion}/matriculados`,
        id
    ), data)
}