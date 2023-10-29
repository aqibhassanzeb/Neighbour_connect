import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useGetUser = () => {
  const [userId, setUserId] = useState(null);

  const handleGetUser = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let userInformation = JSON.parse(userData);
      setUserId(userInformation?.user);
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return userId;
};

export default useGetUser;
