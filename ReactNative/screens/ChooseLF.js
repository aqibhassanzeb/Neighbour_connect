import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler,
  TextInput,
  Modal,
  DevSettings,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import moment from "moment";

import { Colors, Default, Fonts, screenHeight } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "expo-image-picker";
import { BottomSheet } from "react-native-btr";
import { Camera } from "expo-camera";
import SnackbarToast from "../components/snackbarToast";
import CameraModule from "../components/cameraModule";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uploadImageToCloudinary } from "../utils";
import { getId, getUserActivities, userUpdate } from "../apis/apis";
import { DEFAULT_USER_PIC } from "../config";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "react-native-paper";
import BreadCrumbs from "../components/BreadCrumbs";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const ChooseLF = (props) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() == "rtl";
  function tr(key) {
    return t(`editProfileScreen:${key}`);
  }
  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      <View
        style={{
          paddingVertical: Default.fixPadding * 1.2,
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          backgroundColor: Colors.primary,
          paddingHorizontal: Default.fixPadding * 2,
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
        </View>
      </View>
      <BreadCrumbs>
        <AntDesign name="right" size={18} color="#9ca3af" />
        <TouchableOpacity
          onPress={() => props.navigation.navigate("lostTabt")}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <Text> Lost & Found</Text>
        </TouchableOpacity>
        <AntDesign name="right" size={18} color="#9ca3af" />
        <Text
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            color: Colors.primary,
            fontWeight: "bold",
          }}
        >
          Choose
        </Text>
      </BreadCrumbs>
      <View
        style={{
          height: screenHeight,
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/icons/lost-found-no.png")}
          style={{ height: 200, width: 200, opacity: 0.2, marginTop: 100 }}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            width: 300,
            height: 50,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 70,
          }}
          onPress={() =>
            props.navigation.navigate("ListItem", { type: "lost" })
          }
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
                letterSpacing: 1,
              }}
            >
              Lost Something{" "}
            </Text>
            <Ionicons name={"arrow-forward"} size={25} color={Colors.white} />
          </View>
        </TouchableOpacity>
        <Text
          style={{ width: 300, borderBottomWidth: 2, borderColor: "lightgray" }}
        />

        <Text
          style={{
            color: "black",
            paddingVertical: 5,
            color: "gray",
            fontSize: 15,
            letterSpacing: 3,
          }}
        >
          OR
        </Text>
        <Text
          style={{ width: 300, borderTopWidth: 2, borderColor: "lightgray" }}
        />
        <TouchableOpacity
          style={{
            width: 300,
            height: 50,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: Colors.primary,
          }}
          onPress={() =>
            props.navigation.navigate("ListItem", { type: "found" })
          }
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: Colors.primary,
                fontSize: 18,
                fontWeight: "bold",
                letterSpacing: 1,
              }}
            >
              Found Something{" "}
            </Text>
            <Ionicons name={"arrow-forward"} size={25} color={Colors.primary} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChooseLF;

const styles = StyleSheet.create({
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "black",
  },
  bottomSheetMain: {
    backgroundColor: Colors.white,
    paddingVertical: Default.fixPadding,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  round: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
