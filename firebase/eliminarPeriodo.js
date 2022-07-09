import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import config from "./config";
export default async function eliminarPeriodo(congregacion, id) {
    const db = getFirestore(config)
    await deleteDoc(doc(db, `congregaciones/${congregacion}/periodos`, id))
}