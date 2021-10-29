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
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroupButtonDropdown,
  Input,
  FormGroup,
} from "reactstrap";

function DetailPost() {
  const id = localStorage.getItem('postId');
  const [title, setittle] = useState();
  const [description, setDescription] = useState();
  const [approve, setAprove] = useState(false);
  const [category, setCategory] = useState();
  const [astrologer, setAstrologer] = useState();
  const [zodiac, setZodiac] = useState([]);
  const [createDate, setCreateDate] = useState();
  const [updateDate, setUpdateDate] = useState();
  const [image, setImage] = useState();

  //delete
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDelete = () => setDeleteModal(!deleteModal);

  useEffect(() => {
    getPostByID(id);
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

  function deletePost() {
    console.log("id: ", id);
    console.log("token: ", localStorage.getItem("token"));
    del(`/api/v1/posts/${id}`, localStorage.getItem("token")).then((res) => {
      if (res.data.code === 0) {
        alert("delete success");
        setCurrentPage(1);
        getServiceList();
      }
      if (res.data.code === 7) {
        console.log(res.data.msg);
        alert(res.data.msg);
      }
    });
  }
  function approvePost() {
    console.log("id: ", id);
    console.log("token: ", localStorage.getItem("token"));
    patchWithToken(
      `/api/v1/posts/approve?id=${id}`,
      { id: id },
      localStorage.getItem("token")
    ).then((res) => {
      if (res.data.code === 0) {
        alert("approve success");
        getPostByID(id);
      }
      if (res.data.code === 7) {
        console.log(res.data.msg);
        alert(res.data.msg);
      }
    });
  }
  const closeBtn = (x) => (
    <button
      className="btn border border-danger"
      style={{ color: "#B22222" }}
      onClick={x}>
      X
    </button>
  );
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
                        <Card.Title as="h4" className="text-post-detail">
                          ID: {localStorage.getItem("postId")}
                        </Card.Title>
                      </Card.Header>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col className="pr-1" md="4">
                          <Form.Group >
                            <strong className="text-post-detail">Title</strong>
                            <Form.Control
                              defaultValue={title}
                              disabled
                              type="text"></Form.Control>
                          </Form.Group>
                        </Col>

                        <Col className="pl-1" md="4">
                          <Form.Group>
                          <strong className="text-post-detail">Posted By</strong>
                            <Form.Control
                              defaultValue={astrologer}
                              disabled
                              type="text"></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pl-1" md="4">
                          <Form.Group>
                          <strong className="text-post-detail">Category</strong>
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
                          <strong className="text-post-detail">Zodiac</strong>
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
                          <strong className="text-post-detail">Content</strong>
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
                      <strong className="text-post-detail">Create date: </strong>
                      {moment(createDate).format("MM-DD-YYYY")}
                    </p>
                    <p>
                      <strong className="text-post-detail">Update date: </strong>
                      {moment(updateDate).format("MM-DD-YYYY")}
                    </p>
                    <p>
                      <strong className="text-post-detail">Status: </strong>
                      {approve ? (
                        <b style={{ color: "green" }}>Approved</b>
                      ) : (
                        <b style={{ color: "red" }}>Waiting</b>
                      )}
                    </p>
                    <hr></hr>
                    <Row style={{ flexDirection: "row" , justifyContent: 'space-evenly'}}>
                      <Button
                        disabled={approve}
                        variant="success"
                        onClick={() => {
                          approvePost();
                        }}>
                        Approve
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => {
                          setDeleteModal(true);
                        }}>
                        Reject
                      </Button>
                    </Row>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
      <Modal isOpen={deleteModal} toggle={toggleDelete}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleDelete)}
          toggle={toggleDelete}>
          Are you sure?
        </ModalHeader>
        <ModalBody>Do you want to reject this Post</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              setDeleteModal(false);
              deletePost();
            }}>
            Reject
          </Button>{" "}
          <Button color="secondary" onClick={toggleDelete}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default DetailPost;
