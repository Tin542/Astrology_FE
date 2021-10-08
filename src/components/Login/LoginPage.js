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
      // let response = post("/api/v1/users/login", {token: user.getIdToken()});
      // console.log(response.data.token);

      history.replace("/admin/dashboard");
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

          {/* <Container>
            <Col className="mx-auto" lg="4" md="8">
              <Form action="" className="form" method="">
                <Card className={"card-login " + cardClasses}>
                  <Card.Header>
                    <h3 className="header text-center">Login</h3>
                  </Card.Header>
                  <Card.Body>
                    <Card.Body>
                      <Form.Group
                        onSubmit={(e) => {
                          handleSubmit(e);
                        }}
                      >
                        <label>Username</label>
                        <Form.Control
                          placeholder="Enter username"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          placeholder="Password"
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Card.Body>
                  </Card.Body>
                  <Card.Footer className="ml-auto mr-auto">
                    <Button className="btn-wd" type="submit" variant="warning">
                      Login
                    </Button>
                  </Card.Footer>
                </Card>
              </Form>
            </Col>
          </Container> */}
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
