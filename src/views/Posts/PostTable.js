import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import { getWithToken } from "../../service/ReadAPI";
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
  const [useListServiceShowPage, setUseListServiceShowPage] = useState([]);

  //Search
  const [search, setSearch] = useState(null);
  const [states, setStates] = React.useState({ value: null });
  const [isSearch, setIsSearch] = useState(true);

  //paging
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [pageList, setPageList] = useState([]);
  const [searchPageList, setSearchPageList] = useState([]);
  const [limit, setLimit] = useState(5);
  useEffect(() => {
    getServiceList();
  }, []);

  function getServiceList() {
    console.log("search: ", search);
    console.log("state: ", states);
    if (
      (search === null || search === "") &&
      (states.value === null || states.value === "")
    ) {
      getWithToken(
        `/api/v1/posts/admin?limit=${limit}&&page=${currentPage}`,
        localStorage.getItem("token")
      )
        .then((res) => {
          var temp = res.data.data.list;
          console.log(temp);
          console.log("data: ", res.data);
          setIsSearch(false);
          setUseListServiceShowPage(temp);
          showPageList(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (
      (states.value === null || states.value === "") &&
      (search !== null || search !== "")
    ) {
      getWithToken(
        `/api/v1/posts/admin?limit=${limit}&page=${currentPage}&title=${search}`,
        localStorage.getItem("token")
      )
        .then((res) => {
          var temp = res.data.data.list;
          console.log(temp);
          console.log("data: ", res.data);
          setIsSearch(true);
          setUseListServiceShowPage(temp);
          showPageListSearch(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (
      (states.value !== null || states.value !== "") &&
      (search === null || search === "")
    ) {
      getWithToken(
        `/api/v1/posts/admin?limit=${limit}&page=${currentPage}&is-approve=${states.value}`,
        localStorage.getItem("token")
      )
        .then((res) => {
          var temp = res.data.data.list;
          console.log(temp);
          console.log("data: ", res.data);
          setIsSearch(true);
          setUseListServiceShowPage(temp);
          showPageListSearch(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getWithToken(
        `/api/v1/posts/admin?limit=${limit}&page=${currentPage}&title=${search}&is-approve=${states.value}`,
        localStorage.getItem("token")
      )
        .then((res) => {
          var temp = res.data.data.list;
          console.log(temp);
          console.log("data: ", res.data);
          setIsSearch(true);
          setUseListServiceShowPage(temp);
          showPageListSearch(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
  function changePageSearch(crrPage) {
    if (
      (states.value === null || states.value === "") &&
      (search !== null || search !== "")
    ) {
      getWithToken(
        `/api/v1/posts/admin?limit=${limit}&page=${crrPage}&title=${search}`,
        localStorage.getItem("token")
      )
        .then((res) => {
          var temp = res.data.data.list;
          console.log("paging with search post: ", temp);

          setUseListServiceShowPage(temp);
          setCurrentPage(crrPage);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (
      (states.value !== null || states.value !== "") &&
      (search === null || search === "")
    ) {
      getWithToken(
        `/api/v1/posts/admin?limit=${limit}&page=${crrPage}&is-approve=${states.value}`,
        localStorage.getItem("token")
      )
        .then((res) => {
          var temp = res.data.data.list;
          console.log("paging with search post: ", temp);

          setUseListServiceShowPage(temp);
          setCurrentPage(crrPage);
        })
        .catch((err) => {
          console.log(err);
        });
    }else {
      getWithToken(
        `/api/v1/posts/admin?limit=${limit}&page=${crrPage}&title=${search}&is-approve=${states.value}`,
        localStorage.getItem("token")
      )
        .then((res) => {
          var temp = res.data.data.list;
          console.log("paging with search post: ", temp);

          setUseListServiceShowPage(temp);
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
    if (list.length > 1) {
      setPageList(list);
      console.log("list page: " + list);
    }
  }
  function showPageListSearch(res) {
    var list = [];
    var totalPageNumber = Math.ceil(res.data.data.total / 5);
    console.log("total: ", totalPageNumber);

    setTotalPage(totalPageNumber);

    for (let i = 0; i < totalPageNumber; i++) {
      list.push(i);
    }
    if (list.length >= 1) {
      setSearchPageList(list);
      console.log("list page: " + list);
    }
  }
  function handleSelectSates(value) {
    console.log("search: ", search);
    console.log("state: ", states);
    setStates(value);
    if (
      (search === null || search === "") &&
      (value.value === null || value.value === "")
    ) {
      getWithToken(
        `/api/v1/posts/admin?limit=${limit}&&page=${currentPage}`,
        localStorage.getItem("token")
      )
        .then((res) => {
          var temp = res.data.data.list;
          console.log(temp);
          console.log("data: ", res.data);
          setIsSearch(false);
          setUseListServiceShowPage(temp);
          showPageList(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (
      (value.value === null || value.value === "") &&
      (search !== null || search !== "")
    ) {
      getWithToken(
        `/api/v1/posts/admin?limit=${limit}&page=${currentPage}&title=${search}`,
        localStorage.getItem("token")
      )
        .then((res) => {
          var temp = res.data.data.list;
          console.log(temp);
          console.log("data: ", res.data);
          setIsSearch(true);
          setCurrentPage(1);
          setUseListServiceShowPage(temp);
          showPageListSearch(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (
      (value.value !== null || value.value !== "") &&
      (search === null || search === "")
    ) {
      getWithToken(
        `/api/v1/posts/admin?limit=${limit}&page=${currentPage}&is-approve=${value.value}`,
        localStorage.getItem("token")
      )
        .then((res) => {
          var temp = res.data.data.list;
          console.log(temp);
          console.log("data: ", res.data);
          setIsSearch(true);
          setCurrentPage(1);
          setUseListServiceShowPage(temp);
          showPageListSearch(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getWithToken(
        `/api/v1/posts/admin?limit=${limit}&page=${currentPage}&title=${search}&is-approve=${value.value}`,
        localStorage.getItem("token")
      )
        .then((res) => {
          var temp = res.data.data.list;
          console.log(temp);
          console.log("data: ", res.data);
          setIsSearch(true);
          setCurrentPage(1);
          setUseListServiceShowPage(temp);
          showPageListSearch(res);
        })
        .catch((err) => {
          console.log(err);
        });
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
                        handleSelectSates(value);
                      }}
                      options={[
                        {
                          value: "",
                          
                        },
                        { value: null, label: "All States" },
                        { value: true, label: "Approve" },
                        { value: false, label: "Wating" },
                      ]}
                      placeholder="Status"
                    />
                  </Col>
                  <Col className="pl-3" md="1">
                    <Button>Zodiac</Button>
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
                          getServiceList();
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
                    {useListServiceShowPage.map((item, index) => {
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
                if (isSearch === false) {
                  changePage(currentPage - 1);
                } else {
                  changePageSearch(currentPage - 1);
                }
              }
            }}>
            «
          </PaginationLink>
        </PaginationItem>

        {isSearch === false &&
          pageList.map((page, index) => (
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
        {isSearch === true &&
          searchPageList.map((page, index) => (
            <PaginationItem active={page + 1 === currentPage}>
              <PaginationLink
                className="page"
                key={index}
                onClick={() => {
                  changePageSearch(page + 1);
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
                if (isSearch === false) {
                  changePage(currentPage + 1);
                } else {
                  changePageSearch(currentPage + 1);
                }
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
