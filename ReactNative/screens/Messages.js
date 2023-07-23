import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors, Default, Fonts } from "../constants/styles";
import { useTranslation } from "react-i18next";

const MessagesScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";
  const [selectedMessages, setSelectedMessages] = useState([]);

  function tr(key) {
    return t(`messagesScreen:${key}`);
  }
 
  const [messageList, setMessageList] = useState([
    {
      key: "1",
      title: "Alina Khan",
      image: require("../assets/images/dp1.jpg"),
      message: "Did you get the suspicious post",
      time: "2.00am",
    },
    {
      key: "2",
      title: "Madiha Sarfaraz",
      image: require("../assets/images/dp2.jpg"),
      message: "Can i see the camera recording",
      time: "2.00am",
    },
    {
      key: "3",
      title: "Nisa Sami",
      image: require("../assets/images/dp3.jpg"),
      message: "I posted a new skill",
      time: "2.00am",
    },
    {
      key: "4",
      title: "Laiba Shahbaz",
      image: require("../assets/images/dp5.jpg"),
      message: "Waiting for the past 3 hours",
      time: "2.00am",
    },
    {
      key: "5",
      title: "Mahnoor Riaz",
      image: require("../assets/images/dp4.jpg"),
      message: "Did you get the final result",
      time: "2.00am",
    },
    {
      key: "6",
      title: "Laraib khan",
      image: require("../assets/images/dp10.jpg"),
      message: "I wanted to sell plant basket. can you help!",
      time: "2.00am",
    },
    {
      key: "7",
      title: "Sana Butt",
      image: require("../assets/images/dp7.jpg"),
      message: "Did you get my post?",
      time: "2.00am",
    },
    {
      key: "8",
      title: "Sania Mirza",
      image: require("../assets/images/dp8.jpg"),
      message: "Done with your questions.",
      time: "2.00am",
    },
    {
      key: "9",
      title: "Linta Malik",
      image: require("../assets/images/dp9.jpg"),
      message: "I wanted your geyser. can you low the cost of the item.",
      time: "2.00am",
    },
 
  ]);

  const toggleSelectMessage = (message) => {
    const index = selectedMessages.findIndex(
      (selectedMessage) => selectedMessage.key === message.key
    );

    if (index !== -1) {
      // Message is already selected, so remove it from the selectedMessages array
      const updatedSelectedMessages = selectedMessages.filter(
        (selectedMessage) => selectedMessage.key !== message.key
      );
      setSelectedMessages(updatedSelectedMessages);
    } else {
      // Message is not selected, so add it to the selectedMessages array
      setSelectedMessages([...selectedMessages, message]);
    }
  };

  const deleteSelectedMessages = () => {
  const updatedMessageList = messageList.filter(
    (message) => !selectedMessages.some(
      (selectedMessage) => selectedMessage.key === message.key
    )
  );
  setSelectedMessages([]);
  setMessageList(updatedMessageList);
};


  const renderItemMessage = ({ item, index }) => {
    const isEnd = index === 0;
    const isSelected = selectedMessages.some(
      (selectedMessage) => selectedMessage.key === item.key
    );

    return (
      <View
        style={{
          borderTopColor: isEnd ? null : Colors.primary,
          borderTopWidth: isEnd ? null : 0.2,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("chatScreen")}
          onLongPress={() => toggleSelectMessage(item)}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            paddingVertical: Default.fixPadding,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flex: 8,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
            }}
          >
            {isSelected && (
              <MaterialIcons
                name="check-circle"
                size={24}
                color={Colors.primary}
                style={{ marginHorizontal: Default.fixPadding }}
              />
            )}
            <Image
              source={item.image}
              style={{ height: 50, width: 50, borderRadius: 25 }}
            />
            <View
              style={{
                marginHorizontal: Default.fixPadding * 1.5,
                alignItems: isRtl ? "flex-end" : "flex-start",
                justifyContent: "center",
              }}
            >
              <Text
                numberOfLines={1}
                style={{ ...Fonts.Medium16primary, overflow: "hidden" }}
              >
                {item.title}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.Medium14grey,
                  marginTop: Default.fixPadding * 0.5,
                  overflow: "hidden",
                }}
              >
                {item.message}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              alignItems: isRtl ? "flex-start" : "flex-end",
              marginTop: Default.fixPadding * 0.5,
            }}
          >
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Medium14grey, overflow: "hidden" }}
            >
              {item.time}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSelectDeleteBar = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: Default.fixPadding,
          paddingVertical: Default.fixPadding * 0.5,
          backgroundColor: Colors.lightGrey,
        }}
      >
        <TouchableOpacity onPress={deleteSelectedMessages}>
          <Ionicons name="trash" size={24} color={Colors.danger} />
        </TouchableOpacity>
        <Text style={{ ...Fonts.Regular16black }}>
          {selectedMessages.length} {tr("selected")}
        </Text>
        <View style={{ width: 24 }} />
      </View>
    );
  };

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
            marginRight: 225,
          }}
        >
          {tr("Messages")}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Mesaagess")}>
          <View>
            <Ionicons name="add" size={32} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {selectedMessages.length > 0 && renderSelectDeleteBar()}

      <FlatList
        data={messageList}
        renderItem={renderItemMessage}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default MessagesScreen;
