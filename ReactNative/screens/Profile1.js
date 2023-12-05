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
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { BottomSheet } from "react-native-btr";
import { Camera } from "expo-camera";
import { sendRequest, userGetbyId } from "../apis/apis";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { DotIndicator } from "react-native-indicators";

const { width } = Dimensions.get("window");

const EditProfileScreen = (props) => {
  const user = useSelector((state) => state.authReducer.activeUser?.user);
  const [showFirstIcon, setShowFirstIcon] = useState(true);
  const [already, setAlready] = useState(false);
  const connectionDetails = props.route.params?.user || {};

  const [isClicked, setIsClicked] = useState(false);
  const [PLoading, setPLoading] = useState(false);
  const [isRequested, setIsRequested] = useState(false);

  const handleButtonClick = async () => {
    try {
      let send = await sendRequest({ receiver_id: connectionDetails._id });
      if (send.status == 200) {
        setIsRequested(true);
        setShowFirstIcon(false);
      } else {
        alert(send.data.error);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    } finally {
    }
  };
  const [selectedValue, setSelectedValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [dropdownOpens, setDropdownOpens] = useState(false);
  const [dropdownOpend, setDropdownOpend] = useState(false);

  const [dropdownOpendd, setDropdownOpendd] = useState(false);
  const handleButtonPress = (buttonValue) => {
    setSelectedValue(buttonValue);
    setDropdownOpen(false);
    setDropdownOpens(false);
    setDropdownOpend(false);
    setDropdownOpendd(false);
  };

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

  const [cancelModal, setCancelModal] = useState(false);
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

  async function getUserInfo() {
    try {
      setPLoading(true);
      const response = await userGetbyId({ _id: connectionDetails._id });
      setPLoading(false);
      if (response.status == 200) {
        const userInfo = response.data.data;
        const isRequested = userInfo?.requests.some(
          (req) => req.sender === user._id
        );
        if (isRequested) {
          setIsRequested(isRequested);
          setShowFirstIcon(false);
        }
      }
    } catch (error) {
      setPLoading(false);
      console.log("File Profile1", error.message);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      console.log("CALLED");
      getUserInfo();
    }, [connectionDetails])
  );

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
        ></Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginVertical: Default.fixPadding * 2,
          }}
        >
          <View
            style={{
              flex: 9,
              flexDirection: isRtl ? "row-reverse" : "row",
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            <Image
              source={{ uri: connectionDetails.image }}
              style={{ height: 66, width: 66, borderRadius: 33 }}
              resizeMode="contain"
            />
            <View
              style={{
                justifyContent: "center",
                marginHorizontal: Default.fixPadding * 1.5,
                alignItems: isRtl ? "flex-end" : "flex-start",
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold16black,
                  overflow: "hidden",
                  position: "absolute",
                  width: 140,
                  top: 20,
                }}
              >
                {connectionDetails.name}
              </Text>
            </View>
          </View>

          <View style={styles.contain}>
            <TouchableOpacity
              style={styles.selectedButton}
              onPress={() => setDropdownOpens(!dropdownOpens)}
            >
              <Ionicons name="ellipsis-vertical" size={24} color="black" />
              <Text style={styles.selectedButtonText}>{selectedValue}</Text>
            </TouchableOpacity>
          </View>

          {dropdownOpens && (
            <View style={[styles.dropdown]}>
              {/* <TouchableOpacity
                onPress={() => {
                  setCancelModal(true);
                  //  setSelectedId(item.key);
                }}
                style={[
                  styles.dropdownButton,
                  selectedValue === "button1" && styles.dropdownButtonSelected,
                ]}
              >
                <Ionicons name="close-circle-outline" size={23} color="black" />
                <Text style={styles.dropdownButtonText}>Block</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={[
                  styles.dropdownButton,
                  selectedValue === "button1" && styles.dropdownButtonSelected,
                ]}
                onPress={() =>
                  props.navigation.navigate("Report", {
                    postId: connectionDetails._id,
                    module: "user",
                  })
                }
              >
                <Ionicons name="flag-outline" size={23} color="black" />
                <Text style={styles.dropdownButtonText}>Report</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* <View
          style={{
            flexDirection: "row",
            position: "absolute",
            marginTop: 130,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",

              paddingLeft: 33,
              paddingRight: 43,
              paddingTop: 15,
              paddingBottom: 15,
              marginLeft: 23,
              marginRight: 23,
            }}
            onPress={handleButtonClick}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              {showFirstIcon ? (
                <MaterialCommunityIcons
                  name="account-circle-outline"
                  size={24}
                  color="white"
                  paddingRight={7}
                />
              ) : (
                <Ionicons
                  name="time-outline"
                  size={24}
                  color="white"
                  paddingRight={7}
                />
              )}

              <Text style={{ ...Fonts.SemiBold18white }}>
                {PLoading ? (
                  <DotIndicator color="white" size={10} />
                ) : isRequested ? (
                  "pending"
                ) : (
                  "connect"
                )}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 33,
              paddingRight: 33,
              paddingTop: 15,
              paddingBottom: 15,
              marginRight: 23,
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <MaterialCommunityIcons
                name="message-text-outline"
                size={24}
                color="white"
                paddingRight={7}
              />

              <Text style={{ ...Fonts.SemiBold18white }}>{tr("message")}</Text>
            </View>
          </TouchableOpacity>
        </View> */}
      </ScrollView>

      {/* <Modal
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
  
               
              </View>
            </View>
          </TouchableOpacity>
        </Modal> */}

      <BottomSheet
        visible={uploadImage}
        onBackButtonPress={toggleCloseUploadImage}
        onBackdropPress={toggleCloseUploadImage}
      >
        <View style={styles.bottomSheetMain}>
          <View
            style={{
              //   flex: 9,
              flexDirection: isRtl ? "row-reverse" : "row",
              marginHorizontal: Default.fixPadding * 2,
              //  marginBottom:73,
              marginLeft: 167,
              marginTop: 8,
            }}
          >
            <Image
              source={require("../assets/images/profile.png")}
              style={{ height: 66, width: 66, borderRadius: 33 }}
              //   resizeMode="contain"
            />
          </View>
          <Text
            style={{
              ...Fonts.SemiBold18black,
              marginLeft: 134,

              marginTop: 10,
              marginBottom: 46,
            }}
          >
            {"Esther Howard"}
          </Text>
          <View
            style={{
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setCancelModal(true);
                //  setSelectedId(item.key);
              }}
              style={{
                alignItems: "center",
                flexDirection: isRtl ? "row-reverse" : "row",
                marginBottom: Default.fixPadding * 3,
                paddingLeft: 138,
                paddingBottom: 10,
                paddingTop: 10,
                backgroundColor: Colors.lightGrey,
                borderRadius: 7,
              }}
            >
              <View style={[Default.shadow]}>
                <Ionicons name="flag-outline" size={25} color={Colors.black} />
              </View>
              <Text
                style={{
                  ...Fonts.Medium16Black,
                  marginHorizontal: Default.fixPadding,
                }}
              >
                {tr("Report")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: "center",
                flexDirection: isRtl ? "row-reverse" : "row",
                marginBottom: Default.fixPadding * 1.5,
                paddingLeft: 138,
                paddingBottom: 10,
                paddingTop: 10,
                backgroundColor: Colors.lightGrey,
                borderRadius: 7,
              }}
            >
              <View style={[Default.shadow]}>
                <Ionicons
                  name="close-circle-outline"
                  size={25}
                  color={Colors.black}
                />
              </View>
              <Text
                style={{
                  ...Fonts.Medium16Black,
                  marginHorizontal: Default.fixPadding,
                }}
              >
                {tr("Block")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>

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
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: Default.fixPadding * 2,
                }}
              >
                <Text
                  style={{
                    ...Fonts.SemiBold18primary,
                    marginTop: Default.fixPadding,
                  }}
                >
                  {"Are you sure you want to mark this item as found?"}
                </Text>
                <Text
                  numberOfLines={2}
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
                  onPress={() => setCancelModal(false)}
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
                    {tr("Yes")}
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
                    {tr("No")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <View style={{ height: 1, backgroundColor: "grey", bottom: 580 }} />

      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          marginTop: 160,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",

            paddingLeft: 33,
            paddingRight: 43,
            paddingTop: 15,
            paddingBottom: 15,
            marginLeft: 23,
            marginRight: 23,
          }}
          onPress={handleButtonClick}
          disabled={isClicked}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {showFirstIcon ? (
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={24}
                color="white"
                paddingRight={7}
              />
            ) : (
              <Ionicons
                name="time-outline"
                size={24}
                color="white"
                paddingRight={7}
              />
            )}

            <Text
              style={{
                ...Fonts.SemiBold18white,
                width: 75,
              }}
            >
              {PLoading ? (
                <Text>
                  {" "}
                  <DotIndicator style={{}} size={3} color="white" />
                </Text>
              ) : isRequested ? (
                "Pending"
              ) : (
                "Connect"
              )}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("ChattingScreen", {
              user: {
                recepientId: connectionDetails._id,
                recepientName: connectionDetails.name,
                recepientImage: connectionDetails.image,
                senderId: props.route.params.userId,
              },
            })
          }
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 33,
            paddingRight: 33,
            paddingTop: 15,
            paddingBottom: 15,
            marginRight: 23,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <MaterialCommunityIcons
              name="message-text-outline"
              size={24}
              color="white"
              paddingRight={7}
            />

            <Text style={{ ...Fonts.SemiBold18white }}>{tr("Message")}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  contain: {
    // flex: 1,
    // alignItems: 'center',
    position: "absolute",

    justifyContent: "center",
    marginLeft: 3,
    top: 5,
    marginLeft: 340,
  },
  selectedButton: {
    flexDirection: "row",
    alignItems: "center",
    //  padding: 10,
    // borderWidth: 1,
    borderColor: "gray",
    zIndex: 108,
    marginLeft: 14,
    //borderRadius: 5,
  },
  selectedButtonText: {
    // marginLeft: 10,
    //marginRight: 60,
    zIndex: 100,
  },
  dropdown: {
    //  position: 'absolute',
    top: 40,
    paddingLeft: 10,
    marginRight: 15,
    backgroundColor: "white",
    width: 120,
    //height:82,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginRight: 20,
    // position:"absolute",
    //    marginLeft:300,
    zIndex: 107,
  },

  dropdownButton: {
    zIndex: 107,
    flexDirection: "row",
    alignItems: "center",

    height: 42,
    //   padding: 10,
    // borderWidth: 1,
    //  borderColor: 'gray',
    //  borderBottomWidth: 1,
  },
  dropdownButtonSelected: {
    backgroundColor: "white",
    zIndex: 107,
  },
  dropdownButtonText: {
    zIndex: 107,
    marginRight: 20,
    fontSize: 17,
  },
  dropdownButtons: {
    zIndex: 107,
    flexDirection: "row",
    alignItems: "center",
    top: 4,
    height: 42,
    //   padding: 10,
    //  borderWidth: 1,
    //  borderColor: 'gray',
    //  borderBottomWidth: 1,
  },
  containr: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 10,
    marginTop: 30,

    marginHorizontal: Default.fixPadding * 2,
  },
  buttonContainr: {
    width: "49%",
    color: "white",
    padding: Default.fixPadding * 1.2,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
});
