import { atom } from "recoil";
const userState = atom({
    key: "userState",
    default: {
        logeado: false,
        uid: "",
        data: {
            congregacion: {
                id:'',
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