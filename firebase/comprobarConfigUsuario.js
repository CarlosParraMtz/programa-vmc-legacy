import {
    doc,
    getDoc,
    getFirestore
} from "firebase/firestore";
import config from "./config";

export default async function comprobarConfigUsuario(email) {
    const db = getFirestore(config)
    const docRef = doc(db, "usuarios", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

        const objCong = { ...docSnap.data().congregacion }

        localStorage.setItem('user/congregacion', JSON.stringify(objCong))
        return objCong
    }
    return { nombre: '', ciudad: '', estado: '', pais: '', id: '' }
}