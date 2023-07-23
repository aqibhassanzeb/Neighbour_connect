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
          <View
            style={{
              marginHorizontal: Default.fixPadding * 2,
              marginTop: Default.fixPadding * 1.5,
            }}
          >
        
            <Text style={{  
              fontWeight: 'bold',
             color: Colors.primary,
              fontSize: 24, marginBottom:20, paddingLeft:3}}>{("Privacy policy")}</Text>
            
            <View style={{ backgroundColor: Colors.white, borderRadius:3,   ...Default.shadow,}}>
       
            <Text
              style={{
                
                ...Fonts.Medium14grey,
                maxWidth: isRtl ? null : "100%",
                marginTop: Default.fixPadding,
                textAlign: isRtl ? "right" : "left",
                 paddingLeft:6,

                 paddingBottom:23
              }}
            >
              Privacy Policy: This Privacy Policy is effective January 1, 2023 and last updated April 6, 2022. To review our previous Privacy Policy, please click here. Welcome to Nextdoor. Nextdoor is where neighbors plug into the neighborhoods that matter to them. We believe by bringing neighbors together, we can cultivate a kinder world where everyone has a neighborhood they can rely on.We invite you to read this Privacy Policy Privacy Policy, which explains our privacy practices and how we handle personal information collected through Nextdoor, as well as through other social media, our marketing activities, our live events, and other activities described in this Privacy Policy. This Privacy Policy also explains how we use and share such information and choices you have about your person.This Privacy Policy also explains how we use and share such information and choices you have about your personal information.
We use Nextdoor to refer to the Nextdoor websites and our iOS and Android apps also referred to as our Services. We also use Nextdoor,we,
us, and our
to refer to the companies operating our Services as described in the Member Agreement. A Member is an individual who has registered to use our Services.
Unless otherwise indicated, this Privacy Policy applies to all of our Services in all geographies in which Nextdoor offers its Services. Some parts of this Privacy Policy apply only to our Services offered in particular geographies; please see Section 11 for additional information. Capitalized words used but not defined have the meanings described in the Member Agreement.
 1. What Personal
Information Is Collected?
We may collect personal information about you from you directly, from other Members or other users of our Services, through technology that automatically collects information from your browser or device, and from third party sources. See below for examples. Note that not all Nextdoor account types and features are available in all locations, so some of the examples below may not apply where you live.
Additionally, these examples are not exhaustive and we may collect personal information that is not specifically listed below, which we use consistent with this Privacy Policy. We may also provide supplemental information about our data collection or privacy practices in disclosures about specific Services or circumstances, or in some cases, at the time we collect personal information from you.
 Any personal information that we collect will be used and processed in a manner consistent with this Privacy Policy.
1.1 Personal information we may collect from you.
• Your personal details.
• When you sign up for Nextdoor, you will need to provide certain information about yourself, such as your name, email address, and physical address. You may also choose to provide other personal details, either when you sign up or at a later time, such as your gender, race or ethnicity, and demographic information.
You may also choose to reveal
information about yourself in your Nextdoor profile, or when you post or comment on Nextdoor, which is described in more detail below.
• If you want to join Nextdoor or use our Services before they have been introduced to your neighborhood, then you can choose to give us your contact information and ask us to notify you when we introduce our Services to your neighborhood.
• If you contact support, you will need to provide us with your contact information and a description of the issue, or else
This information may include your name, photo, email address, and any other information you agree to let the third party service share with us. The specific personal information shared with us will depend on the third partys privacy practices, agreements we have with the third party, and any choices that you may make in sharing your personal information.
• Contact lists. You may choose to share or sync your contacts with Nextdoor, including contacts names, email addresses, physical addresses, phone numbers, or other information included with your contacts. You may also manually enter the contact information of your neighbors. We use the contacts you provide to help you see which of your contacts have already joined Nextdoor,
 Profile, posts, direct messages, interests, location, and recommendations.
• You may share information about yourself in your profile, including your interests, skills, pictures, information about your household, biographical information such as your job, hometown, time you have spent living in the area, etc., emergency contact, or things that you love about your neighborhood.
• You may post on Nextdoor. Posts may include text, images, photos, videos, tags of people or places, polls, offers to sell or give away items, or anything else you want to share."
            </Text>
            </View>
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
    },
  });