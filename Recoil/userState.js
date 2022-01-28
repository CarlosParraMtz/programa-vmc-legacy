import { atom } from "recoil";
const userState = atom({
    key:"userState",
    default: {
        logeado: false,
        uid: "",
        congregacion:"",        
        nombre: "",
        email: ""
    }
})
export default userState;