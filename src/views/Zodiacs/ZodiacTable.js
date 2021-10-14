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


function ZodiacTable() {
  useEffect(() => {
    getServiceList();
    // displayFIeldName();
    // displayStateName();
    // get("​/api​/v1.0​/company​").then((res) => {
    //   if (res && res.status === 200) {
    //     setListFilterState(res.data);
    //   }
    // });
    // get("/api​/v1.0​/major_field​").then((res) => {
    //   if (res && res.status === 200) {
    //     setListFilterState(res.data);
    //   }
    // });
  }, []);
  const [zodiac, setZodiac] = useState([]);
  function getServiceList() {
    get("/api/v1/zodiacs")
      .then((res) => {
        var temp = res.data.data.list;
        console.log(temp);

        setZodiac(temp);
        // setUseListCategoryShowPage(
        //   temp.slice(numberPage * 5 - 5, numberPage * 5)
        // );
        // setTotalNumberPage(Math.ceil(temp.length / 5));
        // setCount(count);
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
                <Card.Title as="h4">All Planet</Card.Title>
                <br></br>
              </Card.Header>
              <Card.Body className="table-full-width">
                <Table className="table-bigboy">
                  <thead>
                    <tr>
                      <th className="text-center">Thumb</th>
                      <th>Name</th>
                      <th className="th-description">Description</th>
                      <th className="th-description">Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {zodiac.map((zod, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <div className="img-container">
                              <img
                                alt="..."
                                src={
                                  zod.url_image
                                }></img>
                            </div>
                          </td>
                          <td className="td-name">{zod.name}</td>
                          <td>{zod.description}</td>
                          <td>{zod.date}</td>
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
export default ZodiacTable;
