import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TagsInput from "components/TagsInput/TagsInput.js";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import {
  del,
  postWithToken,
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
import { Input, FormGroup } from "reactstrap";

function CreateAstrologer() {
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [gender, setGender] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [description, setDescription] = useState(null);
  const [flowwers, setFollowers] = useState();
  const [image, setImage] = useState(
    "https://image.lag.vn/upload/news/21/08/16/236599595_1425452954506376_3110056547255537769_n_WOLP.jpg"
  );

  const [listUsetId, setListUserId] = useState([]);
  const [comboboxError, setComboboxError] = useState(null);
  const [emptyNameError, setEmptyNameError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [birthError, setBirthError] = useState(null);
  const [latError, setLatError] = useState(null);
  const [longError, setLongError] = useState(null);
  const [desError, setDesError] = useState(null);

  const history = useHistory();

  useEffect(() => {
    getUserId();
  }, []);

  function getUserId() {
    getWithToken(`/api/v1/users/non-astro`, localStorage.getItem("token"))
      .then((res) => {
        var temp = res.data;
        console.log(temp);
        console.log("data: ", res.data);

        setListUserId(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function createAstrologer() {
    console.log("id: ", userId.value);
    console.log("name: ", name);
    console.log("phone: ", phone);
    console.log("gender: ", gender);
    console.log("birth: ", dateOfBirth);
    console.log("lat: ", latitude);
    console.log("long: ", longitude);
    console.log("des: ", description);
    console.log("image url: ", image);

    postWithToken(
      `/api/v1/astrologers`,
      {
        user_id: userId.value,
        name: name,
        phone_number: phone,
        status_payment: 0,
        gender: gender,
        description: description,
        image_url: image,
        latitude_of_birth: latitude,
        longitude_of_birth: longitude,
        time_of_birth: dateOfBirth,
      },
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.data.code === 0) {
          alert("Add success");
          history.push("/admin/Astrologers/astrologer-table");
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
                        <Card.Title as="h4" className="text-post-detail">Create Astrologer</Card.Title>
                      </Card.Header>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col className="pr-1" md="4">
                          <FormGroup>
                            <label className="text-post-detail">User Id</label>
                            <Select
                              name="userId"
                              value={userId}
                              options={listUsetId.map((item) => ({
                                value: item.id,
                                label: item.id,
                              }))}
                              palceholder="- language -"
                              onChange={(value) => setUserId(value)}
                            />
                            {comboboxError}
                          </FormGroup>
                        </Col>

                        <Col className="pl-1" md="4">
                          <Form.Group>
                            <label className="text-post-detail">Name</label>
                            <Input
                              type="text"
                              name="name"
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                            {emptyNameError}
                          </Form.Group>
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
                              value={dateOfBirth}
                              onChange={(e) => setDateOfBirth(e.target.value)}
                              placeholder="Date of birth"
                            />
                            {birthError}
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="pl-1" md="5">
                          <Form.Group>
                            <Form.Check className="checkbox-inline">
                              <Form.Check.Label>
                                <Form.Check.Input
                                  value="true"
                                  id="gender"
                                  name="gender"
                                  type="radio"
                                  onChange={(e) =>
                                    setGender(e.target.value)
                                  }></Form.Check.Input>
                                <span className="checkbox-inline"></span>
                                Male
                              </Form.Check.Label>
                            </Form.Check>
                            <Form.Check className="checkbox-inline">
                              <Form.Check.Label>
                                <Form.Check.Input
                                  value="false"
                                  id="gemder"
                                  name="gender"
                                  type="radio"
                                  onChange={(e) =>
                                    setGender(e.target.value)
                                  }></Form.Check.Input>
                                <span className="checkbox-inline"></span>
                                Female
                              </Form.Check.Label>
                            </Form.Check>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="4">
                          <Form.Group>
                            <label className="text-post-detail">Latitude</label>
                            <Input
                              type="number"
                              name="latitude"
                              id="latitude"
                              value={latitude}
                              onChange={(e) => setLatitude(e.target.value)}
                            />
                            {latError}
                          </Form.Group>
                        </Col>
                        <Col className="px-1" md="4">
                          <Form.Group>
                            <label className="text-post-detail">
                              Longitude
                            </label>
                            <Input
                              type="number"
                              name="longitude"
                              id="longitude"
                              value={longitude}
                              onChange={(e) => setLongitude(e.target.value)}
                            />
                            {longError}
                          </Form.Group>
                        </Col>
                        <Col className="px-1" md="4">
                          <Form.Group>
                            <label className="text-post-detail">
                              Phone Number
                            </label>
                            <Input
                              type="number"
                              name="phone"
                              id="phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                            {phoneError}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <div class="form-group">
                            <label className="text-post-detail">
                              About Astrologer
                            </label>
                            <textarea
                              class="form-control"
                              id="exampleFormControlTextarea1"
                              rows="10"
                              defaultValue={description}
                              value={description}
                              onChange={(e) =>
                                setDescription(e.target.value)
                              }></textarea>
                              {desError}
                          </div>
                        </Col>
                      </Row>
                      <Button
                        onClick={() => {
                          if (userId === null) {
                            setComboboxError(
                              <small className="text-danger">
                                Plese select user-id
                              </small>
                            );
                          } else {
                            setComboboxError(null);
                          }
                          if (name === null) {
                            setEmptyNameError(
                              <small className="text-danger">
                                Name is required
                              </small>
                            );
                          } else {
                            setEmptyNameError(null);
                          }
                          if (phone === null) {
                            setPhoneError(
                              <small className="text-danger">
                                Phone is required
                              </small>
                            );
                          } else if (phone.length < 9) {
                            setPhoneError(
                              <small className="text-danger">
                                Phone is required atleast 9 numbers
                              </small>
                            );
                          } else {
                            setPhoneError(null);
                          }
                          if (latitude === null) {
                            setLatError(
                              <small className="text-danger">
                                Latitude is required
                              </small>
                            );
                          } else {
                            setLatError(null);
                          }
                          if (longitude === null) {
                            setLongError(
                              <small className="text-danger">
                                Longitude is required
                              </small>
                            );
                          } else {
                            setLongError(null);
                          }
                          if (dateOfBirth === null) {
                            setBirthError(
                              <small className="text-danger">
                                Birthday is required
                              </small>
                            );
                          } else {
                            setBirthError(null);
                          }
                          if (description === null) {
                            setDesError(
                              <small className="text-danger">
                                Description is required
                              </small>
                            );
                          } else {
                            setDesError(null);
                          }
                          userId !== null &&
                            name !== null &&
                            phone !== null &&
                            latitude !== null &&
                            longitude !== null &&
                            dateOfBirth !== null &&
                            description !== null &&
                            createAstrologer();
                        }}>
                        Create Astrologer
                      </Button>
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

export default CreateAstrologer;
