import React, { useState, useEffect } from "react";
import moment from "moment";
import { del, getWithToken, putWithToken, postWithToken } from "../../service/ReadAPI";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";

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

function CustomTable() {

  //tokens
  const token = localStorage.getItem("token");

  //show page
  const [astrologerList, setAstrologerList] = useState([]);

  //Search
  const [search, setSearch] = useState(null);
  const [singleSelect, setSingleSelect] = React.useState("");
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
    if (search === null || search === "") {
      getWithToken(`/api/v1/customers/admin?limit=${limit}&&page=${currentPage}`, token)
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
    } else {
      getWithToken(
        `/api/v1/customers/admin?limit=${limit}&&page=${currentPage}&name=${search}`, token
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
    getWithToken(`/api/v1/customers/admin?limit=${limit}&&page=${number}`, token)
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
      `/api/v1/customers/admin?limit=${limit}&&page=${crrPage}&name=${search}`,
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
                      value={singleSelect}
                      onChange={(value) => setSingleSelect(value)}
                      options={[
                        {
                          value: "",
                          isDisabled: true,
                        },
                        { value: true, label: "Approve" },
                        { value: false, label: "Wating" },
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
                </Row>
                <hr></hr>
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th>Customer</th>

                      <th>Gender</th>
                      <th>Phone</th>
                      <th>Date of birth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {astrologerList.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td
                            onClick={() => {
                              localStorage.setItem("customerId", item.id);
                              localStorage.setItem(
                                "genderCus",
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
                                  src={item.url_image}></img>{" "}
                              </Col>
                              <div className="col ml--2">
                                <Link to={"/admin/customer-info"}>
                                  {item.name}
                                </Link>
                              </div>
                            </Row>
                          </td>

                          <td onClick={() => {}}>
                            {item.gender ? "Male" : "Female"}
                          </td>
                          <td onClick={() => {}}>{item.phone_number}</td>
                          <td onClick={() => {}}>
                            {moment(item.time_of_birth).format(
                              "DD-MM-YYYY HH:mm:ss"
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

export default CustomTable;
