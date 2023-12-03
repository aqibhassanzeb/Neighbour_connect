import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  StyleSheet,
  Button,
  Image,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getCategories } from "../apis/apis";
import Loader from "../components/loader";
import BreadCrumbs from "../components/BreadCrumbs";
import { AntDesign } from "@expo/vector-icons";
import Placeholder from "../components/Placeholders/PlaceholderFour";

const ServicesScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const [Categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const isRtl = i18n.dir() == "rtl";

  const backAction = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  function tr(key) {
    return t(`SkillShared:${key}`);
  }

  const handleGetCategories = async () => {
    try {
      setIsLoading(true);
      let result = await getCategories();
      if (result.status == 200) {
        setCategories(result.data.data);
        setFilteredCategories(result.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);

    if (text === "") {
      setFilteredCategories(Categories); // Reset to the original list
    } else {
      const filtered = Categories.filter((category) =>
        category.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
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
              {"Skills Hub"}
            </Text>
          </View>
          <View
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
            <KeyboardAvoidingView>
              <TextInput
                placeholder="Search"
                style={{
                  ...Fonts.SemiBold16grey,
                  marginHorizontal: Default.fixPadding * 0.8,
                  width: 300,
                  flex: 1,
                }}
                value={search}
                onChangeText={(text) => handleSearch(text)}
              />
            </KeyboardAvoidingView>
          </View>
        </View>
        <BreadCrumbs>
          <AntDesign name="right" size={18} color="#9ca3af" />
          <Text
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              color: Colors.primary,
              fontWeight: "bold",
            }}
          >
            Skills Hub
          </Text>
        </BreadCrumbs>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <View flexDirection="row">
              <Ionicons name="add-circle-outline" size={32} color="white" />

              <Button
                color="#005D7A"
                title="Add Skills"
                onPress={() => navigation.navigate("AddSkills")}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View flexDirection="row">
              <Ionicons name="list-circle-outline" size={32} color="white" />
              <Button
                color="#005D7A"
                title="My Skills"
                onPress={() => navigation.navigate("MySkills")}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            paddingTop: Default.fixPadding * 2.5,
            paddingLeft: Default.fixPadding * 2.5,
            paddingRight: Default.fixPadding * 5,
            fontWeight: 90,
            paddingBottom: 20,
          }}
        >
          <Text
            style={{
              ...Fonts.Bold16primary,
              textDecorationLine: "underline",
            }}
          >
            Categories
          </Text>
        </View>
      </>
      {isLoading && filteredCategories.length === 0 && <Placeholder />}
      <View>
        <FlatList
          data={filteredCategories && filteredCategories}
          keyExtractor={(item) => item._id}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("SkillShared", { item })}
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
        {filteredCategories.length === 0 && !isLoading && (
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
      </View>
    </SafeAreaView>
  );
};

export default ServicesScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 10,
    marginTop: 10,

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
