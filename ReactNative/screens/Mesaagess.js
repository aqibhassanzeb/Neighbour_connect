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
  
  import Ionicons from "react-native-vector-icons/Ionicons";
  import Feather from "react-native-vector-icons/Feather";
  import MaterialIcons from "react-native-vector-icons/MaterialIcons";
  import Loader from "../components/loader";
  
  const { width, height } = Dimensions.get("window");
  
  const RegisterScreen = ({ navigation }) => {

    const [radius, setRadius] = useState(1);

    const handleRadiusChange = (value) => {
      setRadius(value);
    };
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
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    
    const [password, setPassword] = useState('');
  
    const [registerLoader, setRegisterLoader] = useState(false);
  
    const handleRegister = () => {
      setRegisterLoader(true);
      setTimeout(() => {
        setRegisterLoader(false);
        navigation.navigate("bottomTab");
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
            backgroundColor: Colors.primary,
            paddingBottom:6
          }}
        >
          <TouchableOpacity
            style={{
              marginHorizontal: Default.fixPadding * 2,
              marginTop: Default.fixPadding,
              alignItems: isRtl ? "flex-end" : "flex-start",
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name={isRtl ? "arrow-forward" : "arrow-back"}
              size={25}
              color={Colors.white}
            />
          </TouchableOpacity>
     
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{top:23, left:20, fontSize:23, fontWeight:900}}>
            New Message
        </Text>
        <TouchableOpacity
          style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            flexDirection: isRtl ? "row-reverse" : "row",
            borderRadius: 5,
            padding: Default.fixPadding * 0.8,
            marginHorizontal: Default.fixPadding * 2,
            top:40
          }}
        >
          <Ionicons name="search" size={20} color={Colors.grey} />
          <TextInput
           placeholder="Search Neighbors"
            style={{
              ...Fonts.SemiBold16grey,
              marginHorizontal: Default.fixPadding * 0.8,
            }}
          />
        </TouchableOpacity>
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
    },
  });