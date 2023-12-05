import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  FlatList,
  Modal,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Default, Fonts } from "../constants/styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import { useTranslation } from "react-i18next";
import SnackbarToast from "./snackbarToast";
import {
  NeighbourMayKnow,
  acceptRequest,
  connectionRequests,
  rejectRequest,
} from "../apis/apis";
import { useDispatch, useSelector } from "react-redux";
import { handleLoader } from "../redux/loanandfoundSlice";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import Founded from "../screens/Founded";
const { width } = Dimensions.get("window");
import useGetUser from "./useGetUser";
import Empty from "./EmpyMayKnow";
import { setActiveUser } from "../redux/authSlice";

const OngoingTab = (props) => {
  const activeUser = useSelector((state) => state.authReducer.activeUser);
  const user = useSelector((state) => state.authReducer.activeUser?.user);
  const id = user?._id;
  const { t, i18n } = useTranslation();
  const [reqLoader, setReqLoader] = useState(false);
  const [requests, setRequests] = useState([]);
  const [neighboursData, setNeighboursData] = useState([]);
  const [nLoading, setNLoading] = useState(false);
  // const [id, setId] = useState("");
  // const user = useGetUser();

  const isRtl = i18n.dir() == "rtl";
  const [selectedValue, setSelectedValue] = useState("");
  const [dropdownOpend, setDropdownOpend] = useState(false);

  const [dropdownOpends, setDropdownOpends] = useState(false);
  const [dropdownOpendd, setDropdownOpendd] = useState(false);
  const handleButtonPress = (buttonValue) => {
    setSelectedValue(buttonValue);
    setDropdownOpend(false);
    setDropdownOpendd(false);
    setDropdownOpends(false);
  };

  function tr(key) {
    return t(`ongoingTab:${key}`);
  }
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();

  const toggleModal = async (sender_id) => {
    try {
      let accepted = await acceptRequest({ sender_id });
      if (accepted.status == 200) {
        setIsVisible(true);
        handleGetRequests();
        dispatch(
          setActiveUser({ message: "", user: accepted.data.user, token: "" })
        );
      } else {
        alert(accepted.data.error);
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong!");
    } finally {
    }

    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  const [isVisibles, setIsVisibles] = useState(false);

  const toggleModals = () => {
    setIsVisibles(true);

    setTimeout(() => {
      setIsVisibles(false);
    }, 2000);
  };
  const [isVisibless, setIsVisibless] = useState(false);

  const toggleModalss = () => {
    setIsVisibless(true);

    setTimeout(() => {
      setIsVisibless(false);
    }, 2000);
  };

  const [isVisibled, setIsVisibled] = useState(false);

  const toggleModald = async (sender_id) => {
    try {
      let rejected = await rejectRequest({ sender_id });
      if (rejected.status == 200) {
        setIsVisibled(true);
        handleGetRequests();
      } else {
        alert(rejected.data.error);
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong!");
    } finally {
    }

    setTimeout(() => {
      setIsVisibled(false);
    }, 2000);
  };
  const [isVisiblesd, setIsVisiblesd] = useState(false);

  const toggleModalsd = () => {
    setIsVisiblesd(true);

    setTimeout(() => {
      setIsVisiblesd(false);
    }, 2000);
  };

  const [cancelToast, setCancelToast] = useState(false);
  const onToggleSnackBarCancelToast = () => setCancelToast(false);

  const [allClear, setAllClear] = useState(false);

  const handleGetRequests = async () => {
    try {
      setReqLoader(true);
      let result = await connectionRequests();

      if (result.status == 200) {
        setRequests(result.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setReqLoader(false);
    }
  };

  const handleGetNeighbours = async () => {
    try {
      setNLoading(true);
      let result = await NeighbourMayKnow();
      setNLoading(false);
      if (result.status == 200) {
        let filteredYouKnow = [];
        for (const user of result.data) {
          if (requests.length > 0) {
            if (!requests.some((request) => request.sender?._id === user._id)) {
              filteredYouKnow.push(user);
            }
          } else {
            filteredYouKnow = result.data;
          }
        }
        setNeighboursData(filteredYouKnow);
      }
    } catch (error) {
      setNLoading(false);
      console.log(error);
      alert(error.message);
    } finally {
      setNLoading(false);
    }
  };

  const countPending =
    requests &&
    requests.reduce((count, item) => {
      if (item.status === "pending") {
        return count + 1;
      }
      return count;
    }, 0);

  useFocusEffect(
    React.useCallback(() => {
      handleGetRequests();
    }, [])
  );
  useFocusEffect(
    React.useCallback(() => {
      handleGetNeighbours();
    }, [requests])
  );

  // const getId = async () => {
  //   try {
  //     const userData = await AsyncStorage.getItem("userData");
  //     if (userData) {
  //       let parseUserdata = JSON.parse(userData);
  //       setId(parseUserdata.user._id);
  //     }
  //   } catch (error) {
  //     console.log("assyn storage error", error.message);
  //   }
  // };
  // getId();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      {countPending === 0 && (
        <View
          style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            marginTop: 10,
            marginHorizontal: 13,
            marginBottom: 7,
            borderRadius: 10,
            // overflow: "hidden",
            flexDirection: isRtl ? "row-reverse" : "row",
            paddingVertical: Default.fixPadding,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 19,
              color: Colors.grey,
            }}
          >
            No Connection Requests
          </Text>
        </View>
      )}
      {requests &&
        requests.length > 0 &&
        requests.map((req, index) => {
          if (req.status === "pending") {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  props.navigation.navigate("Profile4", {
                    user: req,
                    userId: user._id,
                  })
                }
                style={{
                  ...Default.shadow,
                  backgroundColor: Colors.white,
                  marginTop: 10,
                  marginHorizontal: 13,
                  marginBottom: 7,
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
                  <Image
                    source={{
                      uri: req.sender.image,
                    }}
                    style={{
                      borderRadius: 5,
                      height: 70,
                      width: 70,
                      marginLeft: 36,
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 5,
                    justifyContent: "center",
                    alignItems: isRtl ? "flex-end" : "flex-start",
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.SemiBold15black,
                      overflow: "hidden",
                      marginLeft: 36,
                      marginTop: 20,
                      fontSize: 18,
                    }}
                  >
                    {req.sender.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.SemiBold14grey,
                      overflow: "hidden",
                      marginLeft: 36,
                    }}
                  ></Text>
                  <View
                    style={{
                      marginVertical: Default.fixPadding * 0.3,
                      flexDirection: isRtl ? "row-reverse" : "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        ...Fonts.SemiBold14grey,

                        textAlign: isRtl ? "right" : "left",
                      }}
                    ></Text>
                  </View>
                </View>

                {/* Accept Reject */}
                <View>
                  <View style={styles.contain}>
                    <View style={styles.selectedButton}>
                      <TouchableOpacity
                        onPress={() => toggleModal(req.sender._id)}
                      >
                        <Ionicons
                          name="md-checkmark-circle"
                          size={39}
                          color="#005D7A"
                          marginRight={8}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => toggleModald(req.sender._id)}
                      >
                        <Ionicons
                          name="md-close-circle"
                          size={39}
                          color="#005D7A"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }
        })}

      {/* Modal For Success Accept */}
      <Modal
        visible={isVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
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
                marginLeft: 150,
              }}
            >
              <Ionicons name="person" size={32} color="black" />
              <MaterialCommunityIcons
                name="check"
                size={32}
                color="black"
                style={styles.addIcon}
              />
            </View>
            <View
              style={{
                marginLeft: 113,
              }}
            >
              <Text
                style={{
                  fontSize: 23,
                }}
              >
                Connected
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: Default.fixPadding * 1,
              }}
            >
              <Text
                style={{
                  ...Fonts.SemiBold18primary,
                  marginTop: 12,
                  marginBottom: 26,
                }}
              >
                You both are connected successfully.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isVisibles}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsVisibles(false)}
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
                marginLeft: 150,
              }}
            >
              <Ionicons name="person" size={32} color="black" />
              <MaterialCommunityIcons
                name="check"
                size={32}
                color="black"
                style={styles.addIcon}
              />
            </View>
            <View
              style={{
                marginLeft: 113,
              }}
            >
              <Text
                style={{
                  fontSize: 23,
                }}
              >
                Connected
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: Default.fixPadding * 1,
              }}
            >
              <Text
                style={{
                  ...Fonts.SemiBold18primary,
                  marginTop: 12,
                  marginBottom: 26,
                }}
              >
                You and Jerome Bell are connected successfully.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isVisibless}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsVisibless(false)}
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
                marginLeft: 150,
              }}
            >
              <Ionicons name="person" size={32} color="black" />
              <MaterialCommunityIcons
                name="check"
                size={32}
                color="black"
                style={styles.addIcon}
              />
            </View>
            <View
              style={{
                marginLeft: 113,
              }}
            >
              <Text
                style={{
                  fontSize: 23,
                }}
              >
                Connected
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: Default.fixPadding * 1,
              }}
            >
              <Text
                style={{
                  ...Fonts.SemiBold18primary,
                  marginTop: 12,
                  marginBottom: 26,
                }}
              >
                You and Guy Hawkins are connected successfully.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isVisibled}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsVisibled(false)}
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
                marginLeft: 150,
              }}
            >
              <Ionicons name="person-remove-outline" size={32} color="black" />
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: Default.fixPadding * 1,
              }}
            >
              <Text
                style={{
                  ...Fonts.SemiBold18primary,
                  marginTop: 12,
                  marginBottom: 26,
                }}
              >
                Request Rejected
              </Text>
            </View>
          </View>
        </View>
      </Modal>
      {/* Neighbors */}
      <Text
        style={{
          marginLeft: 23,
          fontSize: 19,
          color: Colors.grey,
          marginTop: 20,
        }}
      >
        Neighbors You May Know
      </Text>
      {neighboursData.length === 0 && !nLoading && (
        <Empty text="No Nearby Connections Found" marginTop={100} />
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        {neighboursData &&
          neighboursData.map((n) => {
            if (n._id === id) {
              return;
            } else {
              return (
                <TouchableOpacity
                  key={n._id}
                  onPress={() =>
                    props.navigation.navigate("Profile1", {
                      user: n,
                      userId: user._id,
                    })
                  }
                  style={{
                    ...Default.shadow,
                    backgroundColor: Colors.white,
                    marginTop: 10,
                    marginHorizontal: 13,
                    marginBottom: 7,
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
                    <Image
                      source={{ uri: n.image }}
                      style={{
                        borderRadius: 5,
                        height: 70,
                        width: 70,
                        marginLeft: 36,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 5,
                      justifyContent: "center",
                      alignItems: isRtl ? "flex-end" : "flex-start",
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        ...Fonts.SemiBold15black,
                        overflow: "hidden",
                        marginLeft: 36,
                        marginTop: 20,
                        fontSize: 18,
                      }}
                    >
                      {n.name}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        ...Fonts.SemiBold14grey,
                        overflow: "hidden",
                        marginLeft: 36,
                      }}
                    ></Text>
                    <View
                      style={{
                        marginVertical: Default.fixPadding * 0.3,
                        flexDirection: isRtl ? "row-reverse" : "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={{
                          ...Fonts.SemiBold14grey,

                          textAlign: isRtl ? "right" : "left",
                        }}
                      ></Text>
                    </View>
                  </View>
                  <View>
                    <View>
                      <View style={styles.contain}>
                        <View style={{ marginLeft: 70 }}></View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OngoingTab;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    //  alignItems: 'center',
    //  justifyContent: 'center',
    marginBottom: 100,
  },
  addIcon: {
    position: "absolute",
    bottom: 2,
    left: 19,
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
    justifyContent: "center",
    marginLeft: 38,
    //  backgroundColor: Colors.primary,
    marginRight: 23,
    borderRadius: 20,
    marginTop: 16,
  },
  selectedButton: {
    flexDirection: "row",
    alignItems: "center",

    // borderWidth: 1,
    borderColor: "gray",
    // marginLeft:86,
    //borderRadius: 5,
  },
  selectedButtonText: {
    //   marginRight: 60,
    color: "white",
  },
  dropdown: {
    //  position: 'absolute',
    top: 1,
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

    height: 42,
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
  text: {
    paddingRight: 23,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
