import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import config from "./config";
export default async function eliminarMatriculado(congregacion, id) {
    const db = getFirestore(config)
    await deleteDoc(doc(db, `congregaciones/${congregacion}/matriculados`, id))
}