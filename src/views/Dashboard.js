import React from "react";
// react component used to create charts
import ChartistGraph from "react-chartist";
// react components used to create a SVG / Vector map
import { VectorMap } from "react-jvectormap";

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
} from "react-bootstrap";
import { ListGroupItem, ListGroup, Progress } from "reactstrap";

function Dashboard() {
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
                      <Card.Title as="h4">150</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-single-02 text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Customer</p>
                      <Card.Title as="h4">150</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <Card.Title as="h4">$ 1,345</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
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
                      <Card.Title as="h4">+45K</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Team Member</Card.Title>
              </Card.Header>

              <Card.Body>
                <ListGroup className="list my--3" flush>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <img
                          alt="..."
                          src={require("assets/img/faces/bac.jpg").default}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 400 / 2,
                          }}
                        />
                      </Col>
                      <div className="col ml--2">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Nguyễn Văn Bắc
                        </a>
                        <br />

                        <span className="text-success mr-1">●</span>
                        <small>Online</small>
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <img
                          alt="..."
                          src={require("assets/img/faces/tin.jpg").default}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 400 / 2,
                          }}
                        />
                      </Col>
                      <div className="col ml--2">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Nguyễn Thành Tín
                        </a>
                        <br />

                        <span className="text-success mr-1">●</span>
                        <small>Online</small>
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <img
                          alt="..."
                          src={require("assets/img/faces/vu.jpg").default}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 400 / 2,
                          }}
                        />
                      </Col>
                      <div className="col ml--2">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Trần Quang Vũ
                        </a>
                        <br />

                        <span className="text-success mr-1">●</span>
                        <small>Online</small>
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <img
                          alt="..."
                          src={require("assets/img/faces/dat.jpg").default}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 400 / 2,
                          }}
                        />
                      </Col>
                      <div className="col ml--2">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Nhâm Đức Đạt
                        </a>
                        <br />

                        <span className="text-success mr-1">●</span>
                        <small>Online</small>
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <img
                          alt="..."
                          src={require("assets/img/faces/face-1.jpg").default}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 400 / 2,
                          }}
                        />
                      </Col>
                      <div className="col ml--2">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Phan Trung Dũng
                        </a>
                        <br />

                        <span className="text-success mr-1">●</span>
                        <small>Online</small>
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <img
                          alt="..."
                          src={require("assets/img/faces/tram.jpg").default}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 400 / 2,
                          }}
                        />
                      </Col>
                      <div className="col ml--2">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Đào Bảo Trâm
                        </a>
                        <br />

                        <span className="text-success mr-1">●</span>
                        <small>Online</small>
                      </div>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">Tasks</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table className="table-hover">
                    <tbody>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>Call agora api</td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-688296980">
                                Edit Task..
                              </Tooltip>
                            }
                            placement="top">
                            <Button
                              className="btn-simple btn-link"
                              type="button"
                              variant="info">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-202192706">Remove..</Tooltip>
                            }
                            placement="top">
                            <Button
                              className="btn-simple btn-link"
                              type="button"
                              variant="danger">
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>fix Edit Famous Person API</td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-746544352">
                                Edit Task..
                              </Tooltip>
                            }
                            placement="top">
                            <Button
                              className="btn-simple btn-link"
                              type="button"
                              variant="info">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-743037005">Remove..</Tooltip>
                            }
                            placement="top">
                            <Button
                              className="btn-simple btn-link"
                              type="button"
                              variant="danger">
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>Approve Credit for api</td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-855684210">
                                Edit Task..
                              </Tooltip>
                            }
                            placement="top">
                            <Button
                              className="btn-simple btn-link"
                              type="button"
                              variant="info">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-242945902">Remove..</Tooltip>
                            }
                            placement="top">
                            <Button
                              className="btn-simple btn-link"
                              type="button"
                              variant="danger">
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">Progress</Card.Title>
              </Card.Header>
              <Card.Body>
                <ListGroup className="list my--3" flush>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <div className="col">
                        <h5>Backend</h5>
                        <Progress
                          className="progress-xs mb-0"
                          color="orange"
                          max="100"
                          value="90"
                        />
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <div className="col">
                        <h5>Mobile</h5>
                        <Progress
                          className="progress-xs mb-0"
                          color="success"
                          max="100"
                          value="95"
                        />
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <div className="col">
                        <h5>Frontend</h5>
                        <Progress
                          className="progress-xs mb-0"
                          color="info"
                          max="100"
                          value="80"
                        />
                      </div>
                    </Row>
                  </ListGroupItem>
                  
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
