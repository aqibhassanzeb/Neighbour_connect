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
import React, { useState, useEffect } from "react";

import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "expo-image-picker";
import { BottomSheet } from "react-native-btr";
import { Camera } from "expo-camera";
import SnackbarToast from "../components/snackbarToast";
import CameraModule from "../components/cameraModule";

const { width } = Dimensions.get("window");

const EditProfileScreen = (props) => {
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

  const [update, setUpdate] = useState(false);

  const [name, onChangeName] = useState("Esther howard");
  const [email, onChangeTextEmail] = useState("estherhoward@example.com");
  const [number, onChangeTextNumber] = useState("9876543210");

  const [uploadImage, setUploadImage] = useState(false);
  const toggleCloseUploadImage = () => {
    setUploadImage(!uploadImage);
  };

  const [removeImageToast, setRemoveImageToast] = useState(false);
  const onToggleSnackBarRemoveImage = () => setRemoveImageToast(false);

  const [pickedImage, setPickedImage] = useState();
  const [removeImage, setRemoveImage] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
      toggleCloseUploadImage();
    }
  };

  const [camera, setShowCamera] = useState(false);

  const [cameraNotGranted, setCameraNotGranted] = useState(false);
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
          {tr("editProfile")}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: Default.fixPadding * 3,
          }}
        >
          {!pickedImage ? (
            <View>
              {removeImage ? (
                <View
                  style={{
                    height: 148,
                    width: 148,
                    borderRadius: 74,
                    backgroundColor: Colors.lightGrey,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="person" size={45} color={Colors.white} />
                </View>
              ) : (
                <Image
                  source={require("../assets/images/profile.png")}
                  style={{ height: 148, width: 148, borderRadius: 74 }}
                />
              )}
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
            top: "25%",
            left: "56%",
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            borderColor: Colors.white,
            borderWidth: 1,
          }}
        >
          <Ionicons
            style={{ color: Colors.white }}
            name="camera-outline"
            size={20}
          />
        </TouchableOpacity>

        <Text
          style={{
            ...Fonts.Medium14Black,
            marginHorizontal: Default.fixPadding * 2,
            marginTop: Default.fixPadding * 3,
          }}
        >
          {tr("name")}
        </Text>
        <View
          style={{
            ...Default.shadow,
            borderRadius: 10,
            backgroundColor: Colors.white,
            marginHorizontal: Default.fixPadding * 2,
            marginTop: Default.fixPadding,
            marginBottom: Default.fixPadding * 2,
            padding: Default.fixPadding * 1.5,
          }}
        >
          <TextInput
            onChangeText={onChangeName}
            selectionColor={Colors.primary}
            value={name}
            style={{
              ...Fonts.Medium15Black,
              textAlign: isRtl ? "right" : "left",
            }}
            placeholder={tr("enterName")}
            placeholderTextColor={Colors.grey}
          />
        </View>

        <Text
          style={{
            ...Fonts.Medium14Black,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          {tr("email")}
        </Text>
        <View
          style={{
            ...Default.shadow,
            borderRadius: 10,
            backgroundColor: Colors.white,
            marginHorizontal: Default.fixPadding * 2,
            marginTop: Default.fixPadding,
            marginBottom: Default.fixPadding * 2,
            padding: Default.fixPadding * 1.5,
          }}
        >
          <TextInput
            onChangeText={onChangeTextEmail}
            selectionColor={Colors.primary}
            value={email}
            keyboardType="email-address"
            style={{
              ...Fonts.Medium15Black,
              textAlign: isRtl ? "right" : "left",
            }}
            placeholder={tr("enterEmail")}
            placeholderTextColor={Colors.grey}
          />
        </View>
        <Text
          style={{
            ...Fonts.Medium14Black,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          {tr("mobile")}
        </Text>
        <View
          style={{
            ...Default.shadow,
            borderRadius: 10,
            backgroundColor: Colors.white,
            marginHorizontal: Default.fixPadding * 2,
            marginTop: Default.fixPadding,
            marginBottom: Default.fixPadding * 2,
            padding: Default.fixPadding * 1.5,
          }}
        >
          <TextInput
            onChangeText={onChangeTextNumber}
            selectionColor={Colors.primary}
            value={number}
            keyboardType={"phone-pad"}
            maxLength={10}
            style={{
              ...Fonts.Medium15Black,
              textAlign: isRtl ? "right" : "left",
            }}
            placeholder={tr("enterMobile")}
            placeholderTextColor={Colors.grey}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => setUpdate(true)}
        style={{
          backgroundColor: Colors.primary,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginVertical: Default.fixPadding * 2,
          paddingVertical: Default.fixPadding * 1.2,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <Text style={{ ...Fonts.SemiBold18white }}>{tr("update")}</Text>
      </TouchableOpacity>

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
              onPress={() => {
                toggleCloseUploadImage();
                setRemoveImageToast(!removeImageToast);
                setRemoveImage(true);
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
