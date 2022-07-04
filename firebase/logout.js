import config from "./config";
import { getAuth } from "firebase/auth";

export default function logout () {
    const auth = getAuth(config);
    auth.signOut();
}