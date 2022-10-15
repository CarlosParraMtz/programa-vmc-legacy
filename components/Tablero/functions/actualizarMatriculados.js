import actualizarMatriculado from "../../../firebase/actualizarMatriculado";

export default function actualizarMatriculados(mtrSinGuardar, user) {
    mtrSinGuardar.forEach(async (mtr)=>{
        await actualizarMatriculado(user.data.congregacion.id, mtr, mtr.id)
    })
}