import React, { useState, useEffect } from "react";
import {
  del,
  post,
  get,
  put,
  getWithToken,
  postWithToken,
  delWithToken,
} from "../../service/ReadAPI";
import { getListRole, getLsitRoleSearch } from "../../service/role.service.js";

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
  Input,
  ModalHeader,
  Modal,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

function UserRole() {
  const token = localStorage.getItem("token");
  
  const [role, setRole] = useState([]);
  const [userId, setUserId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [createModal, setCreateModal] = useState(false);
  const [uid, setUid] = useState("");
  const tmp = "";

  const [roleModalDelete, setRoleModelDelete] = useState(false);
  const toggleRoleDelete = () => setRoleModelDelete(!roleModalDelete);

  const toggleCreateModal = () => setCreateModal(!createModal);

  //search
  const [search, setSearch] = useState("");

  //paging
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [pageList, setPageList] = useState([]);
  const [limit, setLimit] = useState(5);
  useEffect(() => {
    loadData();
    
  }, [currentPage, limit, search]);
  const mapNumToRole = (num) => {
    let Role = {
      888: "Customer",
      8888: "Astrologer",
      88888: "Admin",
    };
    return Role[String(num)];
  };

  const closeBtn = (x) => (
    <button
      className="btn border border-danger"
      style={{ color: "#B22222" }}
      onClick={x}>
      X
    </button>
  );

  function deleteRole() {
    console.log("userID: ", userId);
    console.log("roleID: ", roleId);

    delWithToken(
      `/api/v1/userroles`,
      { user_id: userId, role_id: roleId },
      token
    )
      .then((res) => {
        if (res.data.code === 0) {
          alert("delete success");
          setCurrentPage(1);
          loadData();
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

  const handleSumbit = async (e) => {
    const user = userId;
    const role = roleId;
    console.log(userId);
    console.log(roleId);
    postWithToken(
      `/api/v1/userroles`,
      { user_id: userId, role_id: roleId },
      token
    )
      .then((res) => {
        if (res.data.code === 0) {
          alert("Add success");
          loadData();
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
  };

  const loadData = () => {
    if (search && search.trim === "") {
      getListRole(currentPage, limit)
        .then((res) => {
          var temp = res.data.data.list;
          console.log(temp);
          var totalPageNumber = Math.ceil(res.data.data.total / 5);
          setTotalPage(totalPageNumber);
          setRole(temp);
          showPageList(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getLsitRoleSearch(currentPage, limit, search)
        .then((res) => {
          var temp = res.data.data.list;
          console.log(temp);
          var totalPageNumber = Math.ceil(res.data.data.total / 5);
          setTotalPage(totalPageNumber);
          setRole(temp);
          showPageList(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function changePage(number) {
    if (search && search.trim() === "") {
      getListRole(number, limit)
        .then((res) => {
          var temp1 = res.data.data.list;
          console.log(temp1);
          setRole(temp1);
          setCurrentPage(number);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getLsitRoleSearch(number, limit, search)
        .then((res) => {
          var temp1 = res.data.data.list;
          console.log(temp1);
          setRole(temp1);
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
            <Card className="table-big-boy">
              <Card.Header>
              </Card.Header>
              <Card.Body className="table-full-width">
                <Row>
                  <Col className="pl-4" sm="3">
                    <InputGroup>
                      <Input
                        placeholder="Search user id..."
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
                  <Col></Col>
                  <Col className="pl-8" md="3">
                    <Button
                      className="btn-wd mr-1"
                      variant="info"
                      type="button"
                      onClick={() => {
                        setUserId(null);
                        setRoleId(null);
                        setCreateModal(true);
                      }}>
                      Add New Role For User
                    </Button>
                  </Col>
                </Row>
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th>ID</th>
                      <th>uid</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {role?.map((rol, index) => {
                      return (
                        <tr key={index}>
                          <td></td>
                          <td></td>
                          <td>{rol.user_id}</td>
                          <td>{rol.user.uid}</td>
                          <td>{mapNumToRole(rol.role_id)}</td>
                          <td className="td-number">
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
                                  setUserId(rol.user_id);
                                  setRoleId(rol.role_id);
                                  console.log(rol.user_id);
                                  console.log(rol.role_id);
                                  setRoleModelDelete(true);
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
            onClick={() => {
              if (currentPage + 1 <= totalPage) {
                changePage(currentPage + 1);
              }
            }}>
            »
          </PaginationLink>
        </PaginationItem>
      </Pagination>
      <Modal isOpen={createModal} toggle={toggleCreateModal}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleCreateModal)}
          toggle={toggleCreateModal}>
          Create Astrologer
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            name="userID"
            id="userID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID"
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="text"
            name="roleID"
            id="roleID"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            placeholder="Role ID"
          />
        </ModalBody>
        <ModalBody>
          <p>888: Customer</p>
          <p>8888: Astrologer</p>
          <p>88888: Admin </p>
        </ModalBody>

        <ModalFooter>
          <Button
            className="btn-wd"
            variant="info"
            onClick={() => {
              handleSumbit();
              setCreateModal(false);
            }}>
            Add
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={roleModalDelete} toggle={toggleRoleDelete}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleRoleDelete)}
          toggle={toggleRoleDelete}>
          Are you sure?
        </ModalHeader>
        <ModalBody>Do you want to delete this Role</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              deleteRole();
              setRoleModelDelete(false);
            }}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggleRoleDelete}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={createModal} toggle={toggleCreateModal}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleCreateModal)}
          toggle={toggleCreateModal}>
          Create Astrologer
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            name="userID"
            id="userID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID"
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="text"
            name="roleID"
            id="roleID"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            placeholder="Role ID"
          />
        </ModalBody>
        <ModalBody>
          <p>888: Customer</p>
          <p>8888: Astrologer</p>
          <p>88888: Admin </p>
        </ModalBody>

        <ModalFooter>
          <Button
            className="btn-wd"
            variant="info"
            onClick={() => {
              handleSumbit();
              setCreateModal(false);
            }}>
            Add
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
export default UserRole;
