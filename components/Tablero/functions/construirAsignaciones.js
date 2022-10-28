export default function construirAsignaciones(matriculados, data) {

    const matriculadosSO = [...matriculados]
    const mtrs = matriculadosSO.sort((x, y) => x.ultimaAsignacion.fecha.localeCompare(y.ultimaAsignacion.fecha))

    /*
            let listaMtrSinFamilia = [];
            matriculadosSO.forEach(mtr=>{
                if(mtr.familia.apellidos===""){
                    listaMtrSinFamilia.push({...mtr})
                }
            })
            if(listaMtrSinFamilia.length > 0) {
                mostrarError("Hay matriculados que no han sido agrupados en familias. Agregue las familias correspondientes para poder generar las asignaciones. Si es necesario, pueden ser familias que contengan un solo miembro.");
                return;
            }
    */

    //TODO Falta hacer que la función determine si los matriculados tienen demasiados compañeros para reiniciar el contador

    let mtrSinGuardar = []
    let d = { ...data }

    d.fechas.forEach(fecha => {
        fecha.asignaciones.forEach(asignacion => {
            asignacion.salas.forEach((sala, salaNum) => {

                function agregarAsignacion(asignado) {
                    fecha.familias.push(asignado.familia);
                    sala.asignados.push({ nombre: asignado.nombre, id: asignado.id });
                    mtrSinGuardar.push(asignado)
                }

                const obtenerSala = (salaNum) => {
                    if (salaNum === 0) { return "A" }
                    if (salaNum === 1) { return "B" }
                    if (salaNum === 2) { return "C" }
                }

                function obtenerSalaNum(salaLetra) {
                    if (salaLetra === "A") { return 0 }
                    if (salaLetra === "B") { return 1 }
                    if (salaLetra === "C") { return 2 }
                }

                function intentaEncontrarMtrEnAsignadosSinGuardar(mtr) {
                    const encontrado = mtrSinGuardar.find(m => mtr.id === m.id)
                    if (encontrado) { return true }
                    return false;
                }











                switch (asignacion.tipo) {

                    case "Primera conversación":
                        if (sala.asignados.length != 0) { return }
                        let asignadoPC = mtrs.find(mtr => {
                            const famEncontrada = fecha.familias.find(fml => fml.id === mtr.familia.id);
                            const yaEstaAsignado = intentaEncontrarMtrEnAsignadosSinGuardar(mtr);
                            return (
                                mtr.posiblesAsignaciones["Primera conversación"] &&
                                (
                                    mtr.asignacionesAnteriores.length === 0 ||
                                    (
                                        mtr.asignacionesAnteriores.length > 0 &&
                                        (
                                            mtr.asignacionesAnteriores[0].sala !== obtenerSalaNum(mtr.asignacionesAnteriores[0].sala) &&
                                            (mtr.asignacionesAnteriores[0].tipo === "Ayudante" || !mtr.posiblesAsignaciones["Ayudante"])
                                        )
                                    )
                                ) &&
                                !yaEstaAsignado &&
                                (
                                    !famEncontrada
                                    || mtr.familia.apellidos === ''
                                )
                            );
                        })


                        let ayudantePC = mtrs.find(mtr => {
                            const famEncontrada = fecha.familias.find(fml => fml.id === mtr.familia.id);
                            const yaEstaAsignado = intentaEncontrarMtrEnAsignadosSinGuardar(mtr);
                            const yaFueSuAyudante = asignadoPC.ayudantesAnteriores.find(
                                ayudanteAnterior => ayudanteAnterior.id === mtr.id);
                            const esDelMismoGenero = asignadoPC.genero === mtr.genero;
                            return (
                                mtr.posiblesAsignaciones["Ayudante"] &&
                                (
                                    mtr.asignacionesAnteriores.length === 0 ||
                                    (
                                        mtr.asignacionesAnteriores.length > 0 &&
                                        (
                                            mtr.asignacionesAnteriores[0].sala !== obtenerSalaNum(mtr.asignacionesAnteriores[0].sala) &&
                                            (
                                                mtr.asignacionesAnteriores[0].tipo !== "Ayudante" ||
                                                (
                                                    !mtr.posiblesAsignaciones["Primera conversación"] &&
                                                    !mtr.posiblesAsignaciones["Revisita"] &&
                                                    !mtr.posiblesAsignaciones["Curso bíblico"]
                                                )
                                            )
                                        )
                                    )
                                ) &&
                                !yaEstaAsignado &&
                                !yaFueSuAyudante &&
                                esDelMismoGenero &&
                                (!famEncontrada || mtr.familia.apellidos === '')
                            );
                        })

                        //* Acomodar asignaciones anteriores
                        let asAntPC = [...asignadoPC.asignacionesAnteriores]
                        asAntPC.splice(0, 0, {
                            fecha: fecha.fecha,
                            sala: obtenerSala(salaNum),
                            tipo: "Primera conversación",
                            acompañante: ayudantePC.id
                        })

                        let yAntPC = [...ayudantePC.asignacionesAnteriores]
                        yAntPC.splice(0, 0, {
                            fecha: fecha.fecha,
                            sala: obtenerSala(salaNum),
                            tipo: "Ayudante",
                            acompañante: asignadoPC.id
                        })


                        agregarAsignacion({
                            ...asignadoPC,
                            asignacionesAnteriores: asAntPC,
                            ayudantesAnteriores: [...asignadoPC.ayudantesAnteriores].concat({ nombre: ayudantePC.nombre, id: ayudantePC.id })
                        });

                        agregarAsignacion({
                            ...ayudantePC,
                            asignacionesAnteriores: yAntPC,
                            ayudantesAnteriores: [...ayudantePC.ayudantesAnteriores].concat({ nombre: asignadoPC.nombre, id: asignadoPC.id })
                        });
                        break;

















                    case "Revisita":
                        if (sala.asignados.length != 0) { return }
                        let asignadoR = mtrs.find(mtr => {
                            const famEncontrada = fecha.familias.find(fml => fml.id === mtr.familia.id);
                            const yaEstaAsignado = intentaEncontrarMtrEnAsignadosSinGuardar(mtr);
                            return (
                                mtr.posiblesAsignaciones["Revisita"] &&
                                (
                                    mtr.asignacionesAnteriores.length === 0 ||
                                    (
                                        mtr.asignacionesAnteriores.length > 0 &&
                                        (
                                            mtr.asignacionesAnteriores[0].sala !== obtenerSalaNum(mtr.asignacionesAnteriores[0].sala) &&
                                            (mtr.asignacionesAnteriores[0].tipo === "Ayudante" || !mtr.posiblesAsignaciones["Ayudante"])
                                        )
                                    )
                                ) &&
                                !yaEstaAsignado &&
                                (
                                    !famEncontrada
                                    || mtr.familia.apellidos === ''
                                )
                            )
                        })


                        let ayudanteR = mtrs.find(mtr => {
                            const famEncontrada = fecha.familias.find(fml => fml.id === mtr.familia.id);
                            const yaEstaAsignado = intentaEncontrarMtrEnAsignadosSinGuardar(mtr);
                            const yaFueSuAyudante = asignadoR.ayudantesAnteriores.find(ayudanteAnterior => ayudanteAnterior.id === mtr.id)
                            const esDelMismoGenero = asignadoR.genero === mtr.genero;
                            return (
                                mtr.posiblesAsignaciones["Ayudante"] &&
                                (
                                    mtr.asignacionesAnteriores.length === 0 ||
                                    (
                                        mtr.asignacionesAnteriores.length > 0 &&
                                        (
                                            mtr.asignacionesAnteriores[0].sala !== obtenerSalaNum(mtr.asignacionesAnteriores[0].sala) &&
                                            (
                                                mtr.asignacionesAnteriores[0].tipo !== "Ayudante" ||
                                                (
                                                    !mtr.posiblesAsignaciones["Primera conversación"] &&
                                                    !mtr.posiblesAsignaciones["Revisita"] &&
                                                    !mtr.posiblesAsignaciones["Curso bíblico"]
                                                )
                                            )
                                        )
                                    )
                                ) &&
                                !yaEstaAsignado &&
                                !yaFueSuAyudante &&
                                esDelMismoGenero &&
                                (!famEncontrada || mtr.familia.apellidos === '')
                            );
                        })


                        //* Acomodar asignaciones anteriores
                        let asAntR = [...asignadoR.asignacionesAnteriores]
                        asAntR.splice(0, 0, {
                            fecha: fecha.fecha,
                            sala: obtenerSala(salaNum),
                            tipo: "Revisita",
                            acompañante: ayudanteR.id
                        })

                        let yAntR = [...ayudanteR.asignacionesAnteriores]
                        yAntR.splice(0, 0, {
                            fecha: fecha.fecha,
                            sala: obtenerSala(salaNum),
                            tipo: "Ayudante",
                            acompañante: asignadoR.id
                        })


                        agregarAsignacion({
                            ...asignadoR,
                            asignacionesAnteriores: asAntR,
                            ayudantesAnteriores: [...asignadoR.ayudantesAnteriores].concat({ nombre: ayudanteR.nombre, id: ayudanteR.id })
                        });

                        agregarAsignacion({
                            ...ayudanteR,
                            asignacionesAnteriores: yAntR,
                            ayudantesAnteriores: [...ayudanteR.ayudantesAnteriores].concat({ nombre: asignadoR.nombre, id: asignadoR.id })
                        });
                        break;











                    case "Curso bíblico":
                        if (sala.asignados.length != 0) { return }
                        let asignadoCB = mtrs.find(mtr => {
                            const famEncontrada = fecha.familias.find(fml => fml.id === mtr.familia.id);
                            const yaEstaAsignado = intentaEncontrarMtrEnAsignadosSinGuardar(mtr);
                            return (
                                mtr.posiblesAsignaciones["Curso bíblico"] &&
                                (
                                    mtr.asignacionesAnteriores.length === 0 ||
                                    (
                                        mtr.asignacionesAnteriores.length > 0 &&
                                        (
                                            mtr.asignacionesAnteriores[0].sala !== obtenerSalaNum(mtr.asignacionesAnteriores[0].sala) &&
                                            (mtr.asignacionesAnteriores[0].tipo === "Ayudante" || !mtr.posiblesAsignaciones["Ayudante"])
                                        )
                                    )
                                ) &&
                                !yaEstaAsignado &&
                                (
                                    !famEncontrada
                                    || mtr.familia.apellidos === ''
                                )
                            );
                        })


                        let ayudanteCB = mtrs.find(mtr => {
                            const famEncontrada = fecha.familias.find(fml => fml.id === mtr.familia.id);
                            const yaEstaAsignado = intentaEncontrarMtrEnAsignadosSinGuardar(mtr);
                            const yaFueSuAyudante = asignadoCB.ayudantesAnteriores.find(ayudanteAnterior => ayudanteAnterior.id === mtr.id);
                            const esDelMismoGenero = asignadoCB.genero === mtr.genero;
                            return (
                                mtr.posiblesAsignaciones["Ayudante"] &&
                                (
                                    mtr.asignacionesAnteriores.length === 0 ||
                                    (
                                        mtr.asignacionesAnteriores.length > 0 &&
                                        (
                                            mtr.asignacionesAnteriores[0].sala !== obtenerSalaNum(mtr.asignacionesAnteriores[0].sala) &&
                                            (
                                                mtr.asignacionesAnteriores[0].tipo !== "Ayudante" ||
                                                (
                                                    !mtr.posiblesAsignaciones["Primera conversación"] &&
                                                    !mtr.posiblesAsignaciones["Revisita"] &&
                                                    !mtr.posiblesAsignaciones["Curso bíblico"]
                                                )
                                            )
                                        )
                                    )
                                ) &&
                                !yaEstaAsignado &&
                                !yaFueSuAyudante &&
                                esDelMismoGenero &&
                                (!famEncontrada || mtr.familia.apellidos === '')
                            );
                        })


                        //* Acomodar asignaciones anteriores
                        let asAntCB = [...asignadoCB.asignacionesAnteriores]
                        asAntCB.splice(0, 0, {
                            fecha: fecha.fecha,
                            sala: obtenerSala(salaNum),
                            tipo: "Curso bíblico",
                            acompañante: ayudanteCB.id
                        })

                        let yAntCB = [...ayudanteCB.asignacionesAnteriores]
                        yAntCB.splice(0, 0, {
                            fecha: fecha.fecha,
                            sala: obtenerSala(salaNum),
                            tipo: "Ayudante",
                            acompañante: asignadoCB.id
                        })


                        agregarAsignacion({
                            ...asignadoCB,
                            asignacionesAnteriores: asAntCB,
                            ayudantesAnteriores: [...asignadoCB.ayudantesAnteriores].concat({ nombre: ayudanteCB.nombre, id: ayudanteCB.id })
                        });

                        agregarAsignacion({
                            ...ayudanteCB,
                            asignacionesAnteriores: yAntCB,
                            ayudantesAnteriores: [...ayudanteCB.ayudantesAnteriores].concat({ nombre: asignadoCB.nombre, id: asignadoCB.id })
                        });

                        break;






                        






                    case "Discurso":
                        if (sala.asignados.length != 0) { return }
                        let asignadoDiscurso = mtrs.find(mtr => {
                            const famEncontrada = fecha.familias.find(fml => fml.id === mtr.familia.id);
                            const yaEstaAsignado = intentaEncontrarMtrEnAsignadosSinGuardar(mtr);
                            return (
                                mtr.posiblesAsignaciones["Discurso"] && mtr.genero === "hombre" && !yaEstaAsignado &&
                                (
                                    !famEncontrada
                                    || mtr.familia.apellidos === ''
                                )
                            );
                        })

                         //* Acomodar asignaciones anteriores
                         let asAntD = [...asignadoDiscurso.asignacionesAnteriores]
                         asAntD.splice(0, 0, {
                             fecha: fecha.fecha,
                             sala: obtenerSala(salaNum),
                             tipo: "Discurso",
                             acompañante: ""
                         })
                         agregarAsignacion({
                            ...asignadoDiscurso,
                            asignacionesAnteriores: asAntD,
                        });
                        
                        break;











                    case "Lectura":
                        if (sala.asignados.length != 0) { return }
                        let asignadoLectura = mtrs.find(mtr => {
                            const famEncontrada = fecha.familias.find(fml => fml.id === mtr.familia.id);
                            const yaEstaAsignado = intentaEncontrarMtrEnAsignadosSinGuardar(mtr);
                            if (
                                mtr.posiblesAsignaciones["Lectura"] && mtr.genero === "hombre" && !yaEstaAsignado &&
                                (
                                    !famEncontrada
                                    || mtr.familia.apellidos === ''
                                )
                            ) { return true; }
                            else return false;
                        })


                        //* Acomodar asignaciones anteriores
                        let asAntL = [...asignadoLectura.asignacionesAnteriores]
                        asAntL.splice(0, 0, {
                            fecha: fecha.fecha,
                            sala: obtenerSala(salaNum),
                            tipo: "Lectura",
                            acompañante: ""
                        })

                        agregarAsignacion({
                           ...asignadoDiscurso,
                           asignacionesAnteriores: asAntL,
                       });
                       
                        break;
                }

            })
        })
    })

    return {
        data: d,
        mtrSinGuardar
    }
}