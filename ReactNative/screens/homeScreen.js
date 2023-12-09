import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  // ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Dimensions,
  DrawerLayoutAndroid,
  FlatList,
  Animated,
  PanResponder,
  StatusBar,
  DevSettings,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native-virtualized-view";
import { Colors, Default, Fonts, WindowWidth } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useTranslation } from "react-i18next";
import Stars from "react-native-stars";

import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/loader";
import { AllSearch, getSettings, userGet, userGetbyId } from "../apis/apis";
import { useDispatch, useSelector } from "react-redux";
import { handleClearUserInfo } from "../redux/loanandfoundSlice";
import { setSettings } from "../redux/notificationSlice";
import { logout } from "../redux/authSlice";
import { UIActivityIndicator } from "react-native-indicators";
const { width, height } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";

const HomeScreen = ({ route }) => {
  const user = useSelector((state) => state.authReducer.activeUser?.user);
  const [cancelModal, setCancelModal] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setsearchResults] = useState([]);
  const [cachedResults, setCachedResults] = useState({});
  const [searchLoading, setSearchLoading] = useState(false);
  const [showDropDown, setshowDropDown] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const userData = useSelector((state) => state.authReducer.activeUser?.user);
  const navigation = useNavigation();

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  async function handleSearch() {
    try {
      if (query.trim() === "") {
        setshowDropDown(false);
        setsearchResults([]);
        return;
      }
      setSearchLoading(true);
      const response = await AllSearch(query);
      setshowDropDown(true);
      setsearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setSearchLoading(false);
    }
  }

  useEffect(() => {
    if (query.trim() === "") {
      setshowDropDown(false);
      setsearchResults([]);
    }
  }, [query]);

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(handleClearUserInfo());
      dispatch(logout());
      await AsyncStorage.removeItem("userDatainfo");
      await AsyncStorage.removeItem("userData");
      setCancelModal(false);
      navigation.navigate("Logins1");
      // DevSettings.reload();
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };
  // const handleGetuser = async () => {
  //   try {
  //     setLoader(true);
  //     let paylaod = {};
  //     if (userInfo?.user) {
  //       paylaod._id = userInfo.user?._id;
  //     } else {
  //       let userData = await AsyncStorage.getItem("userData");
  //       let userInformation = JSON.parse(userData);
  //       paylaod._id = userInformation.user?._id;
  //     }
  //     let result = await userGetbyId(paylaod);
  //     if (result.status == 200) {
  //       return result.data.data;
  //     }
  //   } catch (error) {
  //     console.log("error ;", error);
  //     alert("something went wrong!");
  //   } finally {
  //     setLoader(false);
  //   }
  // };
  // const loadUserData = async () => {
  //   try {
  //     let newUserData = await handleGetuser();
  //     setUserData(newUserData);
  //     const userDataJson = JSON.stringify(newUserData);
  //     await AsyncStorage.setItem("userDatainfo", userDataJson);
  //   } catch (error) {
  //     console.error("Error loading user data:", error);
  //   }
  // };

  // useEffect(() => {
  //   loadUserData();
  // }, [navigation]);

  const handleNavigation = (item) => {
    setshowDropDown(false);

    switch (item.result_from) {
      case "user":
        handleUserNavigation(item._id, item);
        break;
      case "neighbour watch":
        handleWatchNavigate(item);
        break;
      case "lost & found":
        handleLostNavigate(item);
        break;
      case "neighbour forum":
        handleForumNavigate(item);
        break;
      case "sell zone":
        handleSellNavigate(item);
        break;
      default:
        // Handle other cases or do nothing
        break;
    }
  };
  const handleGetSettings = async () => {
    try {
      let result = await getSettings();
      if (result.status == 200) {
        dispatch(setSettings({ settings: result.data }));
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    handleGetSettings();
  }, []);

  function formatLocation(text) {
    return text?.replace(/\n/g, " ");
  }

  function handleUserNavigation(userId, userInfo) {
    if (userId === user._id) {
      navigation.navigate("profileScreen");
    } else if (user.connections.includes(userId)) {
      navigation.navigate("Profile3", { user: userInfo });
    } else if (
      user.requests &&
      user.requests.some((req) => req.sender === userId)
    ) {
      navigation.navigate("Profile4", {
        user: {
          sender: {
            _id: userId,
            name: userInfo.name,
            image: userInfo.image,
          },
        },
      });
    } else {
      navigation.navigate("Profile1", { user: userInfo });
    }
  }

  function handleWatchNavigate(item) {
    navigation.navigate("SearchSus", { item });
  }

  function handleForumNavigate(item) {
    navigation.navigate("FormSearch", { topic: item });
  }
  function handleLostNavigate(item) {
    navigation.navigate("Losted", { data: item });
  }
  function handleSellNavigate(item) {
    navigation.navigate("BuyDetails", { item, userId: user._id });
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.extraLightGrey,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      {/* {loader && <Loader />} */}
      <View
        style={{
          backgroundColor: Colors.primary,
          paddingVertical: Default.fixPadding * 1.2,
          paddingTop: Default.fixPadding,
          //    marginBottom:56
        }}
      >
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginBottom: Default.fixPadding * 1.5,
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",

              //  paddingHorizontal: Default.fixPadding * 2,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("LocationChange", { userData: user })
              }
              style={{
                flex: 1,
                paddingHorizontal: Default.fixPadding * 4.5,
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
              }}
              // onPress={() => navigation.navigate("AdminMain")}
            >
              <SimpleLineIcons
                name="location-pin"
                size={22}
                color={Colors.white}
                // style={{ marginTop: 10 }}
              />
              <Text
                style={{
                  ...Fonts.Medium14white,
                  paddingTop: 3,
                  paddingLeft: 2,
                  // width: 300,
                }}
              >
                {formatLocation(userData?.address?.name)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
          }}
        >
          <TouchableOpacity onPress={toggleSidePanel}>
            <Ionicons name="md-menu" size={38} color="white" />
          </TouchableOpacity>
          <View
            style={{
              ...Default.shadow,
              backgroundColor: Colors.white,
              flexDirection: isRtl ? "row-reverse" : "row",
              borderRadius: 5,
              padding: Default.fixPadding * 0.4,
              marginHorizontal: Default.fixPadding * 0.2,
              width: 320,
              marginRight: 6,
            }}
          >
            <TextInput
              style={{
                // Add your custom styles here
                flex: 1,
                marginLeft: Default.fixPadding * 0.6,
                ...Fonts.SemiBold16grey,
              }}
              placeholder={tr("Search")}
              placeholderTextColor={Colors.grey}
              value={query}
              onChangeText={(text) => setQuery(text)}
            />
            <TouchableOpacity onPress={handleSearch}>
              <Ionicons
                name="search"
                size={20}
                color={Colors.white}
                style={{
                  backgroundColor: Colors.primary,
                  padding: 5,
                  borderRadius: 4,
                }}
              />
            </TouchableOpacity>
          </View>
          {searchLoading && (
            <View
              style={{
                width: 320,
                height: 150,
                backgroundColor: "white",
                position: "absolute",
                top: 50,
                left: 40,
                borderRadius: 5,
                padding: 10,
                borderWidth: 1,
                zIndex: 998,
              }}
            >
              <UIActivityIndicator
                color={Colors.primary}
                size={35}
                style={{
                  marginTop: Default.fixPadding * 1.5,
                  marginBottom: 20,
                }}
              />
              <Text
                style={{ fontWeight: 700, fontSize: 15, textAlign: "center" }}
              >
                Searching for{" "}
                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: 15,
                    color: Colors.primary,
                  }}
                >
                  {query}
                </Text>
              </Text>
            </View>
          )}
          {showDropDown && (
            <View
              style={{
                width: 320,
                marginTop: 5,
                // height: 50,
                backgroundColor: "white",
                position: "absolute",
                top: 50,
                left: 40,
                borderRadius: 5,
                padding: 10,
                borderWidth: 1,
                zIndex: 998,
              }}
            >
              {searchResults.length < 1 && !searchLoading ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/icons/empty-icon.png")}
                    style={{ height: 100, width: 100, marginTop: 10 }}
                  />
                  <Text
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                      textAlign: "center",
                      height: 50,
                      marginTop: 20,
                    }}
                  >
                    No result found for{" "}
                    <Text
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: Colors.primary,
                      }}
                    >
                      {query}
                    </Text>
                  </Text>
                </View>
              ) : (
                !searchLoading && (
                  <ScrollView>
                    <FlatList
                      // style={{ height: 220 }}
                      data={searchResults}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => handleNavigation(item)}
                          key={item._id}
                          style={{ paddingVertical: 10, gap: 10 }}
                        >
                          <Text style={{ fontSize: 15, fontWeight: "700" }}>
                            {item.title || item.topic || item.name}
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              textTransform: "capitalize",
                            }}
                          >
                            {item.result_from}
                          </Text>
                          <View style={styles.line}></View>
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item) => item._id}
                    />
                  </ScrollView>
                )
              )}
            </View>
          )}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Messages", {
                userId: userData._id,
              })
            }
          >
            <Ionicons name="chatbubbles-outline" size={38} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ zIndex: -1 }}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            marginLeft: Default.fixPadding * 3,

            marginBottom: Default.fixPadding * 3,
            marginTop: Default.fixPadding * 3,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("lostTabt", {
                userId: userData?._id,
              })
            }
            style={{
              ...Default.shadow,
              backgroundColor: Colors.white,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: Default.fixPadding * 2,
              width: width / 2.5,
            }}
          >
            <Image
              source={require("../assets/images/losn.png")}
              style={{ height: 65, width: 65 }}
            />
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.SemiBold15primary,
                overflow: "hidden",
                marginTop: Default.fixPadding * 0.8,
              }}
            >
              Lost&Found
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Sus", {
                title: "Carpenter",
              })
            }
            style={{
              ...Default.shadow,
              backgroundColor: Colors.white,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: Default.fixPadding * 3,
              width: width / 2.5,
              marginRight: 23,
            }}
          >
            <Image
              source={require("../assets/images/jj.png")}
              style={{ height: 65, width: 65 }}
            />
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.SemiBold15primary,
                overflow: "hidden",
                marginTop: Default.fixPadding * 0.8,
              }}
            >
              Neighbor Watch
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            marginLeft: Default.fixPadding * 3,

            marginBottom: Default.fixPadding * 2,
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SkillSharing", {
                title: "Skill Sharing",
              })
            }
            style={{
              ...Default.shadow,
              backgroundColor: Colors.white,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: Default.fixPadding * 2,
              width: width / 2.5,
            }}
          >
            <Image
              source={require("../assets/images/toi.png")}
              style={{ height: 72, width: 125 }}
            />
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.SemiBold15primary,
                overflow: "hidden",
                marginTop: Default.fixPadding * 0.8,
              }}
            >
              Skills Hub
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("BuySell", {
                title: "Buy&Sell",
              })
            }
            style={{
              ...Default.shadow,
              backgroundColor: Colors.white,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: Default.fixPadding * 3,
              width: width / 2.5,
              marginRight: 23,
            }}
          >
            <Image
              source={require("../assets/images/u.png")}
              style={{ height: 70, width: 95 }}
            />

            <Text
              numberOfLines={1}
              style={{
                ...Fonts.SemiBold15primary,
                overflow: "hidden",
                marginTop: Default.fixPadding * 0.8,
              }}
            >
              Sell Zone
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            marginLeft: Default.fixPadding * 12,

            marginBottom: Default.fixPadding * 3,
            marginTop: 28,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Form", {
                userId: userData?._id,
              })
            }
            style={{
              ...Default.shadow,
              backgroundColor: Colors.white,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: Default.fixPadding * 3,
              width: width / 2.5,
              marginRight: 23,
            }}
          >
            <Image
              source={require("../assets/images/nntt.png")}
              style={{ height: 69, width: 85 }}
            />
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.SemiBold15primary,
                overflow: "hidden",
                marginTop: Default.fixPadding * 0.8,
                marginLeft: 3,
              }}
            >
              Neighbor Forum
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={
            isSidePanelOpen ? styles.sidePanelOpen : styles.sidePanelClosed
          }
        >
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => {
              toggleSidePanel();
              navigation.navigate("Myaccount", {
                userData: userData,
              });
            }}
          >
            <Text style={styles.panelButtonText}>Account Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.panelButton}
            onPress={() =>
              navigation.navigate("Not", {
                title: "Losted",
              })
            }
          >
            <Text style={styles.panelButtonText}>Notification Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => {
              navigation.navigate("Cradius", {
                userData: userData,
              });
              toggleSidePanel();
            }}
          >
            <Text style={styles.panelButtonText}>Customize Radius</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.panelButton}
            onPress={() =>
              navigation.navigate("Appearance", {
                title: "Losted",
              })
            }
          >
            <Text style={styles.panelButtonText}>Appearance</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() =>
              navigation.navigate("terns", {
                title: "Losted",
              })
            }
          >
            <Text style={styles.panelButtonText}>Neighborhood Guidelines</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() =>
              navigation.navigate("Pol", {
                title: "Losted",
              })
            }
          >
            <Text style={styles.panelButtonText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => {
              toggleSidePanel();
              setCancelModal(true);
            }}
          >
            <Text style={styles.panelButtonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
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
                  {"Are you sure you want to signout?"}
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
                  onPress={() => handleLogout()}
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

export default HomeScreen;

const styles = StyleSheet.create({
  sidePanelOpen: {
    flex: 1,
    width: "70%",
    backgroundColor: Colors.extraLightGrey,
    position: "absolute",
    top: 2,
    bottom: -190,
    left: 0,
    zIndex: 999,
    height: height,
    ...Default.shadow,
  },
  sidePanelClosed: {
    display: "none",
  },
  panelButton: {
    backgroundColor: "#fff",
    //borderBottomColor:'#000',
    //borderBottomWidth:2,
    //borderTopColor:'#000',
    //borderTopWidth:2,
    ...Default.shadow,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  panelButtonText: {
    fontSize: 18,
    textAlign: "center",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "black",
  },
});
