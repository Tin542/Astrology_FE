import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TagsInput from "components/TagsInput/TagsInput.js";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import Dropzone from "dropzone";
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
Dropzone.autoDiscover = false;
function CreateAstrologer() {
  const [zodiacId, setZodiacId] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(
    "https://image.lag.vn/upload/news/21/08/16/236599595_1425452954506376_3110056547255537769_n_WOLP.jpg"
  );

  const [listZodiac, setListZodiac] = useState([]);
  const [comboboxError, setComboboxError] = useState(null);
  const [emptyNameError, setEmptyNameError] = useState(null);
  const [desError, setDesError] = useState(null);

  const history = useHistory();

  useEffect(() => {
    getAllZodiac();

    let currentSingleFile = undefined;
    new Dropzone(document.getElementById("dropzone-single"), {
      url: "/",
      thumbnailWidth: null,
      thumbnailHeight: null,
      previewsContainer:
        document.getElementsByClassName("dz-preview-single")[0],
      previewTemplate:
        document.getElementsByClassName("dz-preview-single")[0].innerHTML,
      maxFiles: 1,
      acceptedFiles: "image/*",
      init: function () {
        this.on("addedfile", function (file) {
          if (currentSingleFile) {
            this.removeFile(currentSingleFile);
          }
          currentSingleFile = file;
        });
      },
    });
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
                              More About Astrologer
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
                          if (description === null) {
                            setDesError(
                              <small className="text-danger">
                                Description is required
                              </small>
                            );
                          } else {
                            setDesError(null);
                          }
                          
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
                  <div
                    className="dropzone dropzone-single mb-3"
                    id="dropzone-single"
                  >
                    <div className="fallback">
                      <div className="custom-file">
                        <input
                          className="custom-file-input"
                          id="projectCoverUploads"
                          type="file"
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="projectCoverUploads"
                        >
                          Choose file
                        </label>
                      </div>
                    </div>
                    <div className="dz-preview dz-preview-single">
                      <div className="dz-preview-cover">
                        <img
                          alt="..."
                          className="dz-preview-img"
                          data-dz-thumbnail=""
                        />
                      </div>
                    </div>
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
