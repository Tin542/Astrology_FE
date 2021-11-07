import React, { useState, useEffect } from "react";
import Select from "react-select";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import { postWithToken, get } from "../../service/ReadAPI";
// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { Input, FormGroup } from "reactstrap";
import { storage } from "../../firebase/firebaseConfig";

function CreateAstrologer() {
  const [zodiacId, setZodiacId] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState(false);
  const [birth, setBirth] = useState(null);

  const [listZodiac, setListZodiac] = useState([]);
  const [comboboxError, setComboboxError] = useState(null);
  const [emptyNameError, setEmptyNameError] = useState(null);
  const [desError, setDesError] = useState(null);
  const [birthError, setBirthError] = useState(null);

  const history = useHistory();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    getAllZodiac();
  }, []);

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
  console.log("image: ", image);
  function handleCreate() {
    console.log("create image: ", image);
    postWithToken(
      `/api/v1/famouspersons`,
      {
        name: name,
        description: description,
        zodiac_id: zodiacId.value,
        url_image: image,
        gender: gender,
        date_of_birth: birth.toString(),
      },
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.data.code === 0) {
          alert("Create success");
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
                          Create Famous Person
                        </Card.Title>
                      </Card.Header>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col className="pr-1" md="4">
                          <FormGroup>
                            <label className="text-post-detail">Zodiac</label>
                            <Select
                              name="userId"
                              value={zodiacId}
                              options={listZodiac.map((item) => ({
                                value: item.id,
                                label: item.name,
                              }))}
                              palceholder="- language -"
                              onChange={(value) => setZodiacId(value)}
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
                              value={birth}
                              onChange={(e) => setBirth(e.target.value)}
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
                                    setGender(true)
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
                                    setGender(false)
                                  }></Form.Check.Input>
                                <span className="checkbox-inline"></span>
                                Female
                              </Form.Check.Label>
                            </Form.Check>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <div class="form-group">
                            <label className="text-post-detail">
                              More About Famous person
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
                          if (zodiacId === null) {
                            setComboboxError(
                              <small className="text-danger">
                                Please select zodiac
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
                          if (description === null) {
                            setDesError(
                              <small className="text-danger">
                                Description is required
                              </small>
                            );
                          } else {
                            setDesError(null);
                          }
                          handleCreate();
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
                    <Form.Group className="mb-1 ml-5">
                      <Form.Label>Image</Form.Label>
                      <Form.Control type="file" onChange={uploadImage} />
                      {loading ? (
                        <h3>Loading...</h3>
                      ) : (
                        <img src={image} style={{ width: "200px" }} />
                      )}
                    </Form.Group>
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
