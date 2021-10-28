import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  del,
  patchWithToken,
  get,
  put,
  getWithToken,
} from "../../service/ReadAPI";
import moment from "moment";
import "../../assets/css/customize.css";

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
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroupButtonDropdown,
  Input,
  FormGroup,
} from "reactstrap";

function PostTables() {
  useEffect(() => {
    getServiceList();
  }, []);
  const [useListServiceShowPage, setUseListServiceShowPage] = useState([]);

  //detail
  const [id, setId] = useState();

  //delete
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDelete = () => setDeleteModal(!deleteModal);

  //paging
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [pageList, setPageList] = useState([]);
  const [limit, setLimit] = useState(5);

  function getServiceList() {
    getWithToken(
      `/api/v1/posts/admin?limit=${limit}&&page=${currentPage}`,
      localStorage.getItem("token")
    )
      .then((res) => {
        var temp = res.data.data.list;
        console.log(temp);
        console.log("data: ", res.data);

        setUseListServiceShowPage(temp);
        showPageList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changePage(crrPage) {
    getWithToken(
      `/api/v1/posts/admin?limit=${limit}&&page=${crrPage}`,
      localStorage.getItem("token")
    )
      .then((res) => {
        var temp = res.data.data.list;
        console.log("paging post: ", temp);

        setUseListServiceShowPage(temp);
        setCurrentPage(crrPage);
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

  

  function approvePost() {
    console.log("id: ", id);
    console.log("token: ", localStorage.getItem("token"));
    patchWithToken(
      `/api/v1/posts/approve?id=${id}`,
      { id: id },
      localStorage.getItem("token")
    ).then((res) => {
      if (res.data.code === 0) {
        alert("approve success");
        setCurrentPage(1);
        getServiceList();
      }
      if (res.data.code === 7) {
        console.log(res.data.msg);
        alert(res.data.msg);
      }
    });
  }

  function deletePost() {
    console.log("id: ", id);
    console.log("token: ", localStorage.getItem("token"));
    del(`/api/v1/posts/${id}`, localStorage.getItem("token")).then((res) => {
      if (res.data.code === 0) {
        alert("delete success");
        setCurrentPage(1);
        getServiceList();
      }
      if (res.data.code === 7) {
        console.log(res.data.msg);
        alert(res.data.msg);
      }
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
              <Card.Header></Card.Header>
              <Card.Body className="table-full-width">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="text-center">Image</th>
                      <th>Title</th>
                      <th>Posted By</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {useListServiceShowPage.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <div className="postImage">
                              <Link to={"/admin/detail-post"}>
                                <img
                                  alt="..."
                                  src={item.image_url}
                                  onClick={() => {
                                    localStorage.setItem("postId", item.id);
                                  }}></img>
                              </Link>
                            </div>
                          </td>

                          <td
                            className="td-name"
                            onClick={() => {
                              localStorage.setItem("postId", item.id);
                            }}>
                            <Link to={"/admin/detail-post"}>{item.title}</Link>
                          </td>

                          <td className="td-number">{item.astrologer.name}</td>
                          <td className="td-number">
                            {moment(item.created_at).format("MM-DD-YYYY")}
                          </td>
                          <td className="td-number">
                            {item.is_approve ? (
                              <b style={{ color: "green" }}>Approved</b>
                            ) : (
                              <b style={{ color: "red" }}>Waiting</b>
                            )}
                          </td>
                          <td className="td-actions"></td>
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
      <Pagination aria-label="Page navigation example" className="page-right">
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
          <PaginationItem active={page + 1 === currentPage}>
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

      {/* <Modal isOpen={editModal} toggle={toggleEdit}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleEdit)}
          toggle={toggleEdit}>
          Post detail
        </ModalHeader>
        <ModalBody>
          <div className="img-container">
            <img alt="..." src={image}></img>
          </div>
        </ModalBody>
        <ModalBody>
          <b>Title:</b> {title}
          <br />
          <b>Content:</b> {description}
          <br />
          <b>Posted by:</b> {astrologer}
          <br />
          <b>Zodiac:</b> {zodiac}
          <br />
          <b>Category:</b> {category}
          <br />
          <b>Create at:</b> {moment(createDate).format("MM-DD-YYYY")}
          <br />
          <b>Update at:</b> {moment(updateDate).format("MM-DD-YYYY")}
          <br />
          <b>Status:</b>{" "}
          {approve ? (
            <b style={{ color: "green" }}>Approved</b>
          ) : (
            <b style={{ color: "red" }}>Waiting</b>
          )}
          <br />
        </ModalBody>

        <ModalFooter>
          <Button
            disabled={approve}
            variant="success"
            onClick={() => {
              approvePost();
            }}>
            Approve
          </Button>{" "}
          <Button variant="danger" onClick={() => {setDeleteModal(true)}}>
            Delete
          </Button>
        </ModalFooter>
      </Modal> */}

      <Modal isOpen={deleteModal} toggle={toggleDelete}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleDelete)}
          toggle={toggleDelete}>
          Are you sure?
        </ModalHeader>
        <ModalBody>Do you want to delete this Category</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              setDeleteModal(false);
              setEditModal(false);
              deletePost();
            }}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggleDelete}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
export default PostTables;
