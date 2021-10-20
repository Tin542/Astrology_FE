import React, { useState, useEffect } from "react";
import ReactDatetime from "react-datetime";
import moment from "moment";
import { del, get, putWithToken, postWithToken } from "../../service/ReadAPI";
import DateTimeOffset from "datetime-offset";
import ImageUploading from "react-images-uploading";
import ImageUploader from "react-images-upload";

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

function CustomTable() {
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
  const [image, setImage] = useState("");

  //detail modal
  const [detailModal, setDetailModal] = useState(false);
  const toggleDetailModal = () => setDetailModal(!detailModal);

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
    get(`/api/v1/customers?limit=${limit}&&page=${currentPage}`)
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
    get(`/api/v1/customers?limit=${limit}&&page=${number}`)
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
    get(`/api/v1/customers/${Id}`)
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
        setImage(temp.url_image);

        console.log("name: ", temp.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  

  function deleteByID() {
    console.log("delete: ", id);

    del(`/api/v1/customers/${id}`, localStorage.getItem("token"))
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
                                <Tooltip id="tooltip-461494662">Remove</Tooltip>
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
          Customer detail
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
          <b>Latitude: </b>
          {latitude}
          <br />
          <b>Longitude: </b>
          {longitude}
          <br />
        </ModalBody>

        <ModalFooter></ModalFooter>
      </Modal>

      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleDeleteModal)}
          toggle={toggleDeleteModal}>
          Are you sure?
        </ModalHeader>
        <ModalBody>Do you want to delete this Customer</ModalBody>
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

export default CustomTable;
