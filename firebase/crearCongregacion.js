import {
    setDoc,
    doc,
    collection,
    getFirestore
} from "firebase/firestore";
import config from "./config";

export default async function crearCongregacion(data) {
    const db = getFirestore(config)
    localStorage.setItem('user/congregacion', JSON.stringify(data))

    const nuevaCongregacion = doc(collection(db, "congregaciones"));
    await setDoc(nuevaCongregacion, { ...data, id: nuevaCongregacion.id });
    return nuevaCongregacion.id
}