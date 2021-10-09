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


function PostTables() {
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
  const [useListServiceShowPage, setUseListServiceShowPage] = useState([]);
   async function getServiceList() {
    const result = await get("/api/v1/posts") 
      // .then((res) => {
      //   var temp = res.data.data.list;
      //   console.log(temp);
        
      setUseListServiceShowPage(result.data.data.list);
      //   // setUseListServiceShowPage(
      //   //   temp.slice(numberPage * 5 - 5, numberPage * 5)
      //   // );
      //   // setTotalNumberPage(Math.ceil(temp.length / 5));
      //   // setCount(count);
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
      console.log(result.data, "abcxczxcsdcsdv");
  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="table-big-boy">
              <Card.Header>
                <Card.Title as="h4">All Post</Card.Title>
                <br></br>
              </Card.Header>
              <Card.Body className="table-full-width">
                <Table className="table-bigboy">
                  <thead>
                    <tr>
                      <th className="text-center">Thumb</th>
                      <th>Title</th>
                      <th className="th-description">Description</th>
                      <th className="text-right">Date</th>
                      <th className="text-right">Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {useListServiceShowPage.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <div className="img-container">
                              <img
                                alt="..."
                                src={
                                  require("assets/img/blog-1.jpg").default
                                }></img>
                            </div>
                          </td>
                          <td className="td-name">{item.title}</td>
                          <td>{item.content}</td>
                          <td className="td-number">{moment(item.updated_at).format("MM-DD-YYYY")}</td>
                          <td className="td-number">Watting</td>
                          <td className="td-actions">
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-618009180">
                                  View Post..
                                </Tooltip>
                              }
                              placement="left">
                              <Button
                                className="btn-link btn-icon"
                                type="button"
                                variant="info">
                                <i className="far fa-image"></i>
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-461494662">
                                  Approve
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
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-408856985">
                                  Denined
                                </Tooltip>
                              }
                              placement="left">
                              <Button
                                className="btn-link btn-icon"
                                type="button"
                                variant="danger">
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
    </>
  );
}
export default PostTables;
