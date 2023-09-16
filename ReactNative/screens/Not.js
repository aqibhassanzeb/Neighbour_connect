import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import ToggleSwitch from "toggle-switch-react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleLost,
  toggleSuspicious,
  toggleSell,
  toggleForum,
} from "../redux/notificationSlice";
import { updateNotifications } from "../apis/apis";

const AppSettingScreen = ({ navigation }) => {
  const { lost, suspicious, sell, forum, queryParams } = useSelector(
    (state) => state.notifications
  );
  const dispatch = useDispatch();

  // Translation
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() == "rtl";
  function tr(key) {
    return t(`appSettingScreen:${key}`);
  }

  // Back Button
  const backAction = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const handleUpdate = async () => {
    try {
      await updateNotifications({ settings: queryParams });
    } catch (error) {
      console.log("Error While Updating", error);
    }
  };

  useEffect(() => {
    handleUpdate();
  }, [queryParams]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.extraLightGrey,
      }}
    >
      <View
        style={{
          paddingVertical: Default.fixPadding * 1.2,
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          backgroundColor: Colors.primary,
          paddingHorizontal: Default.fixPadding * 2,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name={isRtl ? "arrow-forward" : "arrow-back"}
            size={25}
            color={Colors.white}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...Fonts.SemiBold18white,
            marginHorizontal: Default.fixPadding * 1.2,
          }}
        >
          {"Notification Setting"}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginHorizontal: Default.fixPadding * 2,
            marginVertical: Default.fixPadding * 3,
          }}
        >
          <Text
            style={{
              ...Fonts.Medium16Black,
              flex: 8.5,
              textAlign: isRtl ? "right" : "left",
            }}
          >
            {"Lost & Found"}
          </Text>

          <ToggleSwitch
            style={{ flex: 1.5 }}
            isOn={lost}
            onColor={Colors.primary}
            offColor={Colors.lightGrey}
            size="medium"
            onToggle={() => {
              dispatch(toggleLost());
              handleUpdate();
            }}
          />
        </View>

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 3,
          }}
        >
          <Text
            style={{
              ...Fonts.Medium16Black,
              flex: 8.5,
              textAlign: isRtl ? "right" : "left",
            }}
          >
            {"Suspicious Activity"}
          </Text>

          <ToggleSwitch
            style={{ flex: 1.5 }}
            isOn={suspicious}
            onColor={Colors.primary}
            offColor={Colors.lightGrey}
            size="medium"
            onToggle={() => dispatch(toggleSuspicious())}
          />
        </View>

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 3,
          }}
        >
          <Text
            style={{
              ...Fonts.Medium16Black,
              flex: 8.5,
              textAlign: isRtl ? "right" : "left",
            }}
          >
            {"Sell Zone"}
          </Text>

          <ToggleSwitch
            style={{ flex: 1.5 }}
            isOn={sell}
            onColor={Colors.primary}
            offColor={Colors.lightGrey}
            size="medium"
            onToggle={() => dispatch(toggleSell())}
          />
        </View>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 3,
          }}
        >
          <Text
            style={{
              ...Fonts.Medium16Black,
              flex: 8.5,
              textAlign: isRtl ? "right" : "left",
            }}
          >
            {"Neighbor Forum"}
          </Text>

          <ToggleSwitch
            style={{ flex: 1.5 }}
            isOn={forum}
            onColor={Colors.primary}
            offColor={Colors.lightGrey}
            size="medium"
            onToggle={() => dispatch(toggleForum())}
          />
        </View>

        {/* <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              marginHorizontal: Default.fixPadding * 2,
              marginBottom: Default.fixPadding * 3,
            }}
          >
            <Text
              style={{
                ...Fonts.Medium16Black,
                flex: 8.5,
                textAlign: isRtl ? "right" : "left",
              }}
            >
              {("Message")}
            </Text>
  
            <ToggleSwitch
              style={{ flex: 1.5 }}
              isOn={sell}
              onColor={Colors.primary}
              offColor={Colors.lightGrey}
              size="medium"
              onToggle={switchUpdate}
            />
          </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppSettingScreen;
