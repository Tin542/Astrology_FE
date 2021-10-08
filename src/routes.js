/*!

=========================================================
* Light Bootstrap Dashboard PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Calendar from "views/Calendar.js";
import UserPage from "views/Pages/UserPage.js";
import LoginPage from "views/Pages/LoginPage.js";
import RegisterPage from "views/Pages/RegisterPage.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";
import PostTable from "views/Posts/PostTable.js";
import AstroTable from "views/Astrologers/AstrologerTables.js";
import CustomTable from "views/Customers/CustomerTables.js";
import CategoryTable from "views/Categories/CategoryTable.js";

var routes = [
  {
    path: "/dashboard",
    layout: "/admin",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
  },

  {
    path: "/Posts/post-table",
    name: "Post",
    layout: "/admin",
    icon: "nc-icon nc-notes",
    component: PostTable,
  },
  {
    path: "/Categories/category-table",
    name: "Category",
    layout: "/admin",
    icon: "nc-icon nc-grid-45",
    component: CategoryTable,
    
  },
  {
    path: "/Astrologers/astrologer-table",
    name: "Astrologer",
    layout: "/admin",
    icon: "nc-icon nc-circle-09",
    component: AstroTable,
    
  },
  
  {
    path: "/Customers/customer-table",
    name: "Customer",
    layout: "/admin",
    icon: "nc-icon nc-single-02",
    component: CustomTable,
    
  },

  {
    collapse: true,
    path: "/pages",
    name: "Pages",
    state: "openPages",
    icon: "nc-icon nc-puzzle-10",
    views: [
      {
        path: "/user-page",
        layout: "/admin",
        name: "User Page",
        mini: "UP",
        component: UserPage,
      },
      {
        path: "/login-page",
        layout: "/auth",
        name: "Login Page",
        mini: "LP",
        component: LoginPage,
      },
      {
        path: "/register-page",
        layout: "/auth",
        name: "Register",
        mini: "RP",
        component: RegisterPage,
      },
      {
        path: "/lock-screen-page",
        layout: "/auth",
        name: "Lock Screen Page",
        mini: "LSP",
        component: LockScreenPage,
      },
    ],
  },
];
export default routes;
