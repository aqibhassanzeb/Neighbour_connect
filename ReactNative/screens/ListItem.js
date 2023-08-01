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
  import * as ImagePicker from 'expo-image-picker';
  import React, { useState, useEffect } from "react";
  import { Colors, Default, Fonts } from "../constants/styles";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import { useTranslation } from "react-i18next";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { lostandfoundCategGet, lostandfoundCreate } from "../apis/apis";
import { FontAwesome5 } from '@expo/vector-icons';
import Loader from "../components/loader";
import axios from "axios";

  
const { width, height } = Dimensions.get("window");
  const PayPalScreen = ({ navigation,route }) => {
 
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState({name:'Category',_id:null});
    const [categoryList, setCategoryList] = useState([])
    const [fetchingCategLoader, setFetchingCategLoader] = useState(false)
    const [setselectedImages, setSetselectedImages] = useState(null)
    const [handleLoading, setHandleLoading] = useState(false)
    const [selectedImages, setSelectedImages] = useState([]);
    const [formData, setFormData] = useState({
      title: '',
      description: '',
    });
  

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
    

      const handleGetCateg=async()=>{
        try {
          setFetchingCategLoader(true)
          let result= await lostandfoundCategGet()
          
          if(result.status==200){
            setCategoryList(result.data?.data)
          }
        } catch (error) {
          
        } finally{
          setFetchingCategLoader(false)
        }
      }  
          
          useEffect(() => {
            handleGetCateg()
      }, [])


      const pickImageAsync = async () => {
        if (selectedImages.length >= 3) {
          alert('You can select a maximum of three images.');
          return;
        }
      
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        if (!result.canceled) {
          setSelectedImages([...selectedImages, result.assets[0]]);
        } else {
          alert('You did not select any image.');
        }
      };

      const handleImageRemove = (index) => {
        const updatedImages = selectedImages.filter((uri, i) => i !== index);
        setSelectedImages(updatedImages);
      };
      const handleInputChange = (key, value) => {
        setFormData({
          ...formData,
          [key]: value,
        });
      };

      const validateForm = () => {
        if (formData.title.trim() === '') {
          alert( 'Please enter a title.');
          return false;
        }
        if(selectedOption.name =="Category"){
          alert( 'Please select category.');
          return false;
        }
        if(!date){
          alert( 'Please select date.');
          return false;
        }
        if(!route.params?.address){
          alert( 'Please select the location.');
          return false;

        }
        if(formData.description.trim()==""){
          alert( 'Please enter a description.');
          return false;
        }
        if(selectedImages.length ==0){
          alert( 'Please select atleast one image.');
          return false;
        }
        if(selectedOptions =="Type"){
          alert( 'Please select a type.');
          return false;
        }
        if(selectedOptionsd =="Visibility"){
          alert( 'Please select a visibility.');
          return false;
        }
    
    
        return true;
      };

      const selectedImageToFile = async (selectedImage) => {
        // Get the file name from the URI
        const fileName = selectedImage.uri.split('/').pop();
    
        // Create a File object with the URI and type 'image/jpeg' (you can change the type as needed)
        const file = {
          uri: selectedImage.uri,
          name: fileName,
          type: 'image/jpeg', // Change the type as needed based on the image format
        };
    
        return file;
      };

      const uploadImagesToCloudinary = async (selectedImages) => {
        try {
          const cloudName = 'dbdxsvxda'; // Replace with your Cloudinary cloud name
          // const uploadPreset = 'YOUR_UPLOAD_PRESET'; // Replace with your Cloudinary upload preset
      
          const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
      
          const uploadPromises = selectedImages.map(async (selectedImage) => {
          console.log("selectedImage  :",selectedImage)
          const response = await fetch(selectedImage.uri);
          console.log("selectedImage  2:",response)
            const blob = await response.blob();
      
            const formData = new FormData();
            formData.append('file', blob);
            // formData.append('upload_preset', uploadPreset);
      
            const uploadResponse = await fetch(uploadUrl, {
              method: 'POST',
              body: formData,
            });
      
            if (!uploadResponse.ok) {
              throw new Error('Failed to upload image to Cloudinary');
            }
      
            const uploadResult = await uploadResponse.json();
            return uploadResult.secure_url;
          });
      
          const uploadedImageUrls = await Promise.all(uploadPromises);
          return uploadedImageUrls;
        } catch (error) {
          console.error('Error uploading images to Cloudinary:', error);
          throw error;
        }
      };

    const handleSubmit=async()=>{
      if(validateForm()){
        let picurl=["https://res.cloudinary.com/dbdxsvxda/image/upload/v1690110912/niegbour_proj/vsmzv4fseavk4b8zoql5.png",
      "https://res.cloudinary.com/dbdxsvxda/image/upload/v1690110914/niegbour_proj/bmkuc68k8jnqp9vqvxqp.png"
      ]
        let payload={title:formData.title,description:formData.description,type:selectedOptions,visibility:selectedOptionsd,
          gallary_images:picurl,location:route.params.address,notify:checked,date:date,category:selectedOption._id
        }
  //       let formData2 = new FormData();
  // formData2.append('title', payload.title);
  // formData2.append('description', payload.description);
  // formData2.append('type', payload.type);
  // formData2.append('visibility', payload.visibility);
  // formData2.append('notify', payload.notify);
  // formData2.append('location', payload.location); 
  // formData2.append('category', payload.category); 
  // formData2.append('gallary_images',picurl)
  // formData2.append('date',confirmDate())

  // Append selectedImages array as individual files with a unique key
  
  // for (let index = 0; index < selectedImages.length; index++) {
  //   const selectedImage = selectedImages[index];
  //   const fileName = selectedImage.uri.split('/').pop();
  //   const file = {
  //     uri: selectedImage.uri,
  //     name: fileName,
  //     type: 'image/jpeg', // Change the type as needed based on the image format
  //   };
  //   formData2.append(`files[${index}]`, file);
  // }
  try {
    
    setHandleLoading(true)
          // console.log("form Data :",formData2)
          console.log("submited 1")

          let result= await lostandfoundCreate(payload)
          console.log("submited 2" ,result)
          if(result.status == 200){
            
            navigation.navigate("LostPosted");
          }else{
            console.log("result :",result)
            alert(result.data.error)
          }
        } catch (error) {
          alert("something went wrong!")
          console.log('errror 2:',error)
        } finally{
          
          setHandleLoading(false);
        }
      
      }else{
        console.log("not submitted :")
      }
    }

   
    
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
        {handleLoading && <Loader/>}
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
           
           <Text   style={{
                color:Colors.grey,
                marginLeft:135
              }}>Upload Pictures</Text>
  <ScrollView horizontal style={{ marginBottom: 10,marginTop:10 }}>
        {selectedImages.map((uri, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                style={{ position: 'absolute', top: -1, right: -1, zIndex: 1 }}
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
                maxLength={16}
                style={{
                  ...Fonts.Medium16Black,
                  flex: 9.3,
                  marginHorizontal: Default.fixPadding,
                  textAlign: isRtl ? "right" : "left",
                }}
                onChangeText={(text) => handleInputChange('title', text)}
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

              }}>{selectedOption.name}</Text>
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
        {
          categoryList.length > 0 && categoryList.map((elm)=>(

            <TouchableOpacity key={elm._id} onPress={() => handleOptionSelect(elm)}>
            <Text style={{ padding: 10 }}>{elm.name} </Text>
          </TouchableOpacity>
           )) 
         }
         <TouchableOpacity onPress={() => handleOptionSelect({name:"other",_id:null})}>
            <Text style={{ padding: 10 }}>other </Text>
          </TouchableOpacity>
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
            
           
             <View style={{  ...Default.shadow,
                borderRadius: 10,
                backgroundColor: Colors.white,
                padding: Default.fixPadding * 1.5,
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
                marginTop: Default.fixPadding * 3,
                textAlign: isRtl ? "right" : "left", }}>
          
          <TouchableOpacity
            onPress={() => 
              navigation.navigate("Address",{lostandfoundCreate:true})  
              // navigation.navigate("Location")
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
                name="options-outline"
                color={Colors.grey}
                size={20}
                style={{
                  flex: 0.7,
                }}
              />
              </View>
              <View >
      <TouchableOpacity
        onPress={() => setDropdownOpens(!dropdownOpens)}
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

              }}>{selectedOptions}</Text>
              <View   style={{
          color:'grey',
          
    position: 'absolute',
    marginLeft:290

              }}>
        <Ionicons name={dropdownOpens ? 'chevron-up' : 'chevron-down'} size={24} color='grey' />
        </View>
        </View>
      </TouchableOpacity>
</View>
</View>
      {dropdownOpens && (
        <View
        style={styles.dropdownsd}
        >
          
          <TouchableOpacity onPress={() => handleOptionSelects('Lost ')}>
            
   
            <Text style={{ padding: 10 }}>Lost </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelects('Found ')}>
            
            <Text style={{ padding: 10 }}>Found</Text>
          </TouchableOpacity>
         
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
                onChangeText={(text) => handleInputChange('description', text)}
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
          <TouchableOpacity onPress={() => handleOptionSelectsd('Connection ')}>
            
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
            onPress={() => handleSubmit()}
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
      dropdowns: {
        width: 390,
        height: 240,
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