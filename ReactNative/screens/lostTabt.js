import {
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import Founded from "../components/Founded";

import llost from "../components/llost";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { lostItemGetbyLoc, lostandfoundCategGet } from "../apis/apis";
import { useDispatch } from "react-redux";
import {
  clearSearch,
  handleLoader,
  handleSearchData,
  updataData,
} from "../redux/loanandfoundSlice";
import { FlatList } from "react-native-gesture-handler";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createMaterialTopTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation, position }) => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState({ name: "All", id: "123" });
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`bookingScreen:${key}`);
  }
  const handleGetlost = async () => {
    try {
      dispatch(handleLoader({ loader: true }));
      let check = state?.index == 0 ? true : false;
      let result = await lostItemGetbyLoc({
        type: check ? "lost" : "found",
        ...(selectedCat.name !== "All" && { category: selectedCat.id }),
      });

      if (result.status == 200) {
        dispatch(updataData(result.data?.data));
        // setloseandfoundData(result.data?.data)
      }
    } catch (error) {
    } finally {
      dispatch(handleLoader({ loader: false }));
    }
  };

  const handleSearch = (text) => {
    setSearchTerm(text);

    dispatch(handleSearchData(text));
  };
  useEffect(() => {
    handleGetlost();
  }, [state.index, selectedCat]);

  const handleGetCateg = async () => {
    try {
      // setFetchingCategLoader(true);
      let result = await lostandfoundCategGet();

      if (result.status == 200) {
        setCategories(result.data?.data);
      }
    } catch (error) {
    } finally {
      // setFetchingCategLoader(false);
    }
  };

  useEffect(() => {
    handleGetCateg();
  }, []);

  function handleSelectCat(name, id) {
    setSelectedCat({ name, id });
  }
  const allCat = { _id: "0", name: "All" };
  return (
    <SafeAreaView style={{ backgroundColor: Colors.extraLightGrey }}>
      <ScrollView>
        <View
          style={{
            backgroundColor: Colors.primary,
            paddingBottom: 12,
          }}
        >
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
              }}
            >
              {"Lost & Found"}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              ...Default.shadow,
              backgroundColor: Colors.white,
              flexDirection: isRtl ? "row-reverse" : "row",
              borderRadius: 5,
              padding: Default.fixPadding * 0.8,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            <Ionicons name="search" size={20} color={Colors.grey} />
            <TextInput
              value={searchTerm}
              onChangeText={handleSearch}
              placeholder="Search"
              style={{
                flex: 1,
                ...Fonts.SemiBold16grey,
                marginHorizontal: Default.fixPadding * 0.8,
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <View flexDirection="row">
              <Ionicons name="add-circle-outline" size={32} color="white" />

              <Button
                color="#005D7A"
                title="Add Items"
                onPress={() => navigation.navigate("ListItem")}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View flexDirection="row">
              <Ionicons name="list-circle-outline" size={32} color="white" />
              <Button
                color="#005D7A"
                title="My Items"
                onPress={() => navigation.navigate("YourList")}
              />
            </View>
          </View>
        </View>
        <FlatList
          style={{ marginTop: 10, paddingLeft: 15, marginRight: 25 }}
          horizontal={true}
          data={[allCat, ...categories]}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.key}
              onPress={() => {
                handleSelectCat(item.name, item._id);
              }}
            >
              <View
                style={{
                  backgroundColor:
                    selectedCat.name === item.name
                      ? Colors.primary
                      : Colors.white,

                  padding: 10,
                  margin: 5,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    color:
                      selectedCat.name === item.name
                        ? Colors.white
                        : Colors.black,
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            paddingTop: Default.fixPadding * 1,
          }}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate({ name: route.name, merge: true });
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            const inputRange = state.routes.map((_, i) => i);
            const opacity = position.interpolate({
              inputRange,
              outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
            });

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    paddingTop: Default.fixPadding * 2,
                    paddingBottom: Default.fixPadding * 1,
                    paddingLeft: Default.fixPadding * 5,
                    paddingRight: Default.fixPadding * 5,
                    fontWeight: 90,
                  }}
                >
                  <View></View>
                  <Text
                    style={
                      isFocused ? Fonts.Bold16primary : Fonts.Medium16Black
                    }
                  >
                    {label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const BookingScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`bookingScreen:${key}`);
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
  const title = isRtl ? "Found Items" : "Lost Items";
  const title2 = isRtl ? "Lost Items" : "Found Items";

  // const Tab = createBottomTabNavigator();
  // console.log("TAb :@@@@@@@@@@@@2 :",Tab)

  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="llost"
        component={llost}
        // initialParams={{data: loseandfoundData}}
        options={{
          title: title,
        }}
      />
      <Tab.Screen
        name="Founded"
        component={Founded}
        // initialParams={{data: loseandfoundData}}
        options={{
          title: title2,
        }}
      />
    </Tab.Navigator>
  );
};
export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 10,
    marginTop: 20,

    marginHorizontal: Default.fixPadding * 2,
  },
  buttonContainer: {
    width: "49%",
    color: "white",
    padding: Default.fixPadding * 1.2,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
});
