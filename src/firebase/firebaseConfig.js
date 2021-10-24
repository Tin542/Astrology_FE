import firebase from "firebase";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";
import { post, postToken } from "../service/ReadAPI";
import React, { useEffect, useState } from "react";
import axios from "axios";

const app = firebase.initializeApp({
  apiKey: "AIzaSyD2ogfJ4NPcKRRyMjFkKlcLfEs9WiU-zm4",
  authDomain: "spiritastro-2bfba.firebaseapp.com",
  projectId: "spiritastro-2bfba",
  storageBucket: "spiritastro-2bfba.appspot.com",
  messagingSenderId: "411027037183",
  appId: "1:411027037183:web:f2a05e64798808820be5ca",
  measurementId: "G-GQJ2YXVPVS",
});

if (!firebase.apps.length) {
  app;
} else {
  firebase.app(); // if already initialized, use that one
}
const storage = firebase.storage();
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

async function getToken(fbToken){
  return post("/api/v1/users/login", {token: fbToken});
}
const loginWithGoogle = async () => {
    try {
      const res = await auth.signInWithPopup(googleProvider);
  
      let t = await getToken(res.user._lat);
      console.log("firebase token: ",res.user._lat);
      console.log("authen token: ", t.data.data.token);
      console.log("respone", res);
      console.log("t: ", t);

      localStorage.setItem("token", t.data.data.token);
      localStorage.setItem("NAME", res.user.displayName);
      localStorage.setItem("EMAIL", res.user.email);
      localStorage.setItem("IMAGE", res.user.photoURL);
      localStorage.setItem("UID", res.user.uid);
      localStorage.setItem("PHONE", res.user.phoneNumber);
      
    } catch (err) {
        console.log(err)
        return
    }
};



const logout = () => {
  auth.signOut();
};

export { auth, db, storage, loginWithGoogle, logout };
