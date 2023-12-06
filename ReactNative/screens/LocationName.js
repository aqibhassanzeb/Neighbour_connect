import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  BackHandler,
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import { Colors, Default, Fonts, WindowHeight } from "../constants/styles";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "../apis/apis";
import { setActiveUser } from "../redux/authSlice";
import { useNavigation } from "@react-navigation/native";
import { UIActivityIndicator } from "react-native-indicators";
const MyAccountScreen = (props) => {
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.authReducer.activeUser?.user);
  const { name, longitude, latitude } = props.route.params;

  const [locationName, setlocationName] = useState(name);
  const [isLoading, setIsLoading] = useState(false);
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

  const dispatch = useDispatch();
  const navigation = useNavigation();

  async function update() {
    try {
      setIsLoading(true);
      const response = await updateLocation({
        _id: user?._id,
        name: locationName,
        latitude,
        longitude,
      });
      setIsLoading(false);
      if (response.status === 200) {
        dispatch(
          setActiveUser({ message: "", user: response?.data?.user, token: "" })
        );
        alert("Location Update Successfully");
        navigation.navigate("Myaccount");
      }
    } catch (error) {
      setIsLoading(false);

      alert(error.message);
    }
  }

  function handleConfirm() {
    update();
  }
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
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
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
          Location Name
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "white",
          // width: 390,
          // height: 100,
          padding: 10,
          paddingBottom: 30,
          marginTop: 100,
          marginHorizontal: 20,
          borderRadius: 10,
          justifyContent: "center",
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 20 }}>
          Location Address:
        </Text>

        <View>
          <TextInput
            style={{
              borderRadius: 10,
              borderWidth: 1,
              height: 50,
              paddingHorizontal: 10,
            }}
            value={locationName}
            onChange={(text) => setlocationName(text)}
          />
        </View>
      </View>
      <View
        style={{
          padding: 10,
          paddingBottom: 30,
          marginHorizontal: 60,
          borderRadius: 10,
          justifyContent: "center",
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity
          onPress={handleConfirm}
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: Default.fixPadding * 2,
            padding: Default.fixPadding * 1.2,
            width: 300,
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <View style={{ height: 25 }}>
              <UIActivityIndicator size={20} color="white" />
            </View>
          ) : (
            <Text style={{ ...Fonts.SemiBold18white }}>Update Location</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MyAccountScreen;
