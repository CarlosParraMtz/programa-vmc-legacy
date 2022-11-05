import { doc, setDoc, getFirestore } from "firebase/firestore";
import config from './config';

export default async function actualizarPerfil(email, congId) {
    const db = getFirestore(config)
    await setDoc(doc(db, "usuarios", email), {
        congregacion: congId
    });
}