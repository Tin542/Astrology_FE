import React, { useState, useEffect } from "react";
import { del, get, putWithToken, postWithToken } from "../../service/ReadAPI";

import Moment from "react-moment";
import moment from "moment";

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
  const [useListPersonShowPage, setUseListPersonShowPage] = useState([]);

  //Edit Person
  const [edtID, setEdtId] = useState();
  const [edtFamousPerson, setEdtPerson] = useState([]);
  const [modalEdit, setModelEdit] = useState(false);
  const toggEditModal = () => setModelEdit(!modalEdit);

  //Delete Person
  const [PersonDelete, setPersonDelete] = useState(null);
  const [modalPersonDelete, setPersonModelDelete] = useState(false);
  const togglePersonDelete = () =>
  setPersonModelDelete(!modalPersonDelete);

  //create Person
  const [Create, setCreate] = useState([]);
  const [modalCreate, setModalCreate] = useState(false);
  const toggleCreateModal = () => setModalCreate(!modalCreate);

  //paging
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [pageList, setPageList] = useState([]);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    getPersonList();
  }, []);

  function getPersonList() {
    get(`/api/v1/famouspersons?limit=${limit}&&page=${currentPage}`)
      .then((res) => {
        var temp = res.data.data.list;
        console.log(temp);
        var totalPageNumber = Math.ceil(res.data.data.total / 5);
        setTotalPage(totalPageNumber);
        setUseListPersonShowPage(temp);
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
        setUseListPersonShowPage(temp);
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
    if (list.length >= 1) {
      setPageList(list);
      console.log("list page: " + list);
    }
  }

  function deleteByID() {
    console.log("delete: ", PersonDelete);
    console.log("name: ", localStorage.getItem("NAME"));

    del(`/api/v1/famouspersons/${PersonDelete}`, localStorage.getItem("token"))
      .then((res) => {
        if (res.data.code === 0) {
          alert("delete successful");
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

  function addPerson() {
    console.log("add: ", Create);

    postWithToken(
      `/api/v1/famouspersons`,
      { name: Create },
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.data.code === 0) {
          alert("Add success");
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

  function editFamousPerson(){
    console.log("edt ID: ", edtID);
    console.log("wdt Name: ", edtFamousPerson.name);

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
            <Card className="table-big-boy">
              <Card.Header>
                <Card.Title as="h4">
                 
                    <Button
                      className="btn-wd mr-1" variant="info"
                      type="button"
                      onClick={() => {
                        setModalCreate(true);
                      }}>
                      Add Famous Person
                    </Button>
                  
                </Card.Title>

                <br></br>
              </Card.Header>
              <Card.Body className="table-full-width">
                <Table className="table-bigboy">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th className="text-right">ID</th>
                      <th className="text-right">Name</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {useListPersonShowPage.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td className="td-number">{item.id}</td>
                          <td className="td-number">{item.name}</td>
                          <td className="td-number">
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
                                <Tooltip id="tooltip-408856985">Remove</Tooltip>
                              }
                              placement="left">
                              <Button
                                className="btn-link btn-icon"
                                type="button"
                                variant="danger"
                                onClick={() => {
                                  setPersonDelete(item.id);
                                  setPersonModelDelete(true);
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
              <Row>
                <Col md={6}></Col>
                <Col md={6}></Col>
              </Row>
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

      <Modal isOpen={modalPersonDelete} toggle={togglePersonDelete}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(togglePersonDelete)}
          toggle={togglePersonDelete}>
          Are you sure?
        </ModalHeader>
        <ModalBody>Do you want to delete this Famous Person</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              deleteByID();
              setPersonModelDelete(false);
            }}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={togglePersonDelete}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalCreate} toggle={toggleCreateModal}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleCreateModal)}
          toggle={toggleCreateModal}>
          Add Famous Person
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            name="name"
            id="name"
            value={Create}
            onChange={(e) => setCreate(e.target.value)}
            placeholder="Name"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              addPerson();
              setModalCreate(false);
            }}>
            Add
          </Button>{" "}
          <Button color="secondary" onClick={toggleCreateModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEdit} toggle={toggEditModal}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggEditModal)}
          toggle={toggEditModal}>
          Add Famous Person
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
    </>
  );
}
export default FamousPersonsTable;