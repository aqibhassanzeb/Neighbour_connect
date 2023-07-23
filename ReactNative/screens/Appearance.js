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
  
  const AppSettingScreen = ({ navigation }) => {
    
    const { t, i18n } = useTranslation();
  
    const isRtl = i18n.dir() == "rtl";
  
    function tr(key) {
      return t(`appSettingScreen:${key}`);
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
  
    const [notification, setNotification] = useState(true);
    const switchNotification = () =>
      setNotification((notification) => !notification);
  
    const [location, setLocation] = useState(true);
    const switchLocation = () => setLocation((location) => !location);
  
    const [darkMode, setDarkMode] = useState(false);
    const switchDarkMode = () => setDarkMode((dark) => !dark);
  
    const [update, setUpdate] = useState(true);
    const switchUpdate = () => setUpdate((update) => !update);
  
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
            {("Appearance")}
          </Text>
        </View>
  
        <ScrollView showsVerticalScrollIndicator={false}>
         
  
  
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              marginHorizontal: Default.fixPadding * 2,
              marginBottom: Default.fixPadding * 3,

              marginTop: Default.fixPadding * 3,
            }}
          >
            <Text
              style={{
                ...Fonts.Medium16Black,
                flex: 8.5,
                textAlign: isRtl ? "right" : "left",
              }}
            >
              {tr("darkMode")}
            </Text>
  
            <ToggleSwitch
              style={{ flex: 1.5 }}
              isOn={darkMode}
              onColor={Colors.primary}
              offColor={Colors.lightGrey}
              size="medium"
              onToggle={switchDarkMode}
            />
          </View>
  
          
  
         
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default AppSettingScreen;
  