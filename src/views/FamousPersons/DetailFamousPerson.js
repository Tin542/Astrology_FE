import React, { useState, useEffect } from "react";
import Select from "react-select";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import { del, get, putWithToken, postWithToken } from "../../service/ReadAPI";
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
  Input,
  FormGroup,
} from "reactstrap";

function DetailFamous() {
  //Astrologer detail
  const id = localStorage.getItem("fmID");
  const gender = localStorage.getItem("fmGender");
  const [name, setName] = useState();
  const [zodiac, setZodiac] = useState();
  const [edtGender, setEdtGender] = useState(0);
  const [zodiacID, setZodiacID] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState("");

  const [listZodiac, setListZodiac] = useState([]);

  const history = useHistory();

  //delete modal
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  useEffect(() => {
    getFamousPersonByID(id);
    getAllZodiac();
  }, []);

  function getFamousPersonByID(Id) {
    console.log("id: ", Id);
    get(`/api/v1/famouspersons/${Id}`)
      .then((res) => {
        var temp = res.data.data;
        console.log(temp);

        setName(temp.name);
        setZodiac(temp.zodiac_name);
        setZodiacID(temp.zodiac_id);
        setDescription(temp.description);
        setImage(temp.url_image);
        setEdtGender(temp.gender);

        console.log("name: ", temp.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getAllZodiac() {
    get(`/api/v1/zodiacs?limit=12`)
      .then((res) => {
        var temp = res.data.data.list;
        console.log("list zodiac: ", temp);
        setListZodiac(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function editFamousPerson() {
    console.log("edt ID: ", id);
    console.log("edt Name: ", name);
    console.log("edt Description: ", description);
    console.log("edt Zodiac: ", zodiac);
    console.log("edt Image: ", image);
    console.log("edt Gender: ", edtGender);

    
    putWithToken(
      `/api/v1/famouspersons/${id}`,
      {
        name: name,
        description: description,
        zodiac_id: zodiacID,
        gender: edtGender,
        url_image: image,
      },
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.data.code === 0) {
          alert("Edit success");
          history.push("/admin/famousperson-table");
        }
        if (res.data.code === 7) {
          console.log(res.data.msg);
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }
  function deleteByID() {
    console.log("delete: ", id);

    del(`/api/v1/famouspersons/${id}`, localStorage.getItem("token"))
      .then((res) => {
        if (res.data.code === 0) {
          alert("delete success");
          history.push("/admin/famousperson-table");
        }
        if (res.data.code === 7) {
          console.log(res.data.msg);
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        alert(err);
        console.log(err);
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
          {/* you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " */}
          <Container>
            <Row>
              <Col md="8" sm="6">
                <Form action="" className="form" method="">
                  <Card>
                    <Card.Header>
                      <Card.Header>
                        <Card.Title as="h4" className="text-post-detail">
                          Famous Person ID: {id}
                        </Card.Title>
                      </Card.Header>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col className="pr-1" md="4">
                          <Form.Group>
                            <strong className="text-post-detail">Name</strong>
                            <Form.Control
                              defaultValue={name}
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              type="text"></Form.Control>
                          </Form.Group>
                        </Col>

                        <Col className="pl-1" md="4">
                          <FormGroup>
                            <strong className="text-post-detail">Zodiac</strong>
                            <Input
                              type="select"
                              value={zodiacID}
                              onChange={(e) => setZodiacID(e.target.value)}>
                              {listZodiac.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="4">
                          <Form.Group>
                            <strong className="text-post-detail">Gender</strong>
                            <Input
                              type="select"
                              value={edtGender}
                              onChange={(e) => setEdtGender(e.target.value)}>
                              <option value="0">Male</option>
                              <option value="1">Female</option>
                            </Input>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row></Row>
                      <Row>
                        <Col md="12">
                          <div class="form-group">
                            <strong className="text-post-detail">
                              About Person
                            </strong>
                            <textarea
                              class="form-control"
                              id="exampleFormControlTextarea1"
                              rows="10"
                              value={description}></textarea>
                          </div>
                        </Col>
                      </Row>

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

                    <hr></hr>
                    <Row
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}>
                      <Button
                        className="btn-wd"
                        variant="success"
                        onClick={() => {
                          editFamousPerson();
                        }}>
                        Edit
                      </Button>
                      <Button
                        className="btn-wd"
                        variant="danger"
                        onClick={() => {
                          setDeleteModal(true);
                        }}>
                        Delete
                      </Button>
                    </Row>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleDeleteModal)}
          toggle={toggleDeleteModal}>
          Are you sure?
        </ModalHeader>
        <ModalBody>Do you want to delete this Astrologer</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              deleteByID();
            }}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default DetailFamous;
