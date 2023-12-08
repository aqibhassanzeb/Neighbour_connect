import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Colors, Default, Fonts } from "../constants/styles";

import { useTranslation } from "react-i18next";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import Loader from "./loader";
import moment from "moment";
import useGetUserId from "./useGetUserId";
import Empty from "./Empty";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");
import Placeholder from "./Placeholders/PlacehoderOne";
import { formatText, hasPassed10Days } from "../utils";

const OngoingTab = (props) => {
  const user = useSelector((state) => state.authReducer.activeUser.user);
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const userId = useGetUserId();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`ongoingTab:${key}`);
  }

  const { data, loader, searchKeyword } = useSelector(
    (state) => state.loanandfound
  );

  const regexPattern = new RegExp(searchKeyword, "i");
  let newData =
    data.length > 0 && data.filter((elm) => regexPattern.test(elm.title));

  function profileNavigation(userId, userInfo) {
    if (userId === user._id) {
      navigation.navigate("profileScreen");
    } else if (user.connections.includes(userId)) {
      navigation.navigate("Profile3", { user: userInfo });
    } else {
      navigation.navigate("Profile1", { user: userInfo });
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Loader visible={loader} /> */}
        {loader && <Placeholder />}
        {newData.length > 0 && (
          <FlatList
            data={newData}
            renderItem={({ item }) => {
              if (!hasPassed10Days(item.mark_returned_date)) {
                return (
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
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                        }}
                      />
                      <Text>{item?.posted_by.name}</Text>
                    </TouchableOpacity>
                    <View>
                      <Image
                        source={{ uri: item?.gallary_images[0] }}
                        height={180}
                        style={{
                          width: "100%",
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                        }}
                      />
                      {item.mark_returned && (
                        <View style={styles.tagContainer}>
                          <Text style={styles.tag}>Returned</Text>
                        </View>
                      )}
                    </View>
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
                      Found Location:{" "}
                      <Text
                        style={{
                          fontWeight: "600",
                        }}
                      >
                        {item.location
                          ? formatText(item?.location)
                          : formatText(item?.posted_by?.address?.name)}
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
                      Found Date:{" "}
                      <Text
                        style={{
                          fontWeight: "600",
                        }}
                      >
                        {moment(JSON.parse(item?.date)).format(
                          "ddd MMM DD YYYY"
                        )}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              }
            }}
            keyExtractor={(item) => item._id}
            numColumns={2}
            contentContainerStyle={{
              justifyContent: "space-between",
              paddingHorizontal: 16,
              paddingTop: 16,
            }}
          />
        )}
        {!loader && newData.length === 0 && (
          <Empty text="No Item Listed" marginTop={100} />
        )}
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
    width: 115,
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
    paddingRight: 10,
  },
  text: {
    fontSize: 20,
    marginRight: 10,
    paddingLeft: 2,
    paddingRight: 9,

    color: "white",
  },
  bar: {
    width: 3,
    height: 5,
  },
  tagContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "green",
    padding: 5,
    borderTopLeftRadius: 10,
    width: 80,
  },
  tag: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
