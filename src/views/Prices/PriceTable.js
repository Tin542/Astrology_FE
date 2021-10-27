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

function PriceTable() {
  const [useListPriceShowPage, setUseListPriceShowPage] = useState([]);

  //Edit Price
  const [edtID, setEdtId] = useState();
  const [edtPrice, setEdtPrice] = useState([]);
  const [modalEdit, setModelEdit] = useState(false);
  const toggEditModal = () => setModelEdit(!modalEdit);

  //Delete Price
  const [PriceDelete, setPriceDelete] = useState(null);
  const [modalPriceDelete, setPriceModelDelete] = useState(false);
  const togglePriceDelete = () =>
  setPriceModelDelete(!modalPriceDelete);

  //create price
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
    get(`/api/v1/pricetables?limit=${limit}&&page=${currentPage}`)
      .then((res) => {
        var temp = res.data.data.list;
        console.log(temp);
        var totalPageNumber = Math.ceil(res.data.data.total / 5);
        setTotalPage(totalPageNumber);
        setUseListPriceShowPage(temp);
        showPageList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changePage(number) {
    get(`/api/v1/pricetables?limit=${limit}&&page=${number}`)
      .then((res) => {
        var temp = res.data.data.list;
        console.log(temp);
        setUseListPriceShowPage(temp);
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
    console.log("delete: ", PriceDelete);
    console.log("name: ", localStorage.getItem("NAME"));

    del(`/api/v1/pricetables/${PriceDelete}`, localStorage.getItem("token"))
      .then((res) => {
        if (res.data.code === 0) {
          alert("delete success");
          setCurrentPage(1);
          getCategoryList();
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
      `/api/v1/pricetables`,
      { price1: Create,
        duration1: Create,
        price2: Create,
        duration2: Create,
        price3: Create,
        duration3: Create,},
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.data.code === 0) {
          alert("Add success");
          setCurrentPage(1);
          getCategoryList();
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
    console.log("edt ID: ", edtID);
    console.log("edt Price 1: ", edtPrice.price1);
    console.log("edt Duration 1: ", edtPrice.duration1);
    console.log("edt Price 2: ", edtPrice.price2);
    console.log("edt Duration 2: ", edtPrice.duration2);
    console.log("edt Price 3: ", edtPrice.price3);
    console.log("edt Duration 3: ", edtPrice.duration3);

    putWithToken(
      `/api/v1/pricetables/${edtID}`,
      { price1: edtPrice.price1,
        duration1: edtPrice.duration1,
        price2: edtPrice.price2,
        duration2: edtPrice.duration2,
        price3: edtPrice.price3,
        duration3: edtPrice.duration3, },
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.data.code === 0) {
          alert("Edit success");
          setCurrentPage(1);
          getCategoryList();
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
                      Add Price
                    </Button>
                  
                </Card.Title>

                <br></br>
              </Card.Header>
              <Card.Body className="table-full-width">
                <Table className="table-bigboy">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Price 1</th>
                      <th>Duration 1</th>
                      <th>Price 2</th>
                      <th>Duration 2</th>
                      <th>Price 3</th>
                      <th>Duration 3</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {useListPriceShowPage.map((p, index) => {
                      return (
                        <tr key={index}>
                          <td>{p.id}</td>
                          <td>{p.price1}</td>
                          <td>{p.duration1}</td>
                          <td>{p.price2}</td>
                          <td>{p.duration2}</td>
                          <td>{p.price3}</td>
                          <td>{p.duration3}</td>
                          <td className="td-actions">
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
                                  // setEdtId(p.id);
                                  setEdtPrice({
                                    price1: p.price1,
                                    duration1: p.duration1,
                                    price2: p.price2,
                                    duration2: p.duration2,
                                    price3: p.price3,
                                    duration3: p.duration3,
                                  });
                                  setEdtId(p.id);
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
                                  setPriceDelete(p.id);
                                  setPriceModelDelete(true);
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
          <PaginationItem active={page+1 === currentPage}>
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

      <Modal isOpen={modalPriceDelete} toggle={togglePriceDelete}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(togglePriceDelete)}
          toggle={togglePriceDelete}>
          Are you sure?
        </ModalHeader>
        <ModalBody>Do you want to delete this Price</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              deleteByID();
              setPriceModelDelete(false);
            }}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={togglePriceDelete}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalCreate} toggle={toggleCreateModal}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleCreateModal)}
          toggle={toggleCreateModal}>
          Add Price
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            name="price1"
            id="price1"
            value={Create}
            onChange={(e) => setCreate(e.target.value)}
            placeholder="Price 1"
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="text"
            name="duration1"
            id="duration1"
            value={Create}
            onChange={(e) => setCreate(e.target.value)}
            placeholder="Duration 1"
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="text"
            name="price2"
            id="price2"
            value={Create}
            onChange={(e) => setCreate(e.target.value)}
            placeholder="Price 2"
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="text"
            name="duration2"
            id="duration2"
            value={Create}
            onChange={(e) => setCreate(e.target.value)}
            placeholder="Duration 2"
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="text"
            name="price3"
            id="price3"
            value={Create}
            onChange={(e) => setCreate(e.target.value)}
            placeholder="Price 3"
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="text"
            name="duration3"
            id="duration3"
            value={Create}
            onChange={(e) => setCreate(e.target.value)}
            placeholder="Duration 3"
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
          Edit Price
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            name="price1"
            id="price1"
            value={edtPrice.price1}
            onChange={(e) => setEdtPrice({price1: e.target.value})}
            placeholder="Price 1"
            // onChange={lnerror}
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="text"
            name="duration1"
            id="duration1"
            value={edtPrice.duration1}
            onChange={(e) => setEdtPrice({duration1: e.target.value})}
            placeholder="Duration 1"
            // onChange={lnerror}
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="text"
            name="price2"
            id="price2"
            value={edtPrice.price2}
            onChange={(e) => setEdtPrice({price2: e.target.value})}
            placeholder="Price 2"
            // onChange={lnerror}
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="text"
            name="duration2"
            id="duration2"
            value={edtPrice.duration2}
            onChange={(e) => setEdtPrice({duration2: e.target.value})}
            placeholder="Duration 2"
            // onChange={lnerror}
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="text"
            name="price3"
            id="price3"
            value={edtPrice.price3}
            onChange={(e) => setEdtPrice({price3: e.target.value})}
            placeholder="Price 3"
            // onChange={lnerror}
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="text"
            name="duration3"
            id="duration3"
            value={edtPrice.duration3}
            onChange={(e) => setEdtPrice({duration3: e.target.value})}
            placeholder="Duration 3"
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
export default PriceTable;
