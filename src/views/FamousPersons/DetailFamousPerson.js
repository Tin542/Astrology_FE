import React, { useState, useEffect } from "react";
import { storage } from "../../firebase/firebaseConfig";
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

  const [name, setName] = useState();
  const [zodiac, setZodiac] = useState();
  const [edtGender, setEdtGender] = useState(0);
  const [zodiacID, setZodiacID] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState("");
  const [birth, setBirth] = useState("");

  const [listZodiac, setListZodiac] = useState([]);

  const history = useHistory();
  const [progress, setProgress] = useState(0);

  //delete modal
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  useEffect(() => {
    getFamousPersonByID(id);
    getAllZodiac();
  }, []);
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    console.log("test image: ", e.target.files[0]);
    if (e.target.files[0]) {
      const data = e.target.files[0];
      const uploadTask = storage.ref(`famous_person/${data.name}`).put(data);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("famous_person")
            .child(data.name)
            .getDownloadURL()
            .then((url) => {
              setImage(url);
            });
        }
      );
    }
  };
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
        setBirth(temp.date_of_birth);
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
        date_of_birth: birth,
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
                            <label className="text-post-detail">
                              Date Of Birth
                            </label>
                            <Input
                              type="text"
                              onFocus={(e) => {
                                e.currentTarget.type = "datetime-local";
                                e.currentTarget.focus();
                              }}
                              name="dateOfBirth"
                              id="dateOfBirth"
                              defaultValue={moment(birth).format("DD-MM-YYYY")}
                              value={moment(birth).format("DD-MM-YYYY")}
                              onChange={(e) => setBirth(e.target.value)}
                              placeholder="Date of birth"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pl-3" md="4">
                          <Form.Group>
                            <FormGroup>
                              <strong className="text-post-detail">
                                Gender
                              </strong>
                              <Input
                                type="select"
                                value={edtGender}
                                onChange={(e) => setEdtGender(e.target.value)}>
                                <option value={true}>Male</option>
                                <option value={false}>Female</option>
                              </Input>
                            </FormGroup>
                          </Form.Group>
                        </Col>
                      </Row>
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
                              value={description}
                              onChange={(e) =>
                                setDescription(e.target.value)
                              }></textarea>
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
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" onChange={uploadImage} />
                    {loading ? (
                      <h3>Loading...</h3>
                    ) : (
                      <img src={image} style={{ width: "300px" }} />
                    )}
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
        <ModalBody>Do you want to delete this Person</ModalBody>
        <ModalFooter>
          <Button
            variant="danger"
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
