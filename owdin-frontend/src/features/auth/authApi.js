import { auth } from "../../../firebase-config";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword ,signOut} from "firebase/auth";

export const signInWithEmailPassword = async (email,password)=>{
    const userCredentials = await signInWithEmailAndPassword(auth,email,password);
    return userCredentials;
}

export const signUpWithEmailPassword = async (email,password)=>{
    const userCredentials = await createUserWithEmailAndPassword(auth,email,password);
    return userCredentials;
}

export const signInWithGoogle = async()=>{
    const provider = new GoogleAuthProvider();
    const userCredentials = await signInWithPopup(auth,provider)
    return userCredentials;
}

export const logoutUser = async()=>{
    await signOut(auth);
}