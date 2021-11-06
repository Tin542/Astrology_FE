import axios from "axios";
require("dotenv").config();
const endpoint =
  "https://ec2-13-213-42-113.ap-southeast-1.compute.amazonaws.com";

export async function get(url) {
  console.log("url: ", url);

  return await axios.get(endpoint + url, {
    headers: { "Content-type": "application/json" },
  });
}

export async function postWithToken(url, body, token) {
  console.log("token: ", token);
  console.log("url: ", url);

  return await axios.post(endpoint + url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-token": `${token}`,
      "Content-type": "application/json",
      withCredentials: true,
    },
  });
}

export async function putWithToken(url, body, token) {
  console.log("token: ", token);
  console.log("url: ", url);

  return await axios.put(endpoint + url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
      "x-token": `${token}`,
    },
  });
}

export async function del(url, token) {
  console.log("token: ", token);
  console.log("url: ", url);

  return await axios.delete(endpoint + url, {
    headers: {
      "Content-type": "application/json",
      "x-token": `${token}`,
    },
  });
}

export async function delWithToken(url, body, token) {
  console.log("token: ", token);
  console.log("url: ", url);
  console.log("body", body);

  return await axios.delete(endpoint + url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json-patch+json",
      "x-token": `${token}`,
    },
    data: {
      user_id: body.user_id,
      role_id: body.role_id,
    },
  });
}

export async function getWithToken(url, token) {
  return await axios.get(endpoint + url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
      "x-token": `${token}`,
    },
  });
}

//use in login feature
export async function post(url, body) {
  return await axios.post(endpoint + url, body, {
    headers: { "Content-type": "application/json", withCredentials: true },
  });
}

export async function patchWithToken(url, body, token) {
  console.log("url: ", url);
  console.log("token: ", token);
  return await axios.patch(endpoint + url, body, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
      "x-token": `${token}`,
      withCredentials: true,
    },
  });
}

export async function getWithTokenParam(url, param, token) {
  console.log("url: ", url);
  console.log("token: ", token);
  return await axios.get(endpoint + url, {
    params: param,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
      "x-token": `${token}`,
    },
  });
}

// export async function getWithTokenParams(url, params, token) {
//   return await axios.get(endpoint + url, {
//     params: params,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// }
// export async function postWithTokenParams(url, params, token) {
//   return await axios.post(endpoint + url, {
//     params: params,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// }

// export async function postToken(url, token) {
//   return await axios.post(endpoint + url, token,{
//     headers: { "Content-type": "application/json",
//     // withCredentials: true,
//    },
//   });

// }

// export async function patch(url, body) {
//   return await axios.patch(endpoint + url, body);
// }

// export async function put(url, body) {
//   return await axios.put(endpoint + url, body);
// }
