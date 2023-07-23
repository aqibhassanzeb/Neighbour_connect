import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import OTPTextView from "react-native-otp-textinput";
import Loader from "../../components/loader";
import { verifyEmail } from "../../apis/apis";

const { width, height } = Dimensions.get("window");

const VerificationScreen = ({ navigation,route }) => {
  const {user}=route.params
  const { t, i18n } = useTranslation();
  const [code, setCode] = useState("")

  // console.log("user props data :",user)
  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`verificationScreen:${key}`);
  }
  const backAction = () => {
    navigation.navigate("registerScreen");
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  const [verifyLoader, setVerifyLoader] = useState(false);

  const handleVerify = async() => {
    if(code.length != 4 ){
      return alert('please fill the code')
    }
    try {
        let _id=user?._id
        let payload={verification_code:code,_id}
      setVerifyLoader(true);
      let verified= await verifyEmail(payload)
      if(verified.status == 200){
        
        navigation.navigate("Address",{user:user});
        // navigation.navigate("Radius");
      }else{
        alert(verified.data.error)
      }
    } catch (error) {
      alert("something went wrong!")
      // console.log('errror 2:',error)
    } finally{
      
      setVerifyLoader(false);
    }

  };
  const handleTextChange = (otp) => {
      setCode(otp)
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
        
        source={require("../../assets/tu.png")}
          style={{
            marginTop: Default.fixPadding * 3,
            width: width,
            height: height / 3.5,
          }}
          resizeMode={"contain"}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: Default.fixPadding * 2.4,
          }}
        >
          <Text style={{ ...Fonts.SemiBold20primary }}>
            {("Email verification")}
          </Text>
          <Text
            style={{
              ...Fonts.Medium14grey,
              textAlign: "center",
              maxWidth: "70%",
              marginTop: Default.fixPadding * 1.5,
            }}
          >
            {("Code has been sent to you on your email address please enter it below")}
          </Text>

          <OTPTextView
            containerStyle={{
              marginVertical: Default.fixPadding * 4,
            }}
            textInputStyle={{
              marginHorizontal: Default.fixPadding * 1.5,
              ...Fonts.SemiBold18primary,
              // selectionColor: Colors.primary,
              width: width / 7,
              borderBottomWidth: 2,
            }}
            tintColor={Colors.primary}
            offTintColor={Colors.lightGrey}
            inputCount={4}
            keyboardType="numeric"
            handleTextChange={handleTextChange}
          />
        </View>
        <Loader visible={verifyLoader} />
        <TouchableOpacity
          onPress={handleVerify}
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: Default.fixPadding * 2,
            paddingVertical: Default.fixPadding * 1.2,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <Text style={{ ...Fonts.SemiBold18white }}>{tr("verify")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerificationScreen;
