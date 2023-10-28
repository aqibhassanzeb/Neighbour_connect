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
import { addEndorse, getId, removeEndorse } from "../apis/apis";
import { extractDays, extractTime, shortText } from "../utils";

const { width, height } = Dimensions.get("window");

const Losted = ({ navigation, route }) => {
  const { post } = route.params;

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";
  const [id, setId] = useState("");
  const [isEndorsed, setIsEndorsed] = useState(false);
  const [endLoading, setEndLoading] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState("");

  const handleButtonClick = async () => {
    if (isEndorsed) {
      try {
        setEndLoading(true);
        let result = await removeEndorse({ _id: post.skill.posted_by._id });

        if (result.status == 200) {
          setIsEndorsed(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setEndLoading(false);
      }
    } else {
      try {
        setEndLoading(true);
        let result = await addEndorse({ _id: post.skill.posted_by._id });

        if (result.status == 200) {
          setIsEndorsed(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setEndLoading(false);
      }
    }
  };
  function tr(key) {
    return t(`detailsScreen:${key}`);
  }
  const backAction = () => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    const getUserId = async () => {
      const id = await getId();
      setLoggedInUserId(id);
    };
    getUserId();
  }, []);

  useEffect(() => {
    async function getAsyncId() {
      const id = await getId();
      setId(id);
    }
    getAsyncId();
  }, []);
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

  const days = post?.skill?.selected_day;

  const formattedDays = extractDays(days);

  async function handleShowEndorse() {
    let id = await getId();
    let endorsedArray = post.skill.posted_by.endorsed_by;
    let res = endorsedArray.includes(id);
    setIsEndorsed(res);
  }

  useEffect(() => {
    handleShowEndorse();
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
          {post?.skill?.images.map((image) => (
            <View key={image}>
              <Image
                source={{
                  uri: image,
                }}
                style={{ height: height / 2.8, width: width }}
                resizeMode="cover"
              />
            </View>
          ))}
        </Swiper>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: Colors.extraLightGrey }}>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              marginHorizontal: Default.fixPadding * 2,
              paddingBottom: Default.fixPadding * 2,
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
                {post?.skill?.posted_by.name}
              </Text>

              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                  marginTop: Default.fixPadding * 0.5,
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
                    marginLeft: Default.fixPadding * 0.3,
                  }}
                >
                  {post?.skill?.location.name || "No Location"}
                </Text>
              </View>

              <View
                style={{
                  marginVertical: Default.fixPadding * 0.5,
                  alignItems: "center",
                  flexDirection: isRtl ? "row-reverse" : "row",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    ...Fonts.SemiBold14grey,
                    marginHorizontal: Default.fixPadding * 0.3,
                    overflow: "hidden",
                  }}
                >
                  {post?.skill?.skill_level} {post?.skill?.category.name}
                </Text>
              </View>
              {loggedInUserId === post.skill.posted_by._id ? (
                <></>
              ) : (
                <TouchableOpacity
                  disable={isEndorsed === true}
                  style={{
                    backgroundColor: Colors.primary,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: Default.fixPadding * 0.6,
                    paddingVertical: Default.fixPadding * 0.5,
                    paddingHorizontal: Default.fixPadding * 1.2,
                  }}
                  onPress={handleButtonClick}
                >
                  {!endLoading && (
                    <Text style={{ ...Fonts.SemiBold18white }}>
                      {isEndorsed ? "Endorsed " : "Endore"}
                    </Text>
                  )}
                  {endLoading && (
                    <Ionicons
                      name={"refresh-outline"}
                      size={25}
                      color={Colors.white}
                    />
                  )}
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                // flex: 3,
                // flexDirection: isRtl ? "row-reverse" : "row",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 20,
                marginBottom: 40,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Report", {
                    postId: post.skill._id,
                    module: "skill",
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
          </View>

          <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
            <TouchableOpacity
              style={{
                ...Default.shadow,
                backgroundColor: Colors.white,
                borderRadius: 10,
                //   justifyContent: "center",
                // alignItems: "center",
                //  paddingVertical: Default.fixPadding * 3.5,
                paddingTop: 28,
                paddingBottom: 38,
                paddingLeft: 8,

                width: width / 1.1,
                flexDirection: "row",
              }}
            >
              <View>
                <Text
                  style={{
                    ...Fonts.SemiBold16primary,
                    marginBottom: Default.fixPadding * 0.5,
                  }}
                >
                  {" "}
                  <Ionicons
                    name="ios-information-circle"
                    size={20}
                    color="black"
                  />
                  {tr("description")}
                </Text>

                {readMore ? (
                  <Text style={{ ...Fonts.Medium14grey }}>
                    {post.skill.description}
                    <Text
                      style={{ ...Fonts.Medium14primary }}
                      onPress={() => setReadMore((desc) => !desc)}
                    >
                      {" "}
                      {tr("readLess")}
                    </Text>
                  </Text>
                ) : (
                  <Text style={{ ...Fonts.Medium14grey, paddingBottom: 20 }}>
                    {shortText(post.skill.description)}
                    <Text
                      style={{ ...Fonts.Medium14primary }}
                      onPress={() => setReadMore((desc) => !desc)}
                    >
                      {"   "}
                      {tr("readMore")}
                    </Text>
                  </Text>
                )}
                <Text
                  style={{
                    ...Fonts.SemiBold16primary,
                    marginBottom: Default.fixPadding * 0.5,
                  }}
                >
                  <Ionicons name="md-pricetag" size={20} color="black" />

                  {"Price"}
                </Text>
                <Text style={{ ...Fonts.Medium14grey, paddingBottom: 20 }}>
                  RS:{post?.skill?.price_per_hour}/hr
                </Text>
                <Text
                  style={{
                    ...Fonts.SemiBold16primary,
                    marginBottom: Default.fixPadding * 0.5,
                  }}
                >
                  <Ionicons name="md-time" size={20} color="black" />

                  {"Availability"}
                </Text>
                <Text style={{ ...Fonts.Medium14grey }}>
                  {post?.skill?.time}
                </Text>

                <Text style={{ ...Fonts.Medium14grey }}>{formattedDays}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* Chat Screen */}
      {loggedInUserId === post.skill.posted_by._id ? (
        <></>
      ) : (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ChattingScreen", {
              user: {
                recepientId: post.skill.posted_by._id,
                recepientName: post.skill.posted_by.name,
                recepientImage: post.skill.posted_by.image,
                senderId: loggedInUserId,
              },
            })
          }
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            margin: Default.fixPadding * 2,
            paddingVertical: Default.fixPadding * 1.2,
          }}
        >
          <Text style={{ ...Fonts.SemiBold18white }}>{"Message"}</Text>
        </TouchableOpacity>
      )}

      <SnackbarToast
        visible={likeAdd}
        onDismiss={onToggleSnackBarAdd}
        title={tr("added")}
      />
      <SnackbarToast
        visible={likeRemove}
        onDismiss={onToggleSnackBarRemove}
        title={tr("remove")}
      />
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
