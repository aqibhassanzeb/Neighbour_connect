import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
} from "react-native";
import React, { useEffect } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import Stars from "react-native-stars";
import { review } from "../constants";

const ReviewScreen = ({ navigation, route }) => {
  const { postId, module } = route.params;
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`reviewScreen:${key}`);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
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
          {"Report"}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            marginLeft: isRtl ? 0 : Default.fixPadding,
            marginRight: isRtl ? Default.fixPadding : 0,
            fontSize: 26,
            marginTop: 25,
            marginLeft: 20,
          }}
        >
          {" "}
          What's wrong with this?
        </Text>
        {review.map((item, index) => {
          const isFirst = index === 0;
          return (
            <View
              key={item.key}
              style={{
                ...Default.shadow,
                marginHorizontal: Default.fixPadding * 2,
                borderRadius: 5,
                backgroundColor: Colors.white,
                marginBottom: Default.fixPadding * 2,
                marginTop: isFirst ? Default.fixPadding * 2 : 0,
                padding: Default.fixPadding,
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flex: 7.7,
                  justifyContent: "center",
                  marginLeft: isRtl ? 0 : Default.fixPadding,
                  marginRight: isRtl ? Default.fixPadding : 0,
                }}
              >
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: isRtl ? "row-reverse" : "row",
                    alignItems: "center",
                    marginBottom: Default.fixPadding * 0.5,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{ ...Fonts.Medium16Black, overflow: "hidden" }}
                  >
                    {item.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Reported", {
                        postId,
                        module,
                        reportType: item.name,
                      })
                    }
                  >
                    <Ionicons name="arrow-forward" size={20} color="#000" />
                  </TouchableOpacity>
                </View>

                <Text
                  numberOfLines={4}
                  style={{
                    ...Fonts.Medium14grey,
                    overflow: "hidden",
                    textAlign: isRtl ? "right" : "left",
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReviewScreen;
