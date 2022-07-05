import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import config from "./config";
export default async function eliminarFamilia(congregacion, id) {
    const db = getFirestore(config)
    await deleteDoc(doc(db, `congregaciones/${congregacion}/familias`, id))
}