export default function asignar(matriculados, familias, useData) {
    const [data, setData] = useData

    let d = { ...data }
    d.fechas.forEach(fecha => {
        fecha.asignaciones.forEach(asignacion => {
            asignacion.salas.forEach(sala => {

                //* Aquí va la lógica principal del programa.
                //* Este bloque ocurre en cada una de las salas.
                switch (asignacion.tipo) {
                    case "Lectura":

                    


                        break;
                    case "Primera conversación":
                        break;
                    case "Revisita":
                        break;
                    case "Curso bíblico":
                        break;
                    case "Discurso":
                        break;
                }

            })
        })
    })
}