import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseUrl = `http://192.168.43.147:3333/api/v1/`;
export const socketUrl = "http://192.168.43.147:3333/";

// export const baseUrl = `http://192.168.10.6:3333/api/v1/`;
// export const socketUrl = "http://192.168.10.6:3333/";

let token;
const getData = async () => {
  try {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      let parseUserdata = JSON.parse(userData);
      token = parseUserdata.token;
    }
  } catch (e) {
    console.log("assyn storage error");
  }
};

getData();

export const getId = async () => {
  try {
    const userJSON = await AsyncStorage.getItem("userData");
    if (userJSON !== null) {
      const user = JSON.parse(userJSON);
      if (user.user.hasOwnProperty("_id")) {
        return user.user._id;
      } else {
        console.log("ID not found in user object.");
        return null;
      }
    } else {
      console.log("User object not found in AsyncStorage.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user object from AsyncStorage:", error);
    return null;
  }
};
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

export const deleteAccount = async () => {
  const id = await getId();
  let result = await apiRequest("DELETE", `delete_account/${id}`);
  return result;
};

export const trackLogin = async (data) => {
  let result = await apiRequest("POST", "track_login", data, headers);
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
  const headersWithToken = await getHeadersWithTokenFormData();
  let result = await apiRequest(
    "POST",
    `lostandfound_create`,
    data,
    headersWithToken
  );
  return result;
};
export const updateLAndFImages = async (data) => {
  const headersWithToken = await getHeadersWithTokenFormData();
  let result = await apiRequest(
    "PUT",
    `update_landf_images/${data.id}`,
    data.formData,
    headersWithToken
  );
  return result;
};
export const lostandfoundUpdate = async (data) => {
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
  const id = await getId();
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
  const id = await getId();
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
  const id = await getId();
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
  const id = await getId();
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
  const id = await getId();
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
  const id = await getId();
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
  const id = await getId();
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

// skill categories
export const getCategories = async () => {
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest("GET", "skill_cat", null, headersWithToken);
  return result;
};

// skill hub api
export const addSkill = async (data) => {
  const id = await getId();
  data.append("posted_by", id);
  const headersWithToken = await getHeadersWithTokenFormData();
  let result = await apiRequest("POST", `add_skill`, data, headersWithToken);
  return result;
};

export const getSkillsByUser = async () => {
  const id = await getId();
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest("GET", `skills/${id}`, null, headersWithToken);
  return result;
};

export const getSkillsByCategory = async (data) => {
  const { id } = data;
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "GET",
    `skill_category/${id}`,
    null,
    headersWithToken
  );
  return result;
};

export const updateSkill = async (data) => {
  let { _id } = data;
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "PUT",
    `update_skill/${_id}`,
    data,
    headersWithToken
  );
  return result;
};

export const updateImages = async (data) => {
  const headersWithToken = await getHeadersWithTokenFormData();
  let result = await apiRequest(
    "PUT",
    `update_images/${data.id}`,
    data.formData,
    headersWithToken
  );
  return result;
};

export const deleteSkill = async (data) => {
  const headersWithToken = await getHeadersWithTokenFormData();
  let result = await apiRequest(
    "DELETE",
    `delete_skill/${data._id}`,
    null,
    headersWithToken
  );
  return result;
};

// Endorse Api
export const addEndorse = async (data) => {
  let { _id } = data;
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest("POST", `endorse/${_id}`, {}, headersWithToken);
  return result;
};

export const removeEndorse = async (data) => {
  let { _id } = data;
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "POST",
    `unendorse/${_id}`,
    {},
    headersWithToken
  );
  return result;
};

// Neighbour Api
export const getWatchCategories = async () => {
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest("GET", "watch_cat", null, headersWithToken);
  return result;
};

export const addWatch = async (data) => {
  const id = await getId();
  data.append("posted_by", id);
  const headersWithToken = await getHeadersWithTokenFormData();
  let result = await apiRequest("POST", "add_watch", data, headersWithToken);
  return result;
};

export const updateWatch = async (data) => {
  let { _id } = data;
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "PUT",
    `update_watch/${_id}`,
    data,
    headersWithToken
  );
  return result;
};

export const updateMedia = async (data) => {
  const headersWithToken = await getHeadersWithTokenFormData();
  let result = await apiRequest(
    "PUT",
    `update_media/${data.id}`,
    data.formData,
    headersWithToken
  );
  return result;
};

export const deleteWatch = async (data) => {
  const headersWithToken = await getHeadersWithTokenFormData();
  let result = await apiRequest(
    "DELETE",
    `delete_watch/${data._id}`,
    null,
    headersWithToken
  );
  return result;
};

export const getWatchesByUser = async () => {
  const id = await getId();
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest("GET", `watch/${id}`, null, headersWithToken);
  return result;
};

export const getAllWatches = async () => {
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest("GET", `all_watch`, null, headersWithToken);
  return result;
};

export const addHelpful = async (data) => {
  let { _id } = data;
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest("POST", `helpful/${_id}`, {}, headersWithToken);
  return result;
};

export const removeHelpful = async (data) => {
  let { _id } = data;
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "POST",
    `un_helpfull/${_id}`,
    {},
    headersWithToken
  );
  return result;
};

// Sell Hub
export const getSellCategories = async () => {
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest("GET", "sell_cat", null, headersWithToken);
  return result;
};

export const addSell = async (data) => {
  const id = await getId();
  data.append("posted_by", id);
  const headersWithToken = await getHeadersWithTokenFormData();
  let result = await apiRequest("POST", `add_sell`, data, headersWithToken);
  return result;
};

export const getSellsByUser = async () => {
  const id = await getId();
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest("GET", `sells/${id}`, null, headersWithToken);
  return result;
};

export const getSellsByCategory = async (data) => {
  const { id } = data;
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "GET",
    `sell_category/${id}`,
    null,
    headersWithToken
  );
  return result;
};

export const updateSell = async (data) => {
  let { _id } = data;
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "PUT",
    `update_sell/${_id}`,
    data,
    headersWithToken
  );
  return result;
};

export const updateSellImages = async (data) => {
  const headersWithToken = await getHeadersWithTokenFormData();
  let result = await apiRequest(
    "PUT",
    `update_images/${data.id}`,
    data.formData,
    headersWithToken
  );
  return result;
};

export const deleteSell = async (data) => {
  const headersWithToken = await getHeadersWithTokenFormData();
  let result = await apiRequest(
    "DELETE",
    `delete_sell/${data._id}`,
    null,
    headersWithToken
  );
  return result;
};

export const handleSold = async (data) => {
  let { _id } = data;
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest("POST", `solded/${_id}`, {}, headersWithToken);
  return result;
};

export const getAllItems = async () => {
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest("GET", `all_items`, null, headersWithToken);
  return result;
};

// Chat Apis

export const getMessages = async (data) => {
  const { userId, recepientId } = data;
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "GET",
    `/messages/${userId}/${recepientId}`,
    null,
    headersWithToken
  );
  return result;
};

export const getChats = async () => {
  const id = await getId();
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "GET",
    `friends-chat/${id}`,
    null,
    headersWithToken
  );
  return result;
};

export const getEmptyChats = async () => {
  const id = await getId();
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "GET",
    `accepted-friends/${id}`,
    null,
    headersWithToken
  );
  return result;
};

export const postMessage = async (data) => {
  const headersWithToken = await getHeadersWithTokenFormData();
  let result = await apiRequest("POST", "messages", data, headersWithToken);
  return result;
};

export const deleteMessages = async (data) => {
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "POST",
    "delete_messages",
    data,
    headersWithToken
  );
  return result;
};

export const deleteChat = async (data) => {
  const id = await getId();
  const { recepientId } = data;
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "DELETE",
    `/delete_chat/${id}/${recepientId}`,
    {},
    headersWithToken
  );
  return result;
};

//Forum Api's
export const addTopic = async (data) => {
  const id = await getId();
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "POST",
    `add_topic`,
    { ...data, posted_by: id },
    headersWithToken
  );
  return result;
};

export const getTopicsByUser = async () => {
  const id = await getId();
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest("GET", `topics/${id}`, null, headersWithToken);
  return result;
};

export const updateTopic = async (data) => {
  let { _id } = data;
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "PUT",
    `update_topic/${_id}`,
    data,
    headersWithToken
  );
  return result;
};

export const deleteTopic = async (data) => {
  const headersWithToken = await getHeadersWithTokenFormData();
  let result = await apiRequest(
    "DELETE",
    `delete_topic/${data._id}`,
    null,
    headersWithToken
  );
  return result;
};

export const getAllTopics = async () => {
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest("GET", `all_topics`, null, headersWithToken);
  return result;
};

export const addReply = async (data) => {
  let { id } = data;
  const userId = await getId();
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "POST",
    `add-reply/${id}`,
    { reply_by: userId, text: data.text },
    headersWithToken
  );
  return result;
};

export const deleteReply = async (data) => {
  let { forumId, replyId } = data;
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "DELETE",
    `delete-reply/${forumId}/${replyId}`,
    {},
    headersWithToken
  );
  return result;
};

// Activity Api

export const getUserActivities = async (id) => {
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "GET",
    `user_activities/${id}`,
    null,
    headersWithToken
  );
  return result;
};

// Report Api
export const addUserReport = async (data) => {
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest("POST", "user_report", data, headersWithToken);
  return result;
};

export const addPostReport = async (data) => {
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest("POST", "report", data, headersWithToken);
  return result;
};

// ALL SEARCH
export const AllSearch = async (query) => {
  let result = await apiRequest("GET", `search?query=${query}`, null, null);
  return result;
};

//Notifications
export const getNotifications = async (query) => {
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "GET",
    `user_notifications?${query}`,
    null,
    headersWithToken
  );
  return result;
};

// Notifications Settings
export const getSettings = async () => {
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "GET",
    "notification_settings",
    null,
    headersWithToken
  );
  return result;
};

export const updateNotifications = async (data) => {
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "PUT",
    "update_settings",
    data,
    headersWithToken
  );
  return result;
};

export const deleteNotifications = async (data) => {
  const headersWithToken = await getHeadersWithToken();
  let result = await apiRequest(
    "POST",
    `deleted_notifications`,
    data,
    headersWithToken
  );
  return result;
};
