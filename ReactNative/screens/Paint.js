import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Image,
    BackHandler,
    ScrollView,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { Colors, Default, Fonts } from "../constants/styles";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import { useTranslation } from "react-i18next";
  
  const CategoryScreen = ({ navigation, route }) => {
    const { title } = route.params;
  
    const { t, i18n } = useTranslation();
  
    const isRtl = i18n.dir() == "rtl";
  
    function tr(key) {
      return t(`categoryScreen:${key}`);
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
            style={{ flex: 8.5, flexDirection: isRtl ? "row-reverse" : "row" }}
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
          Paint
            </Text>
          </View>
        
        </View>
        <ScrollView>
        <TouchableOpacity
   onPress={() =>
    navigation.navigate("Shared", {
      title: "Losted",
    })
  }
      style={{
        ...Default.shadow,
        backgroundColor: Colors.white,
      marginTop:20,
    marginHorizontal: 20,
      marginBottom: 0,
        borderRadius: 10,
        overflow: "hidden",
        flexDirection: isRtl ? "row-reverse" : "row",
        paddingVertical: Default.fixPadding,
      }}
    >
      <View
        style={{
          flex: 2,
          paddingHorizontal: Default.fixPadding * 1.5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/images/co10.jpg")}
          style={{ borderRadius: 5, height: 70, width: 70 }}
        />
      </View>
      <View
        style={{
          flex: 5,
          justifyContent: "center",
          alignItems: isRtl ? "flex-end" : "flex-start",
        }}
      >
        <Text
          numberOfLines={1}
          style={{ ...Fonts.SemiBold15black, overflow: "hidden" }}
        >
   Alina khan
        </Text>
        <Text
          numberOfLines={1}
          style={{ ...Fonts.SemiBold14grey, overflow: "hidden" }}
        >
        Skilled
        </Text>
        <View
          style={{
            marginVertical: Default.fixPadding * 0.3,
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
            
   <Text
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold14grey,
            //  marginHorizontal: Default.fixPadding * 0.3,
            marginRight:4,
              //overflow: "hidden",
            //  flex: 1,
              textAlign: isRtl ? "right" : "left",
            }}
          >
              3 Endorsements
          </Text>
        
        </View>
       
      </View>
      
      <View
        style={{
          flex: 3,
          justifyContent: "center",
          alignItems: isRtl ? "flex-start" : "flex-end",
          marginHorizontal: Default.fixPadding,
        }}
      >
       
      </View>

    </TouchableOpacity>
   
    
    </ScrollView>
      
       
      </SafeAreaView>
    );
  };
  
  export default CategoryScreen;
  