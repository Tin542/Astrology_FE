import React, { useState, useEffect } from "react";
import { del, post, get, put } from "../../service/ReadAPI";
import Moment from "react-moment";
import moment from "moment";

// react-bootstrap components
import { Card, Form, Container, Row, Col } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  getListZodiac,
  getDetailZodiac,
} from "../../service/zodiac.service.js";

function ZodiacTable() {
  useEffect(() => {
    loadData();
  }, []);

  //list
  const [zodiac, setZodiac] = useState([]);

  //detail planet
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [descripiton, setDescription] = useState();
  const [image, setImage] = useState();
  const [date, setDate] = useState();

  //detail modal
  const [detailModal, setDetailModal] = useState(false);
  const toggDetailModal = () => setDetailModal(!detailModal);

  const getDetail = (id) => {
    getDetailZodiac(id)
      .then((res) => {
        var temp = res.data.data;
        console.log(temp);

        setName(temp.name);
        setDescription(temp.description);
        setImage(temp.url_image);
        setDate(temp.date);

        console.log("name: ", temp.name);
        console.log("des: ", temp.description);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadData = () => {
    getListZodiac(1, 12)
      .then((res) => {
        var temp = res.data.data.list;
        console.log(temp);

        setZodiac(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
          {zodiac.map((item, index) => {
            return (
              <Col lg="4" sm="6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="planet-image">
                          <img
                            alt="..."
                            style={{
                              width: 160,
                              height: 100,
                            }}
                            src={item.url_image}></img>
                        </div>
                      </Col>
                      <Col xs="7">
                        <div>
                          <p
                            className="card-category"
                            style={{ color: "black" }}>
                            <strong>{item.name}</strong>
                          </p>
                          <small
                            onClick={() => {
                              getDetail(item.id);
                              setDetailModal(true);
                              
                            }}>
                            <a href="#">detail</a>
                          </small>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      <Modal isOpen={detailModal} toggle={toggDetailModal}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggDetailModal)}
          toggle={toggDetailModal}>
          {name}
        </ModalHeader>

        <ModalBody>
          <strong>{date}</strong><br/>
          <p>{descripiton}</p>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
}
export default ZodiacTable;
