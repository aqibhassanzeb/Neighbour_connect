import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import { useTranslation } from "react-i18next";
import Losted from "../screens/Losted";
import { getAllItems } from "../apis/apis";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setItems, setSearchResults } from "../redux/globalSlice";
import { debounce } from "../utils";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
const { width } = Dimensions.get("window");

const OngoingTab = (props) => {
  const { filteredSellZoneItems } = useSelector((state) => state.global);

  const [cancelModal, setCancelModal] = useState(false);
  const [cancelToast, setCancelToast] = useState(false);
  const onToggleSnackBarCancelToast = () => setCancelToast(false);
  const [allClear, setAllClear] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() == "rtl";
  function tr(key) {
    return t(`ongoingTab:${key}`);
  }

  const dispatch = useDispatch();

  const handleGetItems = async () => {
    try {
      setIsLoading(true);
      let result = await getAllItems();
      if (result.status == 200) {
        dispatch(setItems(result.data));
        dispatch(setSearchResults(""));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetItems();
    }, [])
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      {filteredSellZoneItems.length === 0 && (
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
            <Text>No Result Found</Text>
          </View>
        </TouchableOpacity>
      )}
      <FlatList
        data={filteredSellZoneItems || []}
        numColumns={2}
        keyExtractor={(item) => item._id}
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
                  props.navigation.navigate("BuyDetails", {
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
                  style={{ fontSize: 16, paddingLeft: 3, fontWeight: "bold" }}
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
