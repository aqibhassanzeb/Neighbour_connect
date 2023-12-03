import { BackHandler, Platform, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default } from "../constants/styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import HomeScreen from "../screens/homeScreen";
import ConnReq from "../screens/ConnReq";
import Notify from "../screens/Notify";
import ProfileScreen from "../screens/profileScreen";
import SnackbarToast from "./snackbarToast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

const BottomTab = (props) => {
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state?.authReducer?.activeUser?.user);
  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`bottomTab:${key}`);
  }

  const [exit, setExit] = useState(false);
  const [userData, setUserData] = useState("");

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

  const title1 = isRtl ? tr("profile") : tr("home");
  const title2 = isRtl ? tr("home") : tr("profile");
  const title3 = isRtl ? tr("Notification") : tr("Connections");
  const title4 = isRtl ? tr("Connections") : tr("Notification");

  useEffect(() => {
    // Load user data from AsyncStorage when the component mounts
    loadUserData();
  }, [props.route]);

  const loadUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUserData(userData?.user);
      } else {
        console.log("No user data found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };
  return (
    <>
      <Tab.Navigator
        initialRouteName="homeScreen"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: Colors.white,
            height: Platform.OS === "android" ? 65 : 90,
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarLabelStyle: {
            fontFamily: "SemiBold",
            fontSize: 15,
            paddingBottom: Default.fixPadding * 0.5,
          },
        }}
      >
        <Tab.Screen
          name={isRtl ? "profileScreen" : "homeScreen"}
          component={isRtl ? ProfileScreen : HomeScreen}
          options={{
            title: title1,
            tabBarActiveTintColor: Colors.primary,
            headerShown: false,
            tabBarIcon: ({ focused, size }) => (
              <Feather
                name={isRtl ? "user" : "home"}
                color={focused ? Colors.primary : Colors.grey}
                size={22}
              />
            ),
          }}
        />
        <Tab.Screen
          name={isRtl ? "Notify" : "ConnReq"}
          component={isRtl ? Notify : ConnReq}
          options={{
            title: title3,
            tabBarActiveTintColor: Colors.primary,
            headerShown: false,
            tabBarIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name={isRtl ? "bell" : "account-group-outline"}
                color={focused ? Colors.primary : Colors.grey}
                size={22}
              />
            ),
          }}
        />

        <Tab.Screen
          name={isRtl ? "ConnReq" : "Notify"}
          component={isRtl ? ConnReq : Notify}
          options={{
            title: title4,
            tabBarActiveTintColor: Colors.primary,
            headerShown: false,
            tabBarIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name={isRtl ? "account-group-outline" : "bell"}
                color={focused ? Colors.primary : Colors.grey}
                size={22}
              />
            ),
          }}
        />
        <Tab.Screen
          name={isRtl ? "homeScreen" : "profileScreen"}
          component={isRtl ? HomeScreen : ProfileScreen}
          options={{
            title: user?.name?.split(" ")[0],
            tabBarActiveTintColor: Colors.primary,
            headerShown: false,
            tabBarIcon: () => (
              <Image
                width={30}
                height={30}
                style={{ borderRadius: 15 }}
                source={{
                  uri: user?.image,
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
      <SnackbarToast
        visible={exit}
        onDismiss={onToggleSnackBarExit}
        title={tr("exitApp")}
      />
    </>
  );
};

export default BottomTab;
