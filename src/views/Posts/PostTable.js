import React, { useState, useEffect } from "react";
import { del, post, get, put } from "../../service/ReadAPI";
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
  const [postPaging, setPostPaging] = useState([]);

  //detail
  const [id, setId] = useState();
  const [title, setittle] = useState();
  const [description, setDescription] = useState();
  const [approve, setAprove] = useState(false);
  const [category, setCategory] = useState();
  const [astrologer, setAstrologer] = useState();
  const [zodiac, setZodiac] = useState([]);
  const [createDate, setCreateDate] = useState();
  const [updateDate, setUpdateDate] = useState();
  const [image, setImage] = useState();

  //modal Edit
  const [editModal, setEditModal] = useState(false);
  const toggleEdit = () => setEditModal(!editModal);

  //delete
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDelete = () => setDeleteModal(!deleteModal);

  //paging
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [pageList, setPageList] = useState([]);
  const [limit, setLimit] = useState(5);

  function getServiceList() {
    get(`/api/v1/posts?limit=${limit}&&page=${currentPage}`)
      .then((res) => {
        var temp = res.data.data.list;
        console.log(temp);

        setUseListServiceShowPage(temp);
        showPageList(res);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changePage(crrPage) {
    get(`/api/v1/posts?limit=${limit}&&page=${crrPage}`)
      .then((res) => {
        var temp = res.data.data.list;
        console.log("paging post: ",temp);

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

  function getPostByID(Id) {
    console.log("id: ", Id);
    get(`/api/v1/posts/${Id}`)
      .then((res) => {
        var temp = res.data.data;
        console.log(temp);
        setId(Id);
        setittle(temp.title);
        setDescription(temp.content);
        setAprove(temp.is_approve);
        setCategory(temp.category_id);
        setAstrologer(temp.astrologer.name);
        setZodiac(temp.zodiacs.name);
        setCreateDate(temp.created_at);
        setUpdateDate(temp.updated_at);
        setImage(temp.image_url);

        console.log("zodiacs: ",temp.zodiacs.data.name);
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
                <Card.Title as="h4">All Post</Card.Title>
                <br></br>
              </Card.Header>
              <Card.Body className="table-full-width">
                <Table className="table-bigboy">
                  <thead>
                    <tr>
                      <th className="text-center">Thumb</th>
                      <th>Title</th>
                      <th className="text-right">Posted By</th>
                      <th className="text-right">Category</th>
                      <th className="text-right">Date</th>
                      <th className="text-right">Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {useListServiceShowPage.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <div className="img-container">
                              <img
                                alt="..."
                                src={item.image_url}
                                onClick={() => {
                                  // setserviceEdit(e.Id);
                                  getPostByID(item.id);
                                  setEditModal(true);
                                }}></img>
                            </div>
                          </td>
                          <td
                            className="td-name"
                            onClick={() => {
                              // setserviceEdit(e.Id);
                              getPostByID(item.id);
                              setEditModal(true);
                            }}>
                            {item.title}
                          </td>

                          <td className="td-number">{item.astrologer.name}</td>
                          <td className="td-number">{item.category_id}</td>
                          <td className="td-number">
                            {moment(item.created_at).format("MM-DD-YYYY")}
                          </td>
                          <td className="td-number">
                            {item.is_approve ? "Approved" : "Waiting"}
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

      <Modal isOpen={editModal} toggle={toggleDelete}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleEdit)}
          toggle={toggleDelete}>
          Post detail
        </ModalHeader>
        <ModalBody>
          <b>Image:</b>{" "}
          <div className="img-container">
            <img alt="..." src={image}></img>
          </div>
        </ModalBody>
        <ModalBody>
          <b>Title:</b> {title}
        </ModalBody>
        <ModalBody>
          <b>Content:</b> {description}
        </ModalBody>
        <ModalBody>
          <b>Posted by:</b> {astrologer}
        </ModalBody>
        <ModalBody>
          <b>Zodiac:</b> {zodiac}
        </ModalBody>
        <ModalBody>
          <b>Category:</b> {category}
        </ModalBody>
        <ModalBody>
          <b>Create at:</b> {moment(createDate).format("MM-DD-YYYY")}
        </ModalBody>
        <ModalBody>
          <b>Update at:</b> {moment(updateDate).format("MM-DD-YYYY")}
        </ModalBody>
        <ModalBody>
          <b>Status:</b> {approve ? "Approved" : "Waiting"}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => {}}>
            Approve
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </>
  );
}
export default PostTables;
