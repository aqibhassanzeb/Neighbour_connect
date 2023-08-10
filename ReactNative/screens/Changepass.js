import React, { useState, useEffect  } from 'react';
import { View, TextInput, Button, StyleSheet, Dimensions,
    BackHandler, Modal,
    SafeAreaView,Text ,TouchableOpacity} from 'react-native';
    
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
    
  import { useTranslation } from "react-i18next";
  import Ionicons from "react-native-vector-icons/Ionicons";

    import { Colors, Default, Fonts } from "../constants/styles";
import { userpassUpdate } from '../apis/apis';
    
  const { width } = Dimensions.get("window");
const MyAccountScreen = (props) => {
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
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loader, setLoader] = useState(false)
  
    const handleChangePassword = async() => {
      // Validate the form inputs and perform the password change logic

      if(!currentPassword){
        return alert("please enter the current password")
      }
      const passRegex = /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;   
      if(newPassword.length < 8){
        return alert("password should be minimum 8 characters")
      }
      if (!passRegex.test(newPassword)) {
        return alert("Password should contain at least one special character")
      }
    
      if(newPassword !== confirmPassword){
        return alert("password and conform password not match")
      }

      let _id=props.route.params.userData?._id
      const payload={currPassword:currentPassword,newPassword,_id}
      setLoader(true);
      try {
        let user= await userpassUpdate(payload)
        if(user.status == 200){
          setCurrentPassword("")
          setNewPassword("")
          setConfirmPassword("")
          alert("password updated successfully")
        }else{
          alert(user.data.error)
        }
      } catch (error) {
        alert("something went wrong!")
        // console.log('errror 2:',error)
      } finally{
        
        setLoader(false);
      }
     
    };
    const [isVisibles, setIsVisibles] = useState(false);

    const toggleModal = () => {
      setIsVisibles(true);
  
      setTimeout(() => {
        setIsVisibles(false);
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
            <Text style={{color:Colors.black, fontSize:24,fontWeight:"bold", marginBottom:32}}>Change your password</Text>
<Text style={{color:Colors.black, fontSize:17, marginBottom:32}}>For a strong password, try choosing a unique phrase that you don't use on any other accounts.</Text>
      <TextInput
      maxLength={20}
        style={styles.input}
        secureTextEntry
        placeholder="Current Password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TouchableOpacity onPress={() => props.navigation.navigate("Forgets")}><Text style={{color:Colors.primary, fontSize:17, fontWeight:"bold", marginBottom:20}}>Forgot your password?</Text></TouchableOpacity>

      <TextInput
      maxLength={20}
        style={styles.input}
        secureTextEntry
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TextInput
      maxLength={20}
        style={styles.input}
        secureTextEntry
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
          <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
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
                    marginBottom:26}}>Your password has been changed successfully.</Text>
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
  