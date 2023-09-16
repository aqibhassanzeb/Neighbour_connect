import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../../constants/styles";
import SnackbarToast from "../../components/snackbarToast";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = ({ navigation }) => {
  const { t } = useTranslation();

  function tr(key) {
    return t(`onboardingScreen:${key}`);
  }

  const [exit, setExit] = useState(false);
  const onToggleSnackBarExit = () => setExit(!exit);

  const [exitApp, setExitApp] = useState(0);
  const backAction = () => {
    setTimeout(() => {
      setExitApp(0);
    }, 2000);

    if (exitApp === 0) {
      setExitApp(exitApp + 1);
      setExit(!exit);
    } else if (exitApp === 1) {
      BackHandler.exitApp();
    }
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () =>
      BackHandler.removeEventListener(
        "hardwareBackPress",
        backHandler.remove()
      );
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.extraLightPrimary,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            ...Fonts.SemiBold22primary,
            textAlign: "center",
            maxWidth: "70%",

            paddingVertical: Default.fixPadding * 2,
          }}
        >
          {tr("homeServices")}
        </Text>
        <View
          style={{
            padding: Default.fixPadding * 2,
          }}
        >
          <Image
            source={require("../../assets/images/onBoarding.png")}
            style={{
              width: width / 1.1,
              height: height / 1.8,
            }}
            resizeMode={"contain"}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Logins1")}
            style={{
              flex: 1,
              backgroundColor: Colors.primary,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: Default.fixPadding * 2,
              paddingVertical: Default.fixPadding * 1.2,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            <Text style={{ ...Fonts.SemiBold18white }}>{tr("getStarted")}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SnackbarToast
        visible={exit}
        onDismiss={onToggleSnackBarExit}
        title={tr("exitApp")}
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen;
