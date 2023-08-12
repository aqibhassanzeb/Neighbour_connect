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
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
  import MaterialIcons from "react-native-vector-icons/MaterialIcons";

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
    const [selectedOption, setSelectedOption] = useState('Category');

    
    const [dropdownOpens, setDropdownOpens] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState('Type');

    
    const [dropdownOpensd, setDropdownOpensd] = useState(false);
    const [selectedOptionsd, setSelectedOptionsd] = useState('Visibility');
  
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
    
    const [timeModal, setTimeModal] = useState(false);
    const [time, setTime] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(false);
  
    const onTimeSelected = (event, value) => {
      setTimeModal(false);
      setTime(value);
      setSelectedTime(true);
    };
  
    const confirmTime = (time) => {
      return `${time.getHours()}:${time.getMinutes()} `;
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
            {("Post Activity")}
          </Text>
        </View>
  
        <ScrollView showsVerticalScrollIndicator={false}>
         
        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' , marginTop:20 }}>
        <TouchableOpacity>
        <Ionicons name="ios-camera" size={80} color="grey" />
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
          <View
            style={{
              marginHorizontal: Default.fixPadding * 2,
            //  marginVertical: Default.fixPadding * 2,
            }}
          >
           
           <Text   style={{
                color:Colors.grey,
                marginLeft:105
              }}>Upload Pictures/Videos</Text>
  
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
              <View >
      <TouchableOpacity
        onPress={() => setDropdownOpen(!dropdownOpen)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        paddingRight:1,
          color:'grey',

        }}
      >
        <View  style={{
            flexDirection:"row",
            marginLeft:15,

          

              }}>
        <Text    style={{
          marginTop:3,
          color:'grey',

              }}>{selectedOption}</Text>
              <View   style={{
          color:'grey',
          
    position: 'absolute',
    marginLeft:290

              }}>
        <Ionicons name={dropdownOpen ? 'chevron-up' : 'chevron-down'} size={24} color='grey' />
        </View>
        </View>
      </TouchableOpacity>
</View>
</View>
      {dropdownOpen && (
        <View
        style={styles.dropdowns}
        >
          
          <TouchableOpacity onPress={() => handleOptionSelect('Person ')}>
            <Text style={{ padding: 10 }}>Person </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelect('Persons ')}>
            <Text style={{ padding: 10 }}>Persons</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelect('Vehicle')}>
            <Text style={{ padding: 10 }}>Vehicle</Text>
          </TouchableOpacity>
      
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
              />
              
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
                    paddingLeft:7,
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
                paddingRight:140
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
             <View style={{  ...Default.shadow,
                borderRadius: 10,
                backgroundColor: Colors.white,
                padding: Default.fixPadding * 1.5,
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
                marginTop: Default.fixPadding * 3,
                textAlign: isRtl ? "right" : "left", }}>
          
          <TouchableOpacity
            onPress={() => navigation.navigate("Slocate")}
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
                flex: 0.3,
              }}
            />
            
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
              }}
            >
              
                
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold14grey,
                  overflow: "hidden",
                  textAlign: isRtl ? "right" : "left",
                  paddingLeft:0
                }}
              >
               Location
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
              <View >
      <TouchableOpacity
        onPress={() => setDropdownOpensd(!dropdownOpensd)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        paddingRight:1,
          color:'grey',

        }}
      >
        <View  style={{
            flexDirection:"row",
            marginLeft:15,

          

              }}>
        <Text    style={{
          marginTop:3,
          color:'grey',

              }}>{selectedOptionsd}</Text>
              <View   style={{
          color:'grey',
          
    position: 'absolute',
    marginLeft:290

              }}>
        <Ionicons name={dropdownOpensd ? 'chevron-up' : 'chevron-down'} size={24} color='grey' />
        </View>
        </View>
      </TouchableOpacity>
</View>
</View>
      {dropdownOpensd && (
        <View
        style={styles.dropdown}
        >
          
          <TouchableOpacity onPress={() => handleOptionSelectsd('Neighborhood ')}>
            
   
            <Text style={{ padding: 10 }}>Neighborhood </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelectsd('Connections ')}>
            
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
                 color:"black",
                 top:8,
                 marginHorizontal: Default.fixPadding,
                 textAlign: isRtl ? "right" : "left",
               }}
             >
            Notify 
             </Text>
              
            </View>
     
          </View>
  
          <TouchableOpacity
            onPress={() => navigation.navigate("AddSus")}
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
            <Text style={{ ...Fonts.SemiBold18white }}>{("Post")}</Text>
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
      dropdowns: {
        width: 390,
        height: 120,
        backgroundColor: '#fafafa',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10,
        paddingRight:100,
        zIndex: 21,
      },
      dropdownsd: {
        width: 390,
        height: 80,
        backgroundColor: '#fafafa',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10,
        paddingRight:100,
        zIndex: 21,
      },
    
      dropdown: {
        width: 390,
        height: 90,
        backgroundColor: '#fafafa',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10,
        paddingRight:100,
        zIndex: 21,
      },
    
  });