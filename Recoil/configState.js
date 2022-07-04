import { atom } from 'recoil';

const configState = atom({
    key: "configState",
    default: {
        salas: 2
    }
})

export default configState;