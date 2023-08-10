import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseUrl = `http://192.168.43.147:3333/api/v1/`;

const getData = async () => {
  try {
    const userData = await AsyncStorage.getItem("userData");
    return userData?.token != null ? JSON.parse(userData.token) : null;
  } catch (e) {
    console.log("assyn storage error");
  }
};
getData();
console.log("assyn storage ", getData());
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
const headersWithToken = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${getData()}`,
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

  console.log("data api :", data, "_id :", _id);
  let result = await apiRequest("PUT", `user_update/${_id}`, data, headers);
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

export const connectionRequests = async (data) => {
  let { _id } = data;
  let result = await apiRequest("GET", `get_requests/${_id}`, headers);
  console.log({ result });
  return result;
};
