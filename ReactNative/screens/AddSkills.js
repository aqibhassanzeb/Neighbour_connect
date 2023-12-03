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
  Modal,
  TextInput,
  Alert,
} from "react-native";

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { FontAwesome5 } from "@expo/vector-icons";
import Loader from "../components/loader";
import { addSkill, getCategories } from "../apis/apis";
import { useDispatch, useSelector } from "react-redux";
import { clearLocation } from "../redux/loanandfoundSlice";
import { AntDesign } from "@expo/vector-icons";
import BreadCrumbs from "../components/BreadCrumbs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");
const Checkbox = ({ label, onChange, checked }) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onChange}>
      <Ionicons
        name={checked ? "checkbox" : "checkbox-outline"}
        size={24}
        color={checked ? "black" : "black"}
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const PayPalScreen = ({ navigation }) => {
  const { selectedLocation } = useSelector((state) => state.loanandfound);

  const [checkedValues, setCheckedValues] = useState([]);
  const [image, setImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Category");
  const [showCustomOption, setShowCustomOption] = useState(false);
  const [customOption, setCustomOption] = useState("");
  const [dropdownOpens, setDropdownOpens] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState("Skill Level");
  const [dropdownOpensds, setDropdownOpensds] = useState(false);
  const [selectedOptionsds, setSelectedOptionsds] = useState("Days");
  const [dropdownOpensd, setDropdownOpensd] = useState(false);
  const [selectedOptionsd, setSelectedOptionsd] = useState("Visibility");
  const [price, setPrice] = useState("");
  const [priceUnit, setPriceUnit] = useState("Per /");
  const [priceUnitDropdown, setPriceUnitDropdown] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState();
  const [time, setTime] = useState(new Date());
  const [timeModal, setTimeModal] = useState(false);
  const [endTime, setEndTime] = useState(new Date());
  const [endTimeModal, setEndTimeModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState(false);
  const [selectedEndTime, setSelectedEndTime] = useState(false);
  const [value, setValue] = useState(0);
  const [date, setDate] = useState();
  const [calendarModal, setCalendarModel] = useState(false);
  const [finalDate, setFinalDate] = useState();
  const [description, setDescription] = useState("");
  const [Categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeDetails, setTimeDetails] = useState({});
  const [days, setDays] = useState([]);

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const handleCheckboxChange = (value) => {
    if (checkedValues.includes(value)) {
      setCheckedValues(checkedValues.filter((item) => item !== value));
    } else {
      setCheckedValues([...checkedValues, value]);
    }
  };

  const handleOptionSelect = (option) => {
    if (option === "Others") {
      setShowCustomOption(true); // Show the custom option TextInput
      setSelectedOption(option);
      setDropdownOpen(false);
    } else {
      setSelectedOption(option);
      setDropdownOpen(false); // Close the dropdown for other options
      setShowCustomOption(false); // Hide the custom option TextInput
    }
  };

  const handleOptionSelects = (option) => {
    setSelectedOptions(option);
    setDropdownOpens(false);
  };

  const handlePriceOption = (option) => {
    setPriceUnit(option);
    setPriceUnitDropdown(false);
  };
  const handleOptionSelectsd = (option) => {
    setSelectedOptionsd(option);
    setDropdownOpensd(false);
  };

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`payPalScreen:${key}`);
  }

  const backAction = () => {
    dispatch(clearLocation());
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

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
  const handlePost = async () => {
    if (selectedImages.length === 0) {
      Alert.alert("Error", "Image Is Required", [
        { text: "OK", onPress: () => {} },
      ]);
    } else if (
      !selectedOption._id ||
      !description ||
      !priceUnit ||
      !selectedOptions ||
      !price
    ) {
      Alert.alert("Error", "Please Fill All Fields", [
        { text: "OK", onPress: () => {} },
      ]);
    } else {
      const valid = validateDays();
      if (valid) {
        const formData = new FormData();
        selectedImages.slice(0, 3).forEach((image) => {
          const extension = image.uri.split(".").pop();
          const type = `${image.type}/${extension}`;
          const name = image.uri.split("/").pop();
          formData.append("photos", {
            uri: image.uri,
            type,
            name,
          });
        });

        formData.append("category", selectedOption._id);
        formData.append("description", description);
        formData.append("skill_level", selectedOptions);
        formData.append("days", JSON.stringify(days));
        formData.append("price", price);
        formData.append("price_unit", priceUnit);
        formData.append("selected_visibility", selectedOptionsd);
        const mapLocation = {
          ...selectedLocation.coordinate,
          name: selectedLocation.name,
        };
        formData.append("location", JSON.stringify(mapLocation));

        try {
          setIsLoading(true);
          let response = await addSkill(formData);

          if (response.status === 200) {
            dispatch(clearLocation());
            navigation.navigate("SkillPosted");
          }
        } catch (error) {
          console.log("Error While Posting", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handleImageRemove = (index) => {
    const updatedImages = selectedImages.filter((uri, i) => i !== index);
    setSelectedImages(updatedImages);
  };

  const today = moment().format("YYYY-MM-DD");

  const handleConfirmCalendar = (date) => {
    setFinalDate(date);
  };

  const handleGetCategories = async () => {
    try {
      let result = await getCategories();
      if (result.status == 200) {
        setCategories(result.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  function setDayTime(value) {
    const { nativeEvent, type } = value;

    if (type === "dismissed") {
      setTimeModal(false);
    } else if (type === "set") {
      setTimeModal(false);

      const updatedDays = days.map((day) => {
        if (day.name === timeDetails.day) {
          if (timeDetails.type === "startHours") {
            return { ...day, startHours: nativeEvent.timestamp };
          } else if (timeDetails.type === "endHours") {
            return { ...day, endHours: nativeEvent.timestamp };
          }
        } else {
          return day;
        }
      });

      const dayExists = updatedDays.some((day) => day.name === timeDetails.day);

      if (!dayExists) {
        const newDay = {
          name: timeDetails.day,
          startHours:
            timeDetails.type === "startHours"
              ? nativeEvent.timestamp
              : undefined,
          endHours:
            timeDetails.type === "endHours" ? nativeEvent.timestamp : undefined,
        };

        updatedDays.push(newDay);
      }

      setDays(updatedDays);
    }
  }

  function showStartValue(dayName) {
    const foundDay = days.find((day) => day.name === dayName);
    return foundDay && foundDay.startHours
      ? moment(foundDay.startHours).format("LT")
      : false;
  }

  function showEndValue(dayName) {
    const foundDay = days.find((day) => day.name === dayName);
    return foundDay && foundDay.endHours
      ? moment(foundDay.endHours).format("LT")
      : false;
  }

  function validateDays() {
    let errorMessages = "";
    for (const day of checkedValues) {
      const dayEntry = days.find((entry) => entry.name === day);
      if (!dayEntry) {
        errorMessages += `Empty Start & End Hour for ${day}\n`;
      } else {
        if (dayEntry.startHours === undefined) {
          errorMessages += `Empty Start Hour for ${day}\n `;
        }
        if (dayEntry.endHours === undefined) {
          errorMessages += `Empty End Hour for ${day}\n`;
        }
      }
    }
    if (errorMessages !== "") {
      Alert.alert("Error", errorMessages, [{ text: "OK", onPress: () => {} }]);
      return false;
    }
    return true;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      {isLoading && <Loader />}
      {/* Title Bar  */}
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
          {"Add Skill"}
        </Text>
      </View>
      <BreadCrumbs>
        <AntDesign name="right" size={18} color="#9ca3af" />
        <TouchableOpacity
          onPress={() => navigation.navigate("SkillSharing")}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <Text> Skills Hub</Text>
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
          Add Skill
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
        </View>
        <View>
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
                    {selectedOption.name ? selectedOption.name : "Category"}
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
            <View style={styles.dropdownsd}>
              {Categories.length > 0 &&
                Categories.map((cat) => (
                  <TouchableOpacity
                    key={cat._id}
                    onPress={() => handleOptionSelect(cat)}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#e2e8f0",
                      paddingVertical: 2,
                    }}
                  >
                    <Text style={{ padding: 10 }}>{cat.name}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}
          {showCustomOption && (
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
              <TextInput
                value={customOption}
                onChangeText={(text) => setCustomOption(text)}
                placeholder="Enter your skill name"
                style={{ paddingHorizontal: 10 }}
              />
            </View>
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
              textAlign: isRtl ? "right" : "left",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("Locate")}
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

              //  alignItems: "center",
              marginTop: Default.fixPadding * 3,
            }}
          >
            <View>
              <Ionicons
                name="options-outline"
                color={Colors.grey}
                size={20}
                style={{
                  flex: 0.7,
                }}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => setDropdownOpens(!dropdownOpens)}
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
                    {selectedOptions}
                  </Text>
                  <View
                    style={{
                      color: "grey",

                      position: "absolute",
                      marginLeft: 290,
                    }}
                  >
                    <Ionicons
                      name={dropdownOpens ? "chevron-up" : "chevron-down"}
                      size={24}
                      color="grey"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {dropdownOpens && (
            <View style={styles.dropdowns}>
              <TouchableOpacity
                onPress={() => handleOptionSelects("Skilled ")}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#e2e8f0",
                  paddingVertical: 2,
                }}
              >
                <Text style={{ padding: 10 }}>Skilled </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleOptionSelects("Semi Skilled ")}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#e2e8f0",
                  paddingVertical: 2,
                }}
              >
                <Text style={{ padding: 10 }}>Semi Skilled</Text>
              </TouchableOpacity>
            </View>
          )}
          {/* Price & Unit */}
          <View style={{ flexDirection: "row", gap: 15 }}>
            <View
              style={{
                ...Default.shadow,
                borderRadius: 10,
                backgroundColor: Colors.white,
                padding: Default.fixPadding * 1.5,
                flexDirection: isRtl ? "row-reverse" : "row",
                marginTop: Default.fixPadding * 3,
                width: 200,
                height: 53,
              }}
            >
              <View>
                <Ionicons
                  name="md-pricetag"
                  color={Colors.grey}
                  size={20}
                  style={{
                    flex: 0.7,
                    marginRight: 14,
                  }}
                />
              </View>
              <View>
                <TextInput
                  keyboardType="numeric"
                  placeholder="Price (Rs)"
                  placeholderTextColor={"gray"}
                  onChangeText={(text) => setPrice(text)}
                  style={{ width: 150 }}
                />
              </View>
            </View>
            <View>
              <View
                style={{
                  ...Default.shadow,
                  borderRadius: 10,
                  backgroundColor: Colors.white,
                  padding: Default.fixPadding * 1.5,
                  flexDirection: isRtl ? "row-reverse" : "row",
                  marginTop: Default.fixPadding * 3,
                  width: 165,
                }}
              >
                <TouchableOpacity
                  onPress={() => setPriceUnitDropdown(!priceUnitDropdown)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingRight: 1,
                    color: "grey",
                    width: 150,
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
                      {priceUnit}
                    </Text>
                    <View
                      style={{
                        color: "grey",

                        position: "absolute",
                        marginLeft: 290,
                      }}
                    >
                      <Ionicons
                        name={priceUnitDropdown ? "chevron-up" : "chevron-down"}
                        size={24}
                        color="grey"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              {priceUnitDropdown && (
                <View style={styles.dropdowns}>
                  <TouchableOpacity
                    onPress={() => handlePriceOption("Hour")}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#e2e8f0",
                      paddingVertical: 2,
                    }}
                  >
                    <Text style={{ padding: 10 }}>Hour</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handlePriceOption("Day")}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#e2e8f0",
                      paddingVertical: 2,
                    }}
                  >
                    <Text style={{ padding: 10 }}>Day</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handlePriceOption("Task")}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#e2e8f0",
                      paddingVertical: 2,
                    }}
                  >
                    <Text style={{ padding: 10 }}>Task</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handlePriceOption("Item")}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#e2e8f0",
                      paddingVertical: 2,
                    }}
                  >
                    <Text style={{ padding: 10 }}>Item</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handlePriceOption("Project")}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#e2e8f0",
                      paddingVertical: 2,
                    }}
                  >
                    <Text style={{ padding: 10 }}>Project</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          {/* <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => setTimeModal(true)}
              style={{
                ...Default.shadow,
                borderRadius: 10,
                backgroundColor: Colors.white,
                padding: Default.fixPadding * 1.5,
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
                marginTop: Default.fixPadding * 3,
                paddingRight: 140,
              }}
            >
              <MaterialIcons
                name="access-time"
                size={20}
                color={Colors.grey}
                style={{ flex: 1.5 }}
              />
              <View style={{ flex: 8.5 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    ...(selectedTime
                      ? Fonts.SemiBold14black
                      : Fonts.SemiBold14grey),
                    overflow: "hidden",
                    textAlign: isRtl ? "right" : "left",
                  }}
                >
                  {selectedTime ? formatTime(time) : "Start Hours"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {timeModal && (
            <DateTimePicker
              value={time}
              mode={"time"}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              // is24Hour={true}
              onChange={onTimeSelected}
            />
          )}
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => setEndTimeModal(true)}
              style={{
                ...Default.shadow,
                borderRadius: 10,
                backgroundColor: Colors.white,
                padding: Default.fixPadding * 1.5,
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
                marginTop: Default.fixPadding * 3,
                paddingRight: 140,
              }}
            >
              <MaterialIcons
                name="access-time"
                size={20}
                color={Colors.grey}
                style={{ flex: 1.5 }}
              />
              <View style={{ flex: 8.5 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    ...(selectedEndTime
                      ? Fonts.SemiBold14black
                      : Fonts.SemiBold14grey),
                    overflow: "hidden",
                    textAlign: isRtl ? "right" : "left",
                  }}
                >
                  {selectedEndTime ? formatTime(endTime) : "End Hours"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {endTimeModal && (
            <DateTimePicker
              value={endTime}
              mode={"time"}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              // is24Hour={true}
              onChange={onEndTimeSelect}
            />
          )} */}
          {/* Description */}
          <View
            style={{
              ...Default.shadow,
              borderRadius: 10,
              backgroundColor: Colors.white,
              padding: Default.fixPadding * 1.5,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginTop: Default.fixPadding * 3,
              height: 53,
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
              onChangeText={(text) => setDescription(text)}
              placeholderTextColor={Colors.grey}
              selectionColor={Colors.primary}
              style={{
                flex: 9.3,
                marginHorizontal: Default.fixPadding,
                textAlign: isRtl ? "right" : "left",
              }}
            />
          </View>
          {/* Days */}
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
                name="sunny"
                color={Colors.grey}
                size={20}
                style={{
                  flex: 0.7,
                }}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => setDropdownOpensds(!dropdownOpensds)}
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
                    {selectedOptionsds}
                  </Text>
                  <View
                    style={{
                      color: "grey",

                      position: "absolute",
                      marginLeft: 290,
                    }}
                  >
                    <Ionicons
                      name={dropdownOpensds ? "chevron-up" : "chevron-down"}
                      size={24}
                      color="grey"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {dropdownOpensds && (
            <View style={styles.dropdownsds}>
              <View style={styles.container}>
                <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      paddingBottom: 10,
                    }}
                  >
                    Select Days:
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      paddingBottom: 10,
                      marginLeft: 80,
                    }}
                  >
                    Start Hour
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      paddingBottom: 10,
                      marginLeft: 25,
                    }}
                  >
                    End Hour
                  </Text>
                </View>
                {DAYS.map((day) => (
                  <View key={day}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Checkbox
                        label={day}
                        checked={checkedValues.includes(day)}
                        onChange={() => handleCheckboxChange(day)}
                      />
                      <View style={{ flexDirection: "row", gap: 20 }}>
                        <TouchableOpacity
                          onPress={() => {
                            if (checkedValues.includes(day)) {
                              setTimeModal(true);
                              setTimeDetails({ day, type: "startHours" });
                            } else {
                              Alert.alert("Error", `${day} is not selected`, [
                                { text: "OK", onPress: () => {} },
                              ]);
                            }
                          }}
                          style={{ flexDirection: "row", gap: 3 }}
                        >
                          <MaterialIcons
                            name="access-time"
                            size={20}
                            color={Colors.grey}
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              color: showStartValue(day) ? "black" : "gray",
                              fontSize: 14,
                            }}
                          >
                            {showStartValue(day)
                              ? showStartValue(day)
                              : "00:00"}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            if (checkedValues.includes(day)) {
                              setTimeModal(true);
                              setTimeDetails({ day, type: "endHours" });
                            } else {
                              Alert.alert("Error", `${day} is not selected`, [
                                { text: "OK", onPress: () => {} },
                              ]);
                            }
                          }}
                          style={{ flexDirection: "row", gap: 3 }}
                        >
                          <MaterialIcons
                            name="access-time"
                            size={20}
                            color={Colors.grey}
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              color: showEndValue(day) ? "black" : "gray",
                              fontSize: 14,
                            }}
                          >
                            {showEndValue(day) ? showEndValue(day) : "00:00"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        height: 2,
                        backgroundColor: "lightgray",
                        marginVertical: 10,
                      }}
                    />
                  </View>
                ))}
                {console.log({ timeModal })}
                {timeModal && (
                  <DateTimePicker
                    value={new Date()}
                    onChange={(value) => setDayTime(value)}
                    mode="time"
                  />
                )}
                {/* <Checkbox
                  label="Tuesday"
                  checked={checkedValues.includes("Tuesday")}
                  onChange={() => handleCheckboxChange("Tuesday")}
                />
                <Checkbox
                  label="Wednesday"
                  checked={checkedValues.includes("Wednesday")}
                  onChange={() => handleCheckboxChange("Wednesday")}
                />
                <Checkbox
                  label="Thursday"
                  checked={checkedValues.includes("Thursday")}
                  onChange={() => handleCheckboxChange("Thursday")}
                />
                <Checkbox
                  label="Friday"
                  checked={checkedValues.includes("Friday")}
                  onChange={() => handleCheckboxChange("Friday")}
                />
                <Checkbox
                  label="Saturday"
                  checked={checkedValues.includes("Saturday")}
                  onChange={() => handleCheckboxChange("Saturday")}
                />
                <Checkbox
                  label="Sunday"
                  checked={checkedValues.includes("Sunday")}
                  onChange={() => handleCheckboxChange("Sunday")}
                /> */}
              </View>
            </View>
          )}
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
            <View style={styles.dropdowns}>
              <TouchableOpacity
                onPress={() => handleOptionSelectsd("Neighborhood ")}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#e2e8f0",
                  paddingVertical: 2,
                }}
              >
                <Text style={{ padding: 10 }}>Neighborhood </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleOptionSelectsd("Connection ")}
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
        </View>

        {/* Post Button */}
        <TouchableOpacity
          onPress={handlePost}
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 2,
            padding: Default.fixPadding * 1.2,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <Text style={{ ...Fonts.SemiBold18white }}>{tr("Add")}</Text>
        </TouchableOpacity>

        {/* calendarModal */}
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

  dropdownButton: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 5,
  },
  dropdownButtonText: {
    fontSize: 18,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#000",
    opacity: 0.3,
  },
  modalCloseButton: {
    color: "black",
    fontSize: 18,
    marginBottom: 10,
  },
  modalContent: {
    backgroundColor: "#black",
    borderRadius: 5,
    padding: 10,
  },
  modalItem: {
    fontSize: 18,
    padding: 10,
  },
  container: {
    margin: 20,
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  dropdownsd: {
    backgroundColor: "#fafafa",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    zIndex: 21,
  },
  dropdowns: {
    backgroundColor: "#fafafa",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    zIndex: 21,
  },
  dropdownsds: {
    backgroundColor: "#fafafa",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    zIndex: 21,
  },
});
