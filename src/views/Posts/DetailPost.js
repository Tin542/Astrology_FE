import React, { useState, useEffect } from "react";

import {
    del,
    patchWithToken,
    get,
    put,
    getWithToken,
  } from "../../service/ReadAPI";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function DetailPost() {
  const [title, setittle] = useState();
  const [description, setDescription] = useState();
  const [approve, setAprove] = useState(false);
  const [category, setCategory] = useState();
  const [astrologer, setAstrologer] = useState();
  const [zodiac, setZodiac] = useState([]);
  const [createDate, setCreateDate] = useState();
  const [updateDate, setUpdateDate] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    getPostByID(localStorage.getItem("postId"));
  }, []);

  function getPostByID(Id) {
    console.log("id: ", Id);

    get(`/api/v1/posts/${Id}`)
      .then((res) => {
        var temp = res.data.data;
        console.log(temp);

        //get name in list zodiac
        var listZodiac = temp.zodiacs;
        var zodiacName = listZodiac.map((zodiacs) => zodiacs.name);

        setittle(temp.title);
        setDescription(temp.content);
        setAprove(temp.is_approve);
        setCategory(temp.category_id);
        setAstrologer(temp.astrologer.name);
        setZodiac(zodiacName + ", ");
        setCreateDate(temp.created_at);
        setUpdateDate(temp.updated_at);
        setImage(temp.image_url);

        console.log("zodiacs: ", zodiacName);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Container fluid>
        <div className="section-image" data-image="../../assets/img/bg5.jpg">
          {/* you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " */}
          <Container>
            <Row>
              <Col md="8" sm="6">
                <Form action="" className="form" method="">
                  <Card>
                    <Card.Header>
                      <Card.Header>
                        <Card.Title as="h4">
                          POST ID: {localStorage.getItem("postId")}
                        </Card.Title>
                      </Card.Header>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col className="pr-1" md="5">
                          <Form.Group>
                            <label>Full name</label>
                            <Form.Control
                              defaultValue={localStorage.getItem("NAME")}
                              disabled
                              type="text"></Form.Control>
                          </Form.Group>
                        </Col>

                        <Col className="pl-1" md="4">
                          <Form.Group>
                            <label htmlFor="exampleInputEmail1">
                              Email address
                            </label>
                            <Form.Control
                              defaultValue={localStorage.getItem("EMAIL")}
                              disabled
                              type="text"></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <Form.Group>
                            <label>Uid</label>
                            <Form.Control
                              disabled
                              defaultValue={localStorage.getItem("UID")}
                              type="text"></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="4">
                          <Form.Group>
                            <label>City</label>
                            <Form.Control
                              disabled
                              defaultValue="Ho Chi Minh"
                              type="text"></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="px-1" md="4">
                          <Form.Group>
                            <label>Country</label>
                            <Form.Control
                              disabled
                              defaultValue="Vietnam"
                              type="text"></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="px-1" md="4">
                          <Form.Group>
                            <label>Phone number</label>
                            <Form.Control
                              disabled
                              defaultValue={localStorage.getItem("PHONE")}
                              type="text"></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Form.Group>
                            <label>About Me</label>
                            <Form.Control
                              disabled
                              cols="80"
                              defaultValue="..."
                              rows="4"></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>

                      <div className="clearfix"></div>
                    </Card.Body>
                  </Card>
                </Form>
              </Col>
              <Col md="4">
                <Card className="card-user">
                  <Card.Header className="no-padding">
                    
                  </Card.Header>
                  <Card.Body>
                  <div className="post-detail-Image">
                      <img
                        alt="..."
                        src={
                          image
                        }></img>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </>
  );
}

export default DetailPost;
