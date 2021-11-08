import { getWithTokenParam, getWithToken } from "../service/ReadAPI";

export const getListAstrologer = (page, limit) => {
    return getWithTokenParam(
      `/api/v1/astrologers/admin`,
      {
        page,
        limit,
      },
      localStorage.getItem("token")
    );
  };
  
  export const getLsitAstrologerSearchAndFilter = (page, limit, name, status) => {
      return getWithTokenParam(
        `/api/v1/astrologers/admin`,
        {
          page,
          limit,
          name,
          "is-deleted": status,
        },
        localStorage.getItem("token")
      );
    };

    export const countAstrologer = () => {
      return getWithToken(
        `/api/v1/astrologers/admin`,
       
        localStorage.getItem("token")
      );
    };