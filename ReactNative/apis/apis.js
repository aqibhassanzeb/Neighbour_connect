import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// export const baseUrl = `http://192.168.43.147:3333/api/v1/`;
export const baseUrl = `http://192.168.10.6:3333/api/v1/`;
let token;
const getData = async () => {
  try {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      let parseUserdata = JSON.parse(userData);
      console.log("parseUserdata", parseUserdata.token);
      token = parseUserdata.token;
    }
  } catch (e) {
    console.log("assyn storage error");
  }
};

getData();

let id;
const getId = async () => {
  try {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      let parseUserdata = JSON.parse(userData);
      id = parseUserdata.user._id;
    }
  } catch (error) {
    console.log("assyn storage error", error.message);
  }
};
getId();
// console.log("assyn storage ",getData())
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
// const headersWithToken = { Accept: "application/json", "Content-Type": "application/json",
// authorization: token && `Bearer ${token}`
// };

const getHeadersWithToken = async () => {
  try {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      const parseUserdata = JSON.parse(userData);
      const token = parseUserdata.token;
      const headersWithToken = {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      };
      return headersWithToken;
    }
  } catch (e) {
    console.log("async storage error");
  }
  return null;
};
const getHeadersWithTokenFormData = async () => {
  try {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      const parseUserdata = JSON.parse(userData);
      const token = parseUserdata.token;
      const headersWithToken = {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      };
      return headersWithToken;
    }
  } catch (e) {
    console.log("async storage error");
  }
  return null;
};

async function apiRequest(method, url, data = null, headers = {}) {
  try {
    const response = await axios({
      method: method,
      url: baseUrl + url,
      data: data,
      headers: headers,
    });

    // Process the received data
    return response;
  } catch (error) {
    console.error("error axios", error);
    return error.response;
    throw new Error("API request failed");
  }
}

export const registerApi = async (data) => {
  let result = await apiRequest("POST", "user_signup", data, headers);
  return result;
};

export const verifyEmail = async (data) => {
  let result = await apiRequest("PUT", "user_verify", data, headers);
  return result;
};
export const userUpdate = async (data) => {
  let { _id } = data;
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "PUT",
    `user_update/${_id}`,
    data,
    headersWithToken
  );
  return result;
};
export const userpassUpdate = async (data) => {
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "PUT",
    `user_passupdate`,
    data,
    headersWithToken
  );
  return result;
};
export const useremailUpdate = async (data) => {
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "PUT",
    `user_emailupdate`,
    data,
    headersWithToken
  );
  return result;
};
export const userGet = async (data) => {
  let queryString = data && new URLSearchParams(data).toString();
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "GET",
    `user_get?${queryString}`,
    null,
    headersWithToken
  );
  return result;
};
export const userGetbyId = async (data) => {
  let queryString = data && new URLSearchParams(data).toString();
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "GET",
    `user_getbyid?${queryString}`,
    null,
    headersWithToken
  );
  return result;
};

export const loginUser = async (data) => {
  let result = await apiRequest("POST", "user_login", data, headers);
  return result;
};

export const forgotPass = async (data) => {
  let result = await apiRequest("PUT", "reset_password", data, headers);
  return result;
};

export const forgotPassVerify = async (data) => {
  let result = await apiRequest("PUT", "reset_passcode", data, headers);
  return result;
};

// lost and found apis

export const lostItemGetbyLoc = async (data) => {
  let { type } = data;
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "GET",
    `lostandfound_byloc?type=${type}`,
    null,
    headersWithToken
  );
  return result;
};
export const lostItemGet = async (data) => {
  let queryString = data && new URLSearchParams(data).toString();
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "GET",
    `lostandfound?${queryString}`,
    null,
    headersWithToken
  );
  return result;
};
export const lostandfoundCategGet = async () => {
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "GET",
    `lostfoundCateg`,
    null,
    headersWithToken
  );
  return result;
};
export const lostandfoundCreate = async (data) => {
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "POST",
    `lostandfound_create`,
    data,
    headersWithToken
  );
  return result;
};
export const lostandfoundUpdate = async (data) => {
  console.log("payload data ;", data);
  let { _id } = data;
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "PUT",
    `lostandfound_update/${_id}`,
    data,
    headersWithToken
  );
  return result;
};

// connection api

export const connectionRequests = async () => {
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "GET",
    `get_requests/${id}`,
    null,
    headersWithToken
  );
  return result;
};

export const acceptRequest = async (data) => {
  console.log("payload data ;", data);
  let { sender_id } = data;
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "POST",
    `accept_request/${id}`,
    { sender_id },
    headersWithToken
  );
  return result;
};

export const rejectRequest = async (data) => {
  console.log("payload data ;", data);
  let { sender_id } = data;
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "POST",
    `reject_request/${id}`,
    { sender_id },
    headersWithToken
  );
  return result;
};

export const getConnections = async () => {

  console.log("id @@@@@@@@@@@@@@22",id)
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "GET",
    `user_connections/${id}`,
    null,
    headersWithToken
  );
  return result;
};

export const Disconnect = async (data) => {
  console.log("payload data ;", data);
  let { connection_id } = data;
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "POST",
    `disconnect/${id}`,
    { connection_id },
    headersWithToken
  );
  return result;
};

export const NeighbourMayKnow = async (data) => {
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "GET",
    `neighbour-you-may-know/${id}`,
    null,
    headersWithToken
  );
  return result;
};

export const sendRequest = async (data) => {
  let { receiver_id } = data;
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "POST",
    `send_request/${id}`,
    { receiver_id },
    headersWithToken
  );
  return result;
};
