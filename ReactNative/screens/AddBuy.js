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
} from "react-native";

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { Colors, Default, Fonts, screenHeight } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { addSell, getSellCategories } from "../apis/apis";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { clearLocation } from "../redux/loanandfoundSlice";
import Loader from "../components/loader";
import { AntDesign } from "@expo/vector-icons";
import BreadCrumbs from "../components/BreadCrumbs";
import { ImagePicker } from "expo-image-multiple-picker";
import ImagePickerHeader from "../components/ImagePickerHeader";
import ImagePickerAlbum from "../components/ImagePickerAlbum";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const PayPalScreen = ({ navigation }) => {
  const { selectedLocation } = useSelector((state) => state.loanandfound);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Category");
  const [dropdownOpens, setDropdownOpens] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedOptions, setSelectedOptions] = useState("Notify");
  const [dropdownOpensd, setDropdownOpensd] = useState(false);
  const [selectedOptionsd, setSelectedOptionsd] = useState("Visibility");
  const [description, setDescription] = useState("");
  const [Categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState();
  const [calendarModal, setCalendarModel] = useState(false);
  const today = moment().format("YYYY-MM-DD");
  const [finalDate, setFinalDate] = useState();
  const [selectedImages, setSelectedImages] = useState([]);
  const [price, setPrice] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");

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
    setOpen(true);
  };

  const dispatch = useDispatch();
  const handlePost = async () => {
    if (selectedImages.length === 0) {
      alert("Please select at least 1 Picture");
    } else if (
      !selectedOption._id ||
      !description ||
      !selectedOptions ||
      !price
    ) {
      alert("Please fill all fields");
    } else {
      const formData = new FormData();
      selectedImages.slice(0, 3).forEach((image) => {
        const extension = image.uri.split(".").pop();
        const type = `${
          image.mediaType === "photo" ? "image" : "video"
        }/${extension}`;
        const name = image.filename;
        formData.append("photos", {
          uri: image.uri,
          type,
          name,
        });
      });
      formData.append("title", title);
      formData.append("category", selectedOption._id);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("selected_visibility", selectedOptionsd);
      formData.append("location", location);

      try {
        setIsLoading(true);
        let response = await addSell(formData);

        if (response.status === 200) {
          dispatch(clearLocation());
          navigation.navigate("PostsSell");
        }
      } catch (error) {
        console.log("Error While Posting", error);
      } finally {
        setIsLoading(false);
      }
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

  useEffect(() => {
    handleGetCategories();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      {isLoading && <Loader />}

      {!open && (
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
            {"Sell Item"}
          </Text>
        </View>
      )}
      {open && (
        <View
          style={{
            backgroundColor: Colors.extraLightGrey,
            height: screenHeight,
            position: "relative",
          }}
        >
          <ImagePicker
            theme={{
              header: ImagePickerHeader,
              album: ImagePickerAlbum,
            }}
            onSave={(assets) => {
              setSelectedImages([...selectedImages, ...assets]);
              setOpen(false);
            }}
            onCancel={() => {
              setOpen(false);
            }}
            multiple
            limit={3 - selectedImages.length}
          />
          <TouchableOpacity onPress={() => setOpen(false)}>
            <Text
              style={{
                color: "white",
                borderColor: "white",
                borderWidth: 1,
                borderRadius: 3,
                paddingVertical: 4,
                paddingHorizontal: 20,
                position: "absolute",
                top: 40,
                right: 20,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <BreadCrumbs>
        <AntDesign name="right" size={18} color="#9ca3af" />
        <TouchableOpacity
          onPress={() => navigation.navigate("BuySell")}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <Text> Sell Zone</Text>
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
          Add Item
        </Text>
      </BreadCrumbs>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          {selectedImages.length === 0 || selectedImages.length < 3 ? (
            <TouchableOpacity onPress={pickImageAsync}>
              <MaterialCommunityIcons
                name="camera-plus"
                size={60}
                color="grey"
              />
            </TouchableOpacity>
          ) : (
            <MaterialCommunityIcons name="camera" size={60} color="grey" />
          )}
          <Text style={{ fontSize: 16, letterSpacing: 2, marginLeft: 10 }}>
            {selectedImages.length} / 3
          </Text>
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
                color: Colors.grey,
                marginLeft: 145,
              }}
            >
              Upload Pictures
            </Text>
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
                          fontSize: 16,
                          color: selectedOption.name ? "black" : "grey",
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
            </View>
            {dropdownOpen && (
              <View style={styles.dropdown}>
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
                <TextInput
                  numberOfLines={1}
                  style={{
                    overflow: "hidden",
                    textAlign: isRtl ? "right" : "left",
                    width: 350,
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                  value={location}
                  onChangeText={(value) => setLocation(value)}
                  placeholder="Specific Address (Optional)"
                />
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
                      color:
                        selectedOptionsd === "Visibility" ? "grey" : "black",
                      fontSize: 16,
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

        <TouchableOpacity
          onPress={() => handlePost()}
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
          <Text style={{ ...Fonts.SemiBold18white }}>{tr("Post")}</Text>
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
    //borderColor: 'grey',
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
});
