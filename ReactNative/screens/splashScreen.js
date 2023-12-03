import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Gif,
  BackHandler,
} from "react-native";
import React, { useEffect } from "react";
import { Colors, Default, Fonts } from "../constants/styles";

import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

const SuccessScreen = ({ navigation }) => {
  const user = useSelector((state) => state.authReducer?.activeUser?.user);
  const { t } = useTranslation();

  function tr(key) {
    return t(`successScreen:${key}`);
  }
  const backAction = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  setTimeout(async () => {
    if (user) {
      navigation.navigate("bottomTab");
    } else {
      navigation.navigate("Logins1");
    }
  }, 3000);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#005D7A",
      }}
    >
      <Image
        source={require("../assets/images/Taq.gif")}
        style={{ height: 750, width: 550, marginTop: 70 }}
        resizeMode="contain"
      />
    </View>
  );
};

export default SuccessScreen;
