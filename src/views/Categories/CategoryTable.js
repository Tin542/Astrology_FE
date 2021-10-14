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

function CategoryTable() {
  const [useListCategoryShowPage, setUseListCategoryShowPage] = useState([]);

  //Edit Category
  const [edtCategory, setEdtCategory] = useState([]);
  const [modalEdit, setModelEdit] = useState(false);
  const toggEditModal = () => setModelEdit(!modalEdit);

  //Delete Category
  const [CategoryDelete, setCategoryDelete] = useState(null);
  const [modalCategoryDelete, setCategoryModelDelete] = useState(false);
  const toggleCategoryDelete = () =>
    setCategoryModelDelete(!modalCategoryDelete);

  //create category
  const [Create, setCreate] = useState([]);
  const [modalCreate, setModalCreate] = useState(false);
  const toggleCreateModal = () => setModalCreate(!modalCreate);

  //paging
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [pageList, setPageList] = useState([]);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    getCategoryList();
  }, []);

  function getCategoryList() {
    get(`/api/v1/categories?limit=${limit}&&page=${currentPage}`)
      .then((res) => {
        var temp = res.data.data.list;
        console.log(temp);
        setUseListCategoryShowPage(temp);
        showPageList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changePage(number) {
    get(`/api/v1/categories?limit=${limit}&&page=${number}`)
      .then((res) => {
        var temp = res.data.data.list;
        console.log(temp);
        setUseListCategoryShowPage(temp);
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
    if (list.length > 1) {
      setPageList(list);
      console.log("list page: " + list);
    }
  }

  function deleteByID() {
    console.log("delete: ", CategoryDelete);
    // console.log("token: ", localStorage.getItem("token"));

    del(`/api/v1.0/categories/${CategoryDelete}`, localStorage.getItem("token"))
      .then((res) => {
        if (res.data.code === 0) {
          alert("delete success");
          window.location = "/admin/category-table";
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

  function addCategory() {
    console.log("add: ", Create);

    postWithToken(
      `/api/v1.0/categories`,
      { name: Create },
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.data.code === 0) {
          alert("Add success");
          window.location = "/admin/category-table";
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

  function editCategory(){
    console.log("edt ID: ", edtCategory.id);
    console.log("wdt Name: ", edtCategory.name);

    putWithToken(
      `/api/v1.0/categories/${edtCategory.id}`,
      { name: edtCategory.name },
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.data.code === 0) {
          alert("Edit success");
          window.location = "/admin/category-table";
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
                  All Category
                  <OverlayTrigger
                    overlay={
                      <Tooltip id="tooltip-461494662">Add Category</Tooltip>
                    }
                    placement="left">
                    <Button
                      className="btn-link btn-icon"
                      type="button"
                      variant="success"
                      onClick={() => {
                        setModalCreate(true);
                      }}>
                      <i className="fas fa-plus"></i>
                    </Button>
                  </OverlayTrigger>
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
                    {useListCategoryShowPage.map((item, index) => {
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
                                  setEdtCategory({
                                    id: item.id,
                                    name: item.name,
                                  });
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
                                  setCategoryDelete(item.id);
                                  setCategoryModelDelete(true);
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

      <Modal isOpen={modalCategoryDelete} toggle={toggleCategoryDelete}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleCategoryDelete)}
          toggle={toggleCategoryDelete}>
          Are you sure?
        </ModalHeader>
        <ModalBody>Do you want to delete this Category</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              deleteByID();
              setCategoryModelDelete(false);
            }}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggleCategoryDelete}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalCreate} toggle={toggleCreateModal}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleCreateModal)}
          toggle={toggleCreateModal}>
          Add Category
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            name="name"
            id="name"
            value={Create}
            onChange={(e) => setCreate(e.target.value)}
            placeholder="Name"
            // onChange={lnerror}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              addCategory();
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
          Add Category
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            name="name"
            id="name"
            value={edtCategory.name}
            onChange={(e) => setEdtCategory({name: e.target.value})}
            placeholder="Name"
            // onChange={lnerror}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              editCategory();
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
export default CategoryTable;
