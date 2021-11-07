import { getWithTokenParam } from "../service/ReadAPI";

export const getListRole = (page, limit) => {
    return getWithTokenParam(
      `/api/v1/userroles`,
      {
        page,
        limit,
      },
      localStorage.getItem("token")
    );
  };
  
  export const getLsitRoleSearch = (page, limit, userId) => {
      return getWithTokenParam(
        `/api/v1/userroles`,
        {
          page,
          limit,
          "user-id": userId,
        },
        localStorage.getItem("token")
      );
    };