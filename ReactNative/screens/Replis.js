import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Button,
  image,
  Image,
  Dimensions,
  Modal,
  StyleSheet,
  BackHandler,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";

import * as ImagePicker from "expo-image-picker";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";

const ChatScreen = (props) => {
  const [selectedId, setSelectedId] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [dropdownOpens, setDropdownOpens] = useState(false);
  const [dropdownOpend, setDropdownOpend] = useState(false);

  const [dropdownOpendd, setDropdownOpendd] = useState(false);

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";
  const [modalVisible, setModalVisible] = useState(false);

  const handleReport = () => {
    // Handle the report functionality here
    setModalVisible(false);
  };

  const { width, height } = Dimensions.get("window");
  const [cancelModal, setCancelModal] = useState(false);

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
        <View
          style={{
            //   ...Default.shadow,
            //  backgroundColor: Colors.white,
            borderRadius: 10,
            //    marginLeft:12,
            marginRight: 12,
            marginTop: 25,
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
                marginLeft: 6,
              }}
            >
              <Image
                source={require("../assets/images/dp4.jpg")}
                style={{
                  height: 46,
                  width: 66,
                  borderRadius: 33,
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
                  style={{ ...Fonts.SemiBold16black, overflow: "hidden" }}
                >
                  Linta Khan
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={() => setDropdownOpen(!dropdownOpen)}>
                <Ionicons
                  name="ellipsis-vertical"
                  size={24}
                  color="black"
                  marginLeft={215}
                />
              </TouchableOpacity>
              {dropdownOpen && (
                <View style={styles.dropdownsss}>
                  <TouchableOpacity
                    style={[
                      styles.dropdownButton,

                      selectedValue === "button1" &&
                        styles.dropdownButtonSelected,
                    ]}
                    onPress={() => props.navigation.navigate("Report")}
                  >
                    <Ionicons name="flag-outline" size={20} color="black" />
                    <Text style={styles.dropdownButtonText}>Report</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.dropdownButton,

                      selectedValue === "button1" &&
                        styles.dropdownButtonSelected,
                    ]}
                    onPress={() => {
                      setCancelModal(true);
                      //  setSelectedId(item.key);
                    }}
                  >
                    <Ionicons name="trash-outline" size={20} color="black" />
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
              //  marginTop:4,
              marginLeft: 70,
              marginRight: 21,
              marginBottom: 12,
              width: 270,
            }}
          >
            Nest Cam Indoor - This popular security camera system allows you to
            monitor your home from your smartphone or computer. It offers 24/7
            live video streaming, two-way audio, and motion and sound alerts.{" "}
          </Text>
        </View>
        <View
          style={{
            //   ...Default.shadow,
            //  backgroundColor: Colors.white,
            borderRadius: 10,
            //    marginLeft:12,
            marginRight: 12,
            marginTop: 25,
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
                marginLeft: 6,
              }}
            >
              <Image
                source={require("../assets/images/dp5.jpg")}
                style={{
                  height: 46,
                  width: 66,
                  borderRadius: 33,
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
                  style={{ ...Fonts.SemiBold16black, overflow: "hidden" }}
                >
                  Fatima Mujtaba
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
                  marginLeft={176}
                />
              </TouchableOpacity>
              {dropdownOpens && (
                <View style={styles.dropdownss}>
                  <TouchableOpacity
                    style={[
                      styles.dropdownButton,

                      selectedValue === "button1" &&
                        styles.dropdownButtonSelected,
                    ]}
                    onPress={() => props.navigation.navigate("Report")}
                  >
                    <Ionicons name="flag-outline" size={20} color="black" />
                    <Text style={styles.dropdownButtonText}>Report</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.dropdownButton,

                      selectedValue === "button1" &&
                        styles.dropdownButtonSelected,
                    ]}
                    onPress={() => {
                      setCancelModal(true);
                      //  setSelectedId(item.key);
                    }}
                  >
                    <Ionicons name="trash-outline" size={20} color="black" />
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
              //  marginTop:4,
              marginLeft: 70,
              marginRight: 21,
              marginBottom: 12,
              width: 230,
            }}
          >
            Yes! I have security camera system in my house.{" "}
          </Text>
        </View>
      </ScrollView>
      <View style={{ flex: 1 }}>
        {Platform.OS === "android" && (
          <KeyboardAvoidingView behavior="position" />
        )}
      </View>

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
                  {"Are you sure you want to delete this?"}
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
                  //  onPress={() => setCancelModal(false)}
                  style={{
                    ...Default.shadow,
                    backgroundColor: Colors.primary,
                    flex: 1,
                    paddingVertical: Default.fixPadding * 1.2,
                    borderBottomLeftRadius: isRtl ? 0 : 10,
                    borderBottomRightRadius: isRtl ? 10 : 0,
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
    marginLeft: 120,
    zIndex: 107,
  },
  dropdownss: {
    //  position: 'absolute',
    top: 20,
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
  dropdownsss: {
    //  position: 'absolute',
    top: 20,
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
    marginLeft: 170,
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
