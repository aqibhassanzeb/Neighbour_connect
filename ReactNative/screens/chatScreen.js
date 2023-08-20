import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Button,
  image,
  Image,
  BackHandler,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import {
  Bubble,
  GiftedChat,
  Send,
  InputToolbar,
} from "react-native-gifted-chat";
import * as ImagePicker from "expo-image-picker";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const ChatScreen = (props) => {
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`chatScreen:${key}`);
  }
  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        createdAt: new Date(),
        text: "I had the craziest experience today! I lost my wallet, but luckily it got found and returned to me. It was such a relief! ",
        user: {
          _id: 1,
          name: "person1",
        },
      },

      {
        _id: 2,
        createdAt: new Date(),
        text: "Well, I retraced my steps and checked all the places I had been to earlier in the day. I even asked the store owners if anyone had turned it in. Eventually, someone found it on the sidewalk and took it to the local police station. They contacted me through the ID card in my wallet and I was able to retrieve it. ",
        user: {
          _id: 2,
          name: "person2",
        },
      },
      {
        _id: 3,
        createdAt: new Date(),
        text: "Hello, very Good morning...! let me send you room pic",
        user: {
          _id: 1,
          name: "person1",
        },
      },
      {
        _id: 4,
        createdAt: new Date(),
        text: "Hey Good morning...! Can i see your home just to get more idea for cleaning",
        user: {
          _id: 2,
          name: "person2",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View
          style={{
            height: 40,
            width: 90,
            backgroundColor: Colors.white,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              borderRadius: 3,
              marginRight: 20,
            }}
          >
            <Ionicons
              name="camera-outline"
              size={28}
              color="black"
              onPress={pickImage}
            />

            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>
          <View
            style={{
              marginRight: 9,

              borderRadius: 30,
              padding: 3,
              borderWidth: 2,
              borderColor: 140,
            }}
          >
            <Ionicons name="send" size={20} color={Colors.primary} />
          </View>
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Colors.extraLightPrimary,
            maxWidth: "70%",
            borderRadius: 10,
            padding: Default.fixPadding * 0.5,
            marginBottom: Default.fixPadding * 0.5,
            marginHorizontal: Default.fixPadding,
            ...Default.shadowPrimary,
          },
          left: {
            backgroundColor: Colors.white,
            maxWidth: "80%",
            left: -25,
            zIndex: 1,
            padding: Default.fixPadding * 0.5,
            borderRadius: 10,
            marginBottom: Default.fixPadding * 0.5,
            ...Default.shadow,
          },
        }}
        textStyle={{
          right: {
            color: Colors.black,
            fontSize: 15,
            fontFamily: "Medium",
          },
          left: {
            color: Colors.black,
            fontSize: 15,
            fontFamily: "Medium",
          },
        }}
        timeTextStyle={{
          left: {
            color: Colors.grey,
            fontSize: 12,
            fontFamily: "Medium",
          },
          right: {
            color: Colors.grey,
            fontSize: 12,
            fontFamily: "Medium",
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return (
      <View
        style={{
          height: 30,
          width: 30,
          borderRadius: 15,
          backgroundColor: Colors.transparentBlack,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FontAwesome name="angle-double-down" size={20} color={Colors.white} />
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
        }}
      >
        <View
          style={{
            flex: 9,
            flexDirection: isRtl ? "row-reverse" : "row",
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
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
            Message
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            marginHorizontal: isRtl ? Default.fixPadding * 2 : 0,
          }}
        ></View>
      </View>

      <View style={{ flex: 1 }}>
        <GiftedChat
          placeholder={tr("typeHere")}
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderBubble={renderBubble}
          alwaysShowSend
          renderSend={renderSend}
          scrollToBottom
          scrollToBottomComponent={scrollToBottomComponent}
          renderAvatar={() => (
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Profile3")}
            >
              <Image
                source={require("../assets/images/pn.jpeg")}
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: 24,
                  top: -Default.fixPadding * 9,
                  zIndex: 2,
                }}
              />
            </TouchableOpacity>
          )}
          showAvatarForEveryMessage={true}
          listViewProps={{
            showsVerticalScrollIndicator: false,
          }}
          renderInputToolbar={(props) => (
            <InputToolbar
              {...props}
              scrollToBottomComponent
              containerStyle={{
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Colors.white,
                padding: Default.fixPadding * 0.5,
                borderTopColor: Colors.white,
              }}
            />
          )}
        />

        {Platform.OS === "android" && (
          <KeyboardAvoidingView behavior="position" />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
