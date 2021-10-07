import React, { Component } from "react";
import axios from "axios";

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

export default class PostTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      _posts: [],
      pageList: [],

      searchValue: "",
      searchPageList: [],
      isSearch: false,

      // _categories: [],
      // _publisher: [],
      // _author: [],

      // searchByCateValue: "",
      // category_ID: "",
      // searchByCatePageList: [],
      // isSearchByCate: false,

      page: 0,

      id: 0,
      title: "",
      content: "",
      created_at: "",
      is_approve: false,
      updated_at: "",
      category_id: 0,
      astrologer_id: 0,

      // modalIsOpen: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const headers = {
      "Content-Type": "application/json",
      // Authorization: localStorage.getItem("auth"),
    };
    axios
      .get("http://54.169.107.173/api/v1/posts", {
        headers,
      })
      .then((response) => {
        if (response.code === 0) {
          this.setState({
            loading: true,
            // _products: response.data.data.Books,
            _posts: response.data.list,
          });
          // this.showPageList(response.data);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  render() {
    const { _posts, loading } = this.state;

    if (!loading) {
      return <h1>loading...</h1>;
    }
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
                      {_posts.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="img-container">
                              <img
                                alt="..."
                                src={
                                  require("assets/img/blog-1.jpg").default
                                }></img>
                            </div>
                          </td>
                          <td className="td-name">{item.title}</td>
                          <td>
                            {item.content}
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
                              placement="left">
                              <Button
                                className="btn-link btn-icon"
                                type="button"
                                variant="info">
                                <i className="far fa-image"></i>
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-461494662">
                                  Approve
                                </Tooltip>
                              }
                              placement="left">
                              <Button
                                className="btn-link btn-icon"
                                type="button"
                                variant="success">
                                <i className="fas fa-edit"></i>
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-408856985">
                                  Denined
                                </Tooltip>
                              }
                              placement="left">
                              <Button
                                className="btn-link btn-icon"
                                type="button"
                                variant="danger">
                                <i className="fas fa-times"></i>
                              </Button>
                            </OverlayTrigger>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td>
                          <div className="img-container">
                            <img
                              alt="..."
                              src={
                                require("assets/img/blog-1.jpg").default
                              }></img>
                          </div>
                        </td>
                        <td className="td-name">
                          10 Things that all designers do
                        </td>
                        <td>
                          Most beautiful agenda for the office, really nice
                          paper and black cover. Most beautiful agenda for the
                          office.
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
                            placement="left">
                            <Button
                              className="btn-link btn-icon"
                              type="button"
                              variant="info">
                              <i className="far fa-image"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-461494662">Approve</Tooltip>
                            }
                            placement="left">
                            <Button
                              className="btn-link btn-icon"
                              type="button"
                              variant="success">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-408856985">Denined</Tooltip>
                            }
                            placement="left">
                            <Button
                              className="btn-link btn-icon"
                              type="button"
                              variant="danger">
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
}
