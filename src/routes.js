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
import PostTable from "views/Posts/PostTable.js";
import AstroTable from "views/Astrologers/AstrologerTables.js";
import CustomTable from "views/Customers/CustomerTables.js";
import CategoryTable from "views/Categories/CategoryTable.js";
import PlanetTable from "views/Planets/PlanetTable.js";
import ZodiacTable from "views/Zodiacs/ZodiacTable.js";
import FamousPersonsTable from "views/FamousPersons/FamousPersonsTable.js";
import Account from "views/Accounts/AccountPage.js";
import Role from "views/UserRole/UserRole.js";
import PriceTable from "views/Prices/PriceTable.js";
import PostDetail from "views/Posts/DetailPost.js";
import AstrologerDetail from "views/Astrologers/DetailAstrologer.js";
import AstrologerCreate from "views/Astrologers/CreateAstrologer.js";
import CustomerDetail from "views/Customers/DetailCustomer.js";


var routes = [
  {
    path: "/dashboard",
    layout: "/admin",
    name: "Home",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
  },

  {
    path: "/post-table",
    name: "Post",
    layout: "/admin",
    icon: "nc-icon nc-notes",
    component: PostTable,
  },
  {
    path: "/customer-table",
    name: "Customer",
    layout: "/admin",
    icon: "nc-icon nc-single-02",
    component: CustomTable,
  },
  {
    path: "/astrologer-table",
    name: "Astrologer",
    layout: "/admin",
    icon: "nc-icon nc-circle-09",
    component: AstroTable,
  },

  {
    collapse: true,
    path: "/config",
    name: "Config",
    state: "openTables",
    icon: "nc-icon nc-settings-gear-64",
    views: [
      {
        path: "/category-table",
        name: "Category",
        layout: "/admin",
        icon: "nc-icon nc-grid-45",
        component: CategoryTable,
      },
      {
        path: "/planet",
        name: "Planet",
        layout: "/admin",
        icon: "nc-icon nc-planet",
        component: PlanetTable,
      },
      {
        path: "/zodiac",
        name: "Zodiac",
        layout: "/admin",
        icon: "nc-icon nc-explore-2",
        component: ZodiacTable,
      },
      {
        path: "/famousperson-table",
        name: "Famous Persons",
        layout: "/admin",
        icon: "nc-icon nc-bulb-63",
        component: FamousPersonsTable,
      },

      {
        path: "/userRole",
        layout: "/admin",
        icon: "nc-icon nc-circle-09",
        name: "Role",
        component: Role,
      },

      {
        path: "/price-table",
        layout: "/admin",
        icon: "nc-icon nc-money-coins",
        name: "Price",
        component: PriceTable,
      },

    ],
  },

  {
    path: "/account",
    layout: "/admin",
    icon: "nc-icon nc-single-02",
    name: "Account",
    component: Account,
  },
  {
    path: "/detail-post",
    layout: "/admin",
    icon: "nc-icon nc-single-02",
    name: "Post",
    component: PostDetail,
  },
  {
    path: "/astrologer-info",
    layout: "/admin",
    icon: "nc-icon nc-single-02",
    name: "Astrologer",
    component: AstrologerDetail,
  },
  {
    path: "/astrologer-create",
    layout: "/admin",
    icon: "nc-icon nc-single-02",
    name: "Astrologer",
    component: AstrologerCreate,
  },
  {
    path: "/customer-info",
    layout: "/admin",
    icon: "nc-icon nc-single-02",
    name: "Customer",
    component: CustomerDetail,
  },
];
export default routes;
