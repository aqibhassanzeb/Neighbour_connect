import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Image,
  Modal,
  TextInput,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Colors, Fonts, Default } from "../constants/styles";
import MapView, { Marker } from "react-native-maps";
import { Slider } from "react-native-range-slider-expo";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Loader from "../components/loader";

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { userUpdate } from "../apis/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const RegisterScreen = ({ navigation, route }) => {
  const [isVisibles, setIsVisibles] = useState(false);

  const toggleModals = () => {
    setIsVisibles(true);

    setTimeout(() => {
      setIsVisibles(false);
      navigation.navigate("homeScreen");
    }, 2000);
  };

  const [value, setValue] = useState(route.params?.userData.address_range);

  const [checked, setChecked] = useState(false);

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`registerScreen:${key}`);
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

  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
  };

  const [registerLoader, setRegisterLoader] = useState(false);

  // const handleRegister = () => {
  //   setRegisterLoader(true);
  //   setTimeout(() => {
  //     setRegisterLoader(false);
  //     navigation.navigate("Outh");
  //   }, 800);
  // };

  const handleUpdate = async () => {
    try {
      let payload = { address_range: value, _id: route.params.userData?._id };
      setRegisterLoader(true);
      let verified = await userUpdate(payload);
      if (verified.status == 200) {
        await AsyncStorage.setItem("userUpdated", "true"),
          alert("updated successfully");
        // navigation.navigate("homeScreen");
      } else {
        alert(verified.data.error);
      }
    } catch (error) {
      alert("something went wrong!");
    } finally {
      setRegisterLoader(false);
    }
  };

  useEffect(() => {
    if (route.params) {
      const addressRange = route.params.userData?.address_range;
      const addressRangeNumber = Number(addressRange);
      setValue(addressRangeNumber);
    }
  }, [route.params]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.extraLightGrey,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      {registerLoader && <Loader />}
      <View
        style={{
          backgroundColor: Colors.primary,
          paddingBottom: 6,
        }}
      >
        <TouchableOpacity
          style={{
            marginHorizontal: Default.fixPadding * 2,
            marginTop: Default.fixPadding,
            alignItems: isRtl ? "flex-end" : "flex-start",
          }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name={isRtl ? "arrow-forward" : "arrow-back"}
            size={25}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: Default.fixPadding * 2,
            marginTop: Default.fixPadding * 1.5,
          }}
        >
          <Text
            style={{
              ...Fonts.SemiBold16black,
              marginHorizontal: Default.fixPadding * 0.5,
            }}
          >
            {"Select your radius in Km"}
          </Text>
          <View
            style={{
              ...Default.shadow,
              backgroundColor: Colors.white,
              borderRadius: 10,
              marginHorizontal: Default.fixPadding * 0.3,
              marginVertical: Default.fixPadding * 1.5,
            }}
          >
            <Slider
              initialValue={value}
              min={1}
              max={5}
              valueOnChange={(value) => setValue(value)}
              valueLabelsBackgroundColor={Colors.primary}
              inRangeBarColor={Colors.extraLightGrey}
              outOfRangeBarColor={Colors.primary}
              knobColor={Colors.primary}
              styleSize={"small"}
              rangeLabelsTextColor={Colors.grey}
            />
          </View>

          <TouchableOpacity
            onPress={handleUpdate}
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: Default.fixPadding * 3,
              paddingVertical: Default.fixPadding * 1.2,
            }}
          >
            <Text style={{ ...Fonts.SemiBold18white }}>{"Save"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        visible={isVisibles}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsVisibles(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.transparentBlack,
          }}
        >
          <View
            style={{
              width: width * 0.8,
              height: 150,
              backgroundColor: Colors.white,
              borderRadius: 10,
              justifyContent: "center",
              ...Default.shadow,
            }}
          >
            <View
              style={{
                marginLeft: 140,
                marginBottom: 23,
              }}
            >
              <MaterialCommunityIcons name="bookmark" size={52} color="black" />
            </View>
            <View
              style={{
                marginLeft: 73,
              }}
            >
              <Text
                style={{
                  fontSize: 23,
                }}
              >
                Saved successfully
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default RegisterScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  radius: {
    fontSize: 18,
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  infoContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  container: {
    // flex: 1,
    //  alignItems: 'center',
    //  justifyContent: 'center',
    marginBottom: 100,
  },
  addIcon: {
    position: "absolute",
    bottom: 2,
    left: 19,
  },
  border: {
    backgroundColor: Colors.primary,
    width: 115,
    height: 30,
    bottom: 14,
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    // borderTopColor: 'black',
    // borderBottomColor:'black',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderTopColor: "black",
    borderTopWidth: 1,
    borderLeftColor: "black",
    borderLeftWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 10,
  },
  text: {
    fontSize: 20,
    marginRight: 10,
    paddingLeft: 2,
    paddingRight: 9,

    color: "white",
  },
  bar: {
    width: 3,
    height: 5,
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 10,
    //marginTop:30,
    //marginBottom:30,
    //  height:190,
    //   fontSize:10,
    //   marginHorizontal: Default.fixPadding * 2,
  },
  buttonContainer: {
    // width: '120%',
    //  color:'white',
    // padding: Default.fixPadding * 1.2,
    borderRadius: 10,

    //  backgroundColor: Colors.primary,
  },
  contain: {
    // flex: 1,
    // alignItems: 'center',
    justifyContent: "center",
    marginLeft: 38,
    //  backgroundColor: Colors.primary,
    marginRight: 23,
    borderRadius: 20,
    marginTop: 16,
  },
  selectedButton: {
    flexDirection: "row",
    alignItems: "center",

    // borderWidth: 1,
    borderColor: "gray",
    // marginLeft:86,
    //borderRadius: 5,
  },
  selectedButtonText: {
    //   marginRight: 60,
    color: "white",
  },
  dropdown: {
    //  position: 'absolute',
    top: 1,
    marginRight: 8,
    backgroundColor: "white",
    width: 122,
    //height:82,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // marginRight:70,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",

    height: 42,
    //   padding: 10,
    // borderWidth: 1,
    //  borderColor: 'gray',
    //  borderBottomWidth: 1,
  },
  dropdownButtonSelected: {
    backgroundColor: "gray",
  },
  dropdownButtonText: {
    marginRight: 10,
  },
  dropdownButtons: {
    flexDirection: "row",
    alignItems: "center",
    top: 4,
    height: 42,
    //   padding: 10,
    //  borderWidth: 1,
    //  borderColor: 'gray',
    //  borderBottomWidth: 1,
  },
  text: {
    paddingRight: 23,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
