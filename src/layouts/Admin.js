import React from "react";
import { Switch, Route } from "react-router-dom";
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
  Pagination,
  Container,
  Row,
  Col,
} from "react-bootstrap";

// core components
import Sidebar from "components/Sidebar/Sidebar.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";

// dinamically create dashboard routes
import routes from "routes.js";

import image5 from "assets/img/full-screen-image-5.jpg";
import image6 from "assets/img/full-screen-image-6.jpg";
import image7 from "assets/img/full-screen-image-7.jpg";

function Admin() {
  const [sidebarImage, setSidebarImage] = React.useState(image5);
  const [sidebarBackground, setSidebarBackground] = React.useState("white");
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            key={key}
            component={prop.component}
          />
        );
      } else {
        return (
          <Route
            path={prop.layout + prop.path}
            key={key}
            component={prop.component}
          />
        );
      }
    });
  };
  return (
    <>
      <div className="wrapper">
        <Sidebar
          routes={routes}
          image={sidebarImage}
          background={sidebarBackground}
        />
        <div className="main-panel">
          <AdminNavbar />
          <div className="content">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
          <AdminFooter />
          <div
            className="close-layer"
            onClick={() =>
              document.documentElement.classList.toggle("nav-open")
            }
          />
        </div>
      </div>
    </>
  );
}

export default Admin;
