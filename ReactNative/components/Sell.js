import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import { useTranslation } from "react-i18next";
import { getSellCategories } from "../apis/apis";
import Loader from "./loader";
const { width } = Dimensions.get("window");

const OngoingTab = ({ navigation }) => {
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelToast, setCancelToast] = useState(false);
  const onToggleSnackBarCancelToast = () => setCancelToast(false);
  const [allClear, setAllClear] = useState(false);
  const [Categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() == "rtl";
  function tr(key) {
    return t(`ongoingTab:${key}`);
  }

  const handleGetSellCategories = async () => {
    try {
      setIsLoading(true);
      let result = await getSellCategories();
      if (result.status == 200) {
        setCategories(result.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetSellCategories();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      {isLoading && <Loader />}
      <View>
        <FlatList
          data={Categories && Categories}
          keyExtractor={(item) => item._id}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("SellCatItems", { item })}
              style={{
                ...Default.shadowPrimary,
                backgroundColor: Colors.white,
                marginLeft: Default.fixPadding * 2,
                marginRight: Default.fixPadding * 2,
                marginTop: Default.fixPadding * 1.2,
                marginBottom: Default.fixPadding * 1.2,
                flex: 1,
                overflow: "hidden",
                borderRadius: 10,
                alignItems: "center",
                paddingVertical: Default.fixPadding * 2,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ height: 35, width: 35 }}
              />
              <Text
                style={{
                  ...Fonts.SemiBold15primary,
                  marginTop: Default.fixPadding * 0.8,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default OngoingTab;

const styles = StyleSheet.create({
  container: {
    marginBottom: 100,
  },
  border: {
    backgroundColor: Colors.primary,
    width: 115,
    height: 30,
    bottom: 14,

    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderTopColor: "black",
    borderTopWidth: 1,
    borderLeftColor: "black",
    borderLeftWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 10,
  },
  text: {
    fontSize: 20,
    marginRight: 10,
    paddingLeft: 2,
    paddingRight: 9,

    color: "white",
  },
  bar: {
    width: 3,
    height: 5,
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    borderRadius: 10,
  },
  contain: {
    justifyContent: "center",
    marginLeft: 48,
  },
  selectedButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,

    borderColor: "gray",
    marginLeft: 86,
  },
  selectedButtonText: {},
  dropdown: {
    top: 1,
    marginRight: 8,
    backgroundColor: "white",
    width: 122,

    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",

    height: 42,
  },
  dropdownButtonSelected: {
    backgroundColor: "gray",
  },
  dropdownButtonText: {
    marginRight: 10,
  },
  dropdownButtons: {
    flexDirection: "row",
    alignItems: "center",
    top: 4,
    height: 42,
  },
});
