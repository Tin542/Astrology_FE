import React, { useState, useEffect } from "react";
import moment from "moment";
import Select from "react-select";
import "../../assets/css/customize.css";
import { Link, useHistory } from "react-router-dom";
import { del, get, putWithToken, postWithToken } from "../../service/ReadAPI";

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

  //detail modal
  const [detailModal, setDetailModal] = useState(false);
  const toggleDetailModal = () => setDetailModal(!detailModal);

  //create modal
  const [createModal, setCreateModal] = useState(false);
  const toggleCreateModal = () => setCreateModal(!createModal);

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
      get(`/api/v1/astrologers?limit=${limit}&&page=${currentPage}`)
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
      get(
        `/api/v1/astrologers?limit=${limit}&&page=${currentPage}&name=${search}`
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
    get(`/api/v1/astrologers?limit=${limit}&&page=${number}`)
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
      `/api/v1/astrologers?limit=${limit}&&page=${crrPage}&name=${search}`,
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

  function createAstrologer() {
    console.log("id: ", id);
    console.log("name: ", name);
    console.log("phone: ", phone);
    console.log("gender: ", gender);
    console.log("birth: ", dateOfBirth);
    console.log("lat: ", latitude);
    console.log("long: ", longitude);
    console.log("image url: ", image);

    postWithToken(
      `/api/v1/astrologers`,
      {
        user_id: id,
        name: name,
        phone_number: phone,
        status_payment: 0,
        gender: gender,
        description: description,
        image_url: image,
        latitude_of_birth: latitude,
        longitude_of_birth: longitude,
        time_of_birth: dateOfBirth,
      },
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.data.code === 0) {
          alert("Add success");
          setCurrentPage(1);
          getAstrologerList();
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

                  <Col className="pl-7">
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
                      <th style={{ color: "black" }}><strong>Astrologer</strong></th>

                      <th style={{ color: "black" }}><strong>Gender</strong></th>
                      <th style={{ color: "black" }}><strong>Phone</strong></th>
                      <th style={{ color: "black" }}><strong>Date of birth</strong></th>
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

      {/* Modal Create */}
      <Modal isOpen={createModal} toggle={toggleCreateModal}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleCreateModal)}
          toggle={toggleCreateModal}>
          Create Astrologer
        </ModalHeader>
        <ModalBody>
          <Input
            type="number"
            name="id"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="User id"
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="number"
            name="phone"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </ModalBody>
        <ModalBody>
          <fieldset>
            <Form.Group>
              <Row>
                <Col sm="10">
                  <Form.Check className="checkbox-inline">
                    <Form.Check.Label>
                      <Form.Check.Input
                        value="true"
                        id="gender"
                        name="gender"
                        type="radio"
                        onChange={(e) =>
                          setGender(e.target.value)
                        }></Form.Check.Input>
                      <span className="checkbox-inline"></span>
                      Male
                    </Form.Check.Label>
                  </Form.Check>
                  <Form.Check className="checkbox-inline">
                    <Form.Check.Label>
                      <Form.Check.Input
                        value="false"
                        id="gemder"
                        name="gender"
                        type="radio"
                        onChange={(e) =>
                          setGender(e.target.value)
                        }></Form.Check.Input>
                      <span className="checkbox-inline"></span>
                      Female
                    </Form.Check.Label>
                  </Form.Check>
                </Col>
              </Row>
            </Form.Group>
          </fieldset>
        </ModalBody>

        <ModalBody>
          <Input
            type="text"
            onFocus={(e) => {
              e.currentTarget.type = "datetime-local";
              e.currentTarget.focus();
            }}
            name="dateOfBirth"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            placeholder="Date of birth"
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="number"
            name="latitude"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Latitude"
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="number"
            name="longitude"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Longitude"
          />
        </ModalBody>

        <ModalFooter>
          <Button
            className="btn-wd"
            variant="info"
            onClick={() => {
              createAstrologer();
              setCreateModal(false);
            }}>
            Create
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default AstrologerTables;
