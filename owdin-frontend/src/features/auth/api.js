import { auth, db } from "../../../firebase-config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createUser } from "../../app/api";

export const signInWithEmailPassword = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential;
};

export const signUpWithEmailPassword = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  createUser({
    userId: userCredential.user.uid,
    name,
    email: userCredential.user.email,
  });
  return userCredential;
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);

  createUser({
    userId: userCredential.user.uid,
    name: userCredential.user.email,
    email: userCredential.user.email,
  });
  return userCredential;
};

export const logoutUser = async () => {
  await signOut(auth);
};
