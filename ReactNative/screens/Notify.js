import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler,
  Animated,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { SwipeListView } from "react-native-swipe-list-view";
import SnackbarToast from "../components/snackbarToast";

const NotificationScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`notificationScreen:${key}`);
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
  const [notificationToast, setNotificationToast] = useState(false);

  const onToggleSnackBarNotificationToast = () => setNotificationToast(false);

  const notificationList = [
    {
      key: "1",
      title: "Lost & Found",
      description: "Pink Bag founded on the road.",
      status: "2 min ago",
      image: require("../assets/images/bag.jpg"),
    },
    {
      key: "2",
      title: "Lost & Found",
      description: "Wallet lost on the road.",
      status: "5 min ago",
      image: require("../assets/images/wallets.jpg"),
    },
    {
      key: "3",
      title: "Suspicious Activity",
      description: "A car just pulled up in front of the building.",
      status: "6 min ago",
      image: require("../assets/images/scar.jpg"),
    },
    {
      key: "4",
      title: "Lost & Found",
      description: "Keys founded on road.",
      status: "10 min ago",
      image: require("../assets/images/key.jpg"),
    },
    {
      key: "5",
      title: "Suspicious Activity",
      description:
        "I noticed a man wearing a mask and gloves walking around the neighborhoodl.",
      status: "5 hours ago",
      image: require("../assets/images/sper.jpg"),
    },
  ];
  const rowTranslateAnimatedValues = {};
  notificationList.forEach((_, i) => {
    rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
  });

  const [listData, setListData] = useState(
    notificationList.map((NotificationItem, i) => ({
      key: `${i}`,
      title: NotificationItem.title,
      description: NotificationItem.description,
      status: NotificationItem.status,
      image: NotificationItem.image,
    }))
  );

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    if (value < -Dimensions.get("window").width) {
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        const newData = [...listData];
        const prevIndex = listData.findIndex((item) => item.key === key);
        newData.splice(prevIndex, 1);
        setListData(newData);
        setNotificationToast(true);
      });
    }
  };

  const renderItem = (data) => {
    // Inside your component or function
    const handlePress = (item) => {
      switch (data.item.key) {
        case "0":
          navigation.navigate("Losted", {
            title: "Losted",
          });
          break;
        case "1":
          navigation.navigate("wallet", {
            title: "Losted",
          });
          break;
        case "2":
          navigation.navigate("Sus");
          break;
        case "3":
          navigation.navigate("key", {
            title: "Losted",
          });
          break;
        case "4":
          navigation.navigate("Sus");
          break;
        default:
          break;
      }
    };
    return (
      <View style={{ backgroundColor: Colors.extraLightGrey }}>
        <Animated.View
          style={{
            ...Default.shadow,
            flexDirection: isRtl ? "row-reverse" : "row",
            borderRadius: 10,
            padding: Default.fixPadding * 1.5,
            marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 2,
            backgroundColor: Colors.white,
            alignItems: "center",
            ...{
              height: rowTranslateAnimatedValues[data.item.key].interpolate({
                inputRange: [0, 1],
                outputRange: [0, 100],
              }),
            },
          }}
        >
          <TouchableOpacity
            onPress={() => handlePress(data.item.TouchableOpacity)} // Add your press event handler
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                ...Default.shadow,
                height: 48,
                width: 48,
                borderRadius: 10,
                backgroundColor: Colors.white,
                justifyContent: "center",
                alignItems: "center",
                padding: Default.fixPadding,
              }}
            >
              <Image
                source={data.item.image}
                style={{ height: 28, width: 28 }}
              />
            </View>

            <View
              style={{
                marginLeft: isRtl ? 0 : Default.fixPadding * 1.5,
                marginRight: isRtl ? Default.fixPadding * 1.5 : 0,
                alignItems: isRtl ? "flex-end" : "flex-start",
                flex: 9,
              }}
            >
              <Text
                numberOfLines={1}
                style={{ ...Fonts.SemiBold16black, overflow: "hidden" }}
              >
                {data.item.title}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.Medium14Black,
                  marginVertical: Default.fixPadding * 0.3,
                  overflow: "hidden",
                }}
              >
                {data.item.description}
              </Text>
              <Text style={{ ...Fonts.Medium14grey }}>{data.item.status}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  const renderHiddenItem = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.primary,
          flex: 1,
          marginBottom: Default.fixPadding * 1.5,
        }}
      />
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
        <Text
          style={{
            ...Fonts.SemiBold18white,
            marginHorizontal: Default.fixPadding * 1.2,
          }}
        >
          {tr("Notifications")}
        </Text>
      </View>

      {listData.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons
            name="notifications-off-outline"
            size={40}
            color={Colors.grey}
          />
          <Text style={{ ...Fonts.SemiBold16grey }}>
            {tr("noNotification")}
          </Text>
        </View>
      ) : (
        <SwipeListView
          disableRightSwipe
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-Dimensions.get("window").width}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onSwipeValueChange={onSwipeValueChange}
          useNativeDriver={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: Default.fixPadding * 2 }}
        />
      )}
      <SnackbarToast
        title={tr("remove")}
        visible={notificationToast}
        onDismiss={onToggleSnackBarNotificationToast}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;
