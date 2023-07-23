import React, { useState, useEffect  } from 'react';
import { View, TextInput, Button, StyleSheet, Dimensions,
    BackHandler, Modal,
    SafeAreaView,Text ,TouchableOpacity} from 'react-native';
    
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
    
  import { useTranslation } from "react-i18next";
  
import OTPTextView from "react-native-otp-textinput";
  import Ionicons from "react-native-vector-icons/Ionicons";

    import { Colors, Default, Fonts } from "../constants/styles";
    
  const { width } = Dimensions.get("window");
const MyAccountScreen = (props) => {
    const { t, i18n } = useTranslation();
    const handleTextChange = (otp) => {
        if (otp.length === 4) {
          return handleVerify();
        }
      };
    const isRtl = i18n.dir() == "rtl";
    const handleVerify = () => {
        setTimeout(() => {
          props.navigation.navigate("ChangeEmail");
        }, 1500);
      };
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
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleChangePassword = () => {
      // Validate the form inputs and perform the password change logic
      if (newPassword !== confirmPassword) {
        // Show an error message that passwords do not match
        return;
      }
  
      // Perform the password change logic here
      // ...
    };
    const [isVisibles, setIsVisibles] = useState(false);

    const toggleModal = () => {
      setIsVisibles(true);
  
      setTimeout(() => {
        setIsVisibles(false);
        props.navigation.navigate("ChangeEmail"); // Replace "NextScreen" with the desired screen name
 
      }, 2000);
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
            Account
          </Text>
        </View>
        <View style={styles.container}>
            <Text style={{color:Colors.black, fontSize:24,fontWeight:"bold", marginBottom:32}}>Verify Your Email</Text>
<Text style={{color:Colors.black, fontSize:17, marginBottom:32}}>Code has been sent to you on your email address please enter it below</Text>
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
          <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
    
    <Modal
        visible={isVisibles}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsVisibles(false)}
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
                width: width * 0.8,
                backgroundColor: Colors.white,
                borderRadius: 10,
                justifyContent: "center",
                ...Default.shadow,
              }}
            >
                  <View    style={{
             marginLeft:150
              }}>
      <Ionicons name="checkmark-circle" size={42} color="black"  style={styles.addIcon}/>
     
   
    </View>
 
        <View style={{   justifyContent: "center",
                  alignItems: "center",
                  marginTop: Default.fixPadding * 1,}}>
          <Text style={{  ...Fonts.SemiBold18primary,
                    marginTop: 2,
                    marginBottom:26}}>Your email has been changed successfully.</Text>
        </View>
        </View>
        </View>
      </Modal>
      </SafeAreaView>
    );
  };
  
  export default MyAccountScreen;
  const styles = StyleSheet.create({
    container: {
    //  flex: 1,
      padding: 16,
    },
    input: {
      marginBottom: 16,
      padding: 8,
      backgroundColor:"#D9D9D9",
      marginRight:57,
      paddingTop:13,
      paddingBottom:13
    },
    line: {
        height: 1,
        backgroundColor:"gray",
        marginVertical: 5,
      },
      button: {
        backgroundColor: '#005D7A',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
        marginRight:190,
        marginTop:16,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      


      contain: {
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        top:20
      },
      butt: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 6,
        marginBottom: 16,
        marginRight:130
      },
      buttonTe: {
        color: 'black',
        fontSize: 16,
        marginLeft: 2,
      },
      deactivateButton: {
        marginBottom:17
      },
      deactivateButtonText: {
        color: '#005D7A',
        fontSize: 16,
        textDecorationLine: 'underline',
      },
  });
  