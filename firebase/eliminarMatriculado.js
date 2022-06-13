export default async function eliminarMatriculado(id) {
    await deleteDoc(doc(db, `congregaciones/Del Bosque/matriculados`, id))
}