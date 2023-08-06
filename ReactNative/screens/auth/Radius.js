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
  import { Colors, Fonts, Default } from "../../constants/styles";
  import MapView, { Marker } from 'react-native-maps';
import { Slider } from "react-native-range-slider-expo";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import Feather from "react-native-vector-icons/Feather";
  import MaterialIcons from "react-native-vector-icons/MaterialIcons";
  import Loader from "../../components/loader";
  
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { userUpdate } from "../../apis/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
  
  const { width, height } = Dimensions.get("window");
  
  const RegisterScreen = ({ navigation, route}) => {

  
    const [value, setValue] = useState(1);

  const [checked, setChecked] = useState(false);
  const [user, setUser] = useState("")

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
  
    const handleRegister = async() => {
        
        try {
      let  payload= { address_range:value,address:route.params.address,_id:route.params.user._id}
      setRegisterLoader(true);
      let verified= await userUpdate(payload)
      if(verified.status == 200){
        navigation.navigate("Outh");
      }else{
        alert(verified.data.error)
      }
    } catch (error) {
      alert("something went wrong!")
    } finally{
      
      setRegisterLoader(false);
    }

    };
      

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.extraLightGrey,
          paddingTop: StatusBar.currentHeight,
        }}
      ><View
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
        {("Select Radius")}
      </Text>
    </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginHorizontal: Default.fixPadding * 2,
              marginTop: Default.fixPadding * 1.5,
            }}
          >
          
            <Text
          style={{
            ...Fonts.SemiBold16black,
            marginHorizontal: Default.fixPadding * .5,
          }}
        >
          {("Select your radius in Km")}
        </Text>
        <View
          style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            borderRadius: 10,
            marginHorizontal: Default.fixPadding * .3,
            marginVertical: Default.fixPadding * 1.5,
          }}
        >
          <Slider
            min={1}
            max={5}
            valueOnChange={(value) => setValue(value)}
            valueLabelsBackgroundColor={Colors.primary}
            inRangeBarColor={Colors.extraLightGrey}
            outOfRangeBarColor={Colors.primary}
            knobColor={Colors.primary}
            styleSize={"small"}
            rangeLabelsTextColor={Colors.grey}
          />
        </View>
   


            <Loader visible={registerLoader} />
            <TouchableOpacity
              onPress={handleRegister}
              style={{
                backgroundColor: Colors.primary,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: Default.fixPadding * 3,
                paddingVertical: Default.fixPadding * 1.2,
              }}
            >
              <Text style={{ ...Fonts.SemiBold18white }}>{("Continue")}</Text>
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
    fontWeight: 'bold',
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
      fontWeight: 'bold',
      marginBottom: 5,
    },
  });