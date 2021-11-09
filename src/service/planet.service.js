import { getWithTokenParam, getWithToken } from "../service/ReadAPI";

export const getListPlanet = (page, limit) => {
    return getWithTokenParam(
      `/api/v1/planets`,
      {
        page,
        limit,
      },
      localStorage.getItem("token")
    );
  };
  
  export const getDetailPlanet = (planetID) => {
    return getWithToken(
      `/api/v1/planets/${planetID}`,
      
      localStorage.getItem("token")
    );
  };