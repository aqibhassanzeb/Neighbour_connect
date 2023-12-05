import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  FlatList,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import { useTranslation } from "react-i18next";
import { getAllItems, getSellsByCategory } from "../apis/apis";
const { width } = Dimensions.get("window");
import Ionicons from "react-native-vector-icons/Ionicons";
import Loader from "../components/loader";
import moment from "moment";

const OngoingTab = ({ navigation, route }) => {
  const { item } = route.params;

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() == "rtl";
  function tr(key) {
    return t(`ongoingTab:${key}`);
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

  const handleGetSellsByCategory = async () => {
    try {
      setIsLoading(true);
      let result = await getSellsByCategory({ id: item._id });
      if (result.status == 200) {
        setItems(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetSellsByCategory();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      <FlatList
        data={items}
        numColumns={2}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={() => (
          <>
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
                  {item.name}
                </Text>
              </View>
            </View>
            {!isLoading && items.length === 0 && (
              <TouchableOpacity
                style={{
                  ...Default.shadow,
                  backgroundColor: Colors.white,
                  marginTop: 30,
                  marginHorizontal: 13,
                  //    marginBottom: 27,
                  borderRadius: 10,
                  // overflow: "hidden",
                  flexDirection: isRtl ? "row-reverse" : "row",
                  paddingVertical: Default.fixPadding,
                }}
              >
                <View
                  style={{
                    flex: 2,
                    //  paddingHorizontal: Default.fixPadding * 1.5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>{!isLoading && "No Items Yet"}</Text>
                </View>
              </TouchableOpacity>
            )}
            {isLoading && <Loader />}
          </>
        )}
        renderItem={({ item }) => (
          <View
            style={{
              marginLeft: 20,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                marginBottom: Default.fixPadding * 2,
                marginTop: Default.fixPadding,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("BuyDetails", {
                    item,
                  })
                }
                style={{
                  borderRadius: 10,
                }}
              >
                <View style={styles.container}>
                  <Image
                    source={{ uri: item.images[0] }}
                    style={{
                      height: 165,
                      width: 175,
                      ...Default.shadow,
                      borderRadius: 20,
                    }}
                  />
                  {item.is_sold && (
                    <View style={styles.tagContainer}>
                      <Text style={styles.tag}>Sold</Text>
                    </View>
                  )}
                </View>

                <View></View>
                <Text
                  style={{
                    fontSize: 16,
                    paddingLeft: 3,
                    fontWeight: "bold",
                    width: 170,
                    marginTop: 10,
                  }}
                >
                  {item.title}
                </Text>
                <Text style={{ fontSize: 16, paddingLeft: 4 }}>
                  RS {item.price}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text>
                    <Ionicons name="time-outline" size={15} />
                  </Text>
                  <Text style={{ fontSize: 13 }}>
                    {" "}
                    {moment(item.createdAt).fromNow()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
