import React, { useState, useEffect } from "react";
import ReactDatetime from "react-datetime";
import moment from "moment";
import { del, get, putWithToken, postWithToken } from "../../service/ReadAPI";
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
import { func } from "prop-types";

function FamousPersonsTable() {
  //show page
  const [personList, setPersonList] = useState([]);

  //listZodiac
  const [listZodiac, setListZodiac] = useState([]);

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
    getFamousPersonList();
    getAllZodiac();
  }, []);

  function getFamousPersonList() {
    if (search === null || search === "") {
      get(`/api/v1/famouspersons?limit=${limit}&&page=${currentPage}`)
        .then((res) => {
          var temp = res.data.data.list;
          console.log("temp: ", temp);
          var totalPageNumber = Math.ceil(res.data.data.total / 5);
          setTotalPage(totalPageNumber);
          setIsSearch(false);
          setPersonList(temp);
          showPageList(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      get(
        `/api/v1/famouspersons?limit=${limit}&&page=${currentPage}&name=${search}`
      )
        .then((res) => {
          var temp = res.data.data.list;
          console.log("temp: ", temp);
          var totalPageNumber = Math.ceil(res.data.data.total / 5);
          setTotalPage(totalPageNumber);
          setIsSearch(true);
          setPersonList(temp);
          showPageListSearch(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
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
  function changePage(number) {
    get(`/api/v1/famouspersons?limit=${limit}&&page=${number}`)
      .then((res) => {
        var temp = res.data.data.list;
        console.log(temp);
        setPersonList(temp);
        setCurrentPage(number);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function changePageSearch(crrPage) {
    getWithToken(
      `/api/v1/famouspersons?limit=${limit}&&page=${crrPage}&name=${search}`,
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
                        { value: true, label: "Active" },
                        { value: false, label: "Banned" },
                      ]}
                      placeholder="Status"
                    />
                  </Col>
                  <Col className="pl-2" sm="2">
                    <Select
                      className="react-select primary"
                      classNamePrefix="react-select"
                      name="singleSelect"
                      value={singleSelect}
                      onChange={(value) => setSingleSelect(value)}
                      options={listZodiac.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))}
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
                          getFamousPersonList();
                        }}>
                        <span className="btn-label">
                          <i className="fas fa-search"></i>
                        </span>
                      </Button>
                    </InputGroup>
                  </Col>
                  <Col></Col>

                  <Col className="pl-7">
                    <Link to={"/admin/famousperson-create"}>
                      <Button
                        className="btn-wd mr-1"
                        variant="info"
                        type="button"
                        onClick={() => {}}>
                        Add Famous Person
                      </Button>
                    </Link>
                  </Col>
                </Row>
                <hr></hr>
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Gender</th>
                      <th>Zodiac</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personList.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td
                            onClick={() => {
                              localStorage.setItem("fmID", item.id);
                              localStorage.setItem(
                                "fmGender",
                                item.gender === 0 ? "Male" : "Female"
                              );
                            }}>
                            <Link to={"/admin/famousperson-info"}>
                              {item.name}
                            </Link>
                          </td>
                          <td onClick={() => {}}>
                            {item.gender === 0 ? "Male" : "Female"}
                          </td>
                          <td onClick={() => {}}>{item.zodiac_name}</td>
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

export default FamousPersonsTable;
