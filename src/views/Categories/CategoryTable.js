import React, { useState, useEffect } from "react";
import { del, post, get, put, getWithParam } from "../../service/ReadAPI";

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
  Input
} from "reactstrap";

function CategoryTable() {
  const [useListCategoryShowPage, setUseListCategoryShowPage] = useState([]);
  const [isPaging, setIsPaging] = useState(false);

  //Edit Category
  const [CategoryEdit, setCategoryEdit] = useState(null);
  const [modalCategoryEdit, setCategoryModelEdit] = useState(false);
  const toggleCategoryEdit = () => setCategoryModelEdit(!modalCategoryEdit);

  //Delete Category
  const [CategoryDelete, setCategoryDelete] = useState(null);
  const [modalCategoryDelete, setCategoryModelDelete] = useState(false);
  const toggleCategoryDelete = () =>
    setCategoryModelDelete(!modalCategoryDelete);

  //paging
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);
  // const [sort, setSort] = useState(id);
  const [limit, setLimit] = useState(5);
  const [count, setCount] = useState(1);

  // field edit
  const [name, setName] = useState("");

  useEffect(() => {
    getCategoryList();
    // displayFIeldName();
    // displayStateName();
    // get("​/api​/v1.0​/company​").then((res) => {
    //   if (res && res.status === 200) {
    //     setListFilterState(res.data);
    //   }
    // });
    // get("/api​/v1.0​/major_field​").then((res) => {
    //   if (res && res.status === 200) {
    //     setListFilterState(res.data);
    //   }
    // });
  }, []);

  function getCategoryList() {
    get("/api/v1/categories")
      .then((res) => {
        var temp = res.data.data.list;
        console.log(temp);

        setUseListCategoryShowPage(temp);
        setUseListCategoryShowPage(
          temp.slice(numberPage * 5 - 5, numberPage * 5)
        );
        setTotalNumberPage(Math.ceil(temp.length / 5));
        setCount(count);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onClickPage(number) {
    setNumberPage(number);
    setUseListCategoryShowPage(useListCategoryShowPage.slice(number * 5 - 5, number * 5));
    setTotalNumberPage(Math.ceil(useListCategoryShowPage.length / 5));
  }

  function deleteByID() {
    del(`/api/v1.0/categories/${CategoryDelete}`)
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/category-table";
        }
      })
      .catch((err) => {
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
                <Card.Title as="h4">All Category</Card.Title>
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
                                variant="success">
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
                                  setCategoryEdit();
                                  setCategoryModelDelete(true);
                                  window.location.href = "/admin/Categories/category-table";
                                  
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
                  <Col md={6}>
                    <Pagination
                      aria-label="Page navigation example"
                      className="page-right"
                    >
                      <PaginationItem disabled={numberPage === 1}>
                        <PaginationLink
                          className="page"
                          previous
                          //disable={numberPage === 1 ? "true" : "false"}

                          onClick={() => {
                            if (numberPage - 1 > 0) {
                              onClickPage(numberPage - 1);
                            }
                          }}
                        >
                          Previous
                        </PaginationLink>
                      </PaginationItem>
                      {numberPage - 1 > 0 ? (
                        <PaginationItem>
                          <PaginationLink
                            className="page"
                            onClick={() => {
                              onClickPage(numberPage - 1);
                            }}
                          >
                            {numberPage - 1}
                          </PaginationLink>
                        </PaginationItem>
                      ) : (
                        ""
                      )}
                      <PaginationItem active>
                        <PaginationLink className="page-active">
                          {numberPage}
                        </PaginationLink>
                      </PaginationItem>
                      {numberPage + 1 <= totalNumberPage ? (
                        <PaginationItem>
                          <PaginationLink
                            className="page"
                            onClick={() => {
                              onClickPage(numberPage + 1);
                            }}
                          >
                            {numberPage + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ) : (
                        ""
                      )}
                      {numberPage + 2 <= totalNumberPage ? (
                        <PaginationItem>
                          <PaginationLink
                            className="page"
                            onClick={() => {
                              onClickPage(numberPage + 2);
                            }}
                          >
                            {numberPage + 2}
                          </PaginationLink>
                        </PaginationItem>
                      ) : (
                        ""
                      )}

                      <PaginationItem disabled={numberPage === totalNumberPage}>
                        <PaginationLink
                          className="page"
                          next
                          //disable={numberPage === totalNumberPage ? true : false}
                          onClick={() => {
                            if (numberPage + 1 <= totalNumberPage) {
                              onClickPage(numberPage + 1);
                            }
                          }}
                        >
                          Next
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </Col>
                </Row>
            </Card>
          </Col>
        </Row>
      </Container>

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

      <Modal isOpen={modalCategoryEdit} toggle={toggleCategoryEdit}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleCategoryEdit)}
          toggle={toggleCategoryEdit}>
          Edit Category
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            name="name"
            id="name"
            defaultValue={name}
            placeholder="Name"
            // onChange={lnerror}
          />
        </ModalBody>
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
    </>
  );
}
export default CategoryTable;
