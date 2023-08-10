import React, { useState, useEffect  } from 'react';
import { View, TextInput, Button, StyleSheet, Dimensions,
    BackHandler, Modal,
    SafeAreaView,Text ,TouchableOpacity} from 'react-native';
    
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
    
  import { useTranslation } from "react-i18next";
  
import OTPTextView from "react-native-otp-textinput";
  import Ionicons from "react-native-vector-icons/Ionicons";

    import { Colors, Default, Fonts } from "../constants/styles";
import Loader from '../components/loader';
import { verifyEmail } from '../apis/apis';
    
  const { width } = Dimensions.get("window");
const MyAccountScreen = (props) => {

  const [code, setCode] = useState("")
  const [verifyLoader, setVerifyLoader] = useState(false)
    const { t, i18n } = useTranslation();
    const handleTextChange = (otp) => {
      setCode(otp)
  };
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
    const [isVisibles, setIsVisibles] = useState(false);


    const handleVerify = async() => {
      if(code.length != 4 ){
        return alert('please fill the code')
      }
      try {
        let _id=props.route.params.userData?._id
          let payload={verification_code:code,_id,emailChange:true}
        setVerifyLoader(true);
        let verified= await verifyEmail(payload)
        if(verified.status == 200){
          alert("Email updated successfully")
          props.navigation.navigate("Myaccount");
        }else{
          alert(verified.data.error)
        }
      } catch (error) {
        alert("something went wrong!")
      } finally{
        
        setVerifyLoader(false);
      }
  
    };

    return (
        
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
        {verifyLoader && <Loader/>}
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
          <TouchableOpacity style={styles.button} onPress={handleVerify}>
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
  