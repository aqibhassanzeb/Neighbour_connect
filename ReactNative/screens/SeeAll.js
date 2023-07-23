import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    BackHandler,
    TextInput,
    Modal,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { Colors, Default, Fonts } from "../constants/styles";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import { useTranslation } from "react-i18next";
  
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
  import * as ImagePicker from "expo-image-picker";
  import { BottomSheet } from "react-native-btr";
  import { Camera } from "expo-camera";
  import SnackbarToast from "../components/snackbarToast";
  import CameraModule from "../components/cameraModule";
  
  const { width } = Dimensions.get("window");
  
  const EditProfileScreen = (props) => {
    const [showFirstIcon, setShowFirstIcon] = useState(true);
    

    const [isClicked, setIsClicked] = useState(false);

    const handleButtonClick = () => {
      setIsClicked(true);
      setShowFirstIcon(!showFirstIcon);
    };
    const [selectedValue, setSelectedValue] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    const [dropdownOpens, setDropdownOpens] = useState(false);
    const [dropdownOpend, setDropdownOpend] = useState(false);
    
    const [dropdownOpendd, setDropdownOpendd] = useState(false);
    const handleButtonPress = (buttonValue) => {
      setSelectedValue(buttonValue);
      setDropdownOpen(false);
      setDropdownOpens(false);
      setDropdownOpend(false);
      setDropdownOpendd(false);
    };
  
    const { t, i18n } = useTranslation();
  
    const isRtl = i18n.dir() == "rtl";
  
    function tr(key) {
      return t(`editProfileScreen:${key}`);
    }
    const backAction = () => {
      props.navigation.goBack();
      return true;
    };
    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
  
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);
  
    const [update, setUpdate] = useState(false);
  
    const [name, onChangeName] = useState("Esther howard");
    const [email, onChangeTextEmail] = useState("estherhoward@example.com");
    const [number, onChangeTextNumber] = useState("9876543210");
  
    const [uploadImage, setUploadImage] = useState(false);
    
  const [cancelModal, setCancelModal] = useState(false);
    const toggleCloseUploadImage = () => {
      setUploadImage(!uploadImage);
    };
  
    const [removeImageToast, setRemoveImageToast] = useState(false);
    const onToggleSnackBarRemoveImage = () => setRemoveImageToast(false);
  
    const [pickedImage, setPickedImage] = useState();
    const [removeImage, setRemoveImage] = useState(false);
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setPickedImage(result.assets[0].uri);
        toggleCloseUploadImage();
      }
    };
  
    const [camera, setShowCamera] = useState(false);
  
    const [cameraNotGranted, setCameraNotGranted] = useState(false);
    const onToggleSnackBarCameraNotGranted = () => setCameraNotGranted(false);
  
    const startCamera = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === "granted") {
        setShowCamera(true);
      } else {
        setCameraNotGranted(true);
      }
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
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
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
          </Text>
        </View>
  
        <ScrollView showsVerticalScrollIndicator={false}>
  
        
         
       
          <View style={{  
          flexDirection: isRtl ? "row-reverse" : "row",
          borderRadius: 10,
          padding: Default.fixPadding * 1.5,
          marginHorizontal: Default.fixPadding * 2,
          marginBottom: Default.fixPadding * 2,
         // marginTop:99,
          alignItems: "center",}}>
            
      <TouchableOpacity  onPress={() =>  props.navigation.navigate('Losted', {
        title: "Losted",
  })}
  
        style={{ flex: 1, justifyContent: "center", alignItems: "center" , flexDirection:"row"}}
      >
        
        <Ionicons name="create-outline" size={54} color="black" />
         
          <View
            style={{
              marginLeft: isRtl ? 0 : Default.fixPadding * 1.5,
              marginRight: isRtl ? Default.fixPadding * 1.5 : 0,
              alignItems: isRtl ? "flex-end" : "flex-start",
              flex: 9,
            }}
          >
            <Text
              numberOfLines={1}
              style={{ ...Fonts.SemiBold16black, overflow: "hidden" , top:12}}
            >
         Created a Lost & Found post.
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.Medium14Black,
                marginVertical: Default.fixPadding * 0.3,
                overflow: "hidden",
                top:6
              }}
            >
              Pink bag founded on the road.
            </Text>

            <Text style={{ ...Fonts.Medium14grey }}>5 min ago</Text>
          </View>

          </TouchableOpacity>

          </View>
          
        <View style={styles.line}></View>
        <View style={{  
          flexDirection: isRtl ? "row-reverse" : "row",
          borderRadius: 10,
          padding: Default.fixPadding * 1.5,
          marginHorizontal: Default.fixPadding * 2,
          marginBottom: Default.fixPadding * 2,
          alignItems: "center",}}>
      <TouchableOpacity   onPress={() =>  props.navigation.navigate('Sus', {
        title: "Losted",
  })}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" , flexDirection:"row"}}
      >
        
        <Ionicons name="create-outline" size={54} color="black" />
         

          <View
            style={{
              marginLeft: isRtl ? 0 : Default.fixPadding * 1.5,
              marginRight: isRtl ? Default.fixPadding * 1.5 : 0,
              alignItems: isRtl ? "flex-end" : "flex-start",
              flex: 9,
            }}
          >
            <Text
              numberOfLines={1}
              style={{ ...Fonts.SemiBold16black, overflow: "hidden" , top:12}}
            >
         Created a Suspicious Activity post.
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.Medium14Black,
                marginVertical: Default.fixPadding * 0.3,
                overflow: "hidden",
                top:6
              }}
            >
           
           I noticed a man wearing a mask and gloves walking around the Neighborhood
            </Text>

            <Text style={{ ...Fonts.Medium14grey }}>10 min ago</Text>
          </View>

          </TouchableOpacity>

          
          </View>
          <View style={styles.line}>
          
          </View>
          <View style={{  
          flexDirection: isRtl ? "row-reverse" : "row",
          borderRadius: 10,
          padding: Default.fixPadding * 1.5,
          marginHorizontal: Default.fixPadding * 2,
          marginBottom: Default.fixPadding * 2,
          alignItems: "center",}}>
       <TouchableOpacity   onPress={() =>  props.navigation.navigate('Salon3', {
        title: "Losted",
  })} // Add your press event handler
        style={{ flex: 1, justifyContent: "center", alignItems: "center" , flexDirection:"row"}}
      >
        
        <Ionicons name="create-outline" size={54} color="black" />
         

          <View
            style={{
              marginLeft: isRtl ? 0 : Default.fixPadding * 1.5,
              marginRight: isRtl ? Default.fixPadding * 1.5 : 0,
              alignItems: isRtl ? "flex-end" : "flex-start",
              flex: 9,
            }}
          >
            <Text
              numberOfLines={1}
              style={{ ...Fonts.SemiBold16black, overflow: "hidden" , top:12}}
            >
         Created a skill sharing post.
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.Medium14Black,
                marginVertical: Default.fixPadding * 0.3,
                overflow: "hidden",
                top:6
              }}
            >
           About salon
            </Text>

            <Text style={{ ...Fonts.Medium14grey }}>20 min ago</Text>
          </View>

          </TouchableOpacity>

          
          </View>
          <View style={styles.line}>
          
          </View>

          <View style={{  
          flexDirection: isRtl ? "row-reverse" : "row",
          borderRadius: 10,
          padding: Default.fixPadding * 1.5,
          marginHorizontal: Default.fixPadding * 2,
          marginBottom: Default.fixPadding * 2,
          alignItems: "center",}}>
        <TouchableOpacity   onPress={() =>  props.navigation.navigate('BuyDetail2', {
        title: "Losted",
  })}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" , flexDirection:"row"}}
      >
        
        <Ionicons name="create-outline" size={54} color="black" />
         

          <View
            style={{
              marginLeft: isRtl ? 0 : Default.fixPadding * 1.5,
              marginRight: isRtl ? Default.fixPadding * 1.5 : 0,
              alignItems: isRtl ? "flex-end" : "flex-start",
              flex: 9,
            }}
          >
            <Text
              numberOfLines={1}
              style={{ ...Fonts.SemiBold16black, overflow: "hidden" , top:12}}
            >
         Created a Neighbor Trade post.
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.Medium14Black,
                marginVertical: Default.fixPadding * 0.3,
                overflow: "hidden",
                top:6
              }}
            >
            About Decorative mirror
            </Text>

            <Text style={{ ...Fonts.Medium14grey }}>32 min ago</Text>
          </View>

          </TouchableOpacity>

          
          </View>
          <View style={styles.line}>
          
          </View>
          <View style={{  
          flexDirection: isRtl ? "row-reverse" : "row",
          borderRadius: 10,
          padding: Default.fixPadding * 1.5,
          marginHorizontal: Default.fixPadding * 2,
          marginBottom: Default.fixPadding * 2,
          alignItems: "center",}}>
         <TouchableOpacity   onPress={() =>  props.navigation.navigate('Form', {
        title: "Losted",
  })}// Add your press event handler
        style={{ flex: 1, justifyContent: "center", alignItems: "center" , flexDirection:"row"}}
      >
        
        <Ionicons name="create-outline" size={54} color="black" />
         

          <View
            style={{
              marginLeft: isRtl ? 0 : Default.fixPadding * 1.5,
              marginRight: isRtl ? Default.fixPadding * 1.5 : 0,
              alignItems: isRtl ? "flex-end" : "flex-start",
              flex: 9,
            }}
          >
            <Text
              numberOfLines={1}
              style={{ ...Fonts.SemiBold16black, overflow: "hidden" , top:12}}
            >
         Created a Neighbor Forum post.
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.Medium14Black,
                marginVertical: Default.fixPadding * 0.3,
                overflow: "hidden",
                top:6
              }}
            >
           Has anyone installed a security camera?
            </Text>

            <Text style={{ ...Fonts.Medium14grey }}>2 hrs ago</Text>
          </View>

          </TouchableOpacity>

          
          </View>
       
        </ScrollView>
    
 
      </SafeAreaView>
    );
  };
  
  export default EditProfileScreen;
  
  const styles = StyleSheet.create({
    contain: {
      // flex: 1,
      // alignItems: 'center',
      position:"absolute",
   
       justifyContent: 'center',
       marginLeft:3,
       top: 5, 
       marginLeft:340,
     },
     selectedButton: {
       flexDirection: 'row',
       alignItems: 'center',
     //  padding: 10,
      // borderWidth: 1,
       borderColor: 'gray',
       zIndex: 108,
       marginLeft:14
       //borderRadius: 5,
     },
     selectedButtonText: {
      // marginLeft: 10,
       //marginRight: 60,
       zIndex: 100,
       
     },
     dropdown: {
         //  position: 'absolute',
           top: 20,
           marginRight:15,
           backgroundColor: 'white',
           width:120,
           //height:82,
           borderRadius: 5,
           shadowColor: '#000',
           shadowOffset: {
             width: 0,
             height: 2,
           },
           shadowOpacity: 0.25,
           shadowRadius: 3.84,
       marginRight:20,
          // position:"absolute",
   //    marginLeft:300,
       zIndex: 107,
           
         },
        
         dropdownButton: {
             zIndex: 107,
             flexDirection: 'row',
             alignItems: 'center',
             
             
             height:42,
          //   padding: 10,
            // borderWidth: 1,
           //  borderColor: 'gray',
           //  borderBottomWidth: 1,

           },
     dropdownButtonSelected: {
       backgroundColor: 'white',
       zIndex: 107,
     },
     dropdownButtonText: {
         zIndex: 107,
         marginRight: 20,
         fontSize:17
        },
        dropdownButtons: {
         zIndex: 107,
         flexDirection: 'row',
         alignItems: 'center',
         top:4,
         height:42,
      //   padding: 10,
       //  borderWidth: 1,
       //  borderColor: 'gray',
       //  borderBottomWidth: 1,
       },
       containr: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
        // paddingHorizontal: 10,
         marginTop:30,
        
         
         marginHorizontal: Default.fixPadding * 2,
       },
       buttonContainr: {
         width: '49%',
         color:'white',
         padding: Default.fixPadding * 1.2,
         borderRadius: 10,
         backgroundColor: Colors.primary,
       },
  });
  