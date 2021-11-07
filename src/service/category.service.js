import { getWithTokenParam } from "../service/ReadAPI";

export const getListCategory = (page, limit) => {
    return getWithTokenParam(
      `/api/v1/categories`,
      {
        page,
        limit,
      },
      localStorage.getItem("token")
    );
  };
  
  export const getLsitCategorySearch = (page, limit, name) => {
      return getWithTokenParam(
        `/api/v1/categories`,
        {
          page,
          limit,
          name,
        },
        localStorage.getItem("token")
      );
    };