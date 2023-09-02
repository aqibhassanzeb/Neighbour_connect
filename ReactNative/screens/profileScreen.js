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
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";

import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "expo-image-picker";
import { BottomSheet } from "react-native-btr";
import { Camera } from "expo-camera";
import SnackbarToast from "../components/snackbarToast";
import CameraModule from "../components/cameraModule";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uploadImageToCloudinary } from "../utils";
import { userUpdate } from "../apis/apis";
import { DEFAULT_USER_PIC } from "../config";

const { width } = Dimensions.get("window");

const EditProfileScreen = (props) => {
  const [update, setUpdate] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);
  const [removeImageToast, setRemoveImageToast] = useState(false);
  const [pickedImage, setPickedImage] = useState();
  const [image, setImage] = useState();
  const [removeImage, setRemoveImage] = useState(false);
  const [camera, setShowCamera] = useState(false);
  const [cameraNotGranted, setCameraNotGranted] = useState(false);
  const [user, setUser] = useState({});

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

  useLayoutEffect(() => {
    const getUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          let parseUserdata = JSON.parse(userData);
          setUser(parseUserdata.user);
        }
      } catch (error) {
        console.log("assyn storage error", error.message);
      }
    };
    getUser();
  }, []);

  const toggleCloseUploadImage = () => {
    setUploadImage(!uploadImage);
  };

  const onToggleSnackBarRemoveImage = () => setRemoveImageToast(false);

  const updateUser = async (updateDate) => {
    try {
      await userUpdate(updateDate);
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
      toggleCloseUploadImage();
      const response = await uploadImageToCloudinary(result.assets[0]);
      await updateUser({ _id: user._id, image: response });
    }
  };

  const onToggleSnackBarCameraNotGranted = () => setCameraNotGranted(false);

  const startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setShowCamera(true);
    } else {
      setCameraNotGranted(true);
    }
  };
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
        <Text
          style={{
            ...Fonts.SemiBold18white,
            marginHorizontal: Default.fixPadding * 1.2,
          }}
        >
          {"Profile"}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              marginVertical: Default.fixPadding * 3,
            }}
          >
            {!pickedImage ? (
              <View style={{ flexDirection: "row" }}>
                {removeImage ? (
                  <Image
                    source={{ uri: DEFAULT_USER_PIC }}
                    style={{
                      height: 88,
                      width: 88,
                      borderRadius: 74,
                      marginLeft: 23,
                    }}
                  />
                ) : (
                  <Image
                    source={{ uri: user.image }}
                    style={{
                      height: 88,
                      width: 88,
                      borderRadius: 74,
                      marginLeft: 23,
                    }}
                  />
                )}
                <Text
                  style={{
                    top: 23,
                    left: 23,
                    fontSize: 21,
                    fontWeight: "bold",
                  }}
                >
                  {user.name}
                </Text>
              </View>
            ) : (
              <Image
                style={{
                  alignSelf: "center",
                  height: 148,
                  width: 148,
                  borderRadius: 74,
                }}
                source={{ uri: pickedImage }}
              />
            )}
          </View>

          <TouchableOpacity
            onPress={() => {
              toggleCloseUploadImage();
            }}
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              backgroundColor: Colors.primary,
              top: "55%",
              left: "16%",
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              borderColor: Colors.white,
              borderWidth: 1,
              marginRight: 290,
            }}
          >
            <Ionicons
              style={{ color: Colors.white }}
              name="camera-outline"
              size={20}
            />
          </TouchableOpacity>
          <View style={styles.line}></View>
        </View>

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            borderRadius: 10,
            padding: Default.fixPadding * 1.5,
            marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 2,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("YourList", {
                title: "Losted",
              })
            }
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Ionicons name="create-outline" size={54} color="black" />

            <View
              style={{
                marginLeft: isRtl ? 0 : Default.fixPadding * 1.5,
                marginRight: isRtl ? Default.fixPadding * 1.5 : 0,
                alignItems: isRtl ? "flex-end" : "flex-start",
                flex: 9,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold16black,
                  overflow: "hidden",
                  top: 12,
                }}
              >
                Created a Lost & Found post.
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.Medium14Black,
                  marginVertical: Default.fixPadding * 0.3,
                  overflow: "hidden",
                  top: 6,
                }}
              >
                Pink bag founded on the road.
              </Text>

              <Text style={{ ...Fonts.Medium14grey }}>5 min ago</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.line}></View>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            borderRadius: 10,
            padding: Default.fixPadding * 1.5,
            marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 2,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Mysus", {
                title: "Losted",
              })
            }
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Ionicons name="create-outline" size={54} color="black" />

            <View
              style={{
                marginLeft: isRtl ? 0 : Default.fixPadding * 1.5,
                marginRight: isRtl ? Default.fixPadding * 1.5 : 0,
                alignItems: isRtl ? "flex-end" : "flex-start",
                flex: 9,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold16black,
                  overflow: "hidden",
                  top: 12,
                }}
              >
                Created a Suspicious Activity post.
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.Medium14Black,
                  marginVertical: Default.fixPadding * 0.3,
                  overflow: "hidden",
                  top: 6,
                }}
              >
                I noticed a man wearing a mask and gloves walking around the
                Neighborhood
              </Text>

              <Text style={{ ...Fonts.Medium14grey }}>10 min ago</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            borderRadius: 10,
            padding: Default.fixPadding * 1.5,
            marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 2,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("MySkills", {
                title: "Losted",
              })
            } // Add your press event handler
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Ionicons name="create-outline" size={54} color="black" />

            <View
              style={{
                marginLeft: isRtl ? 0 : Default.fixPadding * 1.5,
                marginRight: isRtl ? Default.fixPadding * 1.5 : 0,
                alignItems: isRtl ? "flex-end" : "flex-start",
                flex: 9,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold16black,
                  overflow: "hidden",
                  top: 12,
                }}
              >
                Created a skill sharing post.
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.Medium14Black,
                  marginVertical: Default.fixPadding * 0.3,
                  overflow: "hidden",
                  top: 6,
                }}
              >
                About Electrician
              </Text>

              <Text style={{ ...Fonts.Medium14grey }}>20 min ago</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            borderRadius: 10,
            padding: Default.fixPadding * 1.5,
            marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 2,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("BuyMy", {
                title: "Losted",
              })
            }
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Ionicons name="create-outline" size={54} color="black" />

            <View
              style={{
                marginLeft: isRtl ? 0 : Default.fixPadding * 1.5,
                marginRight: isRtl ? Default.fixPadding * 1.5 : 0,
                alignItems: isRtl ? "flex-end" : "flex-start",
                flex: 9,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold16black,
                  overflow: "hidden",
                  top: 12,
                }}
              >
                Created a Neighbor Trade post.
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.Medium14Black,
                  marginVertical: Default.fixPadding * 0.3,
                  overflow: "hidden",
                  top: 6,
                }}
              >
                About Vintage Chair
              </Text>

              <Text style={{ ...Fonts.Medium14grey }}>32 min ago</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            borderRadius: 10,
            padding: Default.fixPadding * 1.5,
            marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 2,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("MyDis", {
                title: "Losted",
              })
            } // Add your press event handler
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Ionicons name="create-outline" size={54} color="black" />

            <View
              style={{
                marginLeft: isRtl ? 0 : Default.fixPadding * 1.5,
                marginRight: isRtl ? Default.fixPadding * 1.5 : 0,
                alignItems: isRtl ? "flex-end" : "flex-start",
                flex: 9,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold16black,
                  overflow: "hidden",
                  top: 12,
                }}
              >
                Created a Neighbor Forum post.
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.Medium14Black,
                  marginVertical: Default.fixPadding * 0.3,
                  overflow: "hidden",
                  top: 6,
                }}
              >
                Has anyone installed a security camera?
              </Text>

              <Text style={{ ...Fonts.Medium14grey }}>2 hrs ago</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={update}
        onRequestClose={() => setUpdate(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setUpdate(false)}
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
                width: width * 0.7,
                ...Default.shadow,
                paddingHorizontal: Default.fixPadding * 1.5,
                paddingVertical: Default.fixPadding * 1.5,
                backgroundColor: Colors.white,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  ...Fonts.SemiBold16black,
                  marginVertical: Default.fixPadding * 1.5,
                }}
              >
                {tr("successfully")}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setUpdate(false);
                  props.navigation.navigate("profileScreen");
                }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  backgroundColor: Colors.primary,
                  paddingHorizontal: Default.fixPadding * 9,
                  paddingVertical: Default.fixPadding,
                  borderRadius: 10,
                  marginVertical: Default.fixPadding,
                }}
              >
                <Text
                  style={{
                    ...Fonts.Bold18white,
                  }}
                >
                  {tr("ok")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <BottomSheet
        visible={uploadImage}
        onBackButtonPress={toggleCloseUploadImage}
        onBackdropPress={toggleCloseUploadImage}
      >
        <View style={styles.bottomSheetMain}>
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold18black,
              marginVertical: Default.fixPadding,
              marginHorizontal: Default.fixPadding * 2,
              overflow: "hidden",
            }}
          >
            {tr("changeProfile")}
          </Text>
          <View
            style={{
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={startCamera}
              style={{
                alignItems: "center",
                flexDirection: isRtl ? "row-reverse" : "row",
                marginBottom: Default.fixPadding * 1.5,
              }}
            >
              <View style={[Default.shadow, styles.round]}>
                <Ionicons name="camera" size={25} color={Colors.blue} />
              </View>
              <Text
                style={{
                  ...Fonts.Medium16Black,
                  marginHorizontal: Default.fixPadding,
                }}
              >
                {tr("camera")}
              </Text>
            </TouchableOpacity>
            {camera && (
              <CameraModule
                showModal={camera}
                setShowCamera={() => setShowCamera(false)}
                setPickedImage={(result) => setPickedImage(result.uri)}
                toggleCloseUploadImage={() => toggleCloseUploadImage()}
              />
            )}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={pickImage}
              style={{
                alignItems: "center",
                flexDirection: isRtl ? "row-reverse" : "row",
                marginBottom: Default.fixPadding * 1.5,
              }}
            >
              <View style={[Default.shadow, styles.round]}>
                <Ionicons name="image" size={25} color={Colors.green} />
              </View>
              <Text
                style={{
                  ...Fonts.Medium16Black,
                  marginHorizontal: Default.fixPadding,
                }}
              >
                {tr("gallery")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={async () => {
                toggleCloseUploadImage();
                setRemoveImageToast(!removeImageToast);
                setRemoveImage(true);
                await updateUser({ _id: user._id, image: DEFAULT_USER_PIC });
                setPickedImage(null);
              }}
              style={{
                alignItems: "center",
                flexDirection: isRtl ? "row-reverse" : "row",
                marginBottom: Default.fixPadding * 1.5,
              }}
            >
              <View style={[Default.shadow, styles.round]}>
                <Ionicons name="trash" size={25} color={Colors.red} />
              </View>
              <Text
                style={{
                  ...Fonts.Medium16Black,
                  marginHorizontal: Default.fixPadding,
                }}
              >
                {tr("remove")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <SnackbarToast
          visible={cameraNotGranted}
          onDismiss={onToggleSnackBarCameraNotGranted}
          title={tr("deny")}
        />
      </BottomSheet>
      <SnackbarToast
        visible={removeImageToast}
        onDismiss={onToggleSnackBarRemoveImage}
        title={tr("removeImage")}
      />
    </SafeAreaView>
  );
};

export default EditProfileScreen;

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
