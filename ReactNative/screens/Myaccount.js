import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  BackHandler,
  Modal,
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";

import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Colors, Default, Fonts } from "../constants/styles";
import Loader from "../components/loader";
import { userGet, userGetbyId, userUpdate } from "../apis/apis";
const MyAccountScreen = (props) => {
  const { width, height } = Dimensions.get("window");
  const [cancelModal, setCancelModal] = useState(false);
  const [userData, setUserData] = useState("");
  const [loader, setLoader] = useState(false);
  const [cancelModals, setCancelModals] = useState(false);
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`editProfileScreen:${key}`);
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    if (!firstName) {
      return alert("please fill name");
    }
    setCancelModals(true);
  };

  const handleSubmit = async () => {
    setCancelModals(false);
    try {
      let payload = { name: firstName, last_name: lastName, _id: userData._id };
      setLoader(true);
      let verified = await userUpdate(payload);
      if (verified.status == 200) {
        alert("updated successfully");
      } else {
        alert(verified.data.error);
      }
    } catch (error) {
      alert("something went wrong!");
    } finally {
      setLoader(false);
    }
  };

  const handleChangePassword = () => {
    // Perform change password logic here
    // ...
  };
  const handleSignOut = () => {
    // Logic for signing out
    // ...
  };

  const handleDeactivateAccount = () => {
    // Logic for deactivating the account
    // ...
  };

  const handleGetuser = async () => {
    try {
      setLoader(true);
      let paylaod = {};
      paylaod._id = props.route.params.userData?._id;
      let result = await userGetbyId(paylaod);
      if (result.status == 200) {
        setUserData(result.data.data);
        setFirstName(result.data?.data?.name);
        setLastName(result.data?.data?.last_name);
      }
    } catch (error) {
      console.log("error ;", error);
      alert("something went wrong!");
    } finally {
      setLoader(false);
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
          Account Setting
        </Text>
      </View>

      <View style={styles.container}>
        <Ionicons
          name="person-circle-outline"
          size={78}
          color="#005D7A"
          marginLeft={160}
        />
        <Text style={{ fontSize: 23, fontWeight: 800, marginLeft: 155 }}>
          Account
        </Text>
        <Text style={{ fontSize: 17, width: 390 }}>
          Manage your account name,email,and password
        </Text>
      </View>
      <View>
        <View style={styles.line} />
        <View style={styles.line} />
      </View>
      <View style={styles.container}>
        {/* First Name */}
        <Text
          style={{
            color: Colors.darkGrey,
            fontSize: 15,
            paddingLeft: 3,
            paddingBottom: 3,
          }}
        >
          First Name
        </Text>
        <TextInput
          maxLength={20}
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />

        {/* Last Name */}
        <Text
          style={{
            color: Colors.darkGrey,
            fontSize: 15,
            paddingLeft: 3,
            paddingBottom: 3,
          }}
        >
          Last Name
        </Text>
        <TextInput
          maxLength={20}
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />

        {/* Email Address */}
        <Text
          style={{
            color: Colors.darkGrey,
            fontSize: 15,
            paddingLeft: 3,
            paddingBottom: 3,
          }}
        >
          Email
        </Text>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              props.navigation.navigate("ChangeEmail", { userData: userData })
            }
          >
            <Text style={styles.buttonText}>Change Email</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: Colors.darkGrey,
            fontSize: 15,
            paddingLeft: 3,
            paddingBottom: 3,
          }}
        >
          Password
        </Text>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              props.navigation.navigate("Changepass", { userData: userData })
            }
          >
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleSave();
          }}
        >
          <Text style={styles.buttonText}>save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contain}>
        <TouchableOpacity
          style={styles.butt}
          onPress={() => {
            setCancelModal(true);
            //  setSelectedId(item.key);
          }}
        >
          <Ionicons name="md-log-out" size={24} color="black" />
          <Text style={styles.buttonTe}>Sign Out</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deactivateButton}
          onPress={() => props.navigation.navigate("Deactivate")}
        >
          <Text style={styles.deactivateButtonText}>
            Deactivate Your Account
          </Text>
        </TouchableOpacity>
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
                  {"Are you sure you want to signout?  "}
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
                  onPress={() => props.navigation.navigate("Logins1")}
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={cancelModals}
        // onRequestClose={() => setCancelModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setCancelModals(false)}
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
                  {"Are you sure you want to save settings? "}
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
                  onPress={() => handleSubmit()}
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
                    setCancelModals(false);
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

export default MyAccountScreen;
const styles = StyleSheet.create({
  container: {
    //  flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#D9D9D9",
    marginRight: 57,
    paddingTop: 13,
    paddingBottom: 13,
  },
  line: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#005D7A",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    marginRight: 190,
    color: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },

  contain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    top: 20,
  },
  butt: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 6,
    marginBottom: 16,
    marginRight: 130,
  },
  buttonTe: {
    color: "black",
    fontSize: 16,
    marginLeft: 2,
  },
  deactivateButton: {
    marginBottom: 17,
  },
  deactivateButtonText: {
    color: "#005D7A",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
