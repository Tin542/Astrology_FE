import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// react-bootstrap components
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroupButtonDropdown,
  Input,
  FormGroup,
} from "reactstrap";

function AdminFooter() {
  //modal Edit
  const [memberModal, setMemberModal] = useState(false);
  const toggleMember = () => setMemberModal(!memberModal);

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
      <footer className="footer">
        <Container fluid className="pl-4 ml-2">
          <nav>
            <ul className="footer-menu">
              <li>
                <Link to={"/admin/dashboard"}>Home</Link>
              </li>
              <li>
                <a
                  href="#pablo"
                  onClick={() => {
                    setMemberModal(true);
                  }}>
                  Spirit Astro Team
                </a>
              </li>
            </ul>
            <p className="copyright text-center">
              © <script>document.write(new Date().getFullYear())</script>
              <a href="http://www.creative-tim.com">Spirit Astro Team</a>, made
              with love for a better web
            </p>
          </nav>
        </Container>
      </footer>

      <Modal isOpen={memberModal} toggle={toggleMember}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleMember)}
          toggle={toggleMember}>
          Team Member
        </ModalHeader>
        <ModalBody>
          <strong>Team Back End</strong>
          <ul className="footer-menu">
            <details>
              <summary style={{ color: "green" }}>
                Nguyễn Văn Bắc - Team Leader
              </summary>
              <p>
                {" "}
                <Button
                  className="btn-social btn-round btn-outline"
                  variant="github"
                  onClick={() =>
                    window.open("https://github.com/nhatnhanchiha")
                  }>
                  <i className="fab fa-github"></i>
                </Button>{" "}
                <Button
                  className="btn-social btn-round btn-outline"
                  variant="facebook"
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/cuoc.song.la.la.11031999"
                    )
                  }>
                  <i className="fab fa-facebook"></i>
                </Button>{" "}
              </p>
            </details>

            <details>
              <summary>Nhâm Đức Đạt</summary>
              <p>
                {" "}
                <Button
                  className="btn-social btn-round btn-outline"
                  variant="github"
                  onClick={() =>
                    window.open("https://github.com/nhamducdat654")
                  }>
                  <i className="fab fa-github"></i>
                </Button>{" "}
                <Button
                  className="btn-social btn-round btn-outline"
                  variant="facebook"
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/profile.php?id=100013032335773"
                    )
                  }>
                  <i className="fab fa-facebook"></i>
                </Button>{" "}
              </p>
            </details>

            <details>
              <summary>Nguyễn Thành Tín</summary>
              <p>
                {" "}
                <Button
                  className="btn-social btn-round btn-outline"
                  variant="github"
                  onClick={() => window.open("https://github.com/Tin542")}>
                  <i className="fab fa-github"></i>
                </Button>{" "}
                <Button
                  className="btn-social btn-round btn-outline"
                  variant="facebook"
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/thanhtin.nguyen.96930/"
                    )
                  }>
                  <i className="fab fa-facebook"></i>
                </Button>{" "}
              </p>
            </details>
          </ul>
          <strong>Team Mobile</strong>
          <ul className="footer-menu">
            <details>
              <summary>Trần Quang Vũ</summary>
              <p>
                {" "}
                <Button
                  className="btn-social btn-round btn-outline"
                  variant="github"
                  onClick={() =>
                    window.open("https://github.com/Tranquangvu1008")
                  }>
                  <i className="fab fa-github"></i>
                </Button>{" "}
                <Button
                  className="btn-social btn-round btn-outline"
                  variant="facebook"
                  onClick={() =>
                    window.open("https://www.facebook.com/raver.slim")
                  }>
                  <i className="fab fa-facebook"></i>
                </Button>{" "}
              </p>
            </details>

            <details>
              <summary>Đào Bảo Trâm</summary>
              <p>
                {" "}
                <Button
                  className="btn-social btn-round btn-outline"
                  variant="github"
                  onClick={() =>
                    window.open("https://github.com/HelenDao1501")
                  }>
                  <i className="fab fa-github"></i>
                </Button>{" "}
                <Button
                  className="btn-social btn-round btn-outline"
                  variant="facebook"
                  onClick={() =>
                    window.open("https://www.facebook.com/bao.tram.1501")
                  }>
                  <i className="fab fa-facebook"></i>
                </Button>{" "}
              </p>
            </details>

            <details>
              <summary>Phan Trung Dũng</summary>
              <p>
                {" "}
                <Button
                  className="btn-social btn-round btn-outline"
                  variant="github"
                  onClick={() => window.open("https://github.com/junx182")}>
                  <i className="fab fa-github"></i>
                </Button>{" "}
                <Button
                  className="btn-social btn-round btn-outline"
                  variant="facebook"
                  onClick={() =>
                    window.open("https://www.facebook.com/snowydays2698")
                  }>
                  <i className="fab fa-facebook"></i>
                </Button>{" "}
              </p>
            </details>
          </ul>
          <strong>Team Front End</strong>
          <ul className="footer-menu">
            <details>
              <summary>Nguyễn Thành Tín</summary>
              <p>
                {" "}
                <Button
                  className="btn-social btn-round btn-outline"
                  variant="github"
                  onClick={() => window.open("https://github.com/Tin542")}>
                  <i className="fab fa-github"></i>
                </Button>{" "}
                <Button
                  className="btn-social btn-round btn-outline"
                  variant="facebook"
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/thanhtin.nguyen.96930/"
                    )
                  }>
                  <i className="fab fa-facebook"></i>
                </Button>{" "}
              </p>
            </details>
            <details>
              <summary>Đào Bảo Trâm</summary>
              <p>
                {" "}
                <Button
                  className="btn-social btn-round btn-outline"
                  variant="github"
                  onClick={() =>
                    window.open("https://github.com/HelenDao1501")
                  }>
                  <i className="fab fa-github"></i>
                </Button>{" "}
                <Button
                  className="btn-social btn-round btn-outline"
                  variant="facebook"
                  onClick={() =>
                    window.open("https://www.facebook.com/bao.tram.1501")
                  }>
                  <i className="fab fa-facebook"></i>
                </Button>{" "}
              </p>
            </details>

            <details>
              <summary>Phan Trung Dũng</summary>
              <p>
                {" "}
                <Button
                  className="btn-social btn-round btn-outline"
                  variant="github"
                  onClick={() => window.open("https://github.com/junx182")}>
                  <i className="fab fa-github"></i>
                </Button>{" "}
                <Button
                  className="btn-social btn-round btn-outline"
                  variant="facebook"
                  onClick={() =>
                    window.open("https://www.facebook.com/snowydays2698")
                  }>
                  <i className="fab fa-facebook"></i>
                </Button>{" "}
              </p>
            </details>
          </ul>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
}

export default AdminFooter;
