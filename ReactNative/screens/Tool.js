import {
  Text,
  View,
  SafeAreaView,
  Image,
  
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
  StyleSheet,
  BackHandler,
  Modal
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";

const CategoryScreen = ({ navigation}) => {

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  const [selectedValue, setSelectedValue] = useState('');
  const [dropdownOpend, setDropdownOpend] = useState(false);

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

 
 

 

  return (
    
    
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
    <View
      style={{
        backgroundColor: Colors.primary,
        paddingBottom:12
      }}>
         <View
        style={{
          paddingVertical: Default.fixPadding * 1.2,
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
         // backgroundColor: Colors.primary,
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
          {("Tools")}
        </Text>
        
      </View>
      <TouchableOpacity
          style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            flexDirection: isRtl ? "row-reverse" : "row",
            borderRadius: 5,
            padding: Default.fixPadding * 0.8,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <Ionicons
            name="search-outline"
            size={20}
            color={Colors.grey}
            style={{ flex: 0.7, alignSelf: "center" }}
          />
          <TextInput
            style={{
              ...Fonts.SemiBold16black,
              flex: 9.3,
              textAlign: isRtl ? "right" : "left",
              marginHorizontal: Default.fixPadding * 0.8,
            }}
            placeholder={("search ")}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
          />
        </TouchableOpacity>
        </View>
        
       
        
      <ScrollView showsVerticalScrollIndicator={false}>
      
    
        
       <View
          style={{
            //margin: Default.fixPadding * 2,
            marginLeft:20
            , flexDirection:"row"
          }}
        >
           <View
        style={{
         // flexDirection: isRtl ? "row-reverse" : "row",
       //   justifyContent: "space-between",
         // marginHorizontal: Default.fixPadding * 2,
          marginBottom: Default.fixPadding * 2,
          marginTop: Default.fixPadding,
        }}
      >
         
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Car", {
              title: "Losted",
            })
          }
          style={{
          //  ...Default.shadow,
            borderRadius: 10,
     

         //   width: width / 2.29,
          }}
        >
          <Image 

            source={require("../assets/images/to1.jpg")}
            style={{ height: 165, width: 175 , ...Default.shadow, borderRadius:20}}
          />
          <View>
      
        
          </View>
          <Text 
            style={{ fontSize:16, paddingLeft:3, fontWeight:'bold'}}>
           Instruments
          </Text>
          <Text 
            style={{ fontSize:16, paddingLeft:4}}>
            RS 7000 
          </Text>
        </TouchableOpacity>
        </View>
        

           <View
        style={{
         // flexDirection: isRtl ? "row-reverse" : "row",
       //   justifyContent: "space-between",
         // marginHorizontal: Default.fixPadding * 2,
          marginBottom: Default.fixPadding * 2,
          marginTop: Default.fixPadding,
        }}
      >
         
       
       </View>
       </View>
       <View
          style={{
            //margin: Default.fixPadding * 2,
            marginLeft:20
            , flexDirection:"row"
          }}
        >
           <View
        style={{
         // flexDirection: isRtl ? "row-reverse" : "row",
       //   justifyContent: "space-between",
         // marginHorizontal: Default.fixPadding * 2,
          marginBottom: Default.fixPadding * 2,
          marginTop: Default.fixPadding,
        }}
      >
         
    </View>
    </View>
       </ScrollView>
        

    </SafeAreaView>


  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
      justifyContent: 'center',
      marginLeft:48,
      
    },
    selectedButton: {
        
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
     // borderWidth: 1,
      borderColor: 'gray',
      marginLeft:86,
      //borderRadius: 5,
    },
    selectedButtonText: {

   //   marginRight: 60,
    },
    dropdown: {
    //  position: 'absolute',
      top: 1,
      marginRight:8,
      backgroundColor: 'white',
      width:122,
      //height:82,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
 // marginRight:70,
      
    },
    dropdownButton: {
      flexDirection: 'row',
      alignItems: 'center',
      
      height:42,
   //   padding: 10,
     // borderWidth: 1,
    //  borderColor: 'gray',
    //  borderBottomWidth: 1,
    },
    dropdownButtonSelected: {
       
      backgroundColor: 'gray',
    },
    dropdownButtonText: {
        
     marginRight: 10,
    },
    dropdownButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        top:4,
        height:42,
     //   padding: 10,
      //  borderWidth: 1,
      //  borderColor: 'gray',
      //  borderBottomWidth: 1,
      },
  });