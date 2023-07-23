import {
    Text,
    View,
    TouchableOpacity,
    Image, 
    ScrollView,
    Dimensions,
    StyleSheet,
    FlatList,
    Modal,
    SafeAreaView,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  
import Ionicons from "react-native-vector-icons/Ionicons";
  import { Colors, Default, Fonts } from "../constants/styles";
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
  import Feather from "react-native-vector-icons/Feather";
  import { useTranslation } from "react-i18next";
  import SnackbarToast from "./snackbarToast";
  //import Founded from "../screens/Founded";
  const { width } = Dimensions.get("window");
  
  const OngoingTab = (props) => {
    const { t, i18n } = useTranslation();
  
    const isRtl = i18n.dir() == "rtl";
    const [selectedValue, setSelectedValue] = useState('');
    const [dropdownOpend, setDropdownOpend] = useState(false);
  
    const [dropdownOpends, setDropdownOpends] = useState(false);
    const [dropdownOpendd, setDropdownOpendd] = useState(false);
    const handleButtonPress = (buttonValue) => {
      setSelectedValue(buttonValue);
      setDropdownOpend(false);
      setDropdownOpendd(false);
      setDropdownOpends(false);
    };
  
    function tr(key) {
      return t(`ongoingTab:${key}`);
    }
    const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };
  
  const [isVisibles, setIsVisibles] = useState(false);

  const toggleModals = () => {
    setIsVisibles(true);

    setTimeout(() => {
      setIsVisibles(false);
    }, 2000);
  };
  const [isVisibless, setIsVisibless] = useState(false);

  const toggleModalss = () => {
    setIsVisibless(true);

    setTimeout(() => {
      setIsVisibless(false);
    }, 2000);
  };
  
  const [isVisibled, setIsVisibled] = useState(false);

  const toggleModald = () => {
    setIsVisibled(true);

    setTimeout(() => {
      setIsVisibled(false);
    }, 2000);
  };
  const [isVisiblesd, setIsVisiblesd] = useState(false);

  const toggleModalsd = () => {
    setIsVisiblesd(true);

    setTimeout(() => {
      setIsVisiblesd(false);
    }, 2000);
  };
  
    const [cancelToast, setCancelToast] = useState(false);
    const onToggleSnackBarCancelToast = () => setCancelToast(false);
  
    
    const [allClear, setAllClear] = useState(false);
    
  const services = [
    {
      key: "1",
      name: "Appliances",
      image: require("../assets/images/ap1.png"),
    },
    {
      key: "2",
      name: "Automotive",
      image: require("../assets/images/ap2.png"),
    },
    {
      key: "3",
      name: "Toys & Games",
      image: require("../assets/images/ap3.jpg"),
    },
    {
      key: "4",
      name: "Bicycle",
      image: require("../assets/images/ap4.png"),
    },
    {
      key: "5",
      name: "Clothing & Accessories",
      image: require("../assets/images/ap5.jpg"),
    },
    {
      key: "6",
      name: "Tools",
      image: require("../assets/images/ap6.jpg"),
    },
    {
      key: "7",
      name: "Furniture",
      image: require("../assets/images/ap7.png"),
    },
    {
      key: "8",
      name: "Home Decor",
      image: require("../assets/images/ap8.png"),
    },
    {
      key: "9",
      name: "Garden",
      image: require("../assets/images/ap9.png"),
    },
    {
      key: "10",
      name: "Others",
      image: require("../assets/images/ap10.jpg"),
    },
  
  ];

  const renderItemServices = ({ item, index }) => {
    const isFirst =
      index === services.length - 1 || index === services.length - 2;

   
  };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
        
        
  
        <TouchableOpacity
      
      onPress={() => props.navigation.navigate("Profile4")}
        style={{
          ...Default.shadow,
          backgroundColor: Colors.white,
          marginTop: 10,
         marginHorizontal: 13,
           marginBottom: 7,
          borderRadius: 10,
         // overflow: "hidden",
          flexDirection: isRtl ? "row-reverse" : "row",
          paddingVertical: Default.fixPadding,
        }}
      >
        <View 
          style={{
            flex: 2,
          //  paddingHorizontal: Default.fixPadding * 1.5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
           
           source={require("../assets/images/dpp1.jpeg")}
            style={{ borderRadius: 5, height: 70, width: 70, marginLeft:36}}
          />
        </View>
        <View
          style={{
            flex: 5,
            justifyContent: "center",
            alignItems: isRtl ? "flex-end" : "flex-start",
          }}
        >
          <Text
            numberOfLines={1}
            style={{ ...Fonts.SemiBold15black, overflow: "hidden" , marginLeft:36, marginTop:20, fontSize:18}}
          >
     Alina Sheikh
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.SemiBold14grey, overflow: "hidden" , marginLeft:36}}
          >
          </Text>
          <View
            style={{
              marginVertical: Default.fixPadding * 0.3,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
              
     <Text
  
              numberOfLines={1}
              style={{
                ...Fonts.SemiBold14grey,
         
                textAlign: isRtl ? "right" : "left",
              }}
            >
            </Text>
          
          </View>
         
        </View>
        <View>
        <View style={styles.contain}>

        <View
          style={styles.selectedButton}
         
        >
          <TouchableOpacity onPress={toggleModal}>
           <Ionicons name="md-checkmark-circle" size={39} color="#005D7A" marginRight={8}/>
   </TouchableOpacity>
   <TouchableOpacity  onPress={toggleModald}>
           <Ionicons name="md-close-circle" size={39} color="#005D7A" />
        </TouchableOpacity>
  </View>
      </View>
      </View>
     </TouchableOpacity>
       
   
    
     <Modal
        visible={isVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
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
      <Ionicons name="person" size={32} color="black" />
      <MaterialCommunityIcons name="check" size={32} color="black"  style={styles.addIcon}/>
   
    </View>
    <View    style={{
             marginLeft:113,
              }}>
                <Text  style={{
             fontSize:23
              }}>Connected</Text>
   
    </View>
        <View style={{   justifyContent: "center",
                  alignItems: "center",
                  marginTop: Default.fixPadding * 1,}}>
          <Text style={{  ...Fonts.SemiBold18primary,
                    marginTop: 12,
                    marginBottom:26}}>You and Albert Flores are connected successfully.</Text>
        </View>
        </View>
        </View>
      </Modal>
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
      <Ionicons name="person" size={32} color="black" />
      <MaterialCommunityIcons name="check" size={32} color="black"  style={styles.addIcon}/>
   
    </View>
    <View    style={{
             marginLeft:113,
              }}>
                <Text  style={{
             fontSize:23
              }}>Connected</Text>
   
    </View>
        <View style={{   justifyContent: "center",
                  alignItems: "center",
                  marginTop: Default.fixPadding * 1,}}>
          <Text style={{  ...Fonts.SemiBold18primary,
                    marginTop: 12,
                    marginBottom:26}}>You and Jerome Bell are connected successfully.</Text>
        </View>
        </View>
        </View>
      </Modal>
      <Modal
        visible={isVisibless}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsVisibless(false)}
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
      <Ionicons name="person" size={32} color="black" />
      <MaterialCommunityIcons name="check" size={32} color="black"  style={styles.addIcon}/>
   
    </View>
    <View    style={{
             marginLeft:113,
              }}>
                <Text  style={{
             fontSize:23
              }}>Connected</Text>
   
    </View>
        <View style={{   justifyContent: "center",
                  alignItems: "center",
                  marginTop: Default.fixPadding * 1,}}>
          <Text style={{  ...Fonts.SemiBold18primary,
                    marginTop: 12,
                    marginBottom:26}}>You and Guy Hawkins are connected successfully.</Text>
        </View>
        </View>
        </View>
      </Modal>
      <Modal
        visible={isVisibled}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsVisibled(false)}
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
              //  backgroundColor: Colors.white,
                borderRadius: 10,
                justifyContent: "center",
                ...Default.shadow,
                marginTop:680
              }}
            >
              
    <View    style={{
             marginLeft:87,
              }}>
                <Text  style={{
             fontSize:23,
             color:Colors.darkGrey
              }}>Request removed</Text>
   
    </View>
       
        </View>
        </View>
      </Modal>

      <Text style={{ marginLeft:23, fontSize:19, color:Colors.grey}}>Neighbors You May Know</Text>
      <TouchableOpacity  
      onPress={() => props.navigation.navigate("Profile1")}
        style={{
          ...Default.shadow,
          backgroundColor: Colors.white,
          marginTop: 10,
         marginHorizontal: 13,
           marginBottom: 7,
          borderRadius: 10,
         // overflow: "hidden",
          flexDirection: isRtl ? "row-reverse" : "row",
          paddingVertical: Default.fixPadding,
        }}
      >
        <View 
          style={{
            flex: 2,
          //  paddingHorizontal: Default.fixPadding * 1.5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
           
           source={require("../assets/images/aaa.jpeg")}
            style={{ borderRadius: 5, height: 70, width: 70, marginLeft:36}}
          />
        </View>
        <View
          style={{
            flex: 5,
            justifyContent: "center",
            alignItems: isRtl ? "flex-end" : "flex-start",
          }}
        >
          <Text
            numberOfLines={1}
            style={{ ...Fonts.SemiBold15black, overflow: "hidden" , marginLeft:36, marginTop:20, fontSize:18}}
          >   
        Eman Fatima
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.SemiBold14grey, overflow: "hidden" , marginLeft:36}}
          >
          </Text>
          <View
            style={{
              marginVertical: Default.fixPadding * 0.3,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
              
     <Text
  
              numberOfLines={1}
              style={{
                ...Fonts.SemiBold14grey,
         
                textAlign: isRtl ? "right" : "left",
              }}
            >
            </Text>
          
          </View>
         
        </View>
        <View>
        <View>
        <View style={styles.contain}>

        <View
          style={{marginLeft:70}}
         
        >
  </View>
      </View>
      </View>
      </View>
     </TouchableOpacity>
   
      </SafeAreaView>
      
    );
  };
  
  export default OngoingTab;
  
  const styles = StyleSheet.create({
    container: {
     // flex: 1,
    //  alignItems: 'center',
    //  justifyContent: 'center',
      marginBottom:100
     
    },
    addIcon: {
      position: 'absolute',
      bottom: 2,
      left: 19,
    },
    border: {
      backgroundColor:Colors.primary,
      width:115,
      height: 30,
      bottom:14,
      // borderTopWidth: 1,
      // borderBottomWidth: 1,
      // borderTopColor: 'black',
      // borderBottomColor:'black',
      borderTopLeftRadius:4,
      borderBottomLeftRadius:4,
      borderBottomColor:'black',
      borderBottomWidth: 1,
      borderTopColor:'black',
      borderTopWidth: 1,
      borderLeftColor:'black',
      borderLeftWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: 10,
      
    
    },
    text: {
      fontSize: 20,
      marginRight: 10,
      paddingLeft:2,
      paddingRight:9,
      
      color:'white',

    },
    bar: {
      width: 3,
      height: 5,
    },
    
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
       // paddingHorizontal: 10,
        //marginTop:30,
        //marginBottom:30,
      //  height:190,
     //   fontSize:10,
     //   marginHorizontal: Default.fixPadding * 2,
      },
      buttonContainer: {
      // width: '120%',
      //  color:'white',
       // padding: Default.fixPadding * 1.2,
        borderRadius: 10,
        
      //  backgroundColor: Colors.primary,
      },
      contain: {
       // flex: 1,
       // alignItems: 'center',
        justifyContent: 'center',
        marginLeft:38,
      //  backgroundColor: Colors.primary,
        marginRight:23,
        borderRadius:20,
        marginTop:16
      },
      selectedButton: {
          
        flexDirection: 'row',
        alignItems: 'center',
      
       // borderWidth: 1,
        borderColor: 'gray',
       // marginLeft:86,
        //borderRadius: 5,
      },
      selectedButtonText: {
  
     //   marginRight: 60,
     color:"white",
     
      },
      dropdown: {
      //  position: 'absolute',
        top: 1,
        marginRight:8,
        backgroundColor: 'white',
        width:122,
        //height:82,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
      },
      dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        
        height:42,
     //   padding: 10,
       // borderWidth: 1,
      //  borderColor: 'gray',
      //  borderBottomWidth: 1,
      },
      dropdownButtonSelected: {
         
        backgroundColor: 'gray',
      },
      dropdownButtonText: {
          
       marginRight: 10,
      },
      dropdownButtons: {
          flexDirection: 'row',
          alignItems: 'center',
          top:4,
          height:42,
       //   padding: 10,
        //  borderWidth: 1,
        //  borderColor: 'gray',
        //  borderBottomWidth: 1,
        },
        text: {
    
            paddingRight:23,
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
          },
  });