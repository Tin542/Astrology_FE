import { getWithTokenParam } from "../service/ReadAPI";

export const getListFamousPerson = (page, limit) => {
  return getWithTokenParam(
    `/api/v1/famouspersons`,
    {
      page,
      limit,
    },
    localStorage.getItem("token")
  );
};

export const getListFamousPersonWithName = (page, limit, name, zodiac) => {
    return getWithTokenParam(
      `/api/v1/famouspersons`,
      {
        page,
        limit,
        name,
        "zodiac-ids": zodiac,
      },
      localStorage.getItem("token")
    );
  };


