import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  StyleSheet,
  Button,
  TextInput,
  Dimensions,
  Image,
  FlatList,
} from "react-native";

import { Video } from "expo-av";
import React, { useEffect, useState } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Swiper from "react-native-swiper";
import { getAllWatches, getId, addHelpful, removeHelpful } from "../apis/apis";
import Loader from "../components/loader";
import { extractDate, extractTime } from "../utils";
const { width, height } = Dimensions.get("window");

const ServicesScreen = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpens, setDropdownOpens] = useState(false);
  const [dropdownOpend, setDropdownOpend] = useState(false);
  const [dropdownOpendd, setDropdownOpendd] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [clicks, setClicks] = useState(false);
  const [click, setClick] = useState(false);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    const getIdFromStorage = async () => {
      const id = await getId();
      setUserId(id);
    };
    getIdFromStorage();
  }, []);

  const handleButtonPress = (buttonValue) => {
    setSelectedValue(buttonValue);
    setDropdownOpen(false);
    setDropdownOpens(false);
    setDropdownOpend(false);
    setDropdownOpendd(false);
  };

  const handlePress = () => {
    setClicked(!clicked);
  };

  const handlePre = () => {
    setClicked(!clicked);
  };

  const handlePres = () => {
    setClicks(!clicked);
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  function tr(key) {
    return t(`SkillShared:${key}`);
  }

  const handleGetWatches = async () => {
    try {
      setIsLoading(true);
      let result = await getAllWatches();
      if (result.status == 200) {
        setPosts(result.data);
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

  const handleHelpfulClick = async (postId) => {
    const updatedPosts = posts.map((post) =>
      post._id === postId
        ? {
            ...post,
            helpful_count: post.helpful_by.includes(userId)
              ? post.helpful_count - 1
              : post.helpful_count + 1,
            helpful_by: post.helpful_by.includes(userId)
              ? post.helpful_by.filter((id) => id !== userId)
              : [...post.helpful_by, userId],
          }
        : post
    );
    setPosts(updatedPosts);

    if (
      !updatedPosts
        .find((post) => post._id === postId)
        .helpful_by.includes(userId)
    ) {
      // If user is marking as helpful, make API call to mark as helpful
      try {
        await removeHelpful({ _id: postId });
      } catch (error) {
        console.error("Error marking post as helpful:", error);
      }
    } else {
      // If user is marking as unhelpful, make API call to mark as unhelpful
      try {
        await addHelpful({ _id: postId });
      } catch (error) {
        console.error("Error marking post as unhelpful:", error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      <ScrollView>
        {isLoading && <Loader />}
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
              {"Neighbor Watch"}
            </Text>
          </View>
          <TouchableOpacity
            //  onPress={() => navigation.navigate("searchScreen")}
            style={{
              ...Default.shadow,
              backgroundColor: Colors.white,
              flexDirection: isRtl ? "row-reverse" : "row",
              borderRadius: 5,
              padding: Default.fixPadding * 0.8,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            <Ionicons name="search" size={20} color={Colors.grey} />
            <TextInput
              style={{
                ...Fonts.SemiBold16grey,
                marginHorizontal: Default.fixPadding * 0.8,
              }}
              placeholder="Search"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.conta}>
          <View style={styles.buttonConta}>
            <View flexDirection="row">
              <Ionicons name="add-circle-outline" size={32} color="white" />

              <Button
                color="#005D7A"
                title="Post Activity"
                onPress={() => navigation.navigate("Suspicious")}
              />
            </View>
          </View>
          <View style={styles.buttonConta}>
            <View flexDirection="row">
              <Ionicons name="list-circle-outline" size={32} color="white" />
              <Button
                color="#005D7A"
                title="My Activities"
                onPress={() => navigation.navigate("Mysus")}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            paddingTop: Default.fixPadding * 2.5,
            paddingLeft: Default.fixPadding * 2.5,
            paddingRight: Default.fixPadding * 5,
            fontWeight: 90,
            paddingBottom: 20,
          }}
        >
          <Text
            style={{
              ...Fonts.Bold16primary,
            }}
          >
            Suspicious Activities
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {posts.length > 0 &&
            posts.map((post) => (
              <View
                key={post._id}
                style={{
                  ...Default.shadow,
                  backgroundColor: Colors.white,
                  borderRadius: 10,
                  marginLeft: 12,
                  marginRight: 12,
                  marginVertical: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                  }}
                >
                  <View
                    style={{
                      // flex: 7,
                      flexDirection: isRtl ? "row-reverse" : "row",
                      marginLeft: 12,
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
                          marginTop: 12,
                          marginLeft: 10,
                        }}
                      >
                        {post.posted_by.name}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => setDropdownOpens(!dropdownOpens)}
                    >
                      <Ionicons
                        name="ellipsis-vertical"
                        size={24}
                        color="black"
                        marginLeft={193}
                        marginTop={10}
                      />
                    </TouchableOpacity>
                    {dropdownOpens && (
                      <View style={styles.dropdown}>
                        <TouchableOpacity
                          style={[
                            styles.dropdownButton,

                            selectedValue === "button1" &&
                              styles.dropdownButtonSelected,
                          ]}
                          onPress={() => navigation.navigate("Report")}
                        >
                          <Ionicons
                            name="flag-outline"
                            size={20}
                            color="black"
                          />
                          <Text style={styles.dropdownButtonText}>Report</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>

                <Text
                  style={{
                    justifyContent: "center",
                    alignItems: isRtl ? "flex-end" : "flex-start",
                    marginTop: 12,
                    marginLeft: 21,
                    marginRight: 21,
                    marginBottom: 4,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  {post.category.name}: {post.title}
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
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Date:
                  </Text>
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
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Time:
                  </Text>
                  <Text style={{ marginLeft: 1, fontSize: 15, marginLeft: 3 }}>
                    {extractTime(post.time)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 18,
                    marginTop: 2,
                    marginBottom: 2,
                  }}
                >
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={24}
                    color="#005D7A"
                  />
                  <Text style={{ marginLeft: 1, fontSize: 15 }}>
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

                <Text style={{ marginLeft: 20, marginTop: 10, fontSize: 15 }}>
                  {post.helpful_count} neighbors found this helpful
                </Text>

                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => handleHelpfulClick(post._id)}
                  >
                    <MaterialCommunityIcons
                      name="thumb-up"
                      size={24}
                      color={
                        post.helpful_by.includes(userId) ? "#005D7A" : "black"
                      }
                      marginLeft={21}
                      marginTop={12}
                    />
                  </TouchableOpacity>

                  <Text
                    style={{
                      justifyContent: "center",
                      alignItems: isRtl ? "flex-end" : "flex-start",
                      marginTop: 12,
                      marginLeft: 10,
                      marginRight: 21,
                      marginBottom: 12,
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Helpful
                  </Text>
                </View>
              </View>
            ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServicesScreen;

const styles = StyleSheet.create({
  conta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 10,
    marginTop: 30,

    marginHorizontal: Default.fixPadding * 1.2,
  },
  buttonConta: {
    width: "49%",
    color: "white",
    padding: Default.fixPadding * 1.2,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  container: {
    // flex: 1,
    //  alignItems: 'center',
    //  justifyContent: 'center',
    //  marginBottom:100
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
  containe: {
    //  flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: 10,
    left: 5,

    //  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    // flex: 1,
    //  alignItems: 'center',
    //  justifyContent: 'center',
    marginBottom: 100,
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
    height: 30,
    fontSize: 10,
    marginLeft: 20,
    zIndex: 7,
    //  marginHorizontal: Default.fixPadding * 2,
  },
  buttonContainer: {
    // width: '60%',
    //color:'white',
    // padding: Default.fixPadding * 1.2,
    borderRadius: 10,

    backgroundColor: Colors.primary,
    zIndex: 7,
  },
  contain: {
    // flex: 1,
    // alignItems: 'center',
    position: "absolute",
    marginLeft: 20,
    justifyContent: "center",
    marginLeft: 93,
    top: -110,
  },
  selectedButton: {
    flexDirection: "row",
    alignItems: "center",
    //  padding: 10,
    // borderWidth: 1,
    borderColor: "gray",
    zIndex: 108,
    marginLeft: 124,
    //borderRadius: 5,
  },
  selectedButtonText: {
    // marginLeft: 10,
    //marginRight: 60,
    zIndex: 100,
  },
  dropdown: {
    //  position: 'absolute',
    top: 30,
    marginRight: 8,
    backgroundColor: "white",
    width: 80,
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
    position: "absolute",
    marginLeft: 140,
    zIndex: 107,
  },
  dropdowns: {
    //  position: 'absolute',
    top: 30,
    marginRight: 13,
    backgroundColor: "white",
    width: 80,
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
    position: "absolute",
    marginLeft: 130,
    zIndex: 107,
  },
  dropdownss: {
    //  position: 'absolute',
    top: 30,
    marginRight: 13,
    backgroundColor: "white",
    width: 80,
    //height:82,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: "absolute",
    marginLeft: 150,
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
});
