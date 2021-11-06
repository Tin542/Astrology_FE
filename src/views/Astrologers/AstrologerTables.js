import React, { useState, useEffect } from "react";
import moment from "moment";
import Select from "react-select";
import "../../assets/css/customize.css";
import { Link, useHistory } from "react-router-dom";
import {
  del,
  getWithToken,
  putWithToken,
  postWithToken,
} from "../../service/ReadAPI";

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

function AstrologerTables() {
  //tokens
  const token = localStorage.getItem("token");

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
  const [description, setDescription] = useState();
  const [image, setImage] = useState("");
  const [flowwers, setFollowers] = useState();

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
    getAstrologerList();
  }, []);

  function getAstrologerList() {
    console.log("search: ", search);
    console.log("state: ", states);

    if (
      (search === null || search === "") &&
      (states.value === null || states.value === "")
    ) {
      getWithToken(
        `/api/v1/astrologers/admin?limit=${limit}&&page=${currentPage}`,
        token
      )
        .then((res) => {
          var temp = res.data.data.list;
          console.log("temp: ", temp);
          var totalPageNumber = Math.ceil(res.data.data.total / 5);
          setTotalPage(totalPageNumber);
          setIsSearch(false);
          setAstrologerList(temp);
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
        `/api/v1/astrologers/admin?limit=${limit}&&page=${currentPage}&name=${search}`,
        token
      )
        .then((res) => {
          var temp = res.data.data.list;
          console.log("temp: ", temp);
          var totalPageNumber = Math.ceil(res.data.data.total / 5);
          setTotalPage(totalPageNumber);
          setIsSearch(true);
          setAstrologerList(temp);
          showPageListSearch(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }else if((states.value !== null || states.value !== "") &&
    (search === null || search === "")){
      getWithToken(
        `/api/v1/astrologers/admin?limit=${limit}&&page=${currentPage}&name=${search}is-deleted=${states.value}`,
        token
      )
        .then((res) => {
          var temp = res.data.data.list;
          console.log("temp: ", temp);
          var totalPageNumber = Math.ceil(res.data.data.total / 5);
          setTotalPage(totalPageNumber);
          setIsSearch(true);
          setAstrologerList(temp);
          showPageListSearch(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function changePage(number) {
    getWithToken(
      `/api/v1/astrologers/admin?limit=${limit}&&page=${number}`,
      token
    )
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
  function changePageSearch(crrPage) {
    getWithToken(
      `/api/v1/astrologers/admin?limit=${limit}&&page=${crrPage}&name=${search}`,
      token
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

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="regular-table-with-color">
              <Card.Header>
                <Card.Title as="h4"></Card.Title>
              </Card.Header>
              <Card.Body className="table-responsive p-0">
                <Row>
                  <Col className="pl-4" sm="2">
                    <Select
                      className="react-select primary"
                      classNamePrefix="react-select"
                      name="singleSelect"
                      value={states}
                      onChange={(value) => setStates(value)}
                      options={[
                        {
                          value: "",
                          isDisabled: true,
                        },
                        { value: null, label: "All States" },
                        { value: true, label: "Active" },
                        { value: false, label: "Banned" },
                      ]}
                      placeholder="Status"
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
                          getAstrologerList();
                        }}>
                        <span className="btn-label">
                          <i className="fas fa-search"></i>
                        </span>
                      </Button>
                    </InputGroup>
                  </Col>
                  <Col></Col>

                  <Col className="pl-9" md="2">
                    <Link to={"/admin/astrologer-create"}>
                      <Button
                        className="btn-wd mr-1"
                        variant="info"
                        type="button"
                        onClick={() => {}}>
                        Add Astrologer
                      </Button>
                    </Link>
                  </Col>
                </Row>
                <hr></hr>
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th style={{ color: "black" }}>
                        <strong>Astrologer</strong>
                      </th>

                      <th style={{ color: "black" }}>
                        <strong>Gender</strong>
                      </th>
                      <th style={{ color: "black" }}>
                        <strong>Phone</strong>
                      </th>
                      <th style={{ color: "black" }}>
                        <strong>Date of birth</strong>
                      </th>
                      <th style={{ color: "black" }}>
                        <strong>Status</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {astrologerList.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td
                            onClick={() => {
                              localStorage.setItem("astrologer", item.id);
                              localStorage.setItem(
                                "genderAstro",
                                item.gender ? "Male" : "Female"
                              );
                            }}>
                            <Row className="align-items-center">
                              <Col className="col-auto">
                                <img
                                  alt="..."
                                  style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 400 / 2,
                                  }}
                                  src={item.image_url}></img>{" "}
                              </Col>
                              <div className="col ml--2">
                                <Link to={"/admin/astrologer-info"}>
                                  {item.name}
                                </Link>
                              </div>
                            </Row>
                          </td>

                          <td>{item.gender ? "Male" : "Female"}</td>
                          <td>{item.phone_number}</td>
                          <td>
                            {moment(item.time_of_birth).format(
                              "DD-MM-YYYY HH:mm:ss"
                            )}
                          </td>
                          <td>
                            {item.deleted_at == null ? (
                              <b style={{ color: "green" }}>Active</b>
                            ) : (
                              <b style={{ color: "red" }}>Banned</b>
                            )}
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

export default AstrologerTables;
