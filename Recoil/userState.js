import { atom } from "recoil";
const userState = atom({
    key: "userState",
    default: {
        logeado: false,
        uid: "",
        data: {
            configuraciones: {
                salas: 2
            },
            congregacion: {
                nombre: '',
                ciudad: '',
                estado: '',
                pais: ''
            }
        },
        nombre: "",
        email: ""
    }
})
export default userState;