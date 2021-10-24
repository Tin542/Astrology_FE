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

function FamousPersonsTable() {
  //show page
  const [personList, setPersonList] = useState([]);

  // Famous Person detail
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [zodiac_id, setZodiac] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState("");

  //detail modal
  const [detailModal, setDetailModal] = useState(false);
  const toggleDetailModal = () => setDetailModal(!detailModal);

  //create modal
  const [createModal, setCreateModal] = useState(false);
  const toggleCreateModal = () => setCreateModal(!createModal);

  //delete modal
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  //Edit Person
  const [edtID, setEdtId] = useState();
  const [edtFamousPerson, setEdtPerson] = useState([]);
  const [modalEdit, setModelEdit] = useState(false);
  const toggEditModal = () => setModelEdit(!modalEdit);

  //paging
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [pageList, setPageList] = useState([]);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    getFamousPersonList();
  }, []);

  function getFamousPersonList() {
    get(`/api/v1/famouspersons?limit=${limit}&&page=${currentPage}`)
      .then((res) => {
        var temp = res.data.data.list;
        console.log("temp: ", temp);
        var totalPageNumber = Math.ceil(res.data.data.total / 5);
        setTotalPage(totalPageNumber);
        setPersonList(temp);
        showPageList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changePage(number) {
    get(`/api/v1/famouspersons?limit=${limit}&&page=${number}`)
      .then((res) => {
        var temp = res.data.data.list;
        console.log(temp);
        setPersonList(temp);
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

  function getFamousPersonByID(Id) {
    console.log("id: ", Id);
    get(`/api/v1/famouspersons/${Id}`)
      .then((res) => {
        var temp = res.data.data;
        console.log(temp);

        setId(Id);
        setName(temp.name);
        setZodiac(temp.zodiac_id);
        setDescription(temp.description);
        setImage(temp.url_image);

        console.log("name: ", temp.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function createFamousPerson() {
    console.log("id: ", id);
    console.log("name: ", name);
    console.log("long: ", zodiac_id);
    console.log("image url: ", image);

    postWithToken(
      `/api/v1/famouspersons`,
      {
        user_id: id,
        name: name,
        description: description,
        url_image: image,
        longitude_of_birth: zodiac_id,
        
      },
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.data.code === 0) {
          alert("Add success");
          setCurrentPage(1);
          getFamousPersonList();
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

  function editFamousPerson(){
    console.log("edt ID: ", edtID);
    console.log("wdt Name: ", edtFamousPerson.name);
    console.log("wdt Description: ", edtFamousPerson.description);

    putWithToken(
      `/api/v1/famouspersons${edtID}`,
      { name: edtFamousPerson.name },
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.data.code === 0) {
          alert("Edit success");
          setCurrentPage(1);
          getPersonList();
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
          setCurrentPage(1);
          getFamousPersonList();
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
                  
                    <Button
                      className="btn-wd mr-1" variant="info"
                      type="button"
                      onClick={() => {
                        setId(null);
                        setName(null);
                        setZodiac(null);
                        setDescription(null);
                        setImage("https://image.lag.vn/upload/news/21/08/16/236599595_1425452954506376_3110056547255537769_n_WOLP.jpg");

                        setCreateModal(true);
                      }}>
                      Add Famous Person
                    </Button>
                  
                </Card.Title>
              </Card.Header>
              <Card.Body className="table-responsive p-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personList.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td
                            onClick={() => {
                              getFamousPersonByID(item.id);
                              setDetailModal(true);
                            }}>
                            {item.name}
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
                                variant="success"
                                onClick={() => {
                                  // setEdtId(item.id);
                                  setEdtPerson({
                                    name: item.name,
                                  });
                                  setEdtId(item.id);
                                  setModelEdit(true);
                                }}>
                                <i className="fas fa-edit"></i>
                              </Button>
                            </OverlayTrigger>

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
          Famous Person Details
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
          <b>Description: </b> 
          {description}
          <br />
          <b>Zodiac: </b>
          {zodiac_id}
          <br />
        </ModalBody>
      </Modal>

      {/* Modal Create */}
      <Modal isOpen={createModal} toggle={toggleCreateModal}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleCreateModal)}
          toggle={toggleCreateModal}>
          Add Famous Person
        </ModalHeader>

        <ModalBody>
          <Input
            type="number"
            name="id"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="User id"
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
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </ModalBody>

        <ModalBody>
          <Input
            type="number"
            name="zodiac_id"
            id="zodiac_id"
            value={zodiac_id}
            onChange={(e) => setZodiac(e.target.value)}
            placeholder="Zodiac"
          />
        </ModalBody>

        <ModalFooter>
          <Button
            className="btn-wd"
            variant="info"
            onClick={() => {
              createFamousPerson();
              setCreateModal(false);
            }}>
            Create
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEdit} toggle={toggEditModal}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggEditModal)}
          toggle={toggEditModal}>
          Edit Famous Person
        </ModalHeader>

        <ModalBody>
          <Input
            type="text"
            name="name"
            id="name"
            value={edtFamousPerson.name}
            onChange={(e) => setEdtPerson({name: e.target.value})}
            placeholder="Name"
            // onChange={lnerror}
          />
        </ModalBody>
        
        <ModalBody>
          <Input
            type="text"
            name="description"
            id="description"
            value={edtFamousPerson.description}
            onChange={(e) => setEdtPerson({description: e.target.value})}
            placeholder="Description"
            // onChange={lnerror}
          />
        </ModalBody>
        
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              editFamousPerson();
              setModelEdit(false);
            }}>
            Edit
          </Button>{" "}
          <Button color="secondary" onClick={toggEditModal}>
            Cancel
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
        <ModalBody>You want to delete this Famous Person</ModalBody>
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

export default FamousPersonsTable;
