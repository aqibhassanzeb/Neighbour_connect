import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Button,
  image,
  Image,
  StyleSheet,
  Modal,
  BackHandler,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";

import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { addReply, deleteReply } from "../apis/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { addReplyState, deleteReplyState } from "../redux/globalSlice";

const { width, height } = Dimensions.get("window");

const ChatScreen = (props) => {
  const { topic, user } = props.route.params;
  const { topics } = useSelector((state) => state.global);
  const matchingTopic = topics.find((item) => item._id === topic._id);
  const rep = matchingTopic?.replies;

  const dispatch = useDispatch();

  const [cancelModal, setCancelModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpens, setDropdownOpens] = useState(false);
  const [dropdownOpend, setDropdownOpend] = useState(false);
  const [dropdownOpendd, setDropdownOpendd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState("");

  const [text, setText] = useState("");

  const handleButtonPress = (buttonValue) => {
    setSelectedValue(buttonValue);
    setDropdownOpen(false);
    setDropdownOpens(false);
    setDropdownOpend(false);
    setDropdownOpendd(false);
  };

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";
  const [modalVisible, setModalVisible] = useState(false);

  const handleReport = () => {
    setModalVisible(false);
  };

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

  async function handleReply() {
    if (!text) {
      alert("Please write something");
    } else {
      try {
        setIsLoading(true);

        let response = await addReply({
          id: topic._id,
          text,
        });
        if (response.status === 201) {
          dispatch(
            addReplyState({
              topicId: topic._id,
              reply: {
                _id: response.data.id,
                text,
                reply_by: { _id: user._id, name: user.name, image: user.image },
              },
            })
          );
          setText("");
        }
      } catch (error) {
        console.log("Error While Replying", error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function handleDelete(replyId) {
    try {
      setDropdownOpens(false);
      setCancelModal(false);
      let result = await deleteReply({ forumId: topic._id, replyId });
      if (result.status == 200) {
        dispatch(
          deleteReplyState({
            topicId: topic._id,
            replyId,
          })
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  const handleProfilePress = (post) => {
    if (post.reply_by.connections.includes(user._id)) {
      props.navigation.navigate("Profile3", {
        user: post.reply_by,
      });
    } else if (post.reply_by._id == user._id) {
      props.navigation.navigate("profileScreen");
    } else if (user.requests) {
      user.requests.map((req) => {
        if (req.sender === post.reply_by._id) {
          props.navigation.navigate("Profile4", {
            user: {
              sender: {
                _id: post.reply_by._id,
                name: post.reply_by.name,
                image: post.reply_by.image,
              },
            },
          });
        } else {
          return;
        }
      });
    } else {
      props.navigation.navigate("Profile1", {
        user: post.reply_by,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View
        style={{
          paddingVertical: Default.fixPadding * 1.2,
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          backgroundColor: Colors.primary,
        }}
      >
        <View
          style={{
            flex: 9,
            flexDirection: isRtl ? "row-reverse" : "row",
            marginHorizontal: Default.fixPadding * 2,
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
            Replies
          </Text>
        </View>
      </View>
      <ScrollView>
        <View>
          {rep &&
            rep.map((reply) => (
              <View
                key={reply._id}
                style={{
                  borderRadius: 10,

                  marginRight: 12,
                  marginTop: 25,
                }}
              >
                <TouchableOpacity
                  onPress={() => handleProfilePress(reply)}
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                  }}
                >
                  <View
                    style={{
                      flexDirection: isRtl ? "row-reverse" : "row",
                      marginLeft: 6,
                    }}
                  >
                    <Image
                      source={{ uri: reply.reply_by.image }}
                      style={{
                        height: 46,
                        width: 46,
                        borderRadius: 75,
                        marginTop: 9,
                        marginHorizontal: 14,
                      }}
                      resizeMode="contain"
                    />
                    <View
                      style={{
                        justifyContent: "center",
                        marginLeft: 2,
                        alignItems: isRtl ? "flex-end" : "flex-start",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={{
                          ...Fonts.SemiBold16black,
                          overflow: "hidden",
                        }}
                      >
                        {reply.reply_by.name}
                      </Text>
                      {user._id === reply.reply_by._id && (
                        <TouchableOpacity
                          onPress={() => {
                            setDropdownOpens(!dropdownOpens);
                            setSelectedId(reply._id);
                          }}
                        >
                          <Ionicons
                            name="ellipsis-vertical"
                            size={24}
                            color="black"
                            // marginLeft={179}
                            marginTop={10}
                          />
                        </TouchableOpacity>
                      )}
                      {dropdownOpens && selectedId === reply._id && (
                        <View style={styles.dropdowns}>
                          <TouchableOpacity
                            style={[
                              styles.dropdownButton,

                              selectedValue === "button1" &&
                                styles.dropdownButtonSelected,
                            ]}
                            onPress={() => {
                              handleDelete(reply._id);
                            }}
                          >
                            <Ionicons
                              name="trash-outline"
                              size={20}
                              color="black"
                            />
                            <Text style={styles.dropdownButtonText}>
                              Delete
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setDropdownOpen(!dropdownOpen);
                        setSelected(reply._id);
                      }}
                    >
                      <Ionicons
                        name="ellipsis-vertical"
                        size={24}
                        color="black"
                        marginLeft={219}
                      />
                    </TouchableOpacity>
                    {dropdownOpen && reply._id === selected && (
                      <View style={styles.dropdownss}>
                        <TouchableOpacity
                          style={[
                            styles.dropdownButton,
                            selectedValue === "button1" &&
                              styles.dropdownButtonSelected,
                          ]}
                          onPress={() =>
                            props.navigation.navigate("Report", {
                              postId: topic._id,
                              replyId: reply._id,
                              module: "neighbour-forum",
                            })
                          }
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
                </TouchableOpacity>

                <Text
                  style={{
                    justifyContent: "center",
                    alignItems: isRtl ? "flex-end" : "flex-start",

                    marginLeft: 85,
                    marginBottom: 12,
                  }}
                >
                  {reply.text}{" "}
                </Text>
              </View>
            ))}
        </View>

        <View
          style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            flexDirection: isRtl ? "row-reverse" : "row",
            borderRadius: 5,
            padding: Default.fixPadding * 0.8,
            marginHorizontal: Default.fixPadding * 2,
            borderWidth: 1,
            borderColor: "gray",
            marginTop: 14,
          }}
        >
          <TextInput
            placeholder="Write Something ..."
            style={{
              ...Fonts.SemiBold16grey,
              marginHorizontal: Default.fixPadding * 0.8,
              flex: 1,
            }}
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <TouchableOpacity
            style={{
              backgroundColor: isLoading ? "white" : Colors.primary,
              padding: Default.fixPadding * 1,
              borderWidth: isLoading ? 1 : 0,
              borderRadius: 10,
            }}
            onPress={() => handleReply()}
          >
            <Text style={{ color: isLoading ? "gray" : "white" }}>Reply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal animationType="fade" transparent={true} visible={cancelModal}>
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
                  {"Are you sure you want to delete this reply?"}
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
                    setCancelModal(false);
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

export default ChatScreen;
const styles = StyleSheet.create({
  container: {
    marginBottom: 100,
  },
  border: {
    backgroundColor: Colors.primary,
    width: 115,
    height: 30,
    bottom: 14,

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

    height: 30,
    fontSize: 10,
    marginLeft: 20,
    zIndex: 7,
  },
  buttonContainer: {
    borderRadius: 10,

    backgroundColor: Colors.primary,
    zIndex: 7,
  },
  contain: {
    position: "absolute",
    marginLeft: 20,
    justifyContent: "center",
    marginLeft: 93,
    top: -110,
  },
  selectedButton: {
    flexDirection: "row",
    alignItems: "center",

    borderColor: "gray",
    zIndex: 108,
    marginLeft: 124,
  },
  selectedButtonText: {
    zIndex: 100,
  },
  dropdown: {
    top: 30,
    marginRight: 8,
    backgroundColor: "white",
    width: 80,

    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    position: "absolute",
    marginLeft: 140,
    zIndex: 107,
  },
  dropdowns: {
    top: 30,
    marginRight: 13,
    backgroundColor: "white",
    width: 80,

    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    position: "absolute",
    marginLeft: 130,
    zIndex: 107,
  },
  dropdownss: {
    top: 20,
    marginRight: 13,
    backgroundColor: "white",
    width: 80,

    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    position: "absolute",
    marginLeft: 170,
    zIndex: 107,
  },
  dropdownButton: {
    zIndex: 107,
    flexDirection: "row",
    alignItems: "center",

    height: 42,
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
  },
});
