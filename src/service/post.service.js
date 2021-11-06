import { getWithTokenParam } from "../service/ReadAPI";

export const getListPost = (page, limit) => {
    return getWithTokenParam(
      `/api/v1/posts/admin`,
      {
        page,
        limit,
      },
      localStorage.getItem("token")
    );
  };
  
  export const getLsitPostSearchAndFilter = (page, limit, title, status, zodiac) => {
      return getWithTokenParam(
        `/api/v1/posts/admin`,
        {
          page,
          limit,
          title,
          "is-approve": status,
          "zodiac-ids": zodiac,
        },
        localStorage.getItem("token")
      );
    };