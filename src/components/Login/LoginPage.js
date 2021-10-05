import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

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

firebase.initializeApp({
  apiKey: "AIzaSyCNVzgyS3m8miaYAqoSoCTOI1aX9squ7Fg",
  authDomain: "spiritastro-2bfba.firebaseapp.com",
});
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
class LoginPage extends Component {
  state = { isSignedIn: false };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user });
      console.log("user", user);
    });
  };
  // const history = useHistory();
  // const [cardClasses, setCardClasses] = React.useState("card-hidden");
  // React.useEffect(() => {
  //   setTimeout(function () {
  //     setCardClasses("");
  //   }, 1000);
  // });
  //   let response = await axios.post(
  //     "http://localhost:9999/BookStore/auth/signin",
  //     body,
  //     { headers }
  //   );
  //   localStorage.setItem(
  //     "auth",
  //     response.data.type + " " + response.data.token
  //   );
  //   return response;
  //    }
  // async function handleSubmit(event) {
  //   event.preventDefault();

  //   try {
  // const authortication = await access();
  // if (authortication.data.roles[0] === "ROLE_ADMIN") {
  //   history.push("/admin");
  // } else if (authortication.data.roles[0] === "ROLE_USER") {
  //   history.push("/user");
  // } else {
  //   history.push("/");
  // }
  //     history.push("/admin/Dashboard");
  //   } catch (e) {
  //     alert("Username or password incoorect !");
  //     console.log(e.stack);
  //   }
  // }
  render() {
    return (
      <>
        <div
          className="full-page section-image"
          data-color="black"
          data-image={require("assets/img/full-screen-image-2.jpg").default}>
          <div className="content d-flex align-items-center p-0">
            <Container>
              <Col className="mx-auto" lg="4" md="8">
                <Form action="" className="form" method="">
                  <Card className={"card-login "}>
                    <Card.Header>
                      <h3 className="header text-center">Login</h3>
                    </Card.Header>
                    <Card.Body>
                      <Card.Body>
                        {this.state.isSignedIn ? (
                          <span>
                            <div>Signed In!</div>
                            <button onClick={() => firebase.auth().signOut()}>
                              Sign out!
                            </button>
                            <h1>
                              Welcome {firebase.auth().currentUser.displayName}
                            </h1>
                            <img
                              alt="profile picture"
                              src={firebase.auth().currentUser.photoURL}
                            />
                          </span>
                        ) : (
                          <StyledFirebaseAuth
                            uiConfig={this.uiConfig}
                            firebaseAuth={firebase.auth()}
                          />
                        )}
                        {/* <Form.Group>
                        <label>Email address</label>
                        <Form.Control
                          placeholder="Enter email"
                          type="email"
                          required="true"></Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          placeholder="Password"
                          type="password"
                          required="true"></Form.Control>
                      </Form.Group>
                      <Form.Check className="pl-0">
                        <Form.Check.Label>
                          <Form.Check.Input
                            defaultChecked
                            type="checkbox"></Form.Check.Input>
                          <span className="form-check-sign"></span>
                          Remember password ?
                        </Form.Check.Label>
                      </Form.Check> */}
                      </Card.Body>
                    </Card.Body>
                    {/* <Card.Footer className="ml-auto mr-auto">
                    <Button className="btn-wd" type="submit" variant="warning" onClick=
                      {(e) => {
                        handleSubmit(e);
                      }}>
                      
                      Login
                    </Button>
                  </Card.Footer> */}
                  </Card>
                </Form>
              </Col>
            </Container>
          </div>
          <div
            className="full-page-background"
            style={{
              backgroundImage:
                "url(" +
                require("assets/img/full-screen-image-2.jpg").default +
                ")",
            }}></div>
        </div>
      </>
    );
  }
}

export default LoginPage;
