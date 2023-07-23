import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    BackHandler,
    Image,
    TextInput,
    StyleSheet,
    Dimensions,
    StatusBar,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { useTranslation } from "react-i18next";
  import { Colors, Fonts, Default } from "../constants/styles";
  import MapView, { Marker } from 'react-native-maps';
import { Slider } from "react-native-range-slider-expo";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import Feather from "react-native-vector-icons/Feather";
  import MaterialIcons from "react-native-vector-icons/MaterialIcons";
  import Loader from "../components/loader";
  
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
  
  const { width, height } = Dimensions.get("window");
  
  const RegisterScreen = ({ navigation }) => {

    
  
    const [value, setValue] = useState(0);

  const [checked, setChecked] = useState(false);

    const { t, i18n } = useTranslation();
  
    const isRtl = i18n.dir() == "rtl";
  
    function tr(key) {
      return t(`registerScreen:${key}`);
    }
    const backAction = () => {
      navigation.navigate("loginScreen");
      return true;
    };
    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
  
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);
  
    const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
  };
  
    const [registerLoader, setRegisterLoader] = useState(false);
  
    const handleRegister = () => {
      setRegisterLoader(true);
      setTimeout(() => {
        setRegisterLoader(false);
        navigation.navigate("homeScreen");
      }, 800);
    };
  
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.extraLightGrey,
          paddingTop: StatusBar.currentHeight,
        }}
      >
         
         <View
          style={{
            paddingVertical: Default.fixPadding * 1.2,
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            backgroundColor: Colors.primary,
          }}
        >
          <View
            style={{
              flex: 9,
              flexDirection: isRtl ? "row-reverse" : "row",
              marginHorizontal: Default.fixPadding * 2,
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
             Customize Neighborhood
            </Text>
          </View>
  
          <View
            style={{
              flex: 1,
              marginHorizontal: isRtl ? Default.fixPadding * 2 : 0,
            }}
          >
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginHorizontal: Default.fixPadding * 2,
              marginTop: Default.fixPadding * 1.5,
            }}
          >
             <Text style={{color:Colors.darkGrey,fontSize:15,paddingLeft:3, paddingBottom:3, marginTop:12}}>
         Update Radius
        </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Rad")}
            style={{
              ...Default.shadow,
              borderRadius: 10,
              backgroundColor: Colors.white,
              paddingVertical: Default.fixPadding * 2,
              paddingHorizontal: Default.fixPadding,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginVertical: Default.fixPadding * 1.5,
              
              
            }}
          >
            
            <View
              style={{
                
               // flex: 10.5,
                alignItems: isRtl ? "flex-end" : "flex-start",
                flexDirection:"row"
              }}
            > 

                <Ionicons name="md-radio-button-on" 
              size={18}
              color={Colors.grey}
              style={{
                
                marginRight:12
              }}
            />
              <Text
                numberOfLines={2}
                style={{
                  ...Fonts.SemiBold14grey,
                  overflow: "hidden",
                  textAlign: isRtl ? "right" : "left",
                }}
              >
              Radius
              </Text>
            </View>
          
          </TouchableOpacity>
           
        
          
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default RegisterScreen;
  const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 10,
  },
  radius: {
    fontSize: 18,
    marginTop: 10,
  },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    infoContainer: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 10,
    },
    infoText: {
      fontSize: 16,
      fontWeight: '300',
      marginBottom: 5,
    },
  });