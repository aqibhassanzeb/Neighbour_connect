import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  BackHandler,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MapView, { Marker } from "react-native-maps";
import { Slider } from "react-native-range-slider-expo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Default } from "../constants/styles";

import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Loader from "../components/loader";

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

const { width, height } = Dimensions.get("window");

const RegisterScreen = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const [cancelModal, setCancelModal] = useState(false);

  const [cancelToast, setCancelToast] = useState(false);
  const onToggleSnackBarCancelToast = () => setCancelToast(false);

  const [value, setValue] = useState(0);

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

  const handleRegister = () => {
    setRegisterLoader(true);
    setTimeout(() => {
      setRegisterLoader(false);
      navigation.navigate("Radius");
    }, 800);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.extraLightPrimary,
        paddingTop: StatusBar.currentHeight,
      }}
    >
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
          <Text style={{ ...Fonts.SemiBold20primary, marginBottom: 20 }}>
            {"Select Location"}
          </Text>

          <View style={{ marginHorizontal: Default.fixPadding * 0.3 }}>
            <TouchableOpacity
              onPress={() => {
                setCancelModal(true);
                //  setSelectedId(item.key);
              }}
              style={{
                ...Default.shadow,
                borderRadius: 10,
                backgroundColor: Colors.white,
                paddingVertical: Default.fixPadding * 0.9,
                paddingHorizontal: Default.fixPadding,
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
                marginVertical: Default.fixPadding * 1.5,
              }}
            >
              <View
                style={{
                  flex: 16.5,
                  alignItems: isRtl ? "flex-end" : "flex-start",
                  flexDirection: "row",
                }}
              >
                <SimpleLineIcons
                  name="location-pin"
                  size={18}
                  color={Colors.grey}
                  style={{
                    flex: 3,
                  }}
                />
                <Text
                  numberOfLines={2}
                  style={{
                    ...Fonts.SemiBold14grey,
                    overflow: "hidden",
                    textAlign: isRtl ? "right" : "left",
                  }}
                >
                  3891 Ranchview Dr. Richardson, California 62639, USA
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={cancelModal}
        // onRequestClose={() => setCancelModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setCancelModal(false)}
          style={{ flex: 1 }}
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
                backgroundColor: Colors.white,
                borderRadius: 10,
                justifyContent: "center",
                ...Default.shadow,
              }}
            >
              <View
                onPressOut={() => setCancelModal(false)}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: Default.fixPadding * 2,
                  marginRight: 7,
                  flexDirection: "row",
                }}
              >
                <SimpleLineIcons
                  name="location-pin"
                  size={20}
                  color={Colors.grey}
                  style={{
                    marginBottom: 12,
                    marginLeft: 12,
                  }}
                />

                <Text
                  style={{
                    ...Fonts.SemiBold18primary,
                    marginTop: Default.fixPadding,
                    marginLeft: 6,
                    marginRight: 6,
                  }}
                >
                  {"Allow  Neighbor connect to access to your location?"}
                </Text>
                <Text
                  numberOfLines={3}
                  style={{
                    ...Fonts.SemiBold15black,
                    textAlign: "center",
                    maxWidth: "90%",
                    marginTop: Default.fixPadding * 2,
                    overflow: "hidden",
                  }}
                ></Text>
              </View>
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  marginTop: Default.fixPadding * 2,
                }}
              >
                <TouchableOpacity
                  //  onPress={() => setCancelModal(false)}

                  onPress={() => {
                    setCancelModal(false);
                    navigation.navigate("Address");
                  }}
                  style={{
                    ...Default.shadow,
                    backgroundColor: Colors.primary,
                    flex: 1,
                    paddingVertical: Default.fixPadding * 1.2,
                    borderBottomLeftRadius: isRtl ? 0 : 10,
                    borderBottomRightRadius: isRtl ? 10 : 0,
                  }}
                >
                  <Text
                    style={{
                      ...Fonts.SemiBold18black,
                      textAlign: "center",
                    }}
                  >
                    {tr("Allow")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...Default.shadow,
                    backgroundColor: Colors.white,
                    flex: 1,
                    paddingVertical: Default.fixPadding * 1.2,
                    borderBottomRightRadius: isRtl ? 0 : 10,
                    borderBottomLeftRadius: isRtl ? 10 : 0,
                  }}
                  onPress={() => {
                    //   deleteItem();
                    setCancelModal(false);
                    //   setCancelToast(true);
                  }}
                >
                  <Text
                    style={{
                      ...Fonts.SemiBold18black,
                      marginHorizontal: Default.fixPadding * 1.5,
                      textAlign: "center",
                    }}
                  >
                    {tr("Deny")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
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
});
