import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  FlatList,
  Modal,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import SnackbarToast from "./snackbarToast";
import Losted from "../screens/Losted";
import { getConnections } from "../apis/apis";
const { width } = Dimensions.get("window");
import { useFocusEffect } from "@react-navigation/native";

const OngoingTab = (props) => {
  const { t, i18n } = useTranslation();

  const [conLoader, setConLoader] = useState(false);
  const [connectionsData, setConnectionsData] = useState([]);

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`ongoingTab:${key}`);
  }
  const [cancelModal, setCancelModal] = useState(false);

  const [cancelToast, setCancelToast] = useState(false);
  const onToggleSnackBarCancelToast = () => setCancelToast(false);

  const [allClear, setAllClear] = useState(false);

  const messageList = [
    {
      key: "1",
      title: "Cody Fisher",
      image: require("../assets/images/pic1.png"),
      message: "Can i come to your home",
      time: "2.00am",
    },
    {
      key: "2",
      title: "Albert Flores",
      image: require("../assets/images/pic2.png"),
      message: "hey there! how are you?",
      time: "9.00am",
    },
    {
      key: "3",
      title: "Devon Lane",
      image: require("../assets/images/pic3.png"),
      message: "whats happening?",
      time: "1.00am",
    },
    {
      key: "4",
      title: "Albert Flores",
      image: require("../assets/images/pic4.png"),
      message: "Will you be there?",
      time: "3.00am",
    },
    {
      key: "5",
      title: "Marvin McKinney",
      image: require("../assets/images/pic5.png"),
      message: "Can i see your home",
      time: "5.00pm",
    },
    {
      key: "6",
      title: "Jerome Bell",
      image: require("../assets/images/pic6.png"),
      message: "Hello, how are you today?",
      time: "6.00pm",
    },
    {
      key: "7",
      title: "Robert Fox",
      image: require("../assets/images/pic7.png"),
      message: "I am not able to provide that information",
      time: "10.00am",
    },
    {
      key: "8",
      title: "Annette Black",
      image: require("../assets/images/pic8.png"),
      message:
        "Thank you for your patience. Our team is still investigating the issue and will update you as soon as possible",
      time: "12.00am",
    },
    {
      key: "9",
      title: "Jerome Bell",
      image: require("../assets/images/pic9.png"),
      message:
        "I'm sorry, I don't understand what you mean. Could you please rephrase your question",
      time: "3.00pm",
    },
    {
      key: "10",
      title: "Jerome Bell",
      image: require("../assets/images/pic10.png"),
      message:
        "Could you please provide more information about the issue you are experiencing?",
      time: "4.00am",
    },
    {
      key: "11",
      title: "Guy Hawkins",
      image: require("../assets/images/pic11.png"),
      message:
        "I'm sorry, I can't help you with that. Is there anything else I can assist you with?",
      time: "11.00am",
    },
    {
      key: "12",
      title: "Leslie Alexander",
      image: require("../assets/images/pic12.png"),
      message: "Hello, how are you today?",
      time: "7.00pm",
    },
    {
      key: "13",
      title: "Jeklin Shah",
      image: require("../assets/images/pic13.png"),
      message: "Can you tell me",
      time: "4.00am",
    },
  ];

  const renderItemMessage = ({ item, index }) => {
    const isEnd = index === 0;
    return (
      <View
        style={{
          borderTopColor: isEnd ? null : Colors.primary,
          borderTopWidth: isEnd ? null : 0.2,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate("chatScreen")}
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
            <Image
              source={require("../assets/images/pic1.png")}
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
                Annette Black
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
            <TouchableOpacity
              numberOfLines={1}
              style={{ ...Fonts.Medium14grey, overflow: "hidden" }}
            >
              <Ionicons name="chatbubble-outline" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const handleGetConnections = async () => {
    try {
      setConLoader(true);
      let result = await getConnections();
      if (result.status == 200) {
        setConnectionsData(result.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setConLoader(false);
    }
  };

  // useEffect(() => {
  //   handleGetConnections();
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      handleGetConnections();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      <Text style={{ marginLeft: 23, fontSize: 19, color: Colors.grey }}>
        {connectionsData && connectionsData.length} connections
      </Text>
      <View
        style={{
          borderTopColor: Colors.primary,
          borderTopWidth: 0.2,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        {connectionsData &&
          connectionsData.map((con) => (
            <TouchableOpacity
              key={con._id}
              onPress={() =>
                props.navigation.navigate("Profile3", { user: con })
              }
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
                <Image
                  source={{
                    uri: con.image,
                  }}
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
                    {con.name}
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
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("chatScreen")}
                  numberOfLines={1}
                  style={{ ...Fonts.Medium14grey, overflow: "hidden" }}
                >
                  <Ionicons name="chatbubble-outline" size={30} color="black" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </SafeAreaView>
  );
};

export default OngoingTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tagContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "red",
    padding: 5,
    borderTopLeftRadius: 30,
    width: 60,
  },
  tag: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
