import firebase from "firebase";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";
import { postToken } from "../service/ReadAPI";
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
localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNyIsInJvbGVzIjoiODg4IiwiYnVmZmVyX3RpbWUiOiI4NjQwMCIsImV4cCI6MTYzNDMxMDg3NiwiaXNzIjoicW1QbHVzIiwibmJmIjoxNjMzNzA2MDc2LCJpYXQiOjE2MzM3MDYwNzZ9.D7I08N16RhSFkzr7_nmTCZDQfnyviTVeeswRkPMKtqY")

const loginWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    //This is JWT
    console.log(await user.getIdToken());
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
    }
    // let response = postToken("/api/v1/users/login", user.getIdToken());

    // console.log(response.data.token);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  auth.signOut();
};

export { auth, db, storage, loginWithGoogle, logout };
