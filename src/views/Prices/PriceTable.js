import React, { useState, useEffect } from "react";
import { del, post, get, put } from "../../service/ReadAPI";
import Moment from 'react-moment';
import moment from "moment";

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


function PriceTable() {
  useEffect(() => {
    getServiceList()
    
  }, []);
  const [price, setPrice] = useState([]);
  
  //Edit Category
  const [edtID, setEdtId] = useState();
  const [edtCategory, setEdtCategory] = useState([]);
  const [modalEdit, setModelEdit] = useState(false);
  const toggEditModal = () => setModelEdit(!modalEdit);
  
  function getServiceList() {
    get("/api/v1/pricetables")
      .then((res) => {
        var temp = res.data.data.list;
        console.log(temp);
        setPrice(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="table-big-boy">
              <Card.Header>
                <br></br>
              </Card.Header>
              <Card.Body className="table-full-width">
                <Table className="table-bigboy">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Price 1</th>
                      <th>Duration 1</th>
                      <th>Price 2</th>
                      <th>Duration 2</th>
                      <th>Price 3</th>
                      <th>Duration 3</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {price.map((p, index) => {
                      return (
                        <tr key={index}>
                          <td>{p.id}</td>
                          <td>{p.price1}</td>
                          <td>{p.duration1}</td>
                          <td>{p.price2}</td>
                          <td>{p.duration2}</td>
                          <td>{p.price3}</td>
                          <td>{p.duration3}</td>
                          <td className="td-actions">
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-461494662">
                                  Edit
                                </Tooltip>
                              }
                              placement="left">
                              <Button
                                className="btn-link btn-icon"
                                type="button"
                                variant="success">
                                <i className="fas fa-edit"></i>
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
    </>
  );
}
export default PriceTable;

