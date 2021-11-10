import React, { useState, useEffect } from "react";
import ShowMoreText from "react-show-more-text";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  OverlayTrigger,
  Table,
  Tooltip,
  Container,
  Row,
  Col,
  ProgressBar,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import { ListGroupItem, ListGroup, Progress } from "reactstrap";
import {
  countAstrologer,
  getListAstrologer,
} from "./../service/astrologer.service.js";
import {
  countCustomer,
  getListCustomer,
} from "./../service/customer.service.js";
import { getListPost } from "./../service/post.service.js";

function Dashboard() {
  const [countAstro, setCountAstro] = useState(0);
  const [countCus, setCountCus] = useState(0);

  const [newAstro, setNewAstro] = useState([]);
  const [newCustomer, setNewCustomer] = useState([]);

  const [bestAstro, setBestAstro] = useState([]);

  const [newPost, setNewPost] = useState([]);

  const history = useHistory();

  useEffect(() => {
    numberAstrologer();
  }, []);

  useEffect(() => {
    newAstrologer();
  }, []);

  useEffect(() => {
    bestAstrologer();
  }, []);

  useEffect(() => {
    newCustomers();
  }, []);

  useEffect(() => {
    numberCustomer();
  }, []);

  useEffect(() => {
    newPosts();
  }, []);

  const newPosts = () => {
    getListPost(1, 1)
      .then((res) => {
        var temp = res.data.data.list;
        console.log("post: ", temp);
        setNewPost(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const numberAstrologer = () => {
    countAstrologer()
      .then((res) => {
        var temp = res.data.data.total;
        console.log("astro: ", temp);
        setCountAstro(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const newAstrologer = () => {
    getListAstrologer(1, 3)
      .then((res) => {
        var temp = res.data.data.list;
        console.log("astro: ", temp);
        setNewAstro(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const bestAstrologer = () => {
    getListAstrologer(2, 5)
      .then((res) => {
        var temp = res.data.data.list;
        console.log("best astro: ", temp);
        setBestAstro(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const numberCustomer = () => {
    countCustomer()
      .then((res) => {
        var temp = res.data.data.total;
        console.log("customer: ", temp);
        setCountCus(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const newCustomers = () => {
    getListCustomer(1, 3)
      .then((res) => {
        var temp = res.data.data.list;
        console.log("customer: ", temp);
        setNewCustomer(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-circle-09 text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Astrologer</p>
                      <Card.Title as="h4" style={{ color: "orange" }}>
                        {countAstro}
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-arrow-up"></i> Updating
                </div>
              </Card.Footer>
            </Card>
          </Col>

          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-single-02 text-info"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Customer</p>
                      <Card.Title as="h4" style={{ color: "blue" }}>
                        {countCus}
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-arrow-up"></i> Updating
                </div>
              </Card.Footer>
            </Card>
          </Col>

          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-explore-2 text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <Card.Title as="h4" style={{ color: "Yellow" }}>
                        $ 1,345
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  In the last week
                </div>
              </Card.Footer>
            </Card>
          </Col>

          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-android text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Downmoaded</p>
                      <Card.Title as="h4">+45</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock mr-1"></i>
                  In the last hour
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            {newPost.map((item, index) => {
              return (
                <Card>
                  <Card.Body>
                    <Row>
                      <Col md="6">
                        <h4>{item.title}</h4>
                        <p className="card-category">
                          Posted by: {item.astrologer.name}
                        </p>
                        <br />
                       
                        <ShowMoreText
                          /* Default options */
                          lines={10}
                          
                          anchorClass="my-anchor-css-class"
                          expanded={false}
                          width={500}
                          onClick={()=>{
                            localStorage.setItem("postId", item.id);
                            history.push("/admin/detail-post");
                          }}
                          truncatedEndingComponent={"... "}>
                          {item.content}
                        </ShowMoreText>
                      </Col>
                      <Col className="ml-auto mr-auto" md="6">
                        <img
                          alt="..."
                          src={item.image_url}
                          style={{
                            width: 570,
                            height: 400,
                            borderRadius: 10,
                          }}></img>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Top 5 Astrologer of the month</Card.Title>
              </Card.Header>

              <Card.Body>
                <ListGroup className="list my--3" flush>
                  {bestAstro.map((item, index) => {
                    return (
                      <ListGroupItem className="px-0">
                        <Row className="align-items-center">
                          <Col className="col-auto">
                            <img
                              alt="..."
                              src={item.url_image}
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 400 / 2,
                              }}
                            />
                          </Col>
                          <div className="col ml--2">
                            <a
                              href="#pablo"
                              onClick={() => {
                                localStorage.setItem("astrologer", item.id);
                                localStorage.setItem(
                                  "genderAstro",
                                  item.gender ? "Male" : "Female"
                                );
                              }}>
                              <Link to={"/admin/astrologer-info"}>
                                {item.name}
                              </Link>
                            </a>
                            <br />
                            {item.deleted_at == null ? (
                              <span className="text-success mr-1">
                                ●<small> Online</small>
                              </span>
                            ) : (
                              <span className="text-danger mr-1">
                                ●<small> Offline</small>
                              </span>
                            )}
                          </div>
                        </Row>
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col md="8">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">New Astrologer</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table className="table-hover">
                    <tbody>
                      {newAstro.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td
                              onClick={() => {
                                localStorage.setItem("astrologer", item.id);
                                localStorage.setItem(
                                  "genderAstro",
                                  item.gender ? "Male" : "Female"
                                );
                              }}>
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                    alt="..."
                                    style={{
                                      width: 50,
                                      height: 50,
                                      borderRadius: 400 / 2,
                                    }}
                                    src={item.url_image}></img>{" "}
                                </Col>
                                <div className="col ml--2">
                                  <Link to={"/admin/astrologer-info"}>
                                    {item.name}
                                  </Link>
                                </div>
                              </Row>
                            </td>

                            <td>{item.gender ? "Male" : "Female"}</td>
                            <td>{item.phone_number}</td>
                            <td>
                              {moment(item.time_of_birth).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )}
                            </td>
                            <td></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">New Customer</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table className="table-hover">
                    <tbody>
                      {newCustomer.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td
                              onClick={() => {
                                localStorage.setItem("customerId", item.id);
                                localStorage.setItem(
                                  "genderCus",
                                  item.gender ? "Male" : "Female"
                                );
                              }}>
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                    alt="..."
                                    style={{
                                      width: 50,
                                      height: 50,
                                      borderRadius: 400 / 2,
                                    }}
                                    src={item.url_image}></img>{" "}
                                </Col>
                                <div className="col ml--2">
                                  <Link to={"/admin/customer-info"}>
                                    {item.name}
                                  </Link>
                                </div>
                              </Row>
                            </td>

                            <td onClick={() => {}}>
                              {item.gender ? "Male" : "Female"}
                            </td>
                            <td onClick={() => {}}>{item.phone_number}</td>
                            <td onClick={() => {}}>
                              {moment(item.time_of_birth).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )}
                            </td>
                            <td></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
