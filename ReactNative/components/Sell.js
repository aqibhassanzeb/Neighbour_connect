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
  import React, { useState } from "react";
  
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
  
    function tr(key) {
      return t(`ongoingTab:${key}`);
    }
    const [cancelModal, setCancelModal] = useState(false);
  
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
      
          
         
          
        <ScrollView showsVerticalScrollIndicator={false}>
       <View   style={{
         flexDirection:"row"
        }}>
        <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("CatsSkill", {
          title: "Founded",
        })
      }
        style={{
          ...Default.shadowPrimary,
          backgroundColor: Colors.white,
          //marginLeft: Default.fixPadding * 2,
         // marginRight: Default.fixPadding * 22,
          marginTop: Default.fixPadding * 2,
      //    marginBottom: isFirst ? Default.fixPadding * 2 : 0,
          flex: 1,
          overflow: "hidden",
          borderRadius: 10,
          alignItems: "center",
          paddingVertical: Default.fixPadding * 2,
          marginLeft:23,
        }}
      >
        <Image 

source={require("../assets/images/ap1.png")} style={{ height: 35, width: 35 }} />
        <Text
          style={{
            ...Fonts.SemiBold15primary,
            marginTop: Default.fixPadding * 0.8,
          }}
        >
         Appliances
        </Text>
      </TouchableOpacity>
      
     
      <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("AutoMotive", {
          title: "Founded",
        })
      }
        style={{
          ...Default.shadowPrimary,
          backgroundColor: Colors.white,
          marginLeft:23,
          marginRight:23,
          // marginLeft: Default.fixPadding * 2,
          // marginRight: Default.fixPadding * 22,
          marginTop: Default.fixPadding * 2,
      //    marginBottom: isFirst ? Default.fixPadding * 2 : 0,
          flex: 1,
          overflow: "hidden",
          borderRadius: 10,
          alignItems: "center",
          paddingVertical: Default.fixPadding * 2,
        }}
      >
        <Image 

source={require("../assets/images/ap2.png")} style={{ height: 35, width: 35 }} />
        <Text
          style={{
            ...Fonts.SemiBold15primary,
            marginTop: Default.fixPadding * 0.8,
          }}
        >Automotive
        </Text>
      </TouchableOpacity>
      
     
     
      </View>

      <View   style={{
         flexDirection:"row"
        }}>
        <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("Toy", {
          title: "Founded",
        })
      }
        style={{
          ...Default.shadowPrimary,
          backgroundColor: Colors.white,
          //marginLeft: Default.fixPadding * 2,
         // marginRight: Default.fixPadding * 22,
          marginTop: Default.fixPadding * 2,
      //    marginBottom: isFirst ? Default.fixPadding * 2 : 0,
          flex: 1,
          overflow: "hidden",
          borderRadius: 10,
          alignItems: "center",
          paddingVertical: Default.fixPadding * 2,
          marginLeft:23,
        }}
      >
        <Image 

source={require("../assets/images/ap3.jpg")} style={{ height: 35, width: 35 }} />
        <Text
          style={{
            ...Fonts.SemiBold15primary,
            marginTop: Default.fixPadding * 0.8,
          }}
        >
      Toys & Games
        </Text>
      </TouchableOpacity>
      
     
      <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("Bicycle", {
          title: "Founded",
        })
      }
        style={{
          ...Default.shadowPrimary,
          backgroundColor: Colors.white,
          marginLeft:23,
          marginRight:23,
          // marginLeft: Default.fixPadding * 2,
          // marginRight: Default.fixPadding * 22,
          marginTop: Default.fixPadding * 2,
      //    marginBottom: isFirst ? Default.fixPadding * 2 : 0,
          flex: 1,
          overflow: "hidden",
          borderRadius: 10,
          alignItems: "center",
          paddingVertical: Default.fixPadding * 2,
        }}
      >
        <Image 

source={require("../assets/images/ap4.png")} style={{ height: 35, width: 35 }} />
        <Text
          style={{
            ...Fonts.SemiBold15primary,
            marginTop: Default.fixPadding * 0.8,
          }}
        >
     Bicycle
        </Text>
      </TouchableOpacity>
      
     
     
      </View>

      <View   style={{
         flexDirection:"row"
        }}>
        <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("Cloth", {
          title: "Founded",
        })
      }
        style={{
          ...Default.shadowPrimary,
          backgroundColor: Colors.white,
          //marginLeft: Default.fixPadding * 2,
         // marginRight: Default.fixPadding * 22,
          marginTop: Default.fixPadding * 2,
      //    marginBottom: isFirst ? Default.fixPadding * 2 : 0,
          flex: 1,
          overflow: "hidden",
          borderRadius: 10,
          alignItems: "center",
          paddingVertical: Default.fixPadding * 2,
          marginLeft:23,
        }}
      >
        <Image 

source={require("../assets/images/ap5.jpg")} style={{ height: 35, width: 35 }} />
        <Text
          style={{
            ...Fonts.SemiBold15primary,
            marginTop: Default.fixPadding * 0.8,
          }}
        >
      Clothing & Accessories
        </Text>
      </TouchableOpacity>
      
     
      <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("Tool", {
          title: "Founded",
        })
      }
        style={{
          ...Default.shadowPrimary,
          backgroundColor: Colors.white,
          marginLeft:23,
          marginRight:23,
          // marginLeft: Default.fixPadding * 2,
          // marginRight: Default.fixPadding * 22,
          marginTop: Default.fixPadding * 2,
      //    marginBottom: isFirst ? Default.fixPadding * 2 : 0,
          flex: 1,
          overflow: "hidden",
          borderRadius: 10,
          alignItems: "center",
          paddingVertical: Default.fixPadding * 2,
        }}
      >
        <Image 

source={require("../assets/images/ap6.jpg")} style={{ height: 35, width: 35 }} />
        <Text
          style={{
            ...Fonts.SemiBold15primary,
            marginTop: Default.fixPadding * 0.8,
          }}
        >
         Tools
        </Text>
      </TouchableOpacity>
      
     
     
      </View>

      <View   style={{
         flexDirection:"row"
        }}>
        <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("Furniture", {
          title: "Founded",
        })
      }
        style={{
          ...Default.shadowPrimary,
          backgroundColor: Colors.white,
          //marginLeft: Default.fixPadding * 2,
         // marginRight: Default.fixPadding * 22,
          marginTop: Default.fixPadding * 2,
      //    marginBottom: isFirst ? Default.fixPadding * 2 : 0,
          flex: 1,
          overflow: "hidden",
          borderRadius: 10,
          alignItems: "center",
          paddingVertical: Default.fixPadding * 2,
          marginLeft:23,
        }}
      >
        <Image 

source={require("../assets/images/ap7.png")} style={{ height: 35, width: 35 }} />
        <Text
          style={{
            ...Fonts.SemiBold15primary,
            marginTop: Default.fixPadding * 0.8,
          }}
        >
        Furniture
        </Text>
      </TouchableOpacity>
      
     
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("HomeDecor", {
            title: "Founded",
          })
        }
        style={{
          ...Default.shadowPrimary,
          backgroundColor: Colors.white,
          marginLeft:23,
          marginRight:23,
          // marginLeft: Default.fixPadding * 2,
          // marginRight: Default.fixPadding * 22,
          marginTop: Default.fixPadding * 2,
      //    marginBottom: isFirst ? Default.fixPadding * 2 : 0,
          flex: 1,
          overflow: "hidden",
          borderRadius: 10,
          alignItems: "center",
          paddingVertical: Default.fixPadding * 2,
        }}
      >
        <Image 

source={require("../assets/images/ap8.png")} style={{ height: 35, width: 35 }} />
        <Text
          style={{
            ...Fonts.SemiBold15primary,
            marginTop: Default.fixPadding * 0.8,
          }}
        >
     Home Decor
        </Text>
      </TouchableOpacity>
      
     
     
      </View>

      <View   style={{
         flexDirection:"row"
        }}>
        <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("Garden", {
          title: "Founded",
        })
      }
        style={{
          ...Default.shadowPrimary,
          backgroundColor: Colors.white,
          //marginLeft: Default.fixPadding * 2,
         // marginRight: Default.fixPadding * 22,
          marginTop: Default.fixPadding * 2,
      //    marginBottom: isFirst ? Default.fixPadding * 2 : 0,
          flex: 1,
          overflow: "hidden",
          borderRadius: 10,
          alignItems: "center",
          paddingVertical: Default.fixPadding * 2,
          marginLeft:23,
        }}
      >
        <Image 

source={require("../assets/images/ap9.png")} style={{ height: 35, width: 35 }} />
        <Text
          style={{
            ...Fonts.SemiBold15primary,
            marginTop: Default.fixPadding * 0.8,
          }}
        >
        Garden
        </Text>
      </TouchableOpacity>
      
     
      <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("Other", {
          title: "Founded",
        })
      }
        style={{
          ...Default.shadowPrimary,
          backgroundColor: Colors.white,
          marginLeft:23,
          marginRight:23,
          // marginLeft: Default.fixPadding * 2,
          // marginRight: Default.fixPadding * 22,
          marginTop: Default.fixPadding * 2,
      //    marginBottom: isFirst ? Default.fixPadding * 2 : 0,
          flex: 1,
          overflow: "hidden",
          borderRadius: 10,
          alignItems: "center",
          paddingVertical: Default.fixPadding * 2,
        }}
      >
        <Image 

source={require("../assets/images/ap10.jpg")} style={{ height: 35, width: 35 }} />
        <Text
          style={{
            ...Fonts.SemiBold15primary,
            marginTop: Default.fixPadding * 0.8,
          }}
        >
        Others
        </Text>
      </TouchableOpacity>
      
     
     
      </View>


      
        </ScrollView>
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
        marginLeft:48,
        
      },
      selectedButton: {
          
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
       // borderWidth: 1,
        borderColor: 'gray',
        marginLeft:86,
        //borderRadius: 5,
      },
      selectedButtonText: {
  
     //   marginRight: 60,
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
   // marginRight:70,
        
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
  });