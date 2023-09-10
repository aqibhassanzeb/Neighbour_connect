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

const ServicesScreen = ({ navigation, route }) => {
  const { item: data } = route.params;
  const [item, setItem] = useState(data);
  console.log({ item });
  const [selectedValue, setSelectedValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpens, setDropdownOpens] = useState(false);
  const [dropdownOpend, setDropdownOpend] = useState(false);
  const [dropdownOpendd, setDropdownOpendd] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [clicks, setClicks] = useState(false);
  const [click, setClick] = useState(false);

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState(posts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  const backAction = () => {
    navigation.goBack();
    return true;
  };

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

  useEffect(() => {
    const getIdFromStorage = async () => {
      const id = await getId();
      setUserId(id);
    };
    getIdFromStorage();
  }, []);

  const handleHelpfulClick = async () => {
    const updatedState = { ...item };
    if (updatedState.isHelpful) {
      updatedState.helpful_count -= 1;
      await removeHelpful({ _id: item._id });
    } else {
      updatedState.helpful_count += 1;
      await addHelpful({ _id: item._id });
    }
    updatedState.isHelpful = !updatedState.isHelpful;
    setItem(updatedState);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      <ScrollView>
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
            Suspicious Activity
          </Text>
        </View>
        <View
          key={item._id}
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
                source={{ uri: item.posted_by.image }}
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
                  {item.posted_by.name}
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
                    onPress={() =>
                      navigation.navigate("Report", {
                        postId: item._id,
                        module: "lost & found",
                      })
                    }
                  >
                    <Ionicons name="flag-outline" size={20} color="black" />
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
            {item.category.name}: {item.title}
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
            {item.description}
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
              {extractDate(item.date)}
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
              {extractTime(item.time)}
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
              {item?.location?.name}
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
              {item.media.map((media) => {
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
            {item.helpful_count} neighbors found this helpful
          </Text>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => handleHelpfulClick(item._id)}>
              <MaterialCommunityIcons
                name="thumb-up"
                size={24}
                color={item.helpful_by.includes(userId) ? "#005D7A" : "black"}
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
