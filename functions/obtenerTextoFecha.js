export default function obtenerTextoFecha(fecha) {
    let date = new Date(fecha)
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
        return date.toLocaleDateString(
            'es-ES',
            { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        ).replace(/^\w/, (c) => c.toUpperCase())
}