import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  BackHandler,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { getSkillsByCategory } from "../apis/apis";
import Loader from "../components/loader";

const CategoryScreen = ({ navigation, route }) => {
  const { item } = route.params;

  const [catSkills, setCatSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`categoryScreen:${key}`);
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

  const handleGetSkillsByCategory = async () => {
    try {
      setIsLoading(true);
      let result = await getSkillsByCategory({ id: item._id });
      if (result.status == 200) {
        setCatSkills(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetSkillsByCategory();
  }, []);
  console.log(catSkills);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      {isLoading && <Loader />}
      <View
        style={{
          paddingVertical: Default.fixPadding * 1.2,
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          backgroundColor: Colors.primary,
          paddingHorizontal: Default.fixPadding * 2,
        }}
      >
        <View
          style={{ flex: 8.5, flexDirection: isRtl ? "row-reverse" : "row" }}
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
            {item.name}
          </Text>
        </View>
      </View>
      {!isLoading && catSkills.length === 0 && (
        <TouchableOpacity
          style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            marginTop: 30,
            marginHorizontal: 13,
            //    marginBottom: 27,
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
            <Text>{!isLoading && "Not Skill Yet"}</Text>
          </View>
        </TouchableOpacity>
      )}
      <ScrollView>
        {catSkills.length > 0 &&
          catSkills.map((skill) => (
            <TouchableOpacity
              key={skill._id}
              onPress={() =>
                navigation.navigate("CatShared", {
                  post: { skill },
                })
              }
              style={{
                ...Default.shadow,
                backgroundColor: Colors.white,
                marginTop: 20,
                marginHorizontal: 20,
                marginBottom: 0,
                borderRadius: 10,
                overflow: "hidden",
                flexDirection: isRtl ? "row-reverse" : "row",
                paddingVertical: Default.fixPadding,
              }}
            >
              <View
                style={{
                  flex: 2,
                  paddingHorizontal: Default.fixPadding * 1.5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: skill.posted_by.image }}
                  style={{ borderRadius: 5, height: 70, width: 70 }}
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
                  style={{ ...Fonts.SemiBold15black, overflow: "hidden" }}
                >
                  {skill.posted_by.name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ ...Fonts.SemiBold14grey, overflow: "hidden" }}
                >
                  {skill.skill_level}
                </Text>
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
                      //  marginHorizontal: Default.fixPadding * 0.3,
                      marginRight: 4,
                      //overflow: "hidden",
                      //  flex: 1,
                      textAlign: isRtl ? "right" : "left",
                    }}
                  >
                    {skill.posted_by.endorse_count} Endorsements
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flex: 3,
                  justifyContent: "center",
                  alignItems: isRtl ? "flex-start" : "flex-end",
                  marginHorizontal: Default.fixPadding,
                }}
              ></View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryScreen;
