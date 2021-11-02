import React, { useState, useEffect } from "react";
import ReactDatetime from "react-datetime";
import moment from "moment";
import { del, get, putWithToken, postWithToken } from "../../service/ReadAPI";
import DateTimeOffset from "datetime-offset";
import ImageUploading from "react-images-uploading";
import ImageUploader from "react-images-upload";
import { Link, useHistory } from "react-router-dom";

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

  // Famous Person detail
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [zodiac_id, setZodiac] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState("");

  //detail modal
  const [detailModal, setDetailModal] = useState(false);
  const toggleDetailModal = () => setDetailModal(!detailModal);

  //create modal
  const [createModal, setCreateModal] = useState(false);
  const toggleCreateModal = () => setCreateModal(!createModal);

  //delete modal
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  //Edit Person
  const [edtID, setEdtId] = useState();
  const [edtName, setEdtName] = useState();
  const [edtDes, setEdtDes] = useState();
  const [edtZodiac, setEdtZodiac] = useState();
  const [edtImage, setEdtImage] = useState();

  const [modalEdit, setModelEdit] = useState(false);
  const toggEditModal = () => setModelEdit(!modalEdit);

  //paging
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [pageList, setPageList] = useState([]);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    getFamousPersonList();
    getAllZodiac();
  }, []);

  function getFamousPersonList() {
    get(`/api/v1/famouspersons?limit=${limit}&&page=${currentPage}`)
      .then((res) => {
        var temp = res.data.data.list;
        console.log("temp: ", temp);
        var totalPageNumber = Math.ceil(res.data.data.total / 5);
        setTotalPage(totalPageNumber);
        setPersonList(temp);
        showPageList(res);
      })
      .catch((err) => {
        console.log(err);
      });
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

  function getFamousPersonByID(Id) {
    console.log("id: ", Id);
    get(`/api/v1/famouspersons/${Id}`)
      .then((res) => {
        var temp = res.data.data;
        console.log(temp);

        setId(Id);
        setName(temp.name);
        setZodiac(temp.zodiac_id);
        setDescription(temp.description);
        setImage(temp.url_image);

        console.log("name: ", temp.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function createFamousPerson() {
    console.log("id: ", id);
    console.log("name: ", name);
    console.log("description: ", description);
    console.log("zodiac_id: ", zodiac_id);
    console.log("image url: ", image);

    postWithToken(
      `/api/v1/famouspersons`,
      {
        name: name,
        description: description,
        zodiac_id: zodiac_id,
        url_image: image,
      },
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.data.code === 0) {
          alert("Add success");
          setCurrentPage(1);
          getFamousPersonList();
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

  function editFamousPerson() {
    console.log("edt ID: ", edtID);
    console.log("edt Name: ", edtName);
    console.log("edt Description: ", edtDes);
    console.log("edt Zodiac: ", edtZodiac);
    console.log("edt Image: ", edtImage);

    putWithToken(
      `/api/v1/famouspersons/${edtID}`,
      {
        name: edtName,
        description: edtDes,
        zodiac_id: edtZodiac,
        url_image: edtImage
      },
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.data.code === 0) {
          alert("Edit success");
          setCurrentPage(1);
          getFamousPersonList();
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

  function deleteByID() {
    console.log("delete: ", id);

    del(`/api/v1/famouspersons/${id}`, localStorage.getItem("token"))
      .then((res) => {
        if (res.data.code === 0) {
          alert("delete success");
          setCurrentPage(1);
          getFamousPersonList();
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
                <Card.Title as="h4">
                  <Button
                    className="btn-wd mr-1"
                    variant="info"
                    type="button"
                    onClick={() => {
                      setId(null);
                      setName(null);
                      setZodiac(null);
                      setDescription(null);
                      setImage(null);

                      setCreateModal(true);
                    }}>
                    Add Famous Person
                  </Button>
                </Card.Title>
              </Card.Header>
              <Card.Body className="table-responsive p-0">
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
                              localStorage.setItem('fmID', item.id);
                              localStorage.setItem('fmGender', item.gender===0 ? "Male" : "Female");
                            }}>
                            <Link to={"/admin/famousperson-info"}>{item.name}</Link>
                          </td>
                          <td
                            onClick={() => {
                             
                            }}>
                            {item.gender===0 ? "Male" : "Female"}
                          </td>
                          <td
                            onClick={() => {
                              
                            }}>
                            {item.zodiac_name}
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

      <Modal isOpen={detailModal} toggle={toggleDetailModal}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleDetailModal)}
          toggle={toggleDetailModal}>
          Famous Person Details
        </ModalHeader>
        <ModalBody>
          <div className="img-container">
            <img alt="..." src={image}></img>
          </div>
        </ModalBody>

        <ModalBody>
          <b>ID: </b>
          {id}
          <br />
          <b>Name: </b>
          {name}
          <br />
          <b>Description: </b>
          {description}
          <br />
          <b>Zodiac: </b>
          {zodiac_id}
          <br />
        </ModalBody>
      </Modal>

      {/* Modal Create */}
      <Modal isOpen={createModal} toggle={toggleCreateModal}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleCreateModal)}
          toggle={toggleCreateModal}>
          Add Famous Person
        </ModalHeader>

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
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="text"
            name="image"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
          />
        </ModalBody>
        <ModalBody>
          <select
            name="subject"
            id="subject_input"
            value={zodiac_id}
            name="zodiac_id"
            onChange={(e) => setZodiac(e.target.value)}>
            <option hidden selected>
              ===Zodiac===
            </option>
            {listZodiac.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id}
                {"-"}
                {item.name}
              </option>
            ))}
          </select>
        </ModalBody>

        <ModalFooter>
          <Button
            className="btn-wd"
            variant="info"
            onClick={() => {
              createFamousPerson();
              setCreateModal(false);
            }}>
            Create
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEdit} toggle={toggEditModal}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggEditModal)}
          toggle={toggEditModal}>
          Edit Famous Person
        </ModalHeader>

        <ModalBody>
          <Input
            type="text"
            name="name"
            id="name"
            value={edtName}
            onChange={(e) => setEdtName(e.target.value)}
            placeholder="Name"
            // onChange={lnerror}
          />
        </ModalBody>

        <ModalBody>
          <Input
            type="text"
            name="description"
            id="description"
            value={edtDes}
            onChange={(e) => setEdtDes(e.target.value)}
            placeholder="Description"
            // onChange={lnerror}
          />
        </ModalBody>
        <ModalBody>
          <Input
            type="text"
            name="image"
            id="image"
            value={edtImage}
            onChange={(e) => setEdtImage(e.target.value)}
            placeholder="Image Url"
            // onChange={lnerror}
          />
        </ModalBody>
        <ModalBody>
          <select
            name="subject"
            id="subject_input"
            value={edtZodiac}
            name="edtZodiac"
            onChange={(e) => setEdtZodiac(e.target.value)}>
            {listZodiac.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id}
                {"-"}
                {item.name}
              </option>
            ))}
          </select>
        </ModalBody>

        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              editFamousPerson();
              setModelEdit(false);
            }}>
            Edit
          </Button>{" "}
          <Button color="secondary" onClick={toggEditModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleDeleteModal)}
          toggle={toggleDeleteModal}>
          Are you sure?
        </ModalHeader>
        <ModalBody>You want to delete this Famous Person</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              deleteByID();
              setDeleteModal(false);
            }}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default FamousPersonsTable;
