import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Pressable,
  BackHandler,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors, Default, Fonts } from "../constants/styles";
import { useTranslation } from "react-i18next";
import { deleteChat, getChats } from "../apis/apis";
import { useEffect } from "react";
import Loader from "../components/loader";
import { extractTime } from "../utils";
import { useFocusEffect } from "@react-navigation/native";

const MessagesScreen = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();
  const { userId } = route.params;

  const isRtl = i18n.dir() == "rtl";
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatList, setChatList] = useState([]);

  function tr(key) {
    return t(`messagesScreen:${key}`);
  }

  const [messageList, setMessageList] = useState([]);

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

  const backAction = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const renderItemMessage = ({ item, index }) => {
    const isEnd = index === 0;
    const isSelected = selectedMessages.some(
      (selectedMessage) => selectedMessage._id === item._id
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
          onPress={() =>
            navigation.navigate("ChattingScreen", {
              user: {
                recepientId: item._id,
                recepientName: item.name,
                recepientImage: item.image,
                senderId: userId,
              },
            })
          }
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
              source={{ uri: item.image }}
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
                {item.name}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.Medium14grey,
                  marginTop: Default.fixPadding * 0.5,
                  overflow: "hidden",
                }}
              >
                {item.lastMessage}
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
              {item.lastMessage === "Empty Chat, Join Now"
                ? ""
                : extractTime(item.timeStamp)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const handleGetChats = async () => {
    try {
      setIsLoading(true);
      let result = await getChats();
      if (result.status == 200) {
        setMessageList(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   handleGetChats();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleGetChats();
    }, [])
  );

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
        <TouchableOpacity onPress={handleDeleteMessages}>
          <Ionicons name="trash" size={24} color={Colors.danger} />
        </TouchableOpacity>
        <Text style={{ ...Fonts.Regular16black }}>
          {selectedMessages.length} {tr("selected")}
        </Text>
        <View style={{ width: 24 }} />
      </View>
    );
  };

  const handleDeleteMessages = async () => {
    try {
      const response = await deleteChat({
        recepientId: selectedMessages[0]._id,
      });

      if (response.status === 200) {
        handleGetChats();
        setSelectedMessages([]);
      } else {
        console.log("error deleting messages", response.status);
      }
    } catch (error) {
      console.log("error deleting messages", error);
    }
  };

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
        <TouchableOpacity
          onPress={() => navigation.navigate("Mesaagess", { userId })}
        >
          <View>
            <Ionicons name="add" size={32} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {selectedMessages.length > 0 && renderSelectDeleteBar()}

      <FlatList
        ListHeaderComponent={
          <Text
            style={{
              top: 23,
              left: 20,
              fontSize: 23,
              fontWeight: 900,
              marginBottom: 30,
            }}
          >
            Chats
          </Text>
        }
        data={messageList}
        renderItem={renderItemMessage}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default MessagesScreen;
