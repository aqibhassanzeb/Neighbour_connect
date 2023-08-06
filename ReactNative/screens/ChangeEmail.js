import React, { useState, useEffect  } from 'react';
import { View, TextInput, Button, StyleSheet, Dimensions,
    BackHandler, Modal,
    SafeAreaView,Text ,TouchableOpacity} from 'react-native';
    
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
    
  import { useTranslation } from "react-i18next";
  import Ionicons from "react-native-vector-icons/Ionicons";

    import { Colors, Default, Fonts } from "../constants/styles";
import { useremailUpdate } from '../apis/apis';
import Loader from '../components/loader';
    
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
    const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false)
  
    const handleSubmit = async() => {
      if(!email){
        return alert("please enter email")
      }
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const isValidEmail = emailRegex.test(email);
      if(!isValidEmail){
        return alert("Please enter valid email")
      }
      let _id=props.route.params.userData?._id
      const payload={new_email:email,_id}
      setLoader(true);
      try {
        let user= await useremailUpdate(payload)
        if(user.status == 200){
          setEmail("")
         props.navigation.navigate("VerifysEmail",{ userData: props.route.params?.userData });
        }else{
          alert(user.data.error)
        }
      } catch (error) {
        alert("something went wrong!")
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
        {loader && <Loader/>}
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
            <Text style={{color:Colors.black, fontSize:24,fontWeight:"bold", marginBottom:32}}>Change your Email</Text>
<Text style={{color:Colors.black, fontSize:17, marginBottom:32}}>Enter Your Email</Text>
      <TextInput
      maxLength={30}
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
   
          <TouchableOpacity style={styles.button}  onPress={() => handleSubmit()}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
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
  