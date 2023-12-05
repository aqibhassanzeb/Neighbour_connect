import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  FlatList,
  SafeAreaView,
  BackHandler,
} from "react-native";
import React, { useState } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Empty from "../components/Empty";
import { useNavigation } from "@react-navigation/native";
import Placeholder from "./Placeholders/PlacehoderOne";

const { width } = Dimensions.get("window");

const OngoingTab = (props) => {
  const user = useSelector((state) => state.authReducer.activeUser.user);
  const { t, i18n } = useTranslation();

  const navigation = useNavigation();

  const { data, loader, searchKeyword } = useSelector(
    (state) => state.loanandfound
  );

  const regexPattern = new RegExp(searchKeyword, "i");
  let newData =
    data.length > 0 && data.filter((elm) => regexPattern.test(elm.title));

  const backAction = () => {
    props.navigation.goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  function profileNavigation(userId, userInfo) {
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loader && <Placeholder />}
        {!loader && newData.length > 0 ? (
          <FlatList
            data={newData}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  padding: 5,
                  margin: 5,
                  flex: 1,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#e2e8f0",
                }}
                onPress={() =>
                  props.navigation.navigate("Losted", {
                    data: item,
                  })
                }
              >
                <TouchableOpacity
                  onPress={() =>
                    profileNavigation(item?.posted_by._id, item?.posted_by)
                  }
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 3,
                    gap: 10,
                    paddingBottom: 10,
                  }}
                >
                  <Image
                    source={{ uri: item?.posted_by.image }}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 50,
                    }}
                  />
                  <Text>{item?.posted_by.name}</Text>
                </TouchableOpacity>
                <Image
                  source={{ uri: item?.gallary_images[0] }}
                  height={180}
                  style={{
                    width: "100%",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
                <Text
                  style={{
                    paddingHorizontal: 4,
                    paddingTop: 4,
                    color: Colors.primary,
                    fontWeight: "bold",
                    fontSize: 15,
                    letterSpacing: 0.5,
                  }}
                >
                  {item?.title}
                </Text>
                <Text
                  style={{
                    paddingHorizontal: 4,
                    fontSize: 12,
                    letterSpacing: 0.5,
                    fontWeight: "bold",
                  }}
                >
                  Lost Location:{" "}
                  <Text
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    {item?.location?.name}
                  </Text>
                </Text>
                <Text
                  style={{
                    paddingHorizontal: 4,
                    fontSize: 12,
                    letterSpacing: 0.5,
                    fontWeight: "bold",
                  }}
                >
                  Lost Date:{" "}
                  <Text
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    {moment(JSON.parse(item?.date)).format("ddd MMM DD YYYY")}
                  </Text>
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item._id}
            numColumns={2}
            contentContainerStyle={{
              justifyContent: "space-between",
              paddingHorizontal: 16,
              paddingTop: 16,
            }}
          />
        ) : (
          <Empty text="No Item Listed" marginTop={100} />
        )}

        <View
          style={{
            marginLeft: 20,
          }}
        >
          <View
            style={{
              marginBottom: Default.fixPadding * 2,
              marginTop: Default.fixPadding,
            }}
          ></View>
        </View>
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
  border: {
    backgroundColor: Colors.primary,
    width: 105,
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
  },
  text: {
    fontSize: 20,

    color: "white",
  },
  bar: {
    width: 3,
    height: 5,
  },
});
