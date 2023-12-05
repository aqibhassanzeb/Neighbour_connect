import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  StyleSheet,
  BackHandler,
} from "react-native";

import React, { useState, useEffect } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { lostItemGet, lostandfoundUpdate } from "../apis/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/loader";
import { formatText, hasPassed15Minutes } from "../utils";
import BreadCrumbs from "../components/BreadCrumbs";
import Empty from "../components/Empty";

const { width, height } = Dimensions.get("window");

const Lostss = ({ navigation }) => {
  const [cancelModal, setCancelModal] = useState(false);

  const [cancelToast, setCancelToast] = useState(false);
  const onToggleSnackBarCancelToast = () => setCancelToast(false);
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`Lostss:${key}`);
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

  const [allClear, setAllClear] = useState(false);
  const [search, setSearch] = useState();
  const [selectedId, setSelectedId] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpens, setDropdownOpens] = useState(false);
  const [dropdownOpend, setDropdownOpend] = useState(false);
  const [setselectedEditId, setSetselectedEditId] = useState("");
  const [dropdownOpendd, setDropdownOpendd] = useState(false);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [userId, setUserId] = useState("");

  const handleButtonPress = (buttonValue) => {
    setSelectedValue(buttonValue);
    setDropdownOpen(false);
    setDropdownOpens(false);
    setDropdownOpend(false);
    setDropdownOpendd(false);
  };

  const truncateString = (str) => {
    const words = str.split(" ");
    const truncated = words.slice(0, 2).join(" ");
    return words.length > 2 ? truncated + "..." : truncated;
  };

  const handleGetitem = async () => {
    try {
      setLoader(true);
      let paylaod = {};
      const userData = await AsyncStorage.getItem("userData");
      const parseUserdata = userData && JSON.parse(userData);
      paylaod.posted_by = parseUserdata.user._id;
      let result = await lostItemGet(paylaod);

      if (result.status == 200) {
        // console.log("result in yourlist :",result.data)
        setData(result.data.data);
      }
    } catch (error) {
      alert("something went wrong!");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    handleGetitem();
  }, []);

  const handleUpdate = async () => {
    setCancelModal(false);
    try {
      setLoader(true);
      let paylaod = { _id: setselectedEditId, mark_found: true };
      let result = await lostandfoundUpdate(paylaod);
      if (result.status == 200) {
        navigation.navigate("lostTabt");
      } else {
        alert(result.data.error);
      }
    } catch (error) {
      alert("something went wrong!");
    } finally {
      setLoader(false);
    }
  };

  const handleGetuser = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let userInformation = JSON.parse(userData);
      setUserId(userInformation?.user._id);
    } catch (error) {
      console.log("error ;", error);
    }
  };

  useEffect(() => {
    handleGetuser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      {loader && <Loader />}
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
          {"My Activites"}
        </Text>
      </View>
      <BreadCrumbs>
        <AntDesign name="right" size={18} color="#9ca3af" />
        <TouchableOpacity
          onPress={() => navigation.navigate("lostTabt")}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <Text> Lost & Found</Text>
        </TouchableOpacity>
        <AntDesign name="right" size={18} color="#9ca3af" />
        <Text
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            color: Colors.primary,
            fontWeight: "bold",
          }}
        >
          My Activities
        </Text>
      </BreadCrumbs>
      <ScrollView showsVerticalScrollIndicator={false}>
        {allClear ? null : <></>}

        {!loader && data.length === 0 && (
          <Empty text="No Activities yet. Start posting!" marginTop={250} />
        )}
        {!loader && data.length > 0 && <View style={{ marginBottom: 30 }} />}
        {!loader &&
          data.length > 0 &&
          data.map((elm) => (
            <View
              style={{
                marginLeft: 20,
              }}
              key={elm._id}
            >
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Losted", {
                      data: elm,
                    })
                  }
                  style={{
                    ...Default.shadow,
                    paddingVertical: 10,
                    marginBottom: 10,
                    paddingLeft: 5,
                    width: 385,
                    flexDirection: "row",
                    backgroundColor: "white",
                    borderRadius: 10,
                  }}
                >
                  <Image
                    source={{ uri: elm.gallary_images[0] }}
                    style={{ height: 85, width: 75, ...Default.shadow }}
                  />
                  <View>
                    <Text
                      style={{
                        ...Fonts.SemiBold15primary,
                        overflow: "hidden",
                        paddingLeft: 20,
                        fontWeight: "bold",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "900",
                        //   height:32,
                        fontSize: 20,
                        color: "black",
                        marginRight: 120,
                      }}
                    >
                      {elm.title}
                    </Text>
                    <Text
                      style={{
                        ...Fonts.SemiBold15primary,
                        overflow: "hidden",
                        paddingLeft: 20,
                        marginVertical: 2,
                      }}
                    >
                      {truncateString(elm.description)}
                    </Text>
                    <Text
                      style={{
                        overflow: "hidden",
                        paddingLeft: 20,
                        width: 250,
                        marginBottom: 10,
                      }}
                    >
                      {formatText(elm?.location?.name)}
                    </Text>

                    {elm.type == "lost" && (
                      <View style={styles.container}>
                        <View style={styles.buttonContainer}>
                          <View
                            style={{
                              flex: 2.5,
                              justifyContent: "center",
                              marginHorizontal: Default.fixPadding,
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                if (elm.mark_found != true) {
                                  setCancelModal(true);
                                  setSetselectedEditId(elm._id);
                                }
                              }}
                            >
                              <Text
                                numberOfLines={1}
                                style={{
                                  ...Fonts.SemiBold15white,
                                  textAlign: "center",
                                  overflow: "hidden",
                                }}
                              >
                                {elm.mark_found == true
                                  ? "Founded "
                                  : "Mark As Recovered"}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>

                  <View style={styles.contain}>
                    {!hasPassed15Minutes(elm.createdAt) && (
                      <TouchableOpacity
                        style={styles.selectedButton}
                        onPress={() => {
                          setSetselectedEditId(elm._id);
                          setDropdownOpend(!dropdownOpend);
                        }}
                      >
                        <Ionicons
                          name="ellipsis-vertical"
                          size={24}
                          color="black"
                        />
                        <Text style={styles.selectedButtonText}>
                          {selectedValue}
                        </Text>
                      </TouchableOpacity>
                    )}

                    {dropdownOpend && setselectedEditId == elm._id && (
                      <View style={styles.dropdown}>
                        <TouchableOpacity
                          style={[
                            styles.dropdownButton,
                            selectedValue === "button1" &&
                              styles.dropdownButtonSelected,
                          ]}
                          onPress={() => {
                            navigation.navigate("EditLostAndFound", {
                              data: elm,
                            }),
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
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}

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
                    {"Are you sure you want to mark this item as recovered?"}
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
                    onPress={() => handleUpdate()}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Lostss;
const styles = StyleSheet.create({
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
    //  marginHorizontal: Default.fixPadding * 2,
  },
  buttonContainer: {
    // width: '60%',
    //color:'white',
    // padding: Default.fixPadding * 1.2,
    borderRadius: 10,

    backgroundColor: Colors.primary,
  },
  contain: {
    // flex: 1,
    // alignItems: 'center',
    position: "absolute",
    marginLeft: 250,
    justifyContent: "center",
    top: 55,
  },
  selectedButton: {
    flexDirection: "row",
    alignItems: "center",
    //  padding: 10,
    // borderWidth: 1,
    borderColor: "gray",

    marginLeft: 70,
    //borderRadius: 5,
  },
  selectedButtonText: {
    // marginLeft: 10,
    //marginRight: 60,
  },
  dropdown: {
    //  position: 'absolute',
    top: 1,
    marginRight: 8,
    backgroundColor: Colors.extraLightGrey,
    width: 80,
    //height:82,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // marginRight:70,

    marginLeft: 40,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    height: 42,
  },
  dropdownButtonSelected: {
    backgroundColor: "gray",
  },
  dropdownButtonText: {
    marginRight: 20,
  },
  dropdownButtons: {
    flexDirection: "row",
    alignItems: "center",
    top: 10,
    height: 42,
    //   padding: 10,
    //  borderWidth: 1,
    //  borderColor: 'gray',
    //  borderBottomWidth: 1,
  },
});
