export default function obtenerDiaDeHoy() {
    var fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth();
    const ano = fecha.getFullYear();
    return `${ano}-${mes + 1 < 9 ? `0${mes + 1}` : mes + 1}-${dia < 10 ? `0${dia}` : dia}`;
}