import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  BackHandler,
  Button,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import Sell from "../components/Sell";
import Buy from "../components/Buy";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation, position }) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`bookingScreen:${key}`);
  }
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
              {"Sell Zone"}
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
            <Ionicons
              name="search-outline"
              size={20}
              color={Colors.grey}
              style={{ flex: 0.7, alignSelf: "center" }}
            />
            <TextInput
              style={{
                ...Fonts.SemiBold16black,
                flex: 9.3,
                textAlign: isRtl ? "right" : "left",
                marginHorizontal: Default.fixPadding * 0.8,
              }}
              placeholder={"search Items"}
              placeholderTextColor={Colors.grey}
              selectionColor={Colors.primary}
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
                onPress={() => navigation.navigate("AddBuy")}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View flexDirection="row">
              <Ionicons name="list-circle-outline" size={32} color="white" />
              <Button
                color="#005D7A"
                title="My Items"
                onPress={() => navigation.navigate("BuyMy")}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            paddingTop: Default.fixPadding * 2,
            paddingBottom: Default.fixPadding,
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
                console.log(route.name);
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
  const title = isRtl ? "Categories" : "Listed Items";
  const title2 = isRtl ? "Listed Items" : "Categories";

  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Buy"
        component={Buy}
        options={{
          title: title,
        }}
      />
      <Tab.Screen
        name="Sell"
        component={Sell}
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
