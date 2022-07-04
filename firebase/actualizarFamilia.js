import {
    doc,
    updateDoc,
    getFirestore
} from "firebase/firestore";
import config from "./config";

export default async function actualizarFamilia(congregacion, data, id) {
    const db = getFirestore(config)
    await updateDoc(doc(
        db,
        `congregaciones/${congregacion}/familias`,
        id
    ), data)
}