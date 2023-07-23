import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    BackHandler,
    TextInput,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { Colors, Default, Fonts } from "../constants/styles";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import { useTranslation } from "react-i18next";
  
  const GooglePayScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation();
  
    const isRtl = i18n.dir() == "rtl";
  
    function tr(key) {
      return t(`googlePayScreen:${key}`);
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
    const [id, setId] = useState();
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
            {("Submit Report")}
          </Text>
        </View>
  
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginHorizontal: Default.fixPadding * 2,
              marginVertical: Default.fixPadding * 2,
            }}
          >
           <Text  style={{
                    marginLeft: isRtl ? 0 : Default.fixPadding,
                    marginRight: isRtl ? Default.fixPadding : 0,
                    fontSize:22,
                    marginTop:25,
                    marginLeft:1,
                    marginBottom:10
                  }}> Help us understand what's happening</Text>
          
            <Text
              style={{
                fontSize:17,
               // textAlign: "center",
               marginLeft:6,
                marginBottom: Default.fixPadding * 2,
              }}
            >
              {("Additional information can help determine if the content voilates the Guidelines")}
            </Text>
  
            <View
              style={{
                ...Default.shadow,
                borderRadius: 10,
                backgroundColor: Colors.white,
                paddingHorizontal: Default.fixPadding * 1.4,
                paddingVertical: Default.fixPadding * 1.5,
              }}
            >
              <TextInput
                placeholder={("Optional Note")}
                placeholderTextColor={Colors.grey}
                
                selectionColor={Colors.primary}
               
                style={{
                  ...Fonts.Medium16Black,
                  textAlign: isRtl ? "right" : "left",
                }}
              />
            </View>
          </View>
  
          <TouchableOpacity
            onPress={() => navigation.navigate("SubmitReport")}
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: Default.fixPadding * 2,
              padding: Default.fixPadding * 1.2,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            <Text style={{ ...Fonts.SemiBold18white }}>{("Submit Report")}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default GooglePayScreen;
  