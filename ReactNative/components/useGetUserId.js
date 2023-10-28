import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useGetUserId = () => {
  const [userId, setUserId] = useState(null);

  const handleGetUser = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let userInformation = JSON.parse(userData);
      setUserId(userInformation?.user._id);
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return userId;
};

export default useGetUserId;
