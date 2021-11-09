import React, { useState, useEffect } from "react";

// react-bootstrap components
import { Card, Form, Container, Row, Col } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  getListPlanet,
  getDetailPlanet,
} from "../../service/planet.service.js";

function PlanetTable() {
  useEffect(() => {
    loadData();
  }, []);
  //list
  const [planet, setPlanet] = useState([]);

  //detail planet
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [descripiton, setDescription] = useState();
  const [image, setImage] = useState();

  //detail modal
  const [detailModal, setDetailModal] = useState(false);
  const toggDetailModal = () => setDetailModal(!detailModal);

  const loadData = () => {
    getListPlanet(1, 10)
      .then((res) => {
        var temp = res.data.data.list;
        console.log(temp);

        setPlanet(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDetail = (id) => {
    getDetailPlanet(id)
      .then((res) => {
        var temp = res.data.data;
        console.log(temp);

        setName(temp.name);
        setDescription(temp.description);
        setImage(temp.image_url);

        console.log("name: ", temp.name);
        console.log("des: ", temp.description);
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
          {planet.map((plan, index) => {
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
                            src={plan.image_url}></img>
                        </div>
                      </Col>
                      <Col xs="7">
                        <div>
                          <p
                            className="card-category"
                            style={{ color: "black" }}>
                            <strong>{plan.name}</strong>
                          </p>
                          <small
                            onClick={() => {
                              setDetailModal(true);
                              getDetail(plan.id);
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
          <p>{descripiton}</p>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
}
export default PlanetTable;
