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
  import * as ImagePicker from 'expo-image-picker';
  import React, { useState, useEffect } from "react";
  import { Colors, Default, Fonts } from "../constants/styles";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import { useTranslation } from "react-i18next";
  
const { width, height } = Dimensions.get("window");
  const PayPalScreen = ({ navigation }) => {
 
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Accessories');

    
    const [dropdownOpens, setDropdownOpens] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState('Type');
  
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
      setDropdownOpen(false);
    };
    const handleOptionSelects = (option) => {
      setSelectedOptions(option);
      setDropdownOpens(false);
    };
  const [checked, setChecked] = useState(false);
    const { t, i18n } = useTranslation();
    const [selectedValue, setSelectedValue] = useState('');

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
    const [email, setEmail] = useState();
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };
  
      const [value, setValue] = useState(0);

      const [date, setDate] = useState();
      const [calendarModal, setCalendarModel] = useState(false);
      const today = moment().format("YYYY-MM-DD");
      const [finalDate, setFinalDate] = useState();
    
      const handleConfirmCalendar = (date) => {
        setFinalDate(date);
      };
    
      const confirmDate = () => {
        let tempDate = date.toString().split(" ");
        return date !== "" ? `${tempDate[2]} ${tempDate[1]} ${tempDate[3]}` : "";
      };
    
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
            {("Add Item")}
          </Text>
        </View>
  
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' , marginTop:20 }}>
        <Ionicons name="image-outline" size={100} color="black" onPress={pickImage} />
        <Ionicons name="image-outline" size={100} color="black" onPress={pickImage} />
        <Ionicons name="image-outline" size={100} color="black" onPress={pickImage} />
        <Ionicons name="image-outline" size={100} color="black" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
          <View
            style={{
              marginHorizontal: Default.fixPadding * 2,
            //  marginVertical: Default.fixPadding * 2,
            }}
          >
           
  
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
                placeholder={tr("BAG")}
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
                <Ionicons
                name="md-list"
                color={Colors.grey}
                size={20}
                style={{
                  flex: 0.7,
                }}
              />
              
              <View >
      <TouchableOpacity
        onPress={() => setDropdownOpen(!dropdownOpen)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        paddingRight:1,
          color:'grey'

        }}
      >
        <Text    style={{
          color:'grey',
            paddingRight:225
              }}>{selectedOption}</Text>
        <Ionicons name={dropdownOpen ? 'chevron-up' : 'chevron-down'} size={24} color='grey' />
      </TouchableOpacity>

      {dropdownOpen && (
        <View
          style={{
           // position: 'absolute',
           // top: 50,
           // right: 0,
         //   left: 0,
           borderWidth: 1,
            borderRadius: 5,
            borderColor: '#ccc',
           backgroundColor: '#fff',
           color:'grey'
           
          }}
        >
          <TouchableOpacity onPress={() => handleOptionSelect('Person ')}>
            <Text style={{ padding: 10 }}>Person </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelect('Pet ')}>
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
          </TouchableOpacity>
        </View>
      )}
    </View>
    </View>
    <View
          style={{
            ...Default.shadow,
            borderRadius: 10,
            backgroundColor: Colors.white,
            paddingLeft: Default.fixPadding * 1.5,
            paddingBottom:21,
            flexDirection: isRtl ? "row-reverse" : "row",
            
          //  alignItems: "center",
            marginTop: Default.fixPadding * 3,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
               // ...Fonts.SemiBold16black,
                //extAlign: isRtl ? "right" : "left",
              }}
            >
            </Text>

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
                      overflow: "hidden",
                    }}
                  >
                    {confirmDate()}
                  </Text>
                ) : (
                  <Text
                  numberOfLines={2}
                  style={{
                    ...Fonts.SemiBold14grey,
                    overflow: "hidden",
                    textAlign: isRtl ? "right" : "left",
                  }}
                >
                 21-May-2023
                </Text>
                )}
              </View>

            
            </TouchableOpacity>
          </View>
          </View>
   
           
             <View style={{  ...Default.shadow,
                borderRadius: 10,
                backgroundColor: Colors.white,
                padding: Default.fixPadding * 1.5,
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
                marginTop: Default.fixPadding * 3,
                textAlign: isRtl ? "right" : "left", }}>
          
          <TouchableOpacity
            onPress={() => navigation.navigate("Location")}
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
                flex: 0.6,
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
                  paddingLeft:21
                }}
              >
                3891 Ranchview Dr. Richardson, California 62639, USA
              </Text>
            </View>
        
          </TouchableOpacity>
        </View>
            {/* <View
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
                name="options-outline"
                color={Colors.grey}
                size={20}
                style={{
                  flex: 0.7,
                }}
              />
              <TextInput
                placeholder={tr("Type")}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.primary}
                style={{
                  ...Fonts.Medium16Black,
                  flex: 9.3,
                  marginHorizontal: Default.fixPadding,
                  textAlign: isRtl ? "right" : "left",
                }}
              />
              
            </View> */}
         
            
   
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
                placeholder={("Pink Bag")}
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
        
     
          </View>
  
          <TouchableOpacity
            onPress={() => navigation.navigate("EditSuccess")}
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
      //borderColor: 'gray',
     // borderRadius: 4,
      padding: 4,
    },

      dropdownContainer: {
        
        flexDirection: 'row',
        alignItems: 'center',
      //  borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        borderColor: '#ccc',
        justifyContent: 'space-between',
        color:'grey',
      },
      dropdownText: {
        fontSize: 20,
        marginRight: 8,
        color:'grey',
      
        flexDirection: 'row',
      },
      dropdownItems: {
        borderWidth: 4,
       borderRadius: 5,
        borderColor: '#ccc',
        marginTop: 5,
        flexDirection: 'column',
        width:150
      },
      dropdownItem: {
        padding: 10,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width:150
        ,  flexDirection: 'column',
      },
    
    
    
  });