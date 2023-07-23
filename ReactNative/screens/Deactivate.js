import React, { useState, useEffect  } from 'react';
import { View, TextInput, Button, StyleSheet, 
    BackHandler,
    SafeAreaView,Text ,TouchableOpacity} from 'react-native';
    
  import { useTranslation } from "react-i18next";
  import Ionicons from "react-native-vector-icons/Ionicons";

    import { Colors, Default, Fonts } from "../constants/styles";
const MyAccountScreen = (props) => {
    const { t, i18n } = useTranslation();
    
    const [dropdownOpens, setDropdownOpens] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState('Select reason');
  
    const handleOptionSelects = (option) => {
        setSelectedOptions(option);
        setDropdownOpens(false);
        
    props.navigation.navigate('Duplicate');
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
            Deactivate Account
          </Text>
        </View>
        <View style={styles.container}>
            <Text style={{color:Colors.black, fontSize:17,fontWeight:"bold", marginBottom:32}}>We're sorry you are leaving</Text>
<Text style={{color:Colors.black, fontSize:17, marginBottom:32}}>Deactivating your account means you will no longer
receive notifications from neighbor connect and your neighbors.Neighbors who read your prior conservations
will only be able to view your name.</Text>
<Text style={{fontWeight:"bold",}}>What's your reason</Text>
<View 
              style={{
                ...Default.shadow,
                borderRadius: 10,
                backgroundColor: Colors.white,
                padding: Default.fixPadding * 1.5,
                flexDirection: isRtl ? "row-reverse" : "row",
                
              //  alignItems: "center",
                marginTop: Default.fixPadding * 3,
              }}
              
            >
              <View>
                <Ionicons
                name="options-outline"
                color={Colors.grey}
                size={20}
                style={{
                  flex: 0.7,
                }}
              />
              </View>
              <View >
      <TouchableOpacity
        onPress={() => setDropdownOpens(!dropdownOpens)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        paddingRight:1,
          color:'grey',

        }}
      >
        <View  style={{
            flexDirection:"row",
            marginLeft:15,

          

              }}>
        <Text    style={{
          marginTop:3,
          color:'grey',

              }}>{selectedOptions}</Text>
              <View   style={{
          color:'grey',
          
    position: 'absolute',
    marginLeft:290

              }}>
        <Ionicons name={dropdownOpens ? 'chevron-up' : 'chevron-down'} size={24} color='grey' />
        </View>
        </View>
      </TouchableOpacity>
</View>
</View>
      {dropdownOpens && (
        <View
        style={styles.dropdowns}
        >
          
          <TouchableOpacity onPress={() => handleOptionSelects("Didn't find it useful ")}>
            <Text style={{ padding: 10 }}>Didn't find it useful  </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelects('Duplicate account ')}>
            <Text style={{ padding: 10 }}>Duplicate account </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelects('Not enough neighbors ')}>
            <Text style={{ padding: 10 }}>Not enough neighbors</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelects('Other reasons ')}>
            <Text style={{ padding: 10 }}>Other reasons</Text>
          </TouchableOpacity>
        </View>
      )}
        

    </View>
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
        marginTop:16
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
      dropdowns: {
        width: 390,
        height: 170,
        backgroundColor: '#fafafa',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10,
        paddingRight:100,
        zIndex: 21,
      },
  });
  