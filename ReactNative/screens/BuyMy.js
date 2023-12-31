import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  FlatList,
  StyleSheet,
  Button,
  BackHandler,
  TextInput,
} from "react-native";

import React, { useState, useEffect } from "react";
import { Colors, Default, Fonts } from "../constants/styles";

import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { deleteSell, getSellsByUser, handleSold } from "../apis/apis";
import SellItemsList from "../components/SellItemsList";
import Loader from "../components/loader";

const { width, height } = Dimensions.get("window");

const Lostss = ({ navigation }) => {
  const [userSells, setUserSells] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelModals, setCancelModals] = useState(false);
  const [cancelToast, setCancelToast] = useState(false);
  const onToggleSnackBarCancelToast = () => setCancelToast(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpens, setDropdownOpens] = useState(false);
  const [allClear, setAllClear] = useState(false);
  const [search, setSearch] = useState();
  const [soldLoading, setSoldLoading] = useState(false);
  const [markId, setMarkId] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`Lostss:${key}`);
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

  const handleButtonPress = (buttonValue) => {
    setSelectedValue(buttonValue);
    setDropdownOpen(false);
    setDropdownOpens(false);
    setDropdownOpend(false);
    setDropdownOpendd(false);
  };

  const handleGetSells = async () => {
    try {
      setIsLoading(true);
      let result = await getSellsByUser();
      if (result.status == 200) {
        setUserSells(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetSells();
  }, []);

  const handleSolding = async () => {
    try {
      setSoldLoading(true);
      setCancelModal(false);
      let result = await handleSold({ _id: markId });
      if (result.status == 200) {
        const newData = result.data;
        const itemIndex = userSells.findIndex(
          (item) => item._id === result.data._id
        );
        if (itemIndex !== -1) {
          const updatedItems = [...userSells];
          updatedItems[itemIndex] = { ...newData };
          setUserSells(updatedItems);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSoldLoading(false);
    }
  };

  async function handleDelete() {
    try {
      setCancelModals(false);
      let result = await deleteSell({ _id: deleteId });
      if (result.status == 200) {
        const filteredArray = userSells.filter((sell) => sell._id !== deleteId);
        setUserSells(filteredArray);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

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
          {"My Items"}
        </Text>
      </View>
      {isLoading && <Loader />}
      {!isLoading && userSells.length === 0 && (
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
            <Text>{!isLoading && "No Items"}</Text>
          </View>
        </TouchableOpacity>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        {userSells.length > 0 &&
          userSells.map((sell) => (
            <SellItemsList
              key={sell._id}
              sell={sell}
              setCancelModal={setCancelModal}
              navigation={navigation}
              setCancelModals={setCancelModals}
              selectedValue={selectedValue}
              markId={markId}
              setMarkId={setMarkId}
              soldLoading={soldLoading}
              setDeleteId={setDeleteId}
            />
          ))}
        {/* Mark Sold */}
        <Modal animationType="fade" transparent={true} visible={cancelModal}>
          <TouchableOpacity
            activeOpacity={1}
            onPressOut={() => setCancelModal(false)}
            style={{ flex: 1 }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Colors.transparentBlack,
              }}
            >
              <View
                style={{
                  width: width * 0.8,
                  backgroundColor: Colors.white,
                  borderRadius: 10,
                  justifyContent: "center",
                  ...Default.shadow,
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: Default.fixPadding * 2,
                  }}
                >
                  <Text
                    style={{
                      ...Fonts.SemiBold18primary,
                      marginTop: Default.fixPadding,
                    }}
                  >
                    {"Are you sure you want to mark this item as sold?"}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      ...Fonts.SemiBold15black,
                      textAlign: "center",
                      maxWidth: "90%",
                      marginTop: Default.fixPadding * 2,
                      overflow: "hidden",
                    }}
                  ></Text>
                </View>
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                    marginTop: Default.fixPadding * 2,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      ...Default.shadow,
                      backgroundColor: Colors.primary,
                      flex: 1,
                      paddingVertical: Default.fixPadding * 1.2,
                      borderBottomLeftRadius: isRtl ? 0 : 10,
                      borderBottomRightRadius: isRtl ? 10 : 0,
                    }}
                    onPress={handleSolding}
                  >
                    <Text
                      style={{
                        ...Fonts.SemiBold18black,
                        textAlign: "center",
                      }}
                    >
                      {tr("Yes")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      ...Default.shadow,
                      backgroundColor: Colors.white,
                      flex: 1,
                      paddingVertical: Default.fixPadding * 1.2,
                      borderBottomRightRadius: isRtl ? 0 : 10,
                      borderBottomLeftRadius: isRtl ? 10 : 0,
                    }}
                    onPress={() => {
                      setCancelModal(false);
                    }}
                  >
                    <Text
                      style={{
                        ...Fonts.SemiBold18black,
                        marginHorizontal: Default.fixPadding * 1.5,
                        textAlign: "center",
                      }}
                    >
                      {tr("No")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
        <Modal animationType="fade" transparent={true} visible={cancelModals}>
          <TouchableOpacity
            activeOpacity={1}
            onPressOut={() => setCancelModals(false)}
            style={{ flex: 1 }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Colors.transparentBlack,
              }}
            >
              <View
                style={{
                  width: width * 0.8,
                  backgroundColor: Colors.white,
                  borderRadius: 10,
                  justifyContent: "center",
                  ...Default.shadow,
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: Default.fixPadding * 2,
                  }}
                >
                  <Text
                    style={{
                      ...Fonts.SemiBold18primary,
                      marginTop: Default.fixPadding,
                    }}
                  >
                    {"Are you sure you want to delete this item?"}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      ...Fonts.SemiBold15black,
                      textAlign: "center",
                      maxWidth: "90%",
                      marginTop: Default.fixPadding * 2,
                      overflow: "hidden",
                    }}
                  ></Text>
                </View>
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                    marginTop: Default.fixPadding * 2,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      ...Default.shadow,
                      backgroundColor: Colors.primary,
                      flex: 1,
                      paddingVertical: Default.fixPadding * 1.2,
                      borderBottomLeftRadius: isRtl ? 0 : 10,
                      borderBottomRightRadius: isRtl ? 10 : 0,
                    }}
                    onPress={handleDelete}
                  >
                    <Text
                      style={{
                        ...Fonts.SemiBold18black,
                        textAlign: "center",
                      }}
                    >
                      {tr("Yes")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      ...Default.shadow,
                      backgroundColor: Colors.white,
                      flex: 1,
                      paddingVertical: Default.fixPadding * 1.2,
                      borderBottomRightRadius: isRtl ? 0 : 10,
                      borderBottomLeftRadius: isRtl ? 10 : 0,
                    }}
                    onPress={() => {
                      setCancelModals(false);
                    }}
                  >
                    <Text
                      style={{
                        ...Fonts.SemiBold18black,
                        marginHorizontal: Default.fixPadding * 1.5,
                        textAlign: "center",
                      }}
                    >
                      {tr("No")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Lostss;
