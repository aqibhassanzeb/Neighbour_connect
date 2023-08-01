import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const baseUrl = `http://192.168.10.6:3333/api/v1/`;
let token
const getData = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    if(userData){
      let parseUserdata= JSON.parse(userData)
      console.log("parseUserdata",parseUserdata.token)
      token= parseUserdata.token
    }
  } catch (e) {
console.log("assyn storage error")
};
}
getData()
// console.log("assyn storage ",getData())
const headers = { Accept: "application/json", "Content-Type": "application/json" };
// const headersWithToken = { Accept: "application/json", "Content-Type": "application/json",
// authorization: token && `Bearer ${token}`
// };

const getHeadersWithToken = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      const parseUserdata = JSON.parse(userData);
      const token = parseUserdata.token;
      const headersWithToken = {
        Accept: "application/json",
        "Content-Type":"application/json",
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
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      const parseUserdata = JSON.parse(userData);
      const token = parseUserdata.token;
      const headersWithToken = {
        Accept: "application/json",
        "Content-Type":"multipart/form-data",
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
      headers: headers
    });

    // Process the received data
    return response;
  } catch (error) {
    console.error("error axios",error);
    return error.response
    throw new Error('API request failed');
  }
}

export const registerApi = async (data) => {
  let result = await apiRequest('POST', 'user_signup', data, headers);
  return result;
};

export const verifyEmail = async (data) => {
  let result = await apiRequest('PUT', 'user_verify', data, headers);
  return result;
};
export const userUpdate = async (data) => {
  let {_id}=data
  
  console.log("data api :",data,"_id :",_id)
  let result = await apiRequest('PUT', `user_update/${_id}`, data, headers);
  return result;
};

export const loginUser = async (data) => {
  let result = await apiRequest('POST', 'user_login', data, headers);
  return result;
};

export const forgotPass = async (data) => {
  let result = await apiRequest('PUT', 'reset_password', data, headers);
  return result;
};

export const forgotPassVerify = async (data) => {
  let result = await apiRequest('PUT', 'reset_passcode', data, headers);
  return result;
};


// lost and found apis 

export const lostItemGetbyLoc = async (data) => {
  let {type}=data
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest('GET', `lostandfound_byloc?type=${type}`, null, headersWithToken);
  return result;
};
export const lostItemGet = async (data) => {
  let queryString = data && new URLSearchParams(data).toString();
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest('GET', `lostandfound?${queryString}`, null, headersWithToken);
  return result;
};

export const lostandfoundCategGet = async () => {
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest('GET', `lostfoundCateg`, null, headersWithToken);
  return result;
};
export const lostandfoundCreate = async (data) => {
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest('POST', `lostandfound_create`, data, headersWithToken);
  return result;
};