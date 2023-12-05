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
import { getConnections, getId } from "../apis/apis";
const { width } = Dimensions.get("window");
import { useFocusEffect } from "@react-navigation/native";
import Placeholder from "./Placeholders/PlaceholderConnection";
import Empty from "./EmptyConnection";

const OngoingTab = (props) => {
  const { t, i18n } = useTranslation();

  const [conLoader, setConLoader] = useState(false);
  const [connectionsData, setConnectionsData] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState("");

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`ongoingTab:${key}`);
  }
  const [cancelModal, setCancelModal] = useState(false);

  const [cancelToast, setCancelToast] = useState(false);
  const onToggleSnackBarCancelToast = () => setCancelToast(false);

  const [allClear, setAllClear] = useState(false);

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

  useFocusEffect(
    React.useCallback(() => {
      handleGetConnections();
    }, [])
  );

  useEffect(() => {
    async function getAsyncId() {
      const id = await getId();
      setLoggedInUserId(id);
    }
    getAsyncId();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      <Text style={{ marginLeft: 23, fontSize: 19, color: Colors.grey }}>
        {connectionsData && connectionsData.length} Connection
        {connectionsData.length > 1 ? "s" : ""}
      </Text>
      {conLoader && connectionsData.length === 0 && <Placeholder />}
      {!conLoader && connectionsData.length === 0 && (
        <Empty text="No Connections" marginTop={150} />
      )}
      {/* {connectionsData.length === 0 && !conLoader && (
        <View
          style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            marginTop: 10,
            marginHorizontal: 13,
            marginBottom: 7,
            borderRadius: 10,
            // overflow: "hidden",
            flexDirection: isRtl ? "row-reverse" : "row",
            paddingVertical: Default.fixPadding,
          }}
        >
          <Text
            style={{
              marginLeft: 23,
              fontSize: 19,
              color: Colors.grey,
              textAlign: "center",
            }}
          >
            No Connections Yet
          </Text>
        </View>
      )} */}
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
                  // onPress={() => props.navigation.navigate("chatScreen")}
                  onPress={() =>
                    props.navigation.navigate("ChattingScreen", {
                      user: {
                        recepientId: con._id,
                        recepientName: con.name,
                        recepientImage: con.image,
                        senderId: loggedInUserId,
                      },
                    })
                  }
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
