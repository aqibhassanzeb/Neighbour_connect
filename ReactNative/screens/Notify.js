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
import { useFocusEffect } from "@react-navigation/native";
import { deleteNotifications, getNotifications } from "../apis/apis";
import moment from "moment";
import Loader from "../components/loader";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useGetUser from "../components/useGetUser";

const NotificationScreen = ({ navigation }) => {
  const { queryParams } = useSelector((state) => state.notifications);
  const user = useGetUser();

  const { t, i18n } = useTranslation();

  const [notificationList, setNotificationList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notificationToast, setNotificationToast] = useState(false);
  const [listData, setListData] = useState([]);
  const [deletedNotification, setDeletedNotification] = useState("");
  const [query, setQuery] = useState("");

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`notificationScreen:${key}`);
  }

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  // useEffect(() => {
  //   const queryParams = [
  //     lost && "lost=true",
  //     suspicious && "suspicious=true",
  //     sell && "sell=true",
  //     forum && "forum=true",
  //   ]
  //     .filter(Boolean)
  //     .join("&");

  //   setQuery(queryParams);
  // }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const onToggleSnackBarNotificationToast = () => setNotificationToast(false);

  const rowTranslateAnimatedValues = {};

  notificationList.forEach((_, i) => {
    rowTranslateAnimatedValues[_._id] = new Animated.Value(1);
  });

  const formateData = notificationList.map((not) => {
    return {
      key: not._id,
      description: not.title,
      title: not.description,
      image: not.image,
      status: moment(not?.createdAt).fromNow(),
      post: { ...not.post_id, posted_by: not.posted_by },
    };
  });

  useEffect(() => {
    setListData(formateData);
  }, [notificationList]);

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
        setDeletedNotification(key);
      });
    }
  };

  const renderItem = (data) => {
    const handleNavigation = (value) => {
      switch (value) {
        case "lost & found":
          return "lostTabt";
        case "suspicious activity":
          return "Sus";
        case "neighbor forum":
          return "Form";
        case "skill sharing":
          return "SkillSharing";
        case "neighbor trade":
          return "BuySell";
        default:
          return;
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
            // ...{
            //   height: rowTranslateAnimatedValues[data.item.key].interpolate({
            //     inputRange: [0, 1],
            //     outputRange: [0, 100],
            //   }),
            // },
          }}
        >
          <TouchableOpacity
            onPress={() =>
              // navigation.navigate(handleNavigation(data.item.title))
              {
                if (data.item.title === "lost & found") {
                  navigation.navigate("Losted", {
                    _id: data.item.post._id,
                    userId: user._id,
                  });
                } else if (data.item.title === "suspicious activity") {
                  console.log(data.item.post);
                  navigation.navigate("SusItem", {
                    post: data.item.post,
                    userId: user._id,
                    user,
                  });
                }
              }
            }
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
                source={{ uri: data.item.image }}
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
                style={{
                  ...Fonts.SemiBold16black,
                  overflow: "hidden",
                  textTransform: "capitalize",
                }}
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

  const handleGetNotifications = async () => {
    try {
      setIsLoading(true);
      console.log(queryParams);
      let result = await getNotifications(queryParams);
      if (result.status == 200) {
        setNotificationList(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetNotifications();
    }, [queryParams])
  );

  const handleDelete = async () => {
    try {
      if (deletedNotification.length > 0) {
        await deleteNotifications({
          notification_id: deletedNotification,
        });
      }
    } catch (error) {
      console.log("Error While Deleting", error);
    }
  };

  useEffect(() => {
    handleDelete();
  }, [deletedNotification]);

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
      {isLoading && <Loader />}
      {notificationList.length === 0 ? (
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
