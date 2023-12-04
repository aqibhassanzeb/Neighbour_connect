import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
  Share,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useTranslation } from "react-i18next";
import Stars from "react-native-stars";
import SnackbarToast from "../components/snackbarToast";
import Swiper from "react-native-swiper";
import ChatScreen from "../screens/chatScreen";
import { getId, lostItemGet } from "../apis/apis";
import { handleLoaderforOne } from "../redux/loanandfoundSlice";
import Loader from "../components/loader";
import { extractDate } from "../utils";
import { useSelector } from "react-redux";
const { width, height } = Dimensions.get("window");

const Losted = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.authReducer.activeUser.user);
  const { data } = route.params;

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`detailsScreen:${key}`);
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

  function profileNavigation(userId, userInfo) {
    if (userId === user._id) {
      navigation.navigate("profileScreen");
    } else if (user.connections.includes(userId)) {
      navigation.navigate("Profile3", { user: userInfo });
    } else if (
      user.requests &&
      user.requests.some((req) => req.sender === userId)
    ) {
      navigation.navigate("Profile4", {
        user: {
          sender: {
            _id: userId,
            name: userInfo.name,
            image: userInfo.image,
          },
        },
      });
    } else {
      navigation.navigate("Profile1", { user: userInfo });
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      <View
        style={{
          paddingVertical: Default.fixPadding * 1.2,
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          backgroundColor: Colors.primary,
        }}
      >
        <TouchableOpacity
          style={{
            marginLeft: Default.fixPadding * 2,
            flex: 1,
          }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name={isRtl ? "arrow-forward" : "arrow-back"}
            size={25}
            color={Colors.white}
          />
        </TouchableOpacity>
        <View style={{}}></View>
      </View>

      <View style={{ height: height / 2.8 }}>
        <Swiper
          dot={
            <View
              style={{
                backgroundColor: Colors.white,
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: Default.fixPadding * 0.3,
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: Colors.primary,
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: Default.fixPadding * 0.3,
              }}
            />
          }
          paginationStyle={{
            marginBottom: Default.fixPadding,
            bottom: 0,
          }}
          loop={true}
        >
          {data &&
            data.gallary_images.map((elm, index) => (
              <View key={index}>
                <Image
                  source={{ uri: elm }}
                  style={{ height: height / 2.8, width: width }}
                  resizeMode="cover"
                />
              </View>
            ))}
        </Swiper>
      </View>
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          paddingVertical: Default.fixPadding * 1.6,
          position: "absolute",
        }}
      >
        <View
          style={{
            flex: 2,
            flexDirection: isRtl ? "row-reverse" : "row",
            marginHorizontal: Default.fixPadding * 2,
          }}
        ></View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: Colors.extraLightGrey }}>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              marginHorizontal: Default.fixPadding * 2,
              paddingBottom: Default.fixPadding * 2,
              paddingBottom: 30,
            }}
          >
            <View
              style={{ flex: 7, alignItems: isRtl ? "flex-end" : "flex-start" }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  alignItems: "center",
                  gap: 10,
                }}
                onPress={() =>
                  profileNavigation(data?.posted_by._id, data?.posted_by)
                }
              >
                <Image
                  source={{ uri: data?.posted_by?.image }}
                  style={{ width: 40, height: 40, borderRadius: 50 }}
                />
                <Text
                  style={{
                    ...Fonts.SemiBold16black,
                  }}
                >
                  {data?.posted_by?.name}
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                  marginTop: Default.fixPadding * 0.5,
                  marginLeft: 10,
                  marginTop: 10,
                }}
              >
                <SimpleLineIcons
                  name="location-pin"
                  size={15}
                  color={Colors.grey}
                />
                <Text
                  style={{
                    ...Fonts.SemiBold12grey,
                    marginLeft: Default.fixPadding * 0.5,
                  }}
                >
                  {data && data?.location?.name}
                </Text>
              </View>
            </View>

            {user._id !== data?.posted_by?._id && (
              <View
                style={{
                  // flex: 3,
                  // flexDirection: isRtl ? "row-reverse" : "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Report", {
                      postId: data._id,
                      module: "lost_found",
                    })
                  }
                  style={{
                    ...Default.shadow,
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    backgroundColor: Colors.white,
                    justifyContent: "center",
                    alignItems: "center",
                    //  marginHorizontal: Default.fixPadding * 1.5,
                  }}
                >
                  <Ionicons name="ios-flag-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View
            style={{
              marginHorizontal: Default.fixPadding * 2,
              ...Default.shadow,
            }}
          >
            <TouchableOpacity
              style={{
                ...Default.shadow,
                backgroundColor: Colors.white,
                borderRadius: 10,
                //   justifyContent: "center",
                // alignItems: "center",
                //  paddingVertical: Default.fixPadding * 3.5,
                paddingTop: 38,
                paddingBottom: 38,
                paddingLeft: 10,

                width: width / 1.1,
                flexDirection: "row",
              }}
            >
              <View>
                <Text
                  style={{
                    ...Fonts.SemiBold15primary,
                    overflow: "hidden",
                    paddingLeft: 20,
                  }}
                >
                  <Ionicons
                    name="location"
                    style={styles.image}
                    size={20}
                    color="black"
                  />
                  Location
                </Text>

                <Text
                  style={{
                    //  ...Fonts.SemiBold15primary,
                    overflow: "hidden",
                    paddingLeft: 20,
                    paddingBottom: 30,
                  }}
                >
                  {data && data.location?.name}
                </Text>
                <Text
                  style={{
                    ...Fonts.SemiBold15primary,
                    overflow: "hidden",
                    paddingLeft: 10,
                  }}
                >
                  {" "}
                  <Ionicons
                    name="ios-information-circle"
                    size={20}
                    color="black"
                  />
                  Description
                </Text>
                <Text
                  style={{
                    //  ...Fonts.SemiBold15primary,
                    overflow: "hidden",
                    paddingLeft: 20,
                    paddingBottom: 30,
                  }}
                >
                  {data?.description}
                </Text>
                <Text
                  style={{
                    ...Fonts.SemiBold15primary,
                    overflow: "hidden",
                    paddingLeft: 20,
                  }}
                >
                  <Ionicons
                    name="checkmark-circle-outline"
                    style={styles.image}
                    size={20}
                    color="green"
                  />
                  Posted By
                </Text>
                <Text
                  style={{
                    //  ...Fonts.SemiBold15primary,
                    overflow: "hidden",
                    paddingLeft: 20,
                    paddingBottom: 30,
                  }}
                >
                  {data?.posted_by?.name}
                </Text>
                <Text
                  style={{
                    ...Fonts.SemiBold15primary,
                    overflow: "hidden",
                    paddingLeft: 20,
                  }}
                >
                  <Ionicons
                    name="calendar-outline"
                    style={styles.image}
                    size={20}
                    color="black"
                  />{" "}
                  Date
                </Text>
                <Text
                  style={{
                    //  ...Fonts.SemiBold15primary,
                    overflow: "hidden",
                    paddingLeft: 20,
                    paddingBottom: 30,
                  }}
                >
                  {extractDate(JSON.parse(data?.date))}
                </Text>
                <Text
                  style={{
                    ...Fonts.SemiBold15primary,
                    overflow: "hidden",
                    paddingLeft: 20,
                  }}
                >
                  <Ionicons
                    name="document-text-outline"
                    style={styles.image}
                    size={20}
                    color="black"
                  />
                  Item
                </Text>
                <Text
                  style={{
                    //  ...Fonts.SemiBold15primary,
                    overflow: "hidden",
                    paddingLeft: 20,
                  }}
                >
                  {data?.title}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {user._id !== data?.posted_by?._id && (
          <View
            style={{
              marginLeft: 20,
            }}
          >
            <View
              style={{
                // flexDirection: isRtl ? "row-reverse" : "row",
                //   justifyContent: "space-between",
                // marginHorizontal: Default.fixPadding * 2,
                //     marginBottom: Default.fixPadding * 2,
                marginTop: Default.fixPadding,
              }}
            ></View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ChattingScreen", {
                  user: {
                    recepientId: data.posted_by._id,
                    recepientName: data.posted_by.name,
                    recepientImage: data.posted_by.image,
                    senderId: user._id,
                  },
                })
              }
              style={{
                backgroundColor: Colors.primary,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 2,
                marginRight: 18,
                paddingVertical: Default.fixPadding * 1.2,
                marginBottom: 10,
              }}
            >
              <Text style={{ ...Fonts.SemiBold18white }}>{"Message"}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Losted;

const styles = StyleSheet.create({
  containe: {
    borderRadius: 20,
    //flex: 1,
    //   justifyContent: 'flex-end',
    alignItems: "left",
    paddingBottom: 50,

    //
  },
  container: {
    flexDirection: "row",
    //  alignItems: 'center',
    //  justifyContent: 'center',
    //  marginVertical: 10,
  },
  image: {},
  text: {
    flex: 1,
  },

  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  info: {
    fontSize: 16,
    marginTop: 5,
  },
});
