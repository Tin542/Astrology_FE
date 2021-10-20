import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, loginWithGoogle } from "../../firebase/firebaseConfig";
import { Link, useHistory } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { postToken, post } from "../../service/ReadAPI";
import "./login.css";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Col,
} from "react-bootstrap";

function LoginPage() {
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user){
      history.push("/admin/dashboard");
    } 
  }, [user, loading]);

  const [cardClasses, setCardClasses] = React.useState("card-hidden");
  React.useEffect(() => {
    setTimeout(function () {
      setCardClasses("");
    });
  });
  

  return (
    <>
     <div
        className="full-page section-image"
        data-color="white"
        data-image={require("assets/img/full-screen-image-2.jpg").default}
      >
        <div className="content d-flex align-items-center p-0">
          <div className="login">
            <div className="login__container">
             

              <h2>SIGN IN</h2>
              <div className="google-btn" onClick={loginWithGoogle}>
                <div className="google-icon-wrapper">
                  <FcGoogle className="google-icon" />
                </div>
                <p className="btn-text">
                  <b>Sign in with google</b>
                </p>
              </div>
            </div>
          </div>

        </div>

        <div
          className="full-page-background"
          style={{
            backgroundImage:
              "url(" +
              require("assets/img/full-screen-image-2.jpg").default +
              ")",
          }}
        ></div>
      </div>
    </>
  );
}

export default LoginPage;
