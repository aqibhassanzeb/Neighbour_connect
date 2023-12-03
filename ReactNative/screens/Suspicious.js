import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  StyleSheet,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/styles";
import { AntDesign } from "@expo/vector-icons";

import Ionicons from "react-native-vector-icons/Ionicons";
import BreadCrumbs from "../components/BreadCrumbs";

const RegisterScreen = ({ navigation }) => {
  const [checked, setChecked] = useState(false);

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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        paddingTop: StatusBar.currentHeight,
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
          {"Post Activity"}
        </Text>
      </View>
      <BreadCrumbs>
        <AntDesign name="right" size={18} color="#9ca3af" />
        <TouchableOpacity
          onPress={() => navigation.navigate("Sus")}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <Text> Neighbor Watch</Text>
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
          Guidelines
        </Text>
      </BreadCrumbs>
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
            {"Reporting suspicious activity?"}
          </Text>
          <Text
            style={{
              ...Fonts.SemiBold15black,
              maxWidth: isRtl ? null : "  70%",
              textAlign: isRtl ? "right" : "left",
              paddingLeft: 6,
              paddingBottom: 23,
              marginBottom: 12,
            }}
          >
            If posting about crime or something Suspicious, follow the
            guidelines:
          </Text>

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
              Focus on behavior
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
              {"Share how the activity was suspicious."}
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
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: Colors.black,
                  fontSize: 18,
                  paddingLeft: 6,
                  paddingTop: 2,
                }}
              >
                Give detailed description
              </Text>
            </View>
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
              {"Consider unintended consequences if the person is innocent."}
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
              Prevent profiling
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
                "Ask yourself if you would feel the same way if race or ethnicity is not a factor."
              }
            </Text>
          </View>

          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginTop: Default.fixPadding * 3,
            }}
          ></View>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddSus")}
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
