import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import {
  getListCustomer,
  getLsitCustomerSearchAndFilter,
} from "../../service/customer.service.js";

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
  const [customer, setCustomer] = useState([]);

  //Search
  const [search, setSearch] = useState(null);
  const [states, setStates] = React.useState({value: null});
  const [isSearch, setIsSearch] = useState(true);

  //paging
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [pageList, setPageList] = useState([]);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    loadData();
  }, [currentPage, limit, search, states]);

  const loadData = () => {
    console.log("search: ", search);
    console.log("status: ", states);
    if (search && search.trim() === "" && states.value && states.value.trim() === "") {
      getListCustomer(currentPage, limit)
        .then((res) => {
          var temp = res.data.data.list;
          console.log("temp: ", temp);
          var totalPageNumber = Math.ceil(res.data.data.total / 5);
          setTotalPage(totalPageNumber);
          setIsSearch(false);
          setCustomer(temp);
          showPageList(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getLsitCustomerSearchAndFilter(currentPage, limit, search, states.value)
        .then((res) => {
          var temp = res.data.data.list;
          console.log("temp: ", temp);
          var totalPageNumber = Math.ceil(res.data.data.total / 5);
          setTotalPage(totalPageNumber);
          setIsSearch(false);
          setCustomer(temp);
          showPageList(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  function changePage(number) {
    if (search && search.trim() === "" && states && states.trim() === "") {
      getListCustomer(number, limit)
        .then((res) => {
          var temp = res.data.data.list;
          console.log(temp);
          setCustomer(temp);
          setCurrentPage(number);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getLsitCustomerSearchAndFilter(number, limit, search, states.value)
        .then((res) => {
          var temp = res.data.data.list;
          console.log(temp);
          setCustomer(temp);
          setCurrentPage(number);
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
    console.log("list: ", list);
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
                      name="Status"
                      value={states}
                      onChange={(value) => {
                        setStates(value);
                        setCurrentPage(1);
                      }}
                      options={[
                        {
                          value: "",
                          isDisabled: true,
                        },
                        { value: null, label: "All States" },
                        { value: false, label: "Active" },
                        { value: true, label: "Banned" },
                      ]}
                      placeholder="Status"
                    />
                  </Col>

                  <Col className="pl-2" md="3">
                    <InputGroup>
                      <Input
                        placeholder="Search name..."
                        type="text"
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                          setCurrentPage(1);
                        }}></Input>
                      <Button
                        className="btn-outline"
                        type="button"
                        variant="info"
                        onClick={() => {
                          loadData();
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
                      <th style={{ color: "black" }}>
                        <strong>Customer</strong>
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
                    {customer.map((item, index) => {
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

export default CustomTable;
