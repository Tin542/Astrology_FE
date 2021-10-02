import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

function PostTables() {
  return (
    <>
      <Container fluid>
        
        <Row>
          <Col md="12">
            <Card className="table-big-boy">
              <Card.Header>
                <Card.Title as="h4">All Post</Card.Title>
                <br></br>
              </Card.Header>
              <Card.Body className="table-full-width">
                <Table className="table-bigboy">
                  <thead>
                    <tr>
                      <th className="text-center">Thumb</th>
                      <th>Title</th>
                      <th className="th-description">Description</th>
                      <th className="text-right">Date</th>
                      <th className="text-right">Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="img-container">
                          <img
                            alt="..."
                            src={require("assets/img/blog-1.jpg").default}
                          ></img>
                        </div>
                      </td>
                      <td className="td-name">
                        10 Things that all designers do
                      </td>
                      <td>
                        Most beautiful agenda for the office, really nice paper
                        and black cover. Most beautiful agenda for the office.
                      </td>
                      <td className="td-number">30/08/2016</td>
                      <td className="td-number">Watting</td>
                      <td className="td-actions">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-618009180">
                              View Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="info"
                          >
                            <i className="far fa-image"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-461494662">
                              Approve
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-408856985">
                              Denined
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div className="img-container">
                          <img
                            alt="..."
                            src={require("assets/img/blog-1.jpg").default}
                          ></img>
                        </div>
                      </td>
                      <td className="td-name">
                        10 Things that all designers do
                      </td>
                      <td>
                        Most beautiful agenda for the office, really nice paper
                        and black cover. Most beautiful agenda for the office.
                      </td>
                      <td className="td-number">30/08/2016</td>
                      <td className="td-number">Approved</td>
                      <td className="td-actions">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-618009180">
                              View Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="info"
                          >
                            <i className="far fa-image"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-461494662">
                              Approve
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-408856985">
                              Denined
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div className="img-container">
                          <img
                            alt="..."
                            src={require("assets/img/blog-1.jpg").default}
                          ></img>
                        </div>
                      </td>
                      <td className="td-name">
                        10 Things that all designers do
                      </td>
                      <td>
                        Most beautiful agenda for the office, really nice paper
                        and black cover. Most beautiful agenda for the office.
                      </td>
                      <td className="td-number">30/08/2016</td>
                      <td className="td-number">Denied</td>
                      <td className="td-actions">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-618009180">
                              View Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="info"
                          >
                            <i className="far fa-image"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-461494662">
                              Approve
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-408856985">
                              Denined
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                    
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PostTables;
