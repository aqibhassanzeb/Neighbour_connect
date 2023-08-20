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
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import {
  addSell,
  getSellCategories,
  updateSell,
  updateSellImages,
} from "../apis/apis";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { clearLocation } from "../redux/loanandfoundSlice";
import Loader from "../components/loader";

const { width, height } = Dimensions.get("window");
const PayPalScreen = ({ navigation, route }) => {
  const { selectedLocation } = useSelector((state) => state.loanandfound);
  const { data } = route.params;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(data.category.name);
  const [dropdownOpens, setDropdownOpens] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [selectedOptions, setSelectedOptions] = useState("Notify");
  const [dropdownOpensd, setDropdownOpensd] = useState(false);
  const [selectedOptionsd, setSelectedOptionsd] = useState(
    data.selected_visibility
  );
  const [description, setDescription] = useState(data.description);
  const [Categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState();
  const [calendarModal, setCalendarModel] = useState(false);
  const today = moment().format("YYYY-MM-DD");
  const [finalDate, setFinalDate] = useState();
  const [selectedImages, setSelectedImages] = useState([]);
  const [price, setPrice] = useState(data.price);
  const [modalVisible, setModalVisible] = useState(false);
  const { t, i18n } = useTranslation();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const handleOptionSelects = (option) => {
    setSelectedOptions(option);
    setDropdownOpens(false);
  };

  const handleOptionSelectsd = (option) => {
    setSelectedOptionsd(option);
    setDropdownOpensd(false);
  };

  const handlePriceChange = (price) => {
    if (/^\d*\.?\d{0,2}/.test(price)) {
      // validate input is a valid number with max 2 decimal places
      setPrice(price);
      setModalVisible(false); // close modal after selection
    }
  };

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

  const handleConfirmCalendar = (date) => {
    setFinalDate(date);
  };

  const confirmDate = () => {
    let tempDate = date.toString().split(" ");
    return date !== "" ? `${tempDate[2]} ${tempDate[1]} ${tempDate[3]}` : "";
  };

  const pickImageAsync = async () => {
    if (selectedImages.length >= 3) {
      alert("You can select a maximum of three images.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages([...selectedImages, result.assets[0]]);
    } else {
      alert("You did not select any image.");
    }
  };

  const dispatch = useDispatch();

  const handleUpdate = async () => {
    const newData = {
      _id: data._id,
      title,
      category: selectedOption._id,
      description: description,
      price,
      selected_visibility: selectedOptionsd,
    };
    if (selectedLocation.name) {
      newData.location = {
        ...selectedLocation.coordinate,
        name: selectedLocation.name,
      };
    }

    try {
      setIsLoading(true);
      let response = await updateSell(newData);

      if (response.status === 200) {
        dispatch(clearLocation());
        navigation.navigate("SkillUpdated", { title: "Sell" });
      }
    } catch (error) {
      console.log("Error updating skill", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageRemove = (index) => {
    const updatedImages = selectedImages.filter((uri, i) => i !== index);
    setSelectedImages(updatedImages);
  };

  const onTimeSelected = (event, value) => {
    setTimeModal(false);
    setTime(value);
    setSelectedTime(true);
  };

  const confirmTime = (time) => {
    return `${time.getHours()}:${time.getMinutes()} `;
  };

  const handleGetCategories = async () => {
    try {
      let result = await getSellCategories();
      if (result.status == 200) {
        setCategories(result.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleUpdateImages = async () => {
    const formData = new FormData();

    selectedImages.slice(0, 3).forEach((image, index) => {
      const extension = image.uri.split(".").pop();
      const type = `${image.type}/${extension}`;
      const name = image.uri.split("/").pop();
      formData.append("images", {
        uri: image.uri,
        type,
        name,
      });
    });

    try {
      setIsLoading(true);
      let response = await updateSellImages({ formData, id: data._id });
      console.log({ response });
      if (response.status === 200) {
        navigation.navigate("SkillUpdated");
      }
    } catch (error) {
      console.log("Error updating skill", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      {isLoading && <Loader />}
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
          {"Edit Item"}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {selectedImages.length === 0 && (
          <ScrollView horizontal style={{ margin: 10 }}>
            {data.images.map((uri, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 5,
                }}
              >
                <Image
                  source={{ uri: uri }}
                  style={{ width: 150, height: 150, borderRadius: 10 }}
                />
              </View>
            ))}
          </ScrollView>
        )}
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
        </View>
        <ScrollView horizontal style={{ margin: 10 }}>
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
                  style={{ width: 150, height: 150, borderRadius: 10 }}
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
            marginHorizontal: Default.fixPadding * 2,
            //  marginVertical: Default.fixPadding * 2,
          }}
        >
          {selectedImages.length === 0 && (
            <Text
              style={{
                color: Colors.black,
                marginLeft: 135,
              }}
            >
              Update Pictures
            </Text>
          )}
          {selectedImages.length > 0 && (
            <TouchableOpacity
              onPress={() => handleUpdateImages()}
              style={{
                backgroundColor: Colors.primary,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: Default.fixPadding * 2,
                padding: Default.fixPadding * 0.5,
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              <Text style={{ ...Fonts.SemiBold18white }}>Update Picture</Text>
            </TouchableOpacity>
          )}
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
          <View>
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
                          color: "black",
                        }}
                      >
                        {selectedOption}
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
            </View>
            {dropdownOpen && (
              <View style={styles.dropdown}>
                {Categories.length > 0 &&
                  Categories.map((cat) => (
                    <TouchableOpacity
                      key={cat._id}
                      onPress={() => handleOptionSelect(cat)}
                    >
                      <Text style={{ padding: 10 }}>{cat.name}</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            )}
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
              onPress={() => navigation.navigate("Locate", { title: "Sell" })}
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
              }}
            >
              <SimpleLineIcons
                name="location-pin"
                size={18}
                color={Colors.grey}
                style={{
                  marginRight: 12,
                }}
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
                    // paddingLeft: 21,
                  }}
                >
                  {selectedLocation.name
                    ? selectedLocation.name
                    : data?.location?.name}
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
              value={description}
              placeholder={tr("Description")}
              onChangeText={(text) => setDescription(text)}
              placeholderTextColor={Colors.grey}
              selectionColor={Colors.primary}
              style={{
                ...Fonts.Medium16Black,
                flex: 9.3,
                marginHorizontal: Default.fixPadding,
                textAlign: isRtl ? "right" : "left",
              }}
            />
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
              name="md-pricetag"
              color={Colors.grey}
              size={20}
              style={{
                flex: 0.7,
              }}
            />
            <TextInput
              keyboardType="numeric"
              onChangeText={handlePriceChange}
              value={price}
              placeholder="Price "
              placeholderTextColor={Colors.grey}
              selectionColor={Colors.primary}
              style={{
                ...Fonts.Medium16Black,
                flex: 9.3,
                marginHorizontal: Default.fixPadding,
                textAlign: isRtl ? "right" : "left",
              }}
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
                      color: "black",
                    }}
                  >
                    {selectedOptionsd}
                  </Text>
                  <View
                    style={{
                      color: "black",

                      position: "absolute",
                      marginLeft: 290,
                    }}
                  >
                    <Ionicons
                      name={dropdownOpensd ? "chevron-up" : "chevron-down"}
                      size={24}
                      color="black"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {dropdownOpensd && (
            <View style={styles.dropdowns}>
              <TouchableOpacity
                onPress={() => handleOptionSelectsd("Neighborhood ")}
              >
                <Text style={{ padding: 10 }}>Neighborhood </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleOptionSelectsd("Connection ")}
              >
                <Text style={{ padding: 10 }}>Connection</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={() => handleUpdate()}
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: Default.fixPadding * 2,
            padding: Default.fixPadding * 1.2,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <Text style={{ ...Fonts.SemiBold18white }}>{tr("Update")}</Text>
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
                      {tr("selectDate")}
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

  dropdown: {
    width: 390,
    height: 390,
    backgroundColor: "#fafafa",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    paddingRight: 100,
    zIndex: 21,
  },
  dropdowns: {
    width: 390,
    height: 90,
    backgroundColor: "#fafafa",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    paddingRight: 100,
    zIndex: 21,
  },
});
