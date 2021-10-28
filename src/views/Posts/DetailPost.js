import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TagsInput from "components/TagsInput/TagsInput.js";
import moment from "moment";
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
        // setCategory(temp.category_id);
        setAstrologer(temp.astrologer.name);
        setZodiac(zodiacName);
        setCreateDate(temp.created_at);
        setUpdateDate(temp.updated_at);
        setImage(temp.image_url);

        getCategory(temp.category_id);
        console.log("zodiacs: ", zodiacName);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getCategory(cateId) {
    get(`/api/v1/categories/${cateId}`)
      .then((res) => {
        var name = res.data.data.name;
        console.log(name);
        setCategory(name);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Container fluid>
        <div className="section-image" data-image="../../assets/img/bg5.jpg">
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
                        <Col className="pr-1" md="4">
                          <Form.Group>
                            Title
                            <Form.Control
                              defaultValue={title}
                              disabled
                              type="text"></Form.Control>
                          </Form.Group>
                        </Col>

                        <Col className="pl-1" md="4">
                          <Form.Group>
                            Posted by
                            <Form.Control
                              defaultValue={astrologer}
                              disabled
                              type="text"></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pl-1" md="4">
                          <Form.Group>
                            Category
                            <Form.Control
                              defaultValue={category}
                              disabled
                              type="text"></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="5">
                          <Form.Group>
                            Zodiac
                            <TagsInput
                              disabled
                              value={zodiac}
                              tagProps={{
                                className:
                                  "react-tagsinput-tag tag-fill tag-azure",
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <div class="form-group">
                            Content
                            <textarea
                              disabled
                              class="form-control"
                              id="exampleFormControlTextarea1"
                              rows="10"
                              defaultValue={description}></textarea>
                          </div>
                        </Col>
                      </Row>
                      <Row></Row>
                      <Row></Row>

                      <div className="clearfix"></div>
                    </Card.Body>
                  </Card>
                </Form>
              </Col>
              <Col md="4">
                <Card className="card-user">
                  <Card.Header className="no-padding"></Card.Header>
                  <Card.Body>
                    <div className="post-detail-Image">
                      <img alt="..." src={image}></img>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <p>
                      <strong>Create date: </strong>
                      {moment(createDate).format("MM-DD-YYYY")}
                    </p>
                    <p>
                      <strong>Update date: </strong>
                      {moment(updateDate).format("MM-DD-YYYY")}
                    </p>
                    <p>
                      <strong>Status: </strong>
                      {approve ? (
                        <b style={{ color: "green" }}>Approved</b>
                      ) : (
                        <b style={{ color: "red" }}>Waiting</b>
                      )}
                    </p>
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
