import { getWithTokenParam } from "../service/ReadAPI";

export const getListCustomer = (page, limit) => {
    return getWithTokenParam(
      `/api/v1/customers/admin`,
      {
        page,
        limit,
      },
      localStorage.getItem("token")
    );
  };
  
  export const getLsitCustomerSearchAndFilter = (page, limit, name, status) => {
      return getWithTokenParam(
        `/api/v1/customers/admin`,
        {
          page,
          limit,
          name,
          "is-deleted": status,
        },
        localStorage.getItem("token")
      );
    };
  