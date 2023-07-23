import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    BackHandler,
    Image,
    TextInput,
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
    
    const [passwords, setPasswords] = useState('');

  
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
            backgroundColor: '#005D7A',
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
          <Image            
          source={require("../assets/tu.png")}

            style={{
              marginTop: Default.fixPadding * 1,
              width: width,
              height: height / 3.5,
            }}
            resizeMode={"contain"}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginHorizontal: Default.fixPadding * 2,
              marginTop: Default.fixPadding * 1.5,
            }}
          >
            <Text style={{ ...Fonts.SemiBold20primary }}>{("Reset Password")}</Text>
            <Text
              style={{
                ...Fonts.Medium14grey,
                maxWidth: isRtl ? null : "80%",
                marginTop: Default.fixPadding,
                textAlign: isRtl ? "right" : "left",
                marginBottom:15
              }}
            >
              {("Set the new password for your account so you can login and access all the features.")}
            </Text>
  

  
            <View
              style={{
                paddingTop: Default.fixPadding * 2.6,
                paddingBottom: Default.fixPadding,
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
                justifyContent: "center",
                borderBottomColor: Colors.lightGrey,
                borderBottomWidth: 2,
              }}
            >
               <Ionicons
              name="lock-closed-outline"
              color={Colors.grey}
              size={22}
              style={{
                flex: 0.7,
              }}
            />
              <TextInput
                placeholder={("Enter your new password")}
                placeholderTextColor={Colors.grey}
                onChangeText={setPassword}
                selectionColor={Colors.primary}
                value={password}
                secureTextEntry={true}
                maxLength={10}
                style={{
                  ...Fonts.Medium15Black,
                  flex: 9.3,
                  textAlign: isRtl ? "right" : "left",
                  marginHorizontal: Default.fixPadding * 1.2,
                }}
              />
            </View>
            
            <View
              style={{
                paddingTop: Default.fixPadding * 2.6,
                paddingBottom: Default.fixPadding,
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
                justifyContent: "center",
                borderBottomColor: Colors.lightGrey,
                borderBottomWidth: 2,
              }}
            >
             <Ionicons
              name="lock-closed-outline"
              color={Colors.grey}
              size={22}
              style={{
                flex: 0.7,
              }}
            />
              <TextInput
                placeholder={("Confirm your password")}
                placeholderTextColor={Colors.grey}
                onChangeText={setPasswords}
                secureTextEntry={true}
                selectionColor={Colors.primary}
                value={passwords}
                maxLength={10}
                style={{
                  ...Fonts.Medium15Black,
                  flex: 9.3,
                  textAlign: isRtl ? "right" : "left",
                  marginHorizontal: Default.fixPadding * 1.2,
                }}
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
              <Text style={{ ...Fonts.SemiBold18white }}>{tr("Reset")}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default RegisterScreen;
  