import {
    collection,
    setDoc,
    doc,
    getFirestore
} from "firebase/firestore";
import config from "./config";

export default async function crearFamilia(congregacion, data, id) {
    const db = getFirestore(config)
    await setDoc(doc(
        db,
        `congregaciones/${congregacion}/familias`,
        id
    ), data)
}