import { collection, getFirestore, getDocs, query, orderBy } from "firebase/firestore";
import config from "./config";
const db = getFirestore(config)
export default async function descargarMatriculados() {
    let matriculadosDescargados = []
    const mesDelAño = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const q = query(collection(db, `congregaciones/Del Bosque/matriculados`), orderBy("nombre"))
    const n = await getDocs(q);
    n.forEach((doc) => {
        const fecha = new Date(doc.data().fechaUltimaAsignacion)
        fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset())
        const año = fecha.getFullYear();
        const diaNum = fecha.getDate();
        const mes = fecha.getMonth();
        const textoFecha = `${diaNum} de ${mesDelAño[mes]} del ${año}`;
        let posibles = []
        let json = doc.data().posiblesAsignaciones
        for (var i in json) { if (json[i]) { posibles.push(i) } }
        const agregar = {
            id: doc.id,
            nombre: doc.data().nombre,
            genero: doc.data().genero,
            familia: doc.data().familia,
            ultimaAsignacion: textoFecha,
            fechaUltimaAsignacion: doc.data().fechaUltimaAsignacion,
            ultimaSala: doc.data().ultimaSala,
            tipoDeUltimaAsignacion: doc.data().tipoDeUltimaAsignacion,
            posiblesAsignaciones: json,
            arrayPosiblesAsignaciones: posibles,
            ayudantesAnteriores: doc.data().ayudantesAnteriores
        }
        matriculadosDescargados.push(agregar)
    })

    return matriculadosDescargados;
}