import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import { get } from "../../service/ReadAPI";
import moment from "moment";
import "../../assets/css/customize.css";
import {
  getListPost,
  getLsitPostSearchAndFilter,
} from "../../service/post.service.js";

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
  const [listPost, setListPost] = useState([]);
  //listZodiac
  const [listZodiac, setListZodiac] = useState([]);

  //Search
  const [search, setSearch] = useState(null);
  const [states, setStates] = React.useState({ value: null });
  const [selectedZodiac, setSelectedZodiac] = React.useState({ value: null });

  //paging
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [pageList, setPageList] = useState([]);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    loadData();
  }, [currentPage, limit, search, states, selectedZodiac]);

  useEffect(() => {
    getAllZodiac();
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
  const loadData = () => {
    console.log("search: ", search);
    console.log("states: ", states);
    console.log("zodiacs: ", selectedZodiac);
    if (
      search &&
      search.trim() === "" &&
      states.value &&
      states.value.trim() === "" &&
      selectedZodiac.value &&
      selectedZodiac.value.trim() === ""
    ) {
      getListPost(currentPage, limit)
        .then((res) => {
          var temp = res.data.data.list;
          console.log(temp);
          console.log("data: ", res.data);
          setListPost(temp);
          showPageList(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getLsitPostSearchAndFilter(currentPage, limit, search, states.value, selectedZodiac.value)
        .then((res) => {
          var temp = res.data.data.list;
          console.log(temp);
          console.log("data: ", res.data);
          setListPost(temp);
          showPageList(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function changePage(crrPage) {
    if (
      search &&
      search.trim() === "" &&
      states.value &&
      states.value.trim() === null &&
      zodiacs.value &&
      zodiacs.value.trim() === null
    ) {
      getListPost(crrPage, limit)
        .then((res) => {
          var temp = res.data.data.list;
          console.log("paging post: ", temp);

          setListPost(temp);
          setCurrentPage(crrPage);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getLsitPostSearchAndFilter(crrPage, limit, search, states.value, selectedZodiac.value)
        .then((res) => {
          var temp = res.data.data.list;
          console.log("paging post: ", temp);

          setListPost(temp);
          setCurrentPage(crrPage);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="table-big-boy">
              <Card.Header></Card.Header>
              <Card.Body className="table-full-width">
                <Row>
                  <Col className="pl-4" sm="2">
                    <Select
                      className="react-select primary"
                      classNamePrefix="react-select"
                      name="singleSelect"
                      value={states}
                      onChange={(value) => {
                        setStates(value);
                        setCurrentPage(1);
                      }}
                      options={[
                        {
                          value: "",
                          disabled: true
                        },
                        { value: null, label: "All States" },
                        { value: true, label: "Approve" },
                        { value: false, label: "Wating" },
                      ]}
                      placeholder="Status"
                    />
                  </Col>
                  <Col className="pl-3" md="2">
                  <Select
                      className="react-select primary"
                      classNamePrefix="react-select"
                      name="singleSelect"
                      value={selectedZodiac}
                      onChange={(value) => {
                        setSelectedZodiac(value);
                        setCurrentPage(1);
                      }}
                      options={
                        (
                        listZodiac.map((item) => ({
                          value: item.id,
                          label: item.name,
                        })))
                      }
                      placeholder="Zodiac"
                    />
                  </Col>
                  <Col className="pl-2" md="3">
                    <InputGroup>
                      <Input
                        placeholder="Search title..."
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}></Input>
                      <Button
                        className="btn-outline"
                        type="button"
                        variant="info"
                        onClick={() => {
                          loadData();
                          setCurrentPage(1);
                        }}>
                        <span className="btn-label">
                          <i className="fas fa-search"></i>
                        </span>
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>

                <hr></hr>
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th style={{ color: "black" }} className="text-center">
                        <strong>Image</strong>
                      </th>
                      <th style={{ color: "black" }}>
                        <strong>Title</strong>
                      </th>
                      <th style={{ color: "black" }}>
                        <strong>Posted By</strong>
                      </th>
                      <th style={{ color: "black" }}>
                        <strong>Date</strong>
                      </th>
                      <th style={{ color: "black" }}>
                        <strong>Status</strong>
                      </th>
                      <th style={{ color: "black" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {listPost.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <div className="postImage">
                              <img
                                alt="..."
                                style={{
                                  width: 160,
                                  height: 100,
                                }}
                                src={item.image_url}
                                onClick={() => {
                                  localStorage.setItem("postId", item.id);
                                }}></img>
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
                            {moment(item.created_at).format("DD-MM-YYYY")}
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
    </>
  );
}
export default PostTables;
