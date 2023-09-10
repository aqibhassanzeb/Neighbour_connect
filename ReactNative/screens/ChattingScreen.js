import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageLoading from "../assets/images/image_loading.jpeg";
import { deleteMessages, getMessages, socketUrl } from "../apis/apis";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../constants/styles";
import { generateRoomId } from "../utils";
import io from "socket.io-client";
import axios from "axios";
import { UPLOAD_PRESET, CLOUD_NAME } from "../config";

const ChatMessagesScreen = ({ route }) => {
  const { user } = route.params;
  const { senderId: userId, recepientId, recepientName, recepientImage } = user;
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [recepientData, setRecepientData] = useState();
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState("");
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const scrollViewRef = useRef(null);
  const roomId = generateRoomId(userId, recepientId);
  //TR
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() == "rtl";
  function tr(key) {
    return t(`chatScreen:${key}`);
  }

  useEffect(() => {
    const newSocket = io(socketUrl);
    newSocket.emit("join", roomId);
    setSocket(newSocket);
    newSocket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  const handleContentSizeChange = () => {
    scrollToBottom();
  };

  const fetchMessages = async () => {
    try {
      const response = await getMessages({ userId, recepientId });

      if (response.status === 200) {
        setMessages(response.data);
      } else {
        console.log("error showing messags", response.status.message);
      }
    } catch (error) {
      console.log("error fetching messages", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  async function uploadImageToCloudinary(image) {
    setImageLoading(true);
    try {
      const formData = new FormData();
      const extension = image.uri.split(".").pop();
      const type = `${image.type}/${extension}`;
      const name = image.uri.split("/").pop();
      formData.append("file", {
        uri: image.uri,
        type,
        name,
      });
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("cloud_name", CLOUD_NAME);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (data) =>
            setProgress(Math.round((data.loaded / data.total) * 100)),
        }
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setImageLoading(false);
    }
  }

  const handleSend = async (messageType, image) => {
    try {
      if (socket) {
        if (messageType === "image") {
          const imageUrl = await uploadImageToCloudinary(image);
          const socketMessage = {
            senderId: userId,
            recepientId: recepientId,
            messageType: "image",
            imageUrl,
          };
          socket.emit("message", roomId, socketMessage);
        } else {
          const socketMessage = {
            senderId: userId,
            recepientId: recepientId,
            messageType,
            messageText: message,
          };
          socket.emit("message", roomId, socketMessage);
          setMessage("");
        }
      }
    } catch (error) {
      console.log("error in sending the message", error);
    }
  };

  const handleDeleteMessages = async (messageIds) => {
    try {
      const messages = JSON.stringify({ messages: messageIds });
      const response = await deleteMessages(messages);

      if (response.status === 200) {
        setSelectedMessages((prevSelectedMessages) =>
          prevSelectedMessages.filter((id) => !messageIds.includes(id))
        );

        fetchMessages();
      } else {
        console.log("error deleting messages", response.status);
      }
    } catch (error) {
      console.log("error deleting messages", error);
    }
  };

  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });

    if (!result.canceled) {
      handleSend("image", result.assets[0]);
    }
  };

  const handleSelectMessage = (message) => {
    //check if the message is already selected
    const isSelected = selectedMessages.includes(message._id);

    if (isSelected) {
      setSelectedMessages((previousMessages) =>
        previousMessages.filter((id) => id !== message._id)
      );
    } else {
      setSelectedMessages((previousMessages) => [
        ...previousMessages,
        message._id,
      ]);
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
      <View
        style={{
          paddingVertical: Default.fixPadding * 1.2,
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          backgroundColor: Colors.primary,
        }}
      >
        <View
          style={{
            flex: 9,
            flexDirection: isRtl ? "row-reverse" : "row",
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name={isRtl ? "arrow-forward" : "arrow-back"}
              size={25}
              color={Colors.white}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <Image
              style={{ height: 30, width: 30, borderRadius: 75 }}
              source={{ uri: recepientImage }}
            />
            <Text
              style={{
                ...Fonts.SemiBold18white,
                marginHorizontal: Default.fixPadding * 1.2,
              }}
            >
              {recepientName}
            </Text>
          </View>
          {selectedMessages.length > 0 && (
            <TouchableOpacity
              onPress={() => handleDeleteMessages(selectedMessages)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 70,
              }}
            >
              <MaterialIcons name="delete" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        onContentSizeChange={handleContentSizeChange}
      >
        {messages.map((item, index) => {
          if (item.messageType === "text") {
            const isSelected = selectedMessages.includes(item._id);
            return (
              <Pressable
                onLongPress={() => handleSelectMessage(item)}
                delayLongPress={200}
                key={index}
                style={[
                  item?.senderId === userId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#DCF8C6",
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "white",
                        padding: 8,
                        margin: 10,
                        borderRadius: 7,
                        maxWidth: "60%",
                      },

                  isSelected && { width: "100%", backgroundColor: "#F0FFFF" },
                ]}
              >
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: isSelected ? "right" : "left",
                  }}
                >
                  {item?.message}
                </Text>
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 12,
                    color: "gray",
                    marginTop: 5,
                  }}
                >
                  {formatTime(item.timeStamp)}
                </Text>
              </Pressable>
            );
          }

          if (item.messageType === "image") {
            return (
              <Pressable
                key={index}
                style={[
                  item?.senderId === userId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#DCF8C6",
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "white",
                        padding: 8,
                        margin: 10,
                        borderRadius: 7,
                        maxWidth: "60%",
                      },
                ]}
              >
                <View>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{ width: 200, height: 200, borderRadius: 7 }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                    }}
                  >
                    {formatTime(item?.timeStamp)}
                  </Text>
                </View>
              </Pressable>
            );
          }
        })}
        {imageLoading && (
          <View
            style={{
              alignSelf: "flex-end",
              backgroundColor: "#DCF8C6",
              padding: 8,
              maxWidth: "60%",
              borderRadius: 7,
              margin: 10,
            }}
          >
            <Image
              style={{
                width: 200,
                height: 200,
                borderRadius: 7,
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
              source={ImageLoading}
            />
            <Text
              style={{
                fontSize: 15,
                color: "white",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: [{ translateX: -30 }, { translateY: -10 }],
              }}
            >
              Uploading {progress} %
            </Text>
          </View>
        )}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#dddddd",
          marginBottom: 25,
        }}
      >
        {/* <Entypo
          onPress={handleEmojiPress}
          style={{ marginRight: 5 }}
          name="emoji-happy"
          size={24}
          color="gray"
        /> */}

        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Type Your message..."
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            marginHorizontal: 8,
          }}
        >
          <TouchableOpacity onPress={pickImage}>
            <Entypo name="camera" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => handleSend("text")}
          style={{
            backgroundColor: Colors.primary,
            padding: 10,
            borderRadius: 75,
          }}
        >
          <Ionicons name="send" size={15} color="white" />
          {/* <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text> */}
        </TouchableOpacity>
      </View>

      {/* {showEmojiSelector && (
        <EmojiSelector
          onEmojiSelected={(emoji) => {
            setMessage((prevMessage) => prevMessage + emoji);
          }}
          style={{ height: 250 }}
        />
      )} */}
    </SafeAreaView>
  );
};

export default ChatMessagesScreen;

const styles = StyleSheet.create({});
