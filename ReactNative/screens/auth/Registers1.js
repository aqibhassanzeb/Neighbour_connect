import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Image,
  TextInput,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Loader from "../../components/loader";
import { registerApi } from "../../apis/apis";
import { GOOGLE_APIKEY } from "../../config";

const { width, height } = Dimensions.get("window");

const RegisterScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`registerScreen:${key}`);
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwords, setPasswords] = useState("");

  const [registerLoader, setRegisterLoader] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !passwords) {
      return alert("please fill the fields");
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
      return alert("Please fill valid email");
    }
    const passRegex = /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (password.length < 8) {
      return alert("password should be minimum 8 characters");
    }
    if (!passRegex.test(password)) {
      return alert("Password should contain at least one special character");
    }

    if (password !== passwords) {
      return alert("password and conform password not match");
    }

    const payload = { name, email, password, status: "user" };
    setRegisterLoader(true);
    try {
      let user = await registerApi(payload);
      if (user.status == 200) {
        const userData = JSON.stringify(user.data);

        await AsyncStorage.setItem("userData", userData), setEmail("");
        setName("");
        setPassword("");
        setPasswords("");
        navigation.navigate("verificationScreen", { user: user.data.user });
      } else {
        alert(user.data.error);
      }
    } catch (error) {
      alert("something went wrong!");
      // console.log('errror 2:',error)
    } finally {
      setRegisterLoader(false);
    }
  };

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
        <TouchableOpacity
          style={{
            marginHorizontal: Default.fixPadding * 2,
            marginTop: Default.fixPadding,
            alignItems: isRtl ? "flex-end" : "flex-start",
          }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name={isRtl ? "arrow-forward" : "arrow-back"}
            size={25}
            color={Colors.white}
          />
        </TouchableOpacity>
        <Image
          source={require("../../assets/tu.png")}
          style={{
            marginTop: Default.fixPadding * 1,
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
          <Text style={{ ...Fonts.SemiBold20primary }}>{tr("register")}</Text>
          <Text
            style={{
              ...Fonts.Medium14grey,
              maxWidth: isRtl ? null : "70%",
              marginTop: Default.fixPadding,
              textAlign: isRtl ? "right" : "left",
            }}
          >
            {"Please create an account to connect with your neighbors"}
          </Text>

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
            <Feather
              name="user"
              color={Colors.grey}
              size={20}
              style={{
                flex: 0.7,
              }}
            />
            <TextInput
              placeholder={"Enter full name"}
              placeholderTextColor={Colors.grey}
              onChangeText={setName}
              selectionColor={Colors.primary}
              require
              maxLength={30}
              value={name}
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
              paddingTop: Default.fixPadding * 1.5,
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
              placeholder={"Enter email id"}
              placeholderTextColor={Colors.grey}
              onChangeText={setEmail}
              selectionColor={Colors.primary}
              maxLength={30}
              value={email}
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
              paddingTop: Default.fixPadding * 1.5,
              paddingBottom: Default.fixPadding,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "center",
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
              placeholder={"Enter password"}
              placeholderTextColor={Colors.grey}
              onChangeText={setPassword}
              secureTextEntry={true}
              selectionColor={Colors.primary}
              value={password}
              maxLength={20}
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
              paddingTop: Default.fixPadding * 2.6,
              paddingBottom: Default.fixPadding,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "center",
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
              placeholder={"Confirm password"}
              placeholderTextColor={Colors.grey}
              onChangeText={setPasswords}
              secureTextEntry={true}
              selectionColor={Colors.primary}
              value={passwords}
              maxLength={20}
              style={{
                ...Fonts.Medium15Black,
                flex: 9.3,
                textAlign: isRtl ? "right" : "left",
                marginHorizontal: Default.fixPadding * 1.2,
              }}
            />
          </View>
          <Loader visible={registerLoader} />
          <TouchableOpacity
            onPress={handleRegister}
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: Default.fixPadding * 3,
              paddingVertical: Default.fixPadding * 1.2,
            }}
          >
            <Text style={{ ...Fonts.SemiBold18white }}>{tr("register")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
