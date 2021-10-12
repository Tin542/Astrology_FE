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


const loginWithGoogle = async () => {
    try {
      const res = await auth.signInWithPopup(googleProvider);
  
      let t = await getToken(res.user._lat);
      console.log("tokennn",res.user._lat);
      console.log("tttttt", t);
      // localStorage.setItem("token", t.token);
      console.log("respone", res);
      // localStorage.setItem("name", res.name);
      // localStorage.setItem("email", res.data.email);
    } catch (err) {
        console.log(err)
        return
    }
};

async function getToken(fbToken){
  post("/api/v1/users/login", {token: fbToken});
}

const logout = () => {
  auth.signOut();
};

export { auth, db, storage, loginWithGoogle, logout };
