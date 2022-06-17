import {
    setDoc,
    doc,
    getFirestore
} from "firebase/firestore";
import config from "./config";

export default async function crearPerfil(email, data) {
    const db = getFirestore(config)
    localStorage.setItem('user/congregacion', JSON.stringify(data))
    await setDoc(doc(db, 'usuarios', email), data)
}