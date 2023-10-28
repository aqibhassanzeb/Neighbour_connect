import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  BackHandler,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import CategorySkill from "../components/CategorySkill";
import { deleteSkill, getSkillsByUser } from "../apis/apis";
import { ScrollView } from "react-native-gesture-handler";
import Loader from "../components/loader";
import useGetUserId from "../components/useGetUserId";

const CategoryScreen = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  const [selectedValue, setSelectedValue] = useState("");
  const [dropdownOpend, setDropdownOpend] = useState(false);
  const [setselectedSkillforEdit, setSetselectedSkillforEdit] = useState("");

  const [dropdownOpends, setDropdownOpends] = useState(false);
  const [dropdownOpendd, setDropdownOpendd] = useState(false);
  const handleButtonPress = (buttonValue) => {
    setSelectedValue(buttonValue);
    setDropdownOpend(false);
    setDropdownOpendd(false);
    setDropdownOpends(false);
  };

  const { width, height } = Dimensions.get("window");
  const [cancelModal, setCancelModal] = useState(false);

  const [cancelToast, setCancelToast] = useState(false);
  const onToggleSnackBarCancelToast = () => setCancelToast(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userSkills, setUserSkills] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  function tr(key) {
    return t(`categoryScreen:${key}`);
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

  const handleGetSkills = async () => {
    try {
      setIsLoading(true);
      let result = await getSkillsByUser();
      if (result.status == 200) {
        setUserSkills(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetSkills();
  }, []);

  const renderItemCategory = ({ item, index }) => {
    const isFirst = index === 0;

    return (
      <CategorySkill
        onClick={() =>
          navigation.navigate("MySkillDetail", { name: item.cleaner })
        }
        marginTop={isFirst ? Default.fixPadding * 2 : 0}
        marginHorizontal={Default.fixPadding * 2}
        marginBottom={Default.fixPadding * 2}
        img={item.img}
        title={item.title}
        cleaner={item.cleaner}
        Text={item.Text}
      />
    );
  };

  async function handleDelete() {
    try {
      setCancelModal(false);
      let result = await deleteSkill({ _id: selectedId });
      if (result.status == 200) {
        handleGetSkills();
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      {/* Header */}
      <View
        style={{
          paddingVertical: Default.fixPadding * 1.2,
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          backgroundColor: Colors.primary,
          paddingHorizontal: Default.fixPadding * 2,
        }}
      >
        <View
          style={{ flex: 8.5, flexDirection: isRtl ? "row-reverse" : "row" }}
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
          ></Text>
        </View>
      </View>
      {isLoading && <Loader />}
      {!isLoading && userSkills.length === 0 && (
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
            <Text>{!isLoading && "No Skills"}</Text>
          </View>
        </TouchableOpacity>
      )}

      <ScrollView>
        {userSkills.length > 0 &&
          userSkills.map((skill, index) => (
            <TouchableOpacity
              key={skill._id}
              onPress={() =>
                navigation.navigate("Shared", {
                  post: { skill },
                  userId,
                })
              }
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
                <Image
                  source={{ uri: skill.category.image }}
                  style={{
                    borderRadius: 5,
                    height: 70,
                    width: 70,
                    marginLeft: 36,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 5,
                  justifyContent: "center",
                  alignItems: isRtl ? "flex-end" : "flex-start",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    ...Fonts.SemiBold15black,
                    overflow: "hidden",
                    marginLeft: 36,
                  }}
                >
                  {skill.category.name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    ...Fonts.SemiBold14grey,
                    overflow: "hidden",
                    marginLeft: 36,
                  }}
                >
                  {skill.skill_level}
                </Text>
                <View
                  style={{
                    marginVertical: Default.fixPadding * 0.3,
                    flexDirection: isRtl ? "row-reverse" : "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.SemiBold14grey,

                      textAlign: isRtl ? "right" : "left",
                    }}
                  ></Text>
                </View>
              </View>
              <View>
                <View style={styles.contain}>
                  <TouchableOpacity
                    style={styles.selectedButton}
                    onPress={() => {
                      setSetselectedSkillforEdit(skill._id);
                      setDropdownOpend(!dropdownOpend);
                    }}
                  >
                    <Ionicons
                      name="ellipsis-vertical"
                      size={24}
                      color="black"
                    />
                    <Text style={styles.selectedButtonText}>
                      {selectedValue}
                    </Text>
                  </TouchableOpacity>

                  {dropdownOpend && setselectedSkillforEdit == skill._id && (
                    <View style={styles.dropdown}>
                      <TouchableOpacity
                        style={[
                          styles.dropdownButton,

                          selectedValue === "button1" &&
                            styles.dropdownButtonSelected,
                        ]}
                        onPress={() =>
                          navigation.navigate("EditSkill", { data: skill })
                        }
                      >
                        <Ionicons
                          name="create-outline"
                          size={20}
                          color="black"
                        />
                        <Text style={styles.dropdownButtonText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.dropdownButtons,

                          selectedValue === "button1" &&
                            styles.dropdownButtonSelected,
                        ]}
                        onPress={() => {
                          setCancelModal(true);
                          setSelectedId(skill._id);
                        }}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={20}
                          color="black"
                        />
                        <Text style={styles.dropdownButtonText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={cancelModal}
        // onRequestClose={() => setCancelModal(false)}
      >
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
                  {"Are you sure you want to delete this Skill?"}
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
                  onPress={() => handleDelete()}
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
                    //   deleteItem();
                    setCancelModal(false);
                    //   setCancelToast(true);
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
    </SafeAreaView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 10,
    //marginTop:30,
    //marginBottom:30,
    //  height:190,
    //   fontSize:10,
    //   marginHorizontal: Default.fixPadding * 2,
  },
  buttonContainer: {
    // width: '120%',
    //  color:'white',
    // padding: Default.fixPadding * 1.2,
    borderRadius: 10,

    //  backgroundColor: Colors.primary,
  },
  contain: {
    // flex: 1,
    // alignItems: 'center',
    justifyContent: "center",
    marginLeft: 48,
  },
  selectedButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    // borderWidth: 1,
    borderColor: "gray",
    marginLeft: 86,
    //borderRadius: 5,
  },
  selectedButtonText: {
    position: "absolute",
    //   marginRight: 60,
  },
  dropdown: {
    //  position: 'absolute',
    top: 1,
    marginRight: 8,
    backgroundColor: "white",
    width: 122,
    //height:82,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // marginRight:70,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    //   padding: 10,
    // borderWidth: 1,
    //  borderColor: 'gray',
    //  borderBottomWidth: 1,
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
    //   padding: 10,
    //  borderWidth: 1,
    //  borderColor: 'gray',
    //  borderBottomWidth: 1,
  },
});
