import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Button,
  image,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  StyleSheet,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { getAllTopics } from "../apis/apis";
import Loader from "../components/loader";
import { useDispatch, useSelector } from "react-redux";
import { setFilterTopics, setTopics } from "../redux/globalSlice";
import moment from "moment";
import useGetUser from "../components/useGetUser";

const { width } = Dimensions.get("window");
const ChatScreen = (props) => {
  const user = useGetUser();
  const [selectedId, setSelectedId] = useState("");
  const { filteredTopics } = useSelector((state) => state.global);
  const [selectedValue, setSelectedValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpens, setDropdownOpens] = useState(false);
  const [dropdownOpend, setDropdownOpend] = useState(false);
  const [dropdownOpendd, setDropdownOpendd] = useState(false);
  // const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

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
    return t(`chatScreen:${key}`);
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
  function tr(key) {
    return t(`SkillShared:${key}`);
  }

  const handleGetTopics = async () => {
    try {
      setIsLoading(true);
      let result = await getAllTopics();
      if (result.status == 200) {
        dispatch(setTopics(result.data));
        dispatch(setFilterTopics(""));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetTopics();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    dispatch(setFilterTopics(query)); // Dispatch the search query to Redux
  };

  const handleProfilePress = (post) => {
    if (post.posted_by.connections.includes(user._id)) {
      props.navigation.navigate("Profile3", {
        user: post.posted_by,
      });
    } else if (post.posted_by._id == user._id) {
      props.navigation.navigate("profileScreen");
    } else if (user.requests) {
      user.requests.map((req) => {
        if (req.sender === post.posted_by._id) {
          props.navigation.navigate("Profile4", {
            user: {
              sender: {
                _id: post.posted_by._id,
                name: post.posted_by.name,
                image: post.posted_by.image,
              },
            },
          });
        } else {
          return;
        }
      });
    } else {
      props.navigation.navigate("Profile1", {
        user: post.posted_by,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
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
            {"Neighbor Forum"}
          </Text>
        </View>
        <View
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
            placeholder="Search"
            style={{
              flex: 1,
              ...Fonts.SemiBold16grey,
              marginHorizontal: Default.fixPadding * 0.8,
            }}
            onChangeText={handleSearch}
            value={searchQuery}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containr}>
          <View style={styles.buttonContainr}>
            <View flexDirection="row">
              <Ionicons name="add-circle-outline" size={32} color="white" />

              <Button
                color="#005D7A"
                title="Add Discussion"
                onPress={() => props.navigation.navigate("Form2")}
              />
            </View>
          </View>
          <View style={styles.buttonContainr}>
            <View flexDirection="row">
              <Ionicons name="list-circle-outline" size={32} color="white" />
              <Button
                color="#005D7A"
                title="My Discussion"
                onPress={() => props.navigation.navigate("MyDis")}
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
          }}
        >
          <Text
            style={{
              ...Fonts.Bold16primary,
            }}
          >
            Recent Discussions
          </Text>
        </View>
        {filteredTopics.length === 0 && !isLoading && (
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
              <Text>No Result Found</Text>
            </View>
          </TouchableOpacity>
        )}
        {filteredTopics.length > 0 &&
          filteredTopics.map((topic) => (
            <View
              key={topic._id}
              style={{
                ...Default.shadow,
                backgroundColor: Colors.white,
                borderRadius: 10,
                marginLeft: 12,
                marginRight: 12,
                marginTop: 20,
              }}
            >
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                }}
              >
                <TouchableOpacity
                  onPress={() => handleProfilePress(topic)}
                  style={{
                    // flex: 7,
                    flexDirection: isRtl ? "row-reverse" : "row",
                    marginLeft: 12,
                  }}
                >
                  <Image
                    source={{ uri: topic.posted_by.image }}
                    style={{
                      height: 46,
                      width: 46,
                      borderRadius: 75,
                      marginTop: 9,
                      marginRight: 10,
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
                      style={{ ...Fonts.SemiBold16black, overflow: "hidden" }}
                    >
                      {topic.posted_by.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text>
                        <Ionicons name="time-outline" size={15} />
                      </Text>
                      <Text style={{ fontSize: 13 }}>
                        {" "}
                        {moment(topic.createdAt).fromNow()}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <View>
                  {props.route.params.userId !== topic.posted_by._id && (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedId(topic._id);
                        setDropdownOpendd(!dropdownOpendd);
                      }}
                    >
                      <Ionicons
                        name="ellipsis-vertical"
                        size={24}
                        color="black"
                        marginLeft={193}
                        marginTop={10}
                      />
                    </TouchableOpacity>
                  )}
                  {dropdownOpendd && selectedId === topic._id && (
                    <View style={styles.dropdown}>
                      <TouchableOpacity
                        style={[
                          styles.dropdownButton,

                          selectedValue === "button1" &&
                            styles.dropdownButtonSelected,
                        ]}
                        onPress={() =>
                          props.navigation.navigate("Report", {
                            postId: topic._id,
                            module: "neighbour-forum",
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
                {topic.topic}
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
                {topic.description}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Replies", {
                    topic,
                    user,
                  })
                }
              >
                <View style={{ flexDirection: "row" }}>
                  <Ionicons
                    name="md-chatbox-outline"
                    size={23}
                    color="#000"
                    marginLeft={20}
                  />
                  <Text
                    style={{
                      justifyContent: "center",
                      alignItems: isRtl ? "flex-end" : "flex-start",
                      // marginTop:4,
                      marginLeft: 10,
                      marginRight: 21,
                      marginBottom: 12,
                      fontSize: 16,
                      fontWeight: "bold",
                      marginTop: 1,
                    }}
                  >
                    {topic.replies.length} Replies
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatScreen;
const styles = StyleSheet.create({
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
    // marginRight:70,
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
