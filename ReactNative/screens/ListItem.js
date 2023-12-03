import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
  StyleSheet,
  Dimensions,
  Button,
  image,
  Modal,
  TextInput,
} from "react-native";

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Octicons from "react-native-vector-icons/Octicons";
import { Slider } from "react-native-range-slider-expo";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  lostItemGet,
  lostandfoundCategGet,
  lostandfoundCreate,
  lostandfoundUpdate,
} from "../apis/apis";
import { FontAwesome5 } from "@expo/vector-icons";
import Loader from "../components/loader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearLocation } from "../redux/loanandfoundSlice";
import { AntDesign } from "@expo/vector-icons";
import BreadCrumbs from "../components/BreadCrumbs";

const { width, height } = Dimensions.get("window");
const PayPalScreen = ({ navigation, route }) => {
  const { selectedLocation } = useSelector((state) => state.loanandfound);
  const { type } = route.params;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    name: "Category",
    _id: null,
  });
  const [categoryList, setCategoryList] = useState([]);
  const [fetchingCategLoader, setFetchingCategLoader] = useState(false);
  const [setselectedImages, setSetselectedImages] = useState(null);
  const [handleLoading, setHandleLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateHandle, setUpdateHandle] = useState(false);

  const [dropdownOpens, setDropdownOpens] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState("Type");

  const [dropdownOpensd, setDropdownOpensd] = useState(false);
  const [selectedOptionsd, setSelectedOptionsd] = useState("Visibility");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const handleOptionSelectsd = (option) => {
    setSelectedOptionsd(option);
    setDropdownOpensd(false);
  };
  const [checked, setChecked] = useState(false);
  const { t, i18n } = useTranslation();
  const [selectedValue, setSelectedValue] = useState("");

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`payPalScreen:${key}`);
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

  const [date, setDate] = useState();
  const [calendarModal, setCalendarModel] = useState(false);
  const today = moment().format("YYYY-MM-DD");
  const [finalDate, setFinalDate] = useState();
  console.log(finalDate);

  const handleConfirmCalendar = (date) => {
    setFinalDate(date);
  };

  const confirmDate = () => {
    let tempDate = date.toString().split(" ");
    return date !== "" ? `${tempDate[2]} ${tempDate[1]} ${tempDate[3]}` : "";
  };

  const handleGetCateg = async () => {
    try {
      setFetchingCategLoader(true);
      let result = await lostandfoundCategGet();

      if (result.status == 200) {
        setCategoryList(result.data?.data);
      }
    } catch (error) {
    } finally {
      setFetchingCategLoader(false);
    }
  };

  useEffect(() => {
    handleGetCateg();
  }, []);

  const pickImageAsync = async () => {
    if (selectedImages.length >= 3) {
      alert("You can select a maximum of three images.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setSelectedImages([...selectedImages, result.assets[0]]);
    } else {
      alert("You did not select any image.");
    }
  };

  const handleImageRemove = (index) => {
    const updatedImages = selectedImages.filter((uri, i) => i !== index);
    setSelectedImages(updatedImages);
  };

  const validateForm = () => {
    if (selectedImages.length === 0) {
      alert("Please select at least one picture.");
      return false;
    }
    if (title.trim() === "") {
      alert("Please enter a title.");
      return false;
    }
    if (selectedOption.name == "Category") {
      alert("Please select category.");
      return false;
    }
    if (!date) {
      alert("Please select date.");
      return false;
    }
    if (description.trim() == "") {
      alert("Please enter a description.");
      return false;
    }
    if (selectedOptionsd == "Visibility") {
      alert("Please select a visibility.");
      return false;
    }
    return true;
  };
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (validateForm()) {
      const formData = new FormData();
      selectedImages.slice(0, 3).forEach((media) => {
        const extension = media.uri.split(".").pop();
        const type = `${media.type}/${extension}`;
        const name = media.uri.split("/").pop();
        formData.append("photos", {
          uri: media.uri,
          type,
          name,
        });
      });
      formData.append("title", title);
      formData.append("category", selectedOption._id);
      formData.append("description", description);
      formData.append("date", finalDate.toString());
      const mapLocation = {
        ...selectedLocation.coordinate,
        name: selectedLocation.name,
      };
      formData.append("location", JSON.stringify(mapLocation));
      formData.append("type", type);
      formData.append("visibility", selectedOptionsd);
      formData.append("notify", checked);

      try {
        setHandleLoading(true);
        let response = await lostandfoundCreate(formData);
        if (response.status === 200) {
          dispatch(clearLocation());
          navigation.navigate("LostPosted");
        }
      } catch (error) {
        console.log("Error While Posting...", error);
      } finally {
        setHandleLoading(false);
      }
    }
  };

  // const handleGetfoundandlostItem = async () => {
  //   try {
  //     setHandleLoading(true);
  //     let paylaod = {};
  //     paylaod._id = route.params.itemId;
  //     let result = await lostItemGet(paylaod);

  //     if (result.status == 200) {
  //       let itemData = result.data.data[0];
  //       console.log("item data :", itemData);
  //       setUpdateHandle(true);
  //       setFormData({
  //         ...formData,
  //         title: itemData.title,
  //         description: itemData.description,
  //       });
  //       handleOptionSelect({
  //         name: itemData.category?.name,
  //         _id: itemData.category?._id,
  //       });
  //       handleOptionSelects(itemData.type);
  //       handleOptionSelectsd(itemData.visibility);
  //       setChecked(itemData.notify);
  //       setDate(itemData.date);
  //       // setData(result.data.data[0])
  //     }
  //   } catch (error) {
  //     alert("something went wrong!");
  //   } finally {
  //     setHandleLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   !!route.params?.itemId && handleGetfoundandlostItem();
  // }, [route.params]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      {handleLoading && <Loader />}
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
          {updateHandle ? "Update Item" : "Add Item"}
        </Text>
      </View>
      <BreadCrumbs>
        <AntDesign name="right" size={18} color="#9ca3af" />
        <TouchableOpacity
          onPress={() => navigation.navigate("lostTabt")}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <Text> Lost & Found</Text>
        </TouchableOpacity>
        <AntDesign name="right" size={18} color="#9ca3af" />
        <Text
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            color: Colors.primary,
            fontWeight: "bold",
          }}
        >
          Add Activity
        </Text>
      </BreadCrumbs>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <TouchableOpacity onPress={pickImageAsync}>
            <Ionicons name="ios-camera" size={80} color="grey" />
          </TouchableOpacity>
          {/* <ScrollView horizontal style={{ marginBottom: 10 }}>
        {selectedImages.map((uri, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              // Implement any action you want when an image is tapped here
              console.log('Image tapped:', uri);
            }}
          >
            <Image
              source={{ uri: uri }}
              style={{ width: 200, height: 200, marginRight: 10, borderRadius: 10 }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView> */}
          {/* {setselectedImages && <Image source={{ uri: setselectedImages }} style={{ width: 200, height: 200 }} />} */}
        </View>
        <View
          style={{
            marginHorizontal: Default.fixPadding * 2,
            //  marginVertical: Default.fixPadding * 2,
          }}
        >
          <Text
            style={{
              color: Colors.grey,
              marginLeft: 135,
            }}
          >
            Upload Pictures
          </Text>
          <ScrollView horizontal style={{ marginBottom: 10, marginTop: 10 }}>
            {selectedImages.map((uri, index) => (
              <View
                key={index}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <TouchableOpacity
                  onPress={() => handleImageRemove(index)}
                  style={{ marginRight: 10 }}
                >
                  <Image
                    source={{ uri: uri.uri }}
                    style={{ width: 200, height: 200, borderRadius: 10 }}
                  />
                  <FontAwesome5
                    name="times-circle" // Use the FontAwesome5 cross icon
                    size={24}
                    color="red"
                    style={{
                      position: "absolute",
                      top: -1,
                      right: -1,
                      zIndex: 1,
                    }}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <View
            style={{
              ...Default.shadow,
              borderRadius: 10,
              backgroundColor: Colors.white,
              padding: Default.fixPadding * 1.5,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginTop: Default.fixPadding * 3,
            }}
          >
            <Ionicons
              name="person"
              color={Colors.grey}
              size={20}
              style={{
                flex: 0.7,
              }}
            />
            <TextInput
              placeholder={tr("Title")}
              placeholderTextColor={Colors.grey}
              selectionColor={Colors.primary}
              // maxLength={16}
              style={{
                ...Fonts.Medium16Black,
                flex: 9.3,
                marginHorizontal: Default.fixPadding,
                textAlign: isRtl ? "right" : "left",
              }}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
          </View>

          <View
            style={{
              ...Default.shadow,
              borderRadius: 10,
              backgroundColor: Colors.white,
              padding: Default.fixPadding * 1.5,
              flexDirection: isRtl ? "row-reverse" : "row",

              //  alignItems: "center",
              marginTop: Default.fixPadding * 3,
            }}
          >
            <View>
              <Ionicons
                name="ios-folder-open-outline"
                color={Colors.grey}
                size={20}
                style={{
                  flex: 0.7,
                }}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingRight: 1,
                  color: "grey",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 15,
                  }}
                >
                  <Text
                    style={{
                      marginTop: 3,
                      color: "grey",
                    }}
                  >
                    {selectedOption.name}
                  </Text>
                  <View
                    style={{
                      color: "grey",

                      position: "absolute",
                      marginLeft: 290,
                    }}
                  >
                    <Ionicons
                      name={dropdownOpen ? "chevron-up" : "chevron-down"}
                      size={24}
                      color="grey"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {dropdownOpen && (
            <View style={styles.dropdowns}>
              {categoryList.length > 0 &&
                categoryList.map((elm) => (
                  <TouchableOpacity
                    key={elm._id}
                    onPress={() => handleOptionSelect(elm)}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#e2e8f0",
                      paddingVertical: 2,
                    }}
                  >
                    <Text style={{ padding: 10 }}>{elm.name} </Text>
                  </TouchableOpacity>
                ))}
              {/* <TouchableOpacity
                onPress={() => handleOptionSelect({ name: "Other", _id: null })}
              >
                <Text style={{ padding: 10 }}>Other </Text>
              </TouchableOpacity> */}
              {/* <TouchableOpacity onPress={() => handleOptionSelect('Pet ')}>
            <Text style={{ padding: 10 }}>Pet</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelect('Electronics')}>
            <Text style={{ padding: 10 }}>Electronics</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelect('Accessories')}>
            <Text style={{ padding: 10 }}>Accessories</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelect('Document')}>
            <Text style={{ padding: 10 }}>Document</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelect('Other')}>
            <Text style={{ padding: 10 }}>Other</Text>
          </TouchableOpacity> */}
            </View>
          )}

          <View
            style={{
              ...Default.shadow,
              borderRadius: 10,
              backgroundColor: Colors.white,
              paddingLeft: Default.fixPadding * 1.5,
              paddingBottom: 21,
              flexDirection: isRtl ? "row-reverse" : "row",

              //  alignItems: "center",
              marginTop: Default.fixPadding * 3,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={
                  {
                    // ...Fonts.SemiBold16black,
                    //extAlign: isRtl ? "right" : "left",
                  }
                }
              ></Text>

              <TouchableOpacity
                onPress={() => setCalendarModel(true)}
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                }}
              >
                <Octicons
                  name="calendar"
                  size={18}
                  color={Colors.grey}
                  style={{ flex: 1.5 }}
                />
                <View style={{ flex: 23.5, paddingLeft: 8 }}>
                  {date ? (
                    <Text
                      //   numberOfLines={1}
                      style={{
                        //  ...Fonts.SemiBold14black,
                        textAlign: isRtl ? "right" : "left",
                        overflow: "hidden",
                      }}
                    >
                      {confirmDate()}
                    </Text>
                  ) : (
                    <Text
                      numberOfLines={2}
                      style={{
                        paddingLeft: 7,
                        ...Fonts.SemiBold14grey,
                        overflow: "hidden",
                        textAlign: isRtl ? "right" : "left",
                      }}
                    >
                      Date
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              ...Default.shadow,
              borderRadius: 10,
              backgroundColor: Colors.white,
              padding: Default.fixPadding * 1.5,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginTop: Default.fixPadding * 3,
              textAlign: isRtl ? "right" : "left",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Locate", { title: "LostAndFound" })
              }
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
              }}
            >
              <SimpleLineIcons
                name="location-pin"
                size={18}
                color={Colors.grey}
                style={
                  {
                    //  flex: 0.6,
                  }
                }
              />

              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                }}
              >
                <Text
                  numberOfLines={2}
                  style={{
                    ...Fonts.SemiBold14grey,
                    overflow: "hidden",
                    textAlign: isRtl ? "right" : "left",
                    paddingLeft: 21,
                  }}
                >
                  {selectedLocation?.name ? selectedLocation.name : "Location"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              ...Default.shadow,
              borderRadius: 10,
              backgroundColor: Colors.white,
              padding: Default.fixPadding * 1.5,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginTop: Default.fixPadding * 3,
            }}
          >
            <Ionicons
              name="document-text-outline"
              color={Colors.grey}
              size={20}
              style={{
                flex: 0.7,
              }}
            />
            <TextInput
              placeholder={tr("Description")}
              placeholderTextColor={Colors.grey}
              selectionColor={Colors.primary}
              maxLength={100}
              style={{
                ...Fonts.Medium16Black,
                flex: 9.3,
                marginHorizontal: Default.fixPadding,
                textAlign: isRtl ? "right" : "left",
              }}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
          <View
            style={{
              ...Default.shadow,
              borderRadius: 10,
              backgroundColor: Colors.white,
              padding: Default.fixPadding * 1.5,
              flexDirection: isRtl ? "row-reverse" : "row",

              //  alignItems: "center",
              marginTop: Default.fixPadding * 3,
            }}
          >
            <View>
              <Ionicons
                name="ios-eye"
                color={Colors.grey}
                size={20}
                style={{
                  flex: 0.7,
                }}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => setDropdownOpensd(!dropdownOpensd)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingRight: 1,
                  color: "grey",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 15,
                  }}
                >
                  <Text
                    style={{
                      marginTop: 3,
                      color: "grey",
                      textTransform: "capitalize",
                    }}
                  >
                    {selectedOptionsd}
                  </Text>
                  <View
                    style={{
                      color: "grey",

                      position: "absolute",
                      marginLeft: 290,
                    }}
                  >
                    <Ionicons
                      name={dropdownOpensd ? "chevron-up" : "chevron-down"}
                      size={24}
                      color="grey"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {dropdownOpensd && (
            <View style={styles.dropdown}>
              <TouchableOpacity
                onPress={() => handleOptionSelectsd("neighborhood")}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#e2e8f0",
                  paddingVertical: 2,
                }}
              >
                <Text style={{ padding: 10 }}>Neighborhood </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleOptionSelectsd("connection")}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#e2e8f0",
                  paddingVertical: 2,
                }}
              >
                <Text style={{ padding: 10 }}>Connection</Text>
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              //  ...Default.shadow,
              //  borderRadius: 10,
              //  backgroundColor: Colors.white,
              //  padding: Default.fixPadding * 1.5,
              flexDirection: isRtl ? "row-reverse" : "row",
              //  alignItems: "center",
              marginTop: Default.fixPadding * 3,
            }}
          >
            <TouchableOpacity onPress={() => setChecked(!checked)}>
              <View style={styles.checkbox}>
                {checked ? (
                  <Ionicons name="checkmark-outline" size={24} color="green" />
                ) : (
                  <Ionicons name="square-outline" size={24} color="black" />
                )}
              </View>
            </TouchableOpacity>

            <Text
              style={{
                ...Fonts.Medium16Black,
                flex: 9.3,
                color: "black",
                top: 8,
                marginHorizontal: Default.fixPadding,
                textAlign: isRtl ? "right" : "left",
              }}
            >
              Notify
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: Default.fixPadding * 2,
            padding: Default.fixPadding * 1.2,
            marginHorizontal: Default.fixPadding * 2,
            marginBottom: 20,
          }}
        >
          <Text style={{ ...Fonts.SemiBold18white }}>
            {updateHandle ? "Update" : "Post"}
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={calendarModal}
          onRequestClose={() => {
            setCalendarModel(false);
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPressOut={() => setCalendarModel(false)}
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
                  width: width / 1.1,
                  backgroundColor: Colors.white,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  ...Default.shadow,
                }}
              >
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                  }}
                >
                  <View style={{ flex: 0.7 }} />
                  <View
                    style={{
                      flex: 8.6,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ ...Fonts.SemiBold18black }}>
                      Select Date
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setCalendarModel(false)}
                    style={{
                      alignSelf: "flex-end",
                      padding: Default.fixPadding * 0.5,
                      flex: 0.7,
                    }}
                  >
                    <Ionicons name="close" size={25} color={Colors.grey} />
                  </TouchableOpacity>
                </View>

                <CalendarPicker
                  onDateChange={handleConfirmCalendar}
                  selectedDayColor={Colors.lightPrimary}
                  selectedDayTextColor={Colors.primary}
                  textStyle={{ color: Colors.black }}
                  todayBackgroundColor={Colors.white}
                  dayShape="square"
                  nextComponent={
                    <Ionicons
                      name="chevron-forward"
                      size={30}
                      color={Colors.grey}
                      style={{ marginHorizontal: Default.fixPadding }}
                    />
                  }
                  previousComponent={
                    <Ionicons
                      name="chevron-back"
                      size={30}
                      color={Colors.grey}
                      style={{ marginHorizontal: Default.fixPadding }}
                    />
                  }
                  minDate={today}
                />

                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                    padding: Default.fixPadding,
                    alignSelf: "flex-end",
                  }}
                >
                  <TouchableOpacity onPress={() => setCalendarModel(false)}>
                    <Text style={{ ...Fonts.SemiBold16grey }}>
                      {tr("cancel")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setDate(finalDate);
                      setCalendarModel(false);
                    }}
                  >
                    <Text
                      style={{
                        ...Fonts.SemiBold16primary,
                        marginLeft: Default.fixPadding * 2,
                        marginRight: Default.fixPadding * 2,
                      }}
                    >
                      {tr("ok")}
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

export default PayPalScreen;
const styles = StyleSheet.create({
  checkbox: {
    //  borderWidth: 1,
    //borderColor: 'gray',
    // borderRadius: 4,
    padding: 4,
  },

  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    //  borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: "#ccc",
    justifyContent: "space-between",
    color: "grey",
  },
  dropdownText: {
    fontSize: 20,
    marginRight: 8,
    color: "grey",

    flexDirection: "row",
  },
  dropdownItems: {
    borderWidth: 4,
    borderRadius: 5,
    borderColor: "#ccc",
    marginTop: 5,
    flexDirection: "column",
    width: 150,
  },
  dropdownItem: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: 150,
    flexDirection: "column",
  },
  dropdowns: {
    backgroundColor: "#fafafa",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    zIndex: 21,
  },
  dropdownsd: {
    width: 390,
    height: 80,
    backgroundColor: "#fafafa",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    paddingRight: 100,
    zIndex: 21,
  },

  dropdown: {
    backgroundColor: "#fafafa",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    zIndex: 21,
  },
});
