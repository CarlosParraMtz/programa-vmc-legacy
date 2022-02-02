import { atom } from 'recoil';

const layoutState = atom({
    key: "layoutState",
    default: {
        agregarAsignacionesDialog: false
    }
})

export default layoutState;