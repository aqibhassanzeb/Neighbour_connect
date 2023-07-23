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
  import { Colors, Default, Fonts } from "../constants/styles";
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
  import Feather from "react-native-vector-icons/Feather";
  import { useTranslation } from "react-i18next";
  import SnackbarToast from "./snackbarToast";
import Ionicons from "react-native-vector-icons/Ionicons";

  import Losted from "../screens/Losted";
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
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      
          
         
          
        <ScrollView showsVerticalScrollIndicator={false}>
          {allClear ? null : (
            <>
          
             
  
           
            </>
          )}
      
          <View
            style={{
              //margin: Default.fixPadding * 2,
              marginLeft:20
              , flexDirection:"row"
            }}
          >
            
             <View
          style={{
           // flexDirection: isRtl ? "row-reverse" : "row",
         //   justifyContent: "space-between",
           // marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 2,
            marginTop: Default.fixPadding,
          }}
        >
           
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("BuyDetails", {
                title: "Losted",
              })
            }
            
            style={{
            //  ...Default.shadow,
              borderRadius: 10,
       

           //   width: width / 2.29,
            }}
          >
           
           <View style={styles.container}>
            <Image 

              source={require("../assets/images/di1.jpg")}
              style={{ height: 165, width: 175 , ...Default.shadow, borderRadius:20}}
            

            />
             <View style={styles.tagContainer}>
             <Text style={styles.tag}>Sold</Text>
             </View>
             </View>
          
            <View>
        
          
            </View>
            <Text 
              style={{ fontSize:16, paddingLeft:3, fontWeight:'bold'}}>
              Vintage Dinning Chair
            </Text>
            <Text 
              style={{ fontSize:16, paddingLeft:4}}>
              RS 4000 
            </Text>
            
            
          </TouchableOpacity>
          </View>
          

             <View
          style={{
           // flexDirection: isRtl ? "row-reverse" : "row",
         //   justifyContent: "space-between",
           // marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 2,
            marginTop: Default.fixPadding,
          }}
        >
           
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("BuyDetails", {
                title: "Losted",
              })
            }
            style={{
            //  ...Default.shadow,
            //  backgroundColor: Colors.white,
              borderRadius: 10,
       marginLeft:30,

             // width: width / 2.29,
            }}
          >
           
            <Image 

              source={require("../assets/images/geee.jpg")}
              style={{ height: 165, width: 175 , ...Default.shadow, borderRadius:20}}
            />
            <View>
        
          
            </View>
            <Text 
            
              style={{ fontSize:16, paddingLeft:3, fontWeight:'bold'}}>
              Electric Geyser
            </Text>
            <Text 
              style={{ fontSize:16, paddingLeft:4}}>
              RS 50000
            </Text>
          </TouchableOpacity>
         </View>
         </View>
         <View
            style={{
              //margin: Default.fixPadding * 2,
              marginLeft:20
              , flexDirection:"row"
            }}
          >
             <View
          style={{
           // flexDirection: isRtl ? "row-reverse" : "row",
         //   justifyContent: "space-between",
           // marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 2,
            marginTop: Default.fixPadding,
          }}
        >
           
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("BuyDetails", {
                title: "Losted",
              })
            }
            style={{
            //  ...Default.shadow,
              borderRadius: 10,
       

           //   width: width / 2.29,
            }}
          >
            <Image 

              source={require("../assets/images/di3.jpg")}
              style={{ height: 165, width: 175 , ...Default.shadow, borderRadius:20}}
            />
            <View>
        
          
            </View>
            <Text 
              style={{ fontSize:16, paddingLeft:3, fontWeight:'bold'}}>
              Decorative Mirror
            </Text>
            <Text 
              style={{ fontSize:16, paddingLeft:4}}>
              RS 3000 
            </Text>
          </TouchableOpacity>
          </View>
          

             <View
          style={{
           // flexDirection: isRtl ? "row-reverse" : "row",
         //   justifyContent: "space-between",
           // marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 2,
            marginTop: Default.fixPadding,
          }}
        >
           
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("BuyDetails", {
                title: "Losted",
              })
            }
            style={{
            //  ...Default.shadow,
            //  backgroundColor: Colors.white,
              borderRadius: 10,
       marginLeft:30

             // width: width / 2.29,
            }}
          >
             <View style={styles.container}>
            
            <Image 

              source={require("../assets/images/di4.jpeg")}
              style={{ height: 165, width: 175 , ...Default.shadow, borderRadius:20}}
            />
             <View style={styles.tagContainer}>
             <Text style={styles.tag}>Sold</Text>
             </View>
             </View>
            <View>
        
          
            </View>
            <Text 
              style={{ fontSize:16, paddingLeft:3, fontWeight:'bold'}}>
              Plants Baskets
            </Text>
            <Text 
              style={{ fontSize:16, paddingLeft:4}}>
              RS 2000 
            </Text>
          </TouchableOpacity>
         </View>
         </View>
         <View
            style={{
              //margin: Default.fixPadding * 2,
              marginLeft:20
              , flexDirection:"row"
            }}
          >
             <View
          style={{
           // flexDirection: isRtl ? "row-reverse" : "row",
         //   justifyContent: "space-between",
           // marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 2,
            marginTop: Default.fixPadding,
          }}
        >
           
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("BuyDetails", {
                title: "Losted",
              })
            }
            style={{
            //  ...Default.shadow,
              borderRadius: 10,
       

           //   width: width / 2.29,
            }}
          >
            <Image 

              source={require("../assets/images/di5.jpg")}
              style={{ height: 165, width: 175 , ...Default.shadow, borderRadius:20}}
            />
            <View>
        
          
            </View>
            <Text 
              style={{ fontSize:16, paddingLeft:3, fontWeight:'bold'}}>
              Whitish Drawers
            </Text>
            <Text 
              style={{ fontSize:16, paddingLeft:4}}>
              RS 9000 
            </Text>
          </TouchableOpacity>
          </View>
          

             <View
          style={{
           // flexDirection: isRtl ? "row-reverse" : "row",
         //   justifyContent: "space-between",
           // marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 2,
            marginTop: Default.fixPadding,
          }}
        >
           
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("BuyDetails", {
                title: "Losted",
              })
            }
            style={{
            //  ...Default.shadow,
            //  backgroundColor: Colors.white,
              borderRadius: 10,
       marginLeft:30

             // width: width / 2.29,
            }}
          >
           
           <Image 

source={require("../assets/oven1.jpeg")}
style={{ height: 165, width: 175 , ...Default.shadow, borderRadius:20}}
/>
            
            <View>
        
          
            </View>
            <Text 
              style={{ fontSize:16, paddingLeft:3, fontWeight:'bold'}}>
              Electric Oven
            </Text>
            <Text 
              style={{ fontSize:16, paddingLeft:4}}>
              RS 4500 
            </Text>
          </TouchableOpacity>
         </View>
         </View>
         </ScrollView>
          
 
      </SafeAreaView>
    );
  };
  
  export default OngoingTab;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tagContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: 'red',
      padding: 5,
      borderTopLeftRadius:30,
      width:60
    },
    tag: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
  });