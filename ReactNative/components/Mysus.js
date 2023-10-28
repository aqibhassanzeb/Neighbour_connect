import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  BackHandler,
  Modal,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Swiper from "react-native-swiper";
import { Video } from "expo-av";
import { deleteWatch, getWatchesByUser } from "../apis/apis";
import Loader from "./loader";
import { extractDate, extractTime } from "../utils";

const CategoryScreen = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  const [selectedValue, setSelectedValue] = useState("");
  const [dropdownOpend, setDropdownOpend] = useState(false);

  const [dropdownOpends, setDropdownOpends] = useState(false);
  const [dropdownOpendd, setDropdownOpendd] = useState(false);

  const [myWatches, setMyWatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const handleButtonPress = (buttonValue) => {
    setSelectedValue(buttonValue);
    setDropdownOpend(false);
    setDropdownOpendd(false);
    setDropdownOpends(false);
  };

  const [clicked, setClicked] = useState(false);

  const handlePress = () => {
    setClicked(!clicked);
  };
  const { width, height } = Dimensions.get("window");
  const [cancelModal, setCancelModal] = useState(false);

  const [cancelToast, setCancelToast] = useState(false);
  const onToggleSnackBarCancelToast = () => setCancelToast(false);

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

  const handleGetWatches = async () => {
    try {
      setIsLoading(true);
      let result = await getWatchesByUser();
      if (result.status == 200) {
        setMyWatches(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetWatches();
  }, []);

  async function handleDelete() {
    try {
      setCancelModal(false);
      let result = await deleteWatch({ _id: selectedId });
      if (result.status == 200) {
        handleGetWatches();
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      <View
        style={{
          backgroundColor: Colors.primary,
          paddingBottom: 12,
        }}
      >
        <View
          style={{
            paddingVertical: Default.fixPadding * 1.2,
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            backgroundColor: Colors.primary,
            paddingHorizontal: Default.fixPadding * 2,
          }}
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
            {"My Activities"}
          </Text>
        </View>
      </View>
      {isLoading && <Loader />}
      {!isLoading && myWatches.length === 0 && (
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
            <Text>{!isLoading && "No Activity"}</Text>
          </View>
        </TouchableOpacity>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {myWatches.length > 0 &&
          myWatches.map((post) => (
            <View
              key={post._id}
              style={{
                ...Default.shadow,
                backgroundColor: Colors.white,
                borderRadius: 10,
                marginLeft: 12,
                marginRight: 12,
                marginTop: 23,
              }}
            >
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                }}
              >
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                    marginLeft: 12,
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={{ uri: post.posted_by.image }}
                    style={{
                      height: 56,
                      width: 56,
                      borderRadius: 75,
                      marginTop: 9,
                    }}
                    resizeMode="contain"
                  />
                  <View
                    style={{
                      justifyContent: "center",
                      marginLeft: 2,
                      alignItems: isRtl ? "flex-end" : "flex-start",
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        ...Fonts.SemiBold16black,
                        overflow: "hidden",
                        marginLeft: 10,
                      }}
                    >
                      {post.posted_by.name}
                    </Text>
                  </View>
                </View>
              </View>

              <View>
                <View style={styles.contain}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedId(post._id);
                      setDropdownOpend(!dropdownOpend);
                    }}
                  >
                    <Ionicons
                      name="ellipsis-vertical"
                      size={24}
                      color="black"
                      // marginLeft={310}
                      bottom={20}
                      position="absolute"
                      style={{ right: 10 }}
                    />
                    <Text style={styles.selectedButtonText}>
                      {selectedValue}
                    </Text>
                  </TouchableOpacity>

                  {dropdownOpend && selectedId === post._id && (
                    <View
                      style={{
                        marginLeft: 150,
                        zIndex: 9999,
                        position: "absolute",
                        backgroundColor: "white",
                        padding: 10,
                        borderWidth: 0.5,
                        borderColor: "gray",
                      }}
                    >
                      <TouchableOpacity
                        style={[
                          styles.dropdownButton,

                          selectedValue === "button1" &&
                            styles.dropdownButtonSelected,
                        ]}
                        onPress={() => {
                          navigation.navigate("EditsSus", { data: post });
                          setDropdownOpend(false);
                        }}
                      >
                        <Ionicons
                          name="create-outline"
                          size={20}
                          color="black"
                        />
                        <Text style={styles.dropdownButtonText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.dropdownButtons,

                          selectedValue === "button1" &&
                            styles.dropdownButtonSelected,
                        ]}
                        onPress={() => {
                          setCancelModal(true);
                          setSelectedId(post._id);
                          setDropdownOpend(false);
                        }}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={20}
                          color="black"
                        />
                        <Text style={styles.dropdownButtonText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>

              <Text
                style={{
                  justifyContent: "center",
                  alignItems: isRtl ? "flex-end" : "flex-start",

                  marginLeft: 21,
                  marginRight: 21,
                  marginBottom: 4,
                  fontSize: 18,
                  fontWeight: "bold",
                  width: 300,
                }}
              >
                <Text style={{ fontWeight: 400, fontSize: 16 }}>
                  {" "}
                  {post.category.name}:
                </Text>{" "}
                {post.title}
              </Text>
              <Text
                style={{
                  justifyContent: "center",
                  alignItems: isRtl ? "flex-end" : "flex-start",
                  marginTop: 4,
                  marginLeft: 21,
                  marginRight: 21,
                  marginBottom: 12,
                }}
              >
                {post.description}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 21,
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Date:</Text>
                <Text style={{ marginLeft: 1, fontSize: 15, marginLeft: 3 }}>
                  {extractDate(post.date)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 21,
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Time:</Text>
                <Text style={{ marginLeft: 1, fontSize: 15, marginLeft: 3 }}>
                  {extractTime(post.time)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 21,
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                <MaterialCommunityIcons
                  name="map-marker"
                  size={24}
                  color="#005D7A"
                />
                <Text style={{ marginLeft: 1, fontSize: 15, marginBottom: 10 }}>
                  {post.location?.name}
                </Text>
              </View>
              <View style={{ height: height / 2.8, marginHorizontal: 5 }}>
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
                  {post.media.map((media) => {
                    if (media.media_type === "video") {
                      return (
                        <View key={media.source}>
                          <Video
                            source={{ uri: media.source }}
                            style={{ height: height / 2.8 }}
                            useNativeControls
                            resizeMode="contain"
                          />
                        </View>
                      );
                    } else {
                      return (
                        <View key={media.source}>
                          <Image
                            source={{ uri: media.source }}
                            style={{ height: height / 2, width: width }}
                            resizeMode="cover"
                          />
                        </View>
                      );
                    }
                  })}
                </Swiper>
              </View>
              <Text
                style={{
                  marginLeft: 20,
                  marginTop: 10,
                  fontSize: 15,
                  marginBottom: 10,
                }}
              >
                {post.helpful_count} neighbors found its helpful
              </Text>

              {/* <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={handlePress}>
                  <MaterialCommunityIcons
                    name="thumb-up"
                    size={24}
                    color={clicked ? "#005D7A" : "black"}
                    marginLeft={21}
                    marginTop={12}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    justifyContent: "center",
                    alignItems: isRtl ? "flex-end" : "flex-start",
                    marginTop: 16,
                    marginLeft: 10,
                    marginRight: 21,
                    marginBottom: 12,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Helpful
                </Text>
              </View> */}
            </View>
          ))}
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
                  {"Are you sure you want to delete this item?"}
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
                  onPress={handleDelete}
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
    </SafeAreaView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
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
    zIndex: 2,
    justifyContent: "center",
    marginLeft: 48,
  },
  selectedButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    // borderWidth: 1,
    borderColor: "gray",
    marginLeft: 296,
    //borderRadius: 5,
  },
  selectedButtonText: {
    position: "absolute",
    //   marginRight: 60,
  },
  dropdown: {
    //  position: 'absolute',
    top: 1,
    marginLeft: 210,
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
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
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
});
