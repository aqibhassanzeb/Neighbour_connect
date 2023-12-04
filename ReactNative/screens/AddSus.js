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
import Octicons from "react-native-vector-icons/Octicons";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState, useEffect } from "react";
import { Colors, Default, Fonts, screenHeight } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { FontAwesome5 } from "@expo/vector-icons";
import { Video } from "expo-av";
import { addWatch, getWatchCategories } from "../apis/apis";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader";
import { clearLocation } from "../redux/loanandfoundSlice";
import BreadCrumbs from "../components/BreadCrumbs";
import { AntDesign } from "@expo/vector-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ImagePickerHeader from "../components/ImagePickerHeader";
import ImagePickerAlbum from "../components/ImagePickerAlbum";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ImagePicker } from "expo-image-multiple-picker";

const { width, height } = Dimensions.get("window");
const PayPalScreen = ({ navigation }) => {
  const { selectedLocation } = useSelector((state) => state.loanandfound);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Category");
  const [dropdownOpensd, setDropdownOpensd] = useState(false);
  const [selectedOptionsd, setSelectedOptionsd] = useState("Visibility");
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [timeModal, setTimeModal] = useState(false);
  const [time, setTime] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(false);
  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState();
  const [calendarModal, setCalendarModel] = useState(false);
  const today = moment().format("YYYY-MM-DD");
  const [finalDate, setFinalDate] = useState();
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() == "rtl";
  function tr(key) {
    return t(`payPalScreen:${key}`);
  }

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const handleOptionSelectsd = (option) => {
    setSelectedOptionsd(option);
    setDropdownOpensd(false);
  };

  const onTimeSelected = (event, value) => {
    setTimeModal(false);
    setTime(value);
    setSelectedTime(true);
  };

  const confirmTime = (time) => {
    return `${time.getHours()}:${time.getMinutes()} `;
  };

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

  const pickMedia = async () => {
    setOpen(true);
  };

  const handleMediaRemove = (index) => {
    const updatedImages = selectedMedia.filter((uri, i) => i !== index);
    setSelectedMedia(updatedImages);
  };

  const handleGetCategories = async () => {
    try {
      let result = await getWatchCategories();
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

  const dispatch = useDispatch();
  const handlePost = async () => {
    if (
      selectedMedia.length === 0 ||
      !title ||
      !selectedOption._id ||
      !description ||
      !finalDate ||
      !time ||
      !selectedLocation
    ) {
      alert("Please fill all fields");
    } else {
      const formData = new FormData();
      selectedMedia.slice(0, 3).forEach((media) => {
        const extension = media.uri.split(".").pop();
        const type = `${
          media.mediaType === "photo" ? "image" : "video"
        }/${extension}`;
        const name = media.filename;
        formData.append("media", {
          uri: media.uri,
          type,
          name,
        });
      });
      formData.append("title", title);
      formData.append("category", selectedOption._id);
      formData.append("description", description);
      formData.append("date", String(finalDate));
      formData.append("time", String(time));
      const mapLocation = {
        ...selectedLocation.coordinate,
        name: selectedLocation.name,
      };
      formData.append("location", JSON.stringify(mapLocation));
      formData.append("selected_visibility", selectedOptionsd);
      formData.append("notify", checked);

      try {
        setIsLoading(true);
        let response = await addWatch(formData);
        if (response.status === 200) {
          dispatch(clearLocation());
          navigation.navigate("AddedSus");
        }
      } catch (error) {
        console.log("Error While Posting...", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

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
            {"Post Activity"}
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
              selectedMedia([...selectedMedia, ...assets]);
              setOpen(false);
            }}
            onCancel={() => {
              setOpen(false);
            }}
            multiple
            limit={3 - selectedMedia.length}
            video
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
          onPress={() => navigation.navigate("Sus")}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <Text> Neighbor Watch</Text>
        </TouchableOpacity>
        <AntDesign name="right" size={18} color="#9ca3af" />
        <TouchableOpacity
          onPress={() => navigation.navigate("Suspicious")}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <Text> Guidelines</Text>
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
          Add
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
          {selectedMedia.length === 0 || selectedMedia.length < 3 ? (
            <TouchableOpacity onPress={pickMedia}>
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
            {selectedMedia.length} / 3
          </Text>
        </View>
        <View>
          <ScrollView horizontal style={{ margin: 10 }}>
            {selectedMedia.map((uri, index) => (
              <View
                key={index}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <TouchableOpacity style={{ marginRight: 10 }}>
                  {uri.type === "image" ? (
                    <Image
                      source={{ uri: uri.uri }}
                      style={{ width: 120, height: 150, borderRadius: 10 }}
                    />
                  ) : (
                    <Video
                      source={{ uri: uri.uri }}
                      style={{ width: 150, height: 150, borderRadius: 10 }}
                      useNativeControls
                      resizeMode="contain"
                    />
                  )}

                  <FontAwesome5
                    onPress={() => handleMediaRemove(index)}
                    name="times-circle"
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
          }}
        >
          {selectedMedia.length === 0 && (
            <Text
              style={{
                color: Colors.grey,
                marginLeft: 105,
              }}
            >
              Upload Pictures/Videos
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
                height: "auto",
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
              <View style={styles.dropdowns}>
                {categories.length > 0 &&
                  categories.map((cat) => (
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
              style={{
                ...Fonts.Medium16Black,
                flex: 9.3,
                marginHorizontal: Default.fixPadding,
                textAlign: isRtl ? "right" : "left",
              }}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
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
                <View style={{ flex: 23.5 }}>
                  {date ? (
                    <Text
                      //   numberOfLines={1}
                      style={{
                        //  ...Fonts.SemiBold14black,
                        textAlign: isRtl ? "right" : "left",
                        marginLeft: 10,

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
          <View style={{ flex: 1 }}>
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
                  {selectedTime ? confirmTime(time) : "Time"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {timeModal && (
            <DateTimePicker
              value={time}
              mode={"time"}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              is24Hour={true}
              onChange={onTimeSelected}
            />
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
              onPress={() => navigation.navigate("Locate", { title: "Watch" })}
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
            <View style={styles.dropdown}>
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
                onPress={() => handleOptionSelectsd("Connections ")}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#e2e8f0",
                  paddingVertical: 2,
                }}
              >
                <Text style={{ padding: 10 }}>Connections</Text>
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
          // onPress={() => navigation.navigate("AddSus")}
          onPress={handlePost}
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: Default.fixPadding * 2,
            padding: Default.fixPadding * 1.2,
            marginHorizontal: Default.fixPadding * 2,
            marginVertical: Default.fixPadding * 2,
          }}
        >
          <Text style={{ ...Fonts.SemiBold18white }}>{"Post"}</Text>
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
