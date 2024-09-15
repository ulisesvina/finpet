import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
} from "firebase/auth";

import { db, firebaseAuth } from "./config";
import { doc, setDoc, getDoc } from "firebase/firestore";

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(firebaseAuth, callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(firebaseAuth, provider);

    if (!result || !result.user) {
      throw new Error("Google sign in failed");
    }

    const docSnap = await getDoc(doc(db, "users", result.user.uid));
    if (!docSnap.exists()) {
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      });

      alert("User added to firestore");

      await fetch(`${process.env.BACKEND_URL}/add_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
        }),
      });

      alert("User added to backend");
    }

    return result.user.uid;
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOutWithGoogle() {
  try {
    await firebaseAuth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
