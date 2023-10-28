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
import { getId } from "../apis/apis";
const { width, height } = Dimensions.get("window");

const Losted = ({ navigation, route }) => {
  const { item, userId } = route.params;
  const [loggedInUserId, setLoggedInUserId] = useState("");

  const { t, i18n } = useTranslation();

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

  const shareMessage = () => {
    Share.share({
      message: "Helping Hand",
    });
  };
  const [like, setLike] = useState(false);

  const [likeRemove, setLikeRemove] = useState(false);
  const onToggleSnackBarRemove = () => setLikeRemove(false);

  const [likeAdd, setLikeAdd] = useState(false);
  const onToggleSnackBarAdd = () => setLikeAdd(false);

  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    async function getAsyncId() {
      const id = await getId();
      setLoggedInUserId(id);
    }
    getAsyncId();
  }, []);
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
            flexDirection: "row",
          }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name={isRtl ? "arrow-forward" : "arrow-back"}
            size={25}
            color={Colors.white}
          />
          <Text
            style={{
              ...Fonts.SemiBold18white,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: Default.fixPadding * 1.2,
            }}
          >
            {item.title}
          </Text>
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
          {item.images.map((image) => (
            <View key={image}>
              <Image
                source={{ uri: image }}
                style={{ height: height / 2.8, width: width }}
                resizeMode="cover"
              />
            </View>
          ))}
        </Swiper>
      </View>
      {/* <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          paddingVertical: Default.fixPadding * 1.6,
          position: "absolute",
        }}
      >
        <View
          style={{
            flex: 8,
            flexDirection: isRtl ? "row-reverse" : "row",
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <TouchableOpacity
            style={{
              alignSelf: isRtl ? "flex-end" : "flex-start",
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name={isRtl ? "arrow-forward" : "arrow-back"}
              size={25}
              color={Colors.white}
            />
          </TouchableOpacity>

          <Text
            style={{
              ...Fonts.SemiBold18white,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: Default.fixPadding * 1.2,
            }}
          >
            {item.title}
          </Text>
        </View>
      </View> */}
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
              <Text
                style={{
                  ...Fonts.SemiBold16black,
                  marginTop: Default.fixPadding * 1.5,
                }}
              >
                {item.title}
              </Text>

              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                  marginTop: Default.fixPadding * 0.5,
                }}
              >
                <Text
                  style={{
                    ...Fonts.SemiBold12grey,
                    marginLeft: Default.fixPadding * 0.3,
                  }}
                >
                  RS {item.price}
                </Text>
              </View>
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginRight: 20,
              }}
            >
              {userId !== item.posted_by._id && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Report", {
                      postId: item._id,
                      module: "sell",
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
                  }}
                >
                  <Ionicons name="ios-flag-outline" size={24} color="black" />
                </TouchableOpacity>
              )}
            </View>
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
                  Address
                </Text>

                <Text
                  style={{
                    overflow: "hidden",
                    paddingLeft: 20,
                    paddingBottom: 30,
                  }}
                >
                  {item.location?.name}
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
                    overflow: "hidden",
                    paddingLeft: 20,
                    paddingBottom: 30,
                  }}
                >
                  {item.description}
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
                    overflow: "hidden",
                    paddingLeft: 20,
                    paddingBottom: 30,
                  }}
                >
                  {item.posted_by?.name}
                </Text>

                <Text
                  style={{
                    ...Fonts.SemiBold15primary,
                    overflow: "hidden",
                    paddingLeft: 20,
                  }}
                >
                  <Ionicons
                    name="ios-folder-open-outline"
                    style={styles.image}
                    size={20}
                    color="black"
                  />
                  Category
                </Text>
                <Text
                  style={{
                    overflow: "hidden",
                    paddingLeft: 20,

                    paddingBottom: 30,
                  }}
                >
                  {item.category?.name}
                </Text>
                <Text
                  style={{
                    ...Fonts.SemiBold15primary,
                    overflow: "hidden",
                    paddingLeft: 20,
                  }}
                >
                  <Ionicons
                    name="pricetag"
                    style={styles.image}
                    size={20}
                    color="black"
                  />
                  Price
                </Text>
                <Text
                  style={{
                    overflow: "hidden",
                    paddingLeft: 20,
                  }}
                >
                  {item.price}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {userId !== item.posted_by._id && (
          <View
            style={{
              marginLeft: 20,
            }}
          >
            <View
              style={{
                marginTop: Default.fixPadding,
              }}
            ></View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ChattingScreen", {
                  user: {
                    recepientId: item.posted_by._id,
                    recepientName: item.posted_by.name,
                    recepientImage: item.posted_by.image,
                    senderId: loggedInUserId,
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

    alignItems: "left",
    paddingBottom: 50,
  },
  container: {
    flexDirection: "row",
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
