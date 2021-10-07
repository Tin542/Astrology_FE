import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD2ogfJ4NPcKRRyMjFkKlcLfEs9WiU-zm4",
  authDomain: "spiritastro-2bfba.firebaseapp.com",
  projectId: "spiritastro-2bfba",
  storageBucket: "spiritastro-2bfba.appspot.com",
  messagingSenderId: "411027037183",
  appId: "1:411027037183:web:f2a05e64798808820be5ca",
  measurementId: "G-GQJ2YXVPVS"
  };
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
// var token = await user!.getIdToken(true);
//         while (token.length > 0) {
//           int initLength = (token.length >= 500 ? 500 : token.length);
//           print(token.substring(0, initLength));
//           int endLength = token.length;
//           token = token.substring(initLength, endLength);
//         }
const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    //This is JWT
    
    ////////////
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
      console.log(await user.getIdToken());
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// const signInWithEmailAndPassword = async (email, password) => {
//   try {
//     await auth.signInWithEmailAndPassword(email, password);
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
// const registerWithEmailAndPassword = async (name, email, password) => {
//   try {
//     const res = await auth.createUserWithEmailAndPassword(email, password);
//     const user = res.user;
//     await db.collection("users").add({
//       uid: user.uid,
//       name,
//       authProvider: "local",
//       email,
//     });
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
// const sendPasswordResetEmail = async (email) => {
//   try {
//     await auth.sendPasswordResetEmail(email);
//     alert("Password reset link sent!");
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

const logout = () => {
  auth.signOut();
};

export {
  auth,
  db,
  signInWithGoogle,
  // signInWithEmailAndPassword,
  // registerWithEmailAndPassword,
  // sendPasswordResetEmail,
  logout,
};

  // export default firebaseConfig;