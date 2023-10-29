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

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { BottomSheet } from "react-native-btr";
import { Camera } from "expo-camera";
import SnackbarToast from "../components/snackbarToast";
import CameraModule from "../components/cameraModule";
import { Disconnect, getId, getUserActivities } from "../apis/apis";
import moment from "moment";
import { handleNavigation } from "./profileScreen";
import useGetUser from "../components/useGetUser";
import { UIActivityIndicator } from "react-native-indicators";

const { width, height } = Dimensions.get("window");

const EditProfileScreen = (props) => {
  const user = useGetUser();
  const [isConnected, setConnected] = useState(true);
  const connectionDetails = props.route.params?.user || {};
  const [activites, setActivites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleConnectedPress = () => {
    setConnected(true);
    setCancelModal(true);
  };
  const [showFirstIcon, setShowFirstIcon] = useState(true);

  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = () => {
    setIsClicked(true);
    setShowFirstIcon(!showFirstIcon);
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

  const [loggedInUserId, setLoggedInUserId] = useState("");

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

  async function handleDisconnect() {
    try {
      let disconnect = await Disconnect({
        connection_id: connectionDetails._id,
      });
      if (disconnect.status == 200) {
        setConnected(false);
        setCancelModal(false);
      } else {
        alert(disconnect.data.error);
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong!");
    } finally {
    }
  }

  function handleDisconnectTap() {
    if (isConnected) {
      setCancelModal(true);
    }
  }
  useEffect(() => {
    async function getAsyncId() {
      const id = await getId();
      setLoggedInUserId(id);
    }
    getAsyncId();
  }, []);

  const handleGetActivities = async () => {
    try {
      setIsLoading(true);
      let result = await getUserActivities(connectionDetails._id);
      if (result.status == 200) {
        setActivites(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetActivities();
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

        <View
          style={{
            flexDirection: "row",
            // position: "absolute",
            marginTop: 25,
            // marginBottom: 99,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",

              paddingLeft: 10,
              paddingRight: 43,
              paddingTop: 15,
              paddingBottom: 15,
              marginLeft: 23,
              marginRight: 10,
            }}
            onPressOut={handleDisconnectTap}
            disabled={!isConnected}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Ionicons
                name={isConnected ? "checkmark-circle" : "close-circle"}
                size={24}
                color="white"
                paddingRight={7}
              />

              <Text style={{ ...Fonts.SemiBold18white }}>
                {isConnected ? "Connected" : "Disconnected"}
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
                  senderId: loggedInUserId,
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
              <Ionicons
                name="chatbubble-outline"
                size={24}
                color="white"
                paddingRight={7}
              />
              <Text style={{ ...Fonts.SemiBold18white }}>{tr("message")}</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("SeeAll", {
              title: "Losted",
            })
          }
        >
          <Text style={{ top: 110, left: 360 }}>SeeAll</Text>
        </TouchableOpacity> */}
        {isLoading && (
          <View
            style={{
              width: width,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              ...Default.shadow,
              paddingVertical: Default.fixPadding * 4,
            }}
          >
            <UIActivityIndicator
              color={Colors.primary}
              size={35}
              style={{ marginTop: Default.fixPadding * 1.5 }}
            />
            <Text
              style={{
                ...Fonts.SemiBold16primary,
                marginTop: Default.fixPadding * 2,
              }}
            >
              Getting Activites ...
            </Text>
          </View>
        )}
        {activites.length === 0 && !isLoading && (
          <TouchableOpacity
            style={{
              ...Default.shadow,
              backgroundColor: Colors.white,
              marginTop: 30,
              marginHorizontal: 13,
              //    marginBottom: 27,
              borderRadius: 10,
              // overflow: "hidden",
              flexDirection: isRtl ? "row-reverse" : "row",
              paddingVertical: Default.fixPadding,
            }}
          >
            <View
              style={{
                flex: 2,
                //  paddingHorizontal: Default.fixPadding * 1.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No Activity Today</Text>
            </View>
          </TouchableOpacity>
        )}

        {activites.length > 0 &&
          !isLoading &&
          activites.map((activity) => (
            <View key={activity._id}>
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
                  onPress={() => {
                    if (activity.post_type === "lost_found") {
                      props.navigation.navigate("Losted", {
                        _id: activity.post_id._id,
                        userId: user._id,
                      });
                    } else if (activity.post_type === "neighbour-watch") {
                      props.navigation.navigate("SusItem", {
                        post: activity.post_id,
                        userId: user._id,
                        user,
                      });
                    } else if (activity.post_type === "skill") {
                      props.navigation.navigate("CatShared", {
                        post: { skill: activity.post_id },
                        userId: user._id,
                      });
                    } else if (activity.post_type === "sell") {
                      props.navigation.navigate("BuyDetails", {
                        item: activity.post_id,
                        userId: user._id,
                      });
                    } else if (activity.post_type === "neighbour-forum") {
                      props.navigation.navigate("FormPost", {
                        topic: activity.post_id,
                        userId: user._id,
                      });
                    }
                  }}
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
                      Created a{" "}
                      <Text style={{ textTransform: "capitalize" }}>
                        {activity.description}
                      </Text>{" "}
                      post.
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
                      {activity.title}
                    </Text>

                    <Text style={{ ...Fonts.Medium14grey }}>
                      {moment(activity?.createdAt).fromNow()}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.line}></View>
            </View>
          ))}
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
                  Are you sure you want to disconnect from{" "}
                  {connectionDetails.name}
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
                  onPress={handleDisconnect}
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
    marginRight: 15,
    backgroundColor: "white",
    width: 120,
    height: 42,
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
    // marginLeft: 300,
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
    height: 32,
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
