import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD2ogfJ4NPcKRRyMjFkKlcLfEs9WiU-zm4",
  authDomain: "spiritastro-2bfba.firebaseapp.com",
  projectId: "spiritastro-2bfba",
  storageBucket: "spiritastro-2bfba.appspot.com",
  messagingSenderId: "411027037183",
  appId: "1:411027037183:web:f2a05e64798808820be5ca",
  measurementId: "G-GQJ2YXVPVS",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

const loginWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;

    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    alert("login success !");
    console.log(user.getIdToken());
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  auth.signOut();
};

export {
  auth,
  db,
  loginWithGoogle,
  // signInWithEmailAndPassword,
  // registerWithEmailAndPassword,
  // sendPasswordResetEmail,
  logout,
};
