export default function mapearCompañeros(matriculado) {
    return matriculado.asignacionesAnteriores
        .filter(aa => (!(aa.tipo === "Lectura" || aa.tipo === "Discurso")))
        .map(aa => aa.acompañante);
}
