import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../../constants/styles";

import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Loader from "../../components/loader";

const { width, height } = Dimensions.get("window");

const RegisterScreen = ({ navigation }) => {
  const [radius, setRadius] = useState(1);
  const [user, setUser] = useState("");

  const handleRadiusChange = (value) => {
    setRadius(value);
  };
  const [checked, setChecked] = useState(false);

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`registerScreen:${key}`);
  }
  const backAction = () => {
    navigation.navigate("loginScreen");
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const [password, setPassword] = useState("");

  const [registerLoader, setRegisterLoader] = useState(false);

  const handleRegister = () => {
    setRegisterLoader(true);
    setTimeout(() => {
      setRegisterLoader(false);
      navigation.navigate("bottomTab");
    }, 800);
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
          backgroundColor: Colors.primary,
          paddingBottom: 6,
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
              fontWeight: "bold",
              color: Colors.primary,
              fontSize: 24,
              marginBottom: 20,
              paddingLeft: 3,
            }}
          >
            {"Responsible Neighbor Pledge"}
          </Text>
          <Image
            source={require("../../assets/images/ht.png")}
            style={{
              width: 200,
              height: 100,
              marginLeft: 80,
            }}
          />
          <View
            style={{
              backgroundColor: Colors.white,
              borderRadius: 3,
              ...Default.shadow,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: Colors.black,
                fontSize: 18,
                paddingLeft: 6,
              }}
            >
              Be Helpful
            </Text>
            <Text
              style={{
                ...Fonts.Medium14grey,
                maxWidth: isRtl ? null : "100%",
                marginTop: Default.fixPadding,
                textAlign: isRtl ? "right" : "left",
                paddingLeft: 6,

                paddingBottom: 23,
              }}
            >
              {
                "Share this space in a constructive way. Be kind,not judgmental, in your conversations."
              }
            </Text>
          </View>
          <View
            style={{
              backgroundColor: Colors.white,
              borderRadius: 3,
              ...Default.shadow,
              marginTop: 23,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: Colors.black,
                fontSize: 18,
                paddingLeft: 6,
              }}
            >
              Be Respectful
            </Text>
            <Text
              style={{
                ...Fonts.Medium14grey,
                maxWidth: isRtl ? null : "100%",
                marginTop: Default.fixPadding,
                textAlign: isRtl ? "right" : "left",
                paddingLeft: 6,
                paddingBottom: 23,
              }}
            >
              {
                "You're speaking to your real neighbors. Strong communities are built on strong relationships."
              }
            </Text>
          </View>
          <View
            style={{
              backgroundColor: Colors.white,
              borderRadius: 3,
              ...Default.shadow,
              marginTop: 23,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: Colors.black,
                fontSize: 18,
                paddingLeft: 6,
              }}
            >
              Do Not Discriminate
            </Text>
            <Text
              style={{
                ...Fonts.Medium14grey,
                maxWidth: isRtl ? null : "100%",
                marginTop: Default.fixPadding,
                textAlign: isRtl ? "right" : "left",
                paddingLeft: 6,
                paddingBottom: 23,
              }}
            >
              {
                "We do not tolerate racism, hateful language,or discrimination of any kind."
              }
            </Text>
          </View>
          <View
            style={{
              backgroundColor: Colors.white,
              borderRadius: 3,
              ...Default.shadow,
              marginTop: 23,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: Colors.black,
                fontSize: 18,
                paddingLeft: 6,
              }}
            >
              No Harmful Activity
            </Text>
            <Text
              style={{
                ...Fonts.Medium14grey,
                maxWidth: isRtl ? null : "100%",
                marginTop: Default.fixPadding,
                textAlign: isRtl ? "right" : "left",
                paddingLeft: 6,
                paddingBottom: 23,
              }}
            >
              {
                "We prohibit any activity that could hurt someone, from scams to physical harm."
              }
            </Text>
          </View>

          <View
            style={{
              //  ...Default.shadow,
              //  borderRadius: 10,
              //  backgroundColor: Colors.white,
              //  padding: Default.fixPadding * 1.5,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginTop: Default.fixPadding * 3,
            }}
          >
            <TouchableOpacity onPress={() => setChecked(!checked)}>
              <View style={styles.checkbox}>
                {checked ? (
                  <Ionicons name="checkmark-outline" size={24} color="green" />
                ) : (
                  <Ionicons name="square-outline" size={24} color="black" />
                )}
              </View>
            </TouchableOpacity>

            <Text
              style={{
                ...Fonts.Medium16Black,
                flex: 9.3,
                color: "black",
                top: 7,
                marginHorizontal: Default.fixPadding,
              }}
            >
              I agree to uphold the responsible Neighbor Pledge
            </Text>
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
            <Text style={{ ...Fonts.SemiBold18white }}>{"Continue"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
