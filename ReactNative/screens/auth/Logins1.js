import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  StyleSheet,
  TextInput,
  Image,
  Input,
  Icon,
  Button,
  Dimensions,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import Feather from "react-native-vector-icons/Feather";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../../constants/styles";
import SnackbarToast from "../../components/snackbarToast";
import IntlPhoneInput from "react-native-intl-phone-input";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Loader from "../../components/loader";
import DashedLine from "react-native-dashed-line";
import { MaterialIcons } from "@expo/vector-icons";
import { loginUser, trackLogin } from "../../apis/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleSetUserinfo } from "../../redux/loanandfoundSlice";
import { useDispatch } from "react-redux";
import { setActiveUser } from "../../redux/authSlice";

const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`loginScreen:${key}`);
  }
  const [loginLoader, setLoginLoader] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("please fill the fields");
    }

    const payload = { email, password };
    try {
      setLoginLoader(true);
      let user = await loginUser(payload);
      if (user.status == 200) {
        if (user.data.user.isActive === false) {
          return alert("Your account has been suspended");
        } else {
          dispatch(handleSetUserinfo(user.data));
          dispatch(setActiveUser(user.data));
          const userData = JSON.stringify(user.data);
          await AsyncStorage.setItem("userData", userData);
          setEmail("");
          setPassword("");
          navigation.navigate("bottomTab", { userinfo2: user.data });
          await trackLogin({ id: user.data.user._id });
        }
      } else {
        alert(user.data.error);
      }
    } catch (error) {
      alert("something went wrong!");
    } finally {
      setLoginLoader(false);
    }
  };
  const handleForgor = () => {
    navigation.navigate("Forgot");
    // setLoginLoader(true);
    // setTimeout(() => {
    //   setLoginLoader(false);
    // }, 800);
  };
  const handleRegister = () => {
    navigation.navigate("Registers1");
    // setLoginLoader(true);
    // setTimeout(() => {
    //   setLoginLoader(false);
    // }, 800);
  };

  const [exit, setExit] = useState(false);
  const onToggleSnackBarExit = () => setExit(!exit);

  const [exitApp, setExitApp] = useState(0);
  const backAction = () => {
    setTimeout(() => {
      setExitApp(0);
    }, 2000);

    if (exitApp === 0) {
      setExitApp(exitApp + 1);
      setExit(!exit);
    } else if (exitApp === 1) {
      BackHandler.exitApp();
    }
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () =>
      BackHandler.removeEventListener(
        "hardwareBackPress",
        backHandler.remove()
      );
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.extraLightGrey,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <View
        style={{
          backgroundColor: "#005D7A",
        }}
      >
        <Image
          source={require("../../assets/tu.png")}
          style={{
            marginTop: Default.fixPadding * 3,
            width: width,
            height: height / 3.5,
          }}
          resizeMode={"contain"}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: Default.fixPadding * 2,
            marginTop: Default.fixPadding * 1.5,
          }}
        >
          <Text
            style={{
              ...Fonts.SemiBold20primary,
              //  marginHorizontal: Default.fixPadding * 2,
            }}
          >
            {tr("login")}
          </Text>
          <Text
            style={{
              ...Fonts.Medium14grey,
              maxWidth: isRtl ? null : "70%",
              marginTop: Default.fixPadding,
              textAlign: isRtl ? "right" : "left",
            }}
          >
            {"Please enter your email address and password"}
          </Text>

          <View
            style={{
              paddingTop: Default.fixPadding * 4,
              paddingBottom: Default.fixPadding,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: Default.fixPadding,
              borderBottomColor: Colors.lightGrey,
              borderBottomWidth: 2,
            }}
          >
            <Feather
              name="mail"
              color={Colors.grey}
              size={20}
              style={{
                flex: 0.7,
              }}
            />
            <TextInput
              placeholder={"Enter your email address"}
              placeholderTextColor={Colors.grey}
              onChangeText={setEmail}
              selectionColor={Colors.primary}
              value={email}
              maxLength={30}
              keyboardType={"email-address"}
              style={{
                ...Fonts.Medium15Black,
                flex: 9.3,
                textAlign: isRtl ? "right" : "left",
                marginHorizontal: Default.fixPadding * 1.2,
              }}
            />
          </View>
          <View
            style={{
              paddingBottom: Default.fixPadding,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: Default.fixPadding * 3,
              borderBottomColor: Colors.lightGrey,
              borderBottomWidth: 2,
            }}
          >
            <Ionicons
              name="lock-closed-outline"
              color={Colors.grey}
              size={22}
              style={{
                flex: 0.7,
              }}
            />
            <TextInput
              placeholder={"Enter your password"}
              placeholderTextColor={Colors.grey}
              onChangeText={setPassword}
              secureTextEntry={true}
              selectionColor={Colors.primary}
              value={password}
              maxLength={30}
              style={{
                ...Fonts.Medium15Black,
                flex: 9.3,
                textAlign: isRtl ? "right" : "left",
                marginHorizontal: Default.fixPadding * 1.2,
              }}
            />
          </View>

          <View style={styles.container}></View>

          <Loader visible={loginLoader} />
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: Default.fixPadding * 2,
              paddingVertical: Default.fixPadding * 1.2,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            <Text style={{ ...Fonts.SemiBold18white }}>{tr("login")}</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              marginVertical: Default.fixPadding * 3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={handleForgor}>
              <Text
                style={{
                  flex: 8.6,
                  ...Fonts.Bold15primary,
                  textAlign: "center",
                }}
              >
                {"Forgot Your Password?"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              marginHorizontal: Default.fixPadding * 2,
              marginLeft: 62,
            }}
          >
            <View
              style={{
                // flex: 1.5,
                //   backgroundColor: Colors.blue,
                paddingVertical: Default.fixPadding * 1,
                justifyContent: "center",
                alignItems: "center",
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                Colors: "black",
              }}
            >
              <Text>Don't have an account? </Text>
            </View>
            <View
              style={{
                flex: 1.5,
                flexDirection: "row",
                //  backgroundColor: Colors.lightBlue,
                //  paddingVertical: Default.fixPadding * 1.2,
                //  borderBottomRightRadius: 10,
                //borderTopRightRadius: 10,
              }}
            >
              <View
                style={{
                  //   flex: 3,
                  justifyContent: "center",
                  alignItems: "left",
                }}
              >
                <TouchableOpacity onPress={handleRegister}>
                  <Text style={{ ...Fonts.Bold18primary }}>Register</Text>
                </TouchableOpacity>
              </View>

              <View
                style={
                  {
                    //  flex: 1.5,
                  }
                }
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <SnackbarToast
        visible={exit}
        onDismiss={onToggleSnackBarExit}
        title={tr("exitApp")}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    marginVertical: Default.fixPadding * 1.5,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 2,
    backgroundColor: Colors.extraLight,
    marginHorizontal: Default.fixPadding * 2,
    ...Fonts.Medium15Black,
    //  borderLeftWidth: 2,
    //borderLeftColor: Colors.lightGrey,
    marginTop: 23,
    height: 30,
  },
  // container: {
  //     flex: 1,
  //     backgroundColor: '#fff',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     paddingHorizontal: 20,
  //   },
  //   inputContainer: {
  //     width: '100%',
  //     marginVertical: 10,
  //   },
  //   input: {
  //     backgroundColor: '#f2f2f2',
  //     paddingVertical: 15,
  //     paddingHorizontal: 20,
  //     borderRadius: 25,
  //     fontSize: 16,
  //   },
  //   button: {
  //     backgroundColor: '#2196F3',
  //     borderRadius: 25,
  //     width: '100%',
  //     paddingVertical: 15,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     marginTop: 20,
  //   },
  //   buttonText: {
  //     color: '#fff',
  //     fontSize: 16,
  //     fontWeight: 'bold',
  //   },
});
export default LoginScreen;
