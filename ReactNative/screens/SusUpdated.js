import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  BackHandler,
} from "react-native";
import React, { useEffect } from "react";
import { Colors, Default, Fonts } from "../constants/styles";

import { useTranslation } from "react-i18next";

const SuccessScreen = ({ navigation }) => {
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

  setTimeout(() => {
    navigation.navigate("Sus");
  }, 2000);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.extraLightGrey,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../assets/images/yes.png")}
          style={{ height: 133, width: 133 }}
          resizeMode="contain"
        />
        <Text
          style={{
            ...Fonts.SemiBold22black,
          }}
        >
          {tr("Updated")}
        </Text>

        <Text
          style={{
            ...Fonts.Medium14grey,
            marginTop: Default.fixPadding * 2,
            maxWidth: "70%",
            textAlign: "center",
          }}
        >
          Your Post has successfully updated.
        </Text>
        <Text
          style={{
            ...Fonts.Medium14grey,
            maxWidth: "70%",
            textAlign: "center",
          }}
        ></Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("bottomTab")}>
        <Text
          style={{
            ...Fonts.SemiBold16primary,
            margin: Default.fixPadding * 2,
            textAlign: "center",
          }}
        >
          {tr("backHome")}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SuccessScreen;
