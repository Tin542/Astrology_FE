import React, { useState, useEffect } from "react";
import ReactDatetime from "react-datetime";
import moment from "moment";
import Moment from "react-moment";
import { del, get, putWithToken, postWithToken } from "../../service/ReadAPI";
import DateTimeOffset from "datetime-offset";

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

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
} from "reactstrap";

function AstrologerTables() {
  //show page
  const [astrologerList, setAstrologerList] = useState([]);

  //Astrologer detail
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [flowwers, setFollowers] = useState();

  //detail modal
  const [detailModal, setDetailModal] = useState(false);
  const toggleDetailModal = () => setDetailModal(!detailModal);

  //create modal
  const [createModal, setCreateModal] = useState(false);
  const toggleCreateModal = () => setCreateModal(!createModal);

  //delete modal
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  //paging
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [pageList, setPageList] = useState([]);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    getAstrologerList();
  }, []);

  function getAstrologerList() {
    get(`/api/v1/astrologers?limit=${limit}&&page=${currentPage}`)
      .then((res) => {
        var temp = res.data.data.list;
        console.log("temp: ", temp);
        var totalPageNumber = Math.ceil(res.data.data.total / 5);
        setTotalPage(totalPageNumber);
        setAstrologerList(temp);
        showPageList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changePage(number) {
    get(`/api/v1/astrologers?limit=${limit}&&page=${number}`)
      .then((res) => {
        var temp = res.data.data.list;
        console.log(temp);
        setAstrologerList(temp);
        setCurrentPage(number);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function showPageList(res) {
    var list = [];
    var totalPageNumber = Math.ceil(res.data.data.total / 5);
    console.log("total: ", totalPageNumber);

    setTotalPage(totalPageNumber);

    for (let i = 0; i < totalPageNumber; i++) {
      list.push(i);
    }
    console.log("list: ", list);
    if (list.length >= 1) {
      setPageList(list);
      console.log("list page: " + list);
    }
  }

  function getAstrologerByID(Id) {
    console.log("id: ", Id);
    get(`/api/v1/astrologers/${Id}`)
      .then((res) => {
        var temp = res.data.data;
        console.log(temp);

        setId(Id);
        setName(temp.name);
        setPhone(temp.phone_number);
        setGender(temp.gender);
        setDateOfBirth(temp.time_of_birth);
        setLatitude(temp.latitude_of_birth);
        setLongitude(temp.longitude_of_birth);
        setDescription(temp.description);
        setImage(temp.image_url);
        setFollowers(temp.followers_count);

        console.log("name: ", temp.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function createAstrologer() {
    console.log("id: ", id);
    console.log("name: ", name);
    console.log("phone: ", phone);
    console.log("gender: ", gender);
    console.log("birth: ", dateOfBirth);
    console.log("lat: ", latitude);
    console.log("long: ", longitude);
    console.log("image url: ", image);

    postWithToken(
      `/api/v1/astrologers`,
      {
        user_id: id,
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
          setCurrentPage(1);
          getAstrologerList();
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

    del(`/api/v1/astrologers/${id}`, localStorage.getItem("token"))
      .then((res) => {
        if (res.data.code === 0) {
          alert("delete success");
          setCurrentPage(1);
          getAstrologerList();
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
        <Row>
          <Col md="12">
            <Card className="regular-table-with-color">
              <Card.Header>
                <Card.Title as="h4">
                  Astrologers{" "}
                  <OverlayTrigger
                    overlay={
                      <Tooltip id="tooltip-461494662">Add Astrologer</Tooltip>
                    }
                    placement="left">
                    <Button
                      className="btn-link btn-icon"
                      type="button"
                      variant="success"
                      onClick={() => {
                        setId(null);
                        setName(null);
                        setDateOfBirth(null);
                        setPhone(null);
                        setLatitude(null);
                        setLongitude(null);
                        setGender(true);
                        setDescription(null);
                        setImage(null);

                        setCreateModal(true);
                      }}>
                      <i className="fas fa-plus"></i>
                    </Button>
                  </OverlayTrigger>
                </Card.Title>
              </Card.Header>
              <Card.Body className="table-responsive p-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Gender</th>
                      <th>Phone</th>
                      <th>Date of birth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {astrologerList.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td
                            onClick={() => {
                              getAstrologerByID(item.id);
                              setDetailModal(true);
                            }}>
                            {item.name}
                          </td>
                          <td
                            onClick={() => {
                              getAstrologerByID(item.id);
                              setDetailModal(true);
                            }}>
                            {item.gender ? "Male" : "Female"}
                          </td>
                          <td
                            onClick={() => {
                              getAstrologerByID(item.id);
                              setDetailModal(true);
                            }}>
                            {item.phone_number}
                          </td>
                          <td
                            onClick={() => {
                              getAstrologerByID(item.id);
                              setDetailModal(true);
                            }}>
                            {moment(item.time_of_birth).format("MM-DD-YYYY")}
                          </td>
                            <td>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-461494662">Edit</Tooltip>
                            }
                            placement="left">
                            <Button
                              className="btn-link btn-icon"
                              type="button"
                              variant="danger"
                              onClick={() => {
                                setId(item.id);

                                setDeleteModal(true);
                              }}>
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Pagination aria-label="Page navigation example" className="page-center">
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink
            className="page"
            previous
            //disable={numberPage === 1 ? "true" : "false"}

            onClick={() => {
              if (currentPage - 1 > 0) {
                changePage(currentPage - 1);
              }
            }}>
            «
          </PaginationLink>
        </PaginationItem>
        {pageList.map((page, index) => (
          <PaginationItem>
            <PaginationLink
              className="page"
              key={index}
              onClick={() => {
                changePage(page + 1);
              }}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem disabled={currentPage === totalPage}>
          <PaginationLink
            className="page"
            next
            //disable={numberPage === totalNumberPage ? true : false}
            onClick={() => {
              if (currentPage + 1 <= totalPage) {
                changePage(currentPage + 1);
              }
            }}>
            »
          </PaginationLink>
        </PaginationItem>
      </Pagination>

      <Modal isOpen={detailModal} toggle={toggleDetailModal}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleDetailModal)}
          toggle={toggleDetailModal}>
          Astrologer detail
        </ModalHeader>
        <ModalBody>
          <div className="img-container">
            <img alt="..." src={image}></img>
          </div>
        </ModalBody>
        <ModalBody>
          <b>ID: </b>
          {id}
          <br />
          <b>Name: </b>
          {name}
          <br />
          <b>Gender: </b>
          {gender ? "Male" : "Female"}
          <br />
          <b>Phone: </b>
          {phone}
          <br />
          <b>Date of birth: </b>
          {moment(dateOfBirth).format("MM-DD-YYYY")}
          <br />
          <b>Description: </b> {description}
          <br />
          <b>Followers: </b> {flowwers}
          <br />
          <b>Latitude: </b>
          {latitude}
          <br />
          <b>Longitude: </b>
          {longitude}
          <br />
        </ModalBody>

        <ModalFooter></ModalFooter>
      </Modal>

      {/* Modal Create */}
      <Modal isOpen={createModal} toggle={toggleCreateModal}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleCreateModal)}
          toggle={toggleCreateModal}>
          Create Astrologer
        </ModalHeader>
        <ModalBody>
          <Input
            type="number"
            name="id"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="ID"
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="number"
            name="phone"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </ModalBody>
        <ModalBody>
          <fieldset>
            <Form.Group>
              <Row>
                <Col sm="10">
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
                </Col>
              </Row>
            </Form.Group>
          </fieldset>
        </ModalBody>

        <ModalBody>
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
        </ModalBody>
        <ModalBody>
          <Input
            type="number"
            name="latitude"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Latitude"
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="number"
            name="longitude"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Longitude"
          />
        </ModalBody>

        <ModalBody>
          <Input
            type="text"
            onFocus={(e) => {
              e.currentTarget.type = "file";
              e.currentTarget.focus();
            }}
            name="image"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
          />
        </ModalBody>

        <ModalFooter>
          <Button
            className="btn-wd"
            variant="info"
            onClick={() => {
              createAstrologer();
              setCreateModal(false);
            }}>
            Create
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleDeleteModal)}
          toggle={toggleDeleteModal}>
          Are you sure?
        </ModalHeader>
        <ModalBody>Do you want to delete this Category</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              deleteByID();
              setDeleteModal(false);
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

export default AstrologerTables;
