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
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/styles";

import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Loader from "../components/loader";
import { deleteTopic, updateTopic } from "../apis/apis";

const { width, height } = Dimensions.get("window");

const RegisterScreen = ({ navigation, route }) => {
  const { data } = route.params;
  const [topic, setTopic] = useState(data.topic);
  const [description, setDescription] = useState(data.description);
  const [isLoading, setIsLoading] = useState("");

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

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      let response = await updateTopic({ topic, description, _id: data._id });
      if (response.status === 200) {
        navigation.navigate("Fpos");
      }
    } catch (error) {
      console.log("Error While Posting", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      {isLoading && <Loader />}
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
            {"Join Discussion"}
          </Text>

          <Text
            style={{
              fontWeight: "bold",
              color: Colors.black,
              fontSize: 19,
              marginBottom: 20,
              paddingLeft: 3,
            }}
          >
            {"Add discussion topic to engage with your neighborhood"}
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
                color: Colors.grey,
                fontSize: 18,
                fontWeight: "bold",
                paddingLeft: 6,
              }}
            >
              Edit Topic
            </Text>

            <TextInput
              marginTop={12}
              marginBottom={12}
              placeholder={"short but descriptive "}
              placeholderTextColor={Colors.grey}
              style={{
                color: Colors.black,
                fontSize: 14,
                paddingLeft: 10,
                height: 50,
                borderWidth: 1,
                borderColor: "lightgrey",
                borderRadius: 10,
              }}
              value={topic}
              onChangeText={(text) => setTopic(text)}
            />
          </View>

          <View
            style={{
              backgroundColor: Colors.white,
              borderRadius: 3,
              ...Default.shadow,
              marginTop: 19,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: Colors.grey,
                fontSize: 18,

                fontWeight: "bold",
                paddingLeft: 6,
              }}
            >
              Edit Description
            </Text>

            <TextInput
              marginTop={12}
              marginBottom={12}
              // paddingBottom={40}
              placeholder={
                "Provide details to make it easier for others to reply "
              }
              placeholderTextColor={Colors.grey}
              style={{
                color: Colors.black,
                fontSize: 14,
                paddingLeft: 10,
                height: 50,
                borderWidth: 1,
                borderColor: "lightgrey",
                borderRadius: 10,
              }}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </View>

          <TouchableOpacity
            onPress={() => handleUpdate()}
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: Default.fixPadding * 3,
              paddingVertical: Default.fixPadding * 1.2,
            }}
          >
            <Text style={{ ...Fonts.SemiBold18white }}>{"Update"}</Text>
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
