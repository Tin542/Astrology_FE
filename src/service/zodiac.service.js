import { getWithTokenParam, getWithToken } from "../service/ReadAPI";

export const getListZodiac = (page, limit) => {
    return getWithTokenParam(
      `/api/v1/zodiacs`,
      {
        page,
        limit,
      },
      localStorage.getItem("token")
    );
  };
  
  export const getDetailZodiac = (zodiacID) => {
    return getWithToken(
      `/api/v1/zodiacs/${zodiacID}`,
      
      localStorage.getItem("token")
    );
  };