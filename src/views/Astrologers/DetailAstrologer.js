import React, { useState, useEffect } from "react";
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
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";

function DetailAstrologer() {
  //Astrologer detail
  const id = localStorage.getItem("astrologer");
  const gender = localStorage.getItem("genderAstro");
  const [name, setName] = useState();
  const [phone, setPhone] = useState();

  const [dateOfBirth, setDateOfBirth] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState("");
  const [flowwers, setFollowers] = useState();
  const [chart, setChart] = useState();

  const history = useHistory();

  //delete modal
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  useEffect(() => {
    getAstrologerByID(id);
  }, []);

  function getAstrologerByID(Id) {
    console.log("id: ", Id);
    get(`/api/v1/astrologers/${Id}`)
      .then((res) => {
        var temp = res.data.data;
        console.log(temp);

        setName(temp.name);
        setPhone(temp.phone_number);
        // setGender(temp.gender);
        setDateOfBirth(temp.time_of_birth);
        setLatitude(temp.latitude_of_birth);
        setLongitude(temp.longitude_of_birth);
        setDescription(temp.description);
        setImage(temp.url_image);
        setFollowers(temp.followers_count);
        setChart(temp.natal_chart_url);

        console.log("name: ", temp.name);
        console.log("gender: ", gender);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function deleteByID() {
    console.log("delete: ", id);

    del(`/api/v1/astrologers/${id}`, localStorage.getItem("token"))
      .then((res) => {
        if (res.data.code === 0) {
          alert("delete success");
          history.push("/admin/astrologer-table");
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
                          Astrologer ID: {id}
                        </Card.Title>
                      </Card.Header>
                    </Card.Header>
                    <Card.Body>
                      <div className="typo-line">
                        <h1></h1>
                        <p className="category">Astrologer name</p>
                        {name}
                      </div>
                      <div className="typo-line">
                        <h1></h1>
                        <p className="category">Phone number</p>
                        {phone}
                      </div>
                      <div className="typo-line">
                        <h1></h1>
                        <p className="category">Gender</p>
                        {gender}
                      </div>
                      <div className="typo-line">
                        <h1></h1>
                        <p className="category">Date of birth</p>
                        {moment(dateOfBirth).format("DD-MM-YYYY HH:mm:ss")}
                      </div>
                      <div className="typo-line">
                        <h1></h1>
                        <p className="category">Latitude of birth</p>
                        {latitude}
                      </div>
                      <div className="typo-line">
                        <h1></h1>
                        <p className="category">Longitude of birth</p>
                        {longitude}
                      </div>
                      <div className="typo-line">
                        <h1></h1>
                        <p className="category">Followers </p>
                        {flowwers}
                      </div>
                      <div className="typo-line">
                        <h1></h1>
                        <p>
                          <span className="category">About Astrologer</span>
                          {description}
                        </p>
                      </div>
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
                    <div className="post-detail-Image">
                      <img alt="..." src={chart}></img>
                    </div>
                    <hr></hr>
                    <Row
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}>
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
        <ModalBody>Do you want to ban this Astrologer</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              deleteByID();
              setDeleteModal(false);
            }}>
            Ban
          </Button>{" "}
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default DetailAstrologer;
