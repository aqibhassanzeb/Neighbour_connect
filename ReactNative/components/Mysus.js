import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  
  Dimensions,
  StyleSheet,
  BackHandler,
  Modal
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Swiper from "react-native-swiper";
import { Video } from 'expo-av';


import CategorySkill from "../components/CategorySkill";

const CategoryScreen = ({ navigation, route }) => {

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

  const [clicked, setClicked] = useState(false);

    const handlePress = () => {
      setClicked(!clicked);
    };
  const { width, height } = Dimensions.get("window");
  const [cancelModal, setCancelModal] = useState(false);
    
  const [cancelToast, setCancelToast] = useState(false);
  const onToggleSnackBarCancelToast = () => setCancelToast(false);

  function tr(key) {
    return t(`categoryScreen:${key}`);
  }
  const backAction = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const category = [
    
    {
      key: "1",
      title: "Electrician",
      img: require("../assets/images/icon1.png"),
      other: "(4)",
      dollar: "$60/hr",
      cleaner: "Skilled",
      
    },
    {
      key: "2",
      title: "Cooking",
      img: require("../assets/images/icon4.png"),
      other: "(5)",
      dollar: "$60/hr",
      cleaner: "Semi Skilled",
    },
    {
      key: "3",
      title: "Gardening",
      img: require("../assets/images/icon5.png"),
      other: "(2)",
      dollar: "$40/hr",
      cleaner: "Skilled",
      
    },
    
  ];

  const renderItemCategory = ({ item, index }) => {
    const isFirst = index === 0;

    return (
      <CategorySkill
        onClick={() =>
          navigation.navigate("MySkillDetail", { name: item.cleaner })
        }
        marginTop={isFirst ? Default.fixPadding * 2 : 0}
        marginHorizontal={Default.fixPadding * 2}
        marginBottom={Default.fixPadding * 2}
        img={item.img}
        title={item.title}
        
        cleaner={item.cleaner}
        Text={item.Text}
      />
    );
  };

 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
    <View
    style={{
      backgroundColor: Colors.primary,
      paddingBottom:12
    }}>
       <View
      style={{
        paddingVertical: Default.fixPadding * 1.2,
        flexDirection: isRtl ? "row-reverse" : "row",
        alignItems: "center",
        backgroundColor: Colors.primary,
        paddingHorizontal: Default.fixPadding * 2,
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
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
        {("My Activities")}
      </Text>
      
    </View>
    </View>

     
       
   <View   style={{
          ...Default.shadow,
          backgroundColor: Colors.white,
          borderRadius: 10,
          marginLeft:12,
          marginRight:12,
          marginTop:23
      
        }}>
      <View
        style={{
         
          flexDirection: isRtl ? "row-reverse" : "row",
       
        }}
      >
        <View
          style={{
           // flex: 7,
            flexDirection: isRtl ? "row-reverse" : "row",
         marginLeft:12
          }}
        >
          <Image
            source={require("../assets/images/fo4.jpg")}
            style={{ height: 46, width: 66, borderRadius: 33, marginTop:9 }}
            resizeMode="contain"
          />
          <View
            style={{
              justifyContent: "center",
              marginLeft:2,
              alignItems: isRtl ? "flex-end" : "flex-start",
            }}
          >
            <Text
              numberOfLines={1}
              style={{ ...Fonts.SemiBold16black, overflow: "hidden" }}
            >
           Laiba Riaz
            </Text>
          
 
          </View>
        
        </View>
       
        </View>

      <View>
      <View style={styles.contain}>
      <TouchableOpacity
        onPress={() => setDropdownOpend(!dropdownOpend)}
      >
         <Ionicons name="ellipsis-vertical" size={24} color="black" marginLeft={310} bottom={5} position="absolute"/> 
        <Text style={styles.selectedButtonText}>{selectedValue}</Text>
      </TouchableOpacity>

      {dropdownOpend && (
        <View style={{marginLeft:280, top:10,  zIndex: 9999,position:"absolute" }}>
          <TouchableOpacity
            style={[
              styles.dropdownButton,

              selectedValue === 'button1' && styles.dropdownButtonSelected,
            ]}
            onPress={() =>   navigation.navigate("EditsSus")}
          >
              
            <Ionicons name="create-outline" size={20} color="black" />
            <Text style={styles.dropdownButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.dropdownButtons,
            

              selectedValue === 'button1' && styles.dropdownButtonSelected,
            ]}
            
            onPress={() => {
              setCancelModal(true);
            //  setSelectedId(item.key);
            }}
          >
            <Ionicons name="trash-outline" size={20} color="black" />
            <Text style={styles.dropdownButtonText}>Delete</Text>
          </TouchableOpacity>
         
        </View>
      )}
    </View>
    </View>
    
    <Text   style={{
              justifyContent: "center",
              alignItems: isRtl ? "flex-end" : "flex-start",
            
              marginLeft:21,
              marginRight:21,
              marginBottom:4,
              fontSize:18,
              fontWeight:'bold',
              width:300,
            }}>I noticed a car parked outside my neighbor's house for hours
            , and the windows are tinted so I can't see inside. It seems suspicious.
        </Text>
        <Text   style={{
              justifyContent: "center",
              alignItems: isRtl ? "flex-end" : "flex-start",
              marginTop:4,
              marginLeft:21,
              marginRight:21,
              marginBottom:12
            }}>There was a car parked outside my house all night with its engine running. The driver never got out and it seemed 
            like they were just waiting for something. It could be nothing, but it's definitely strange   </Text>
             
           
  <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft:21 , marginTop:2, marginBottom:2}}>
     <Text style={{  fontSize:18,
              fontWeight:'bold'}}>Date:</Text>
    <Text style={{ marginLeft: 1 ,fontSize:15, marginLeft:3}}>20 May 2023</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft:21 , marginTop:2, marginBottom:2}}>
      <Text  style={{  fontSize:18,
              fontWeight:'bold'}}>Time:</Text>
    <Text style={{ marginLeft: 1 ,fontSize:15, marginLeft:3}}>8:27 pm</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft:21 , marginTop:2, marginBottom:2}}>
      <MaterialCommunityIcons name="map-marker" size={24} color="#005D7A" />
    <Text style={{ marginLeft: 1 ,fontSize:15,}}>3891 Ranchview Dr. Richardson, USA</Text>
    
  </View>
        <View style={{ height: height / 2.8 }}>
        <Swiper
          dot={
            <View
              style={{
                backgroundColor: Colors.white,
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: Default.fixPadding * 0.3,
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: Colors.primary,
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: Default.fixPadding * 0.3,
              }}
            />
          }
          paginationStyle={{
            marginBottom: Default.fixPadding,
            bottom: 0,
          }}
          loop={true}
        >
          <View>
          <Video
source={require('../assets/images/vid.mp4')}
style={{ height: height / 2.8, width: 410 }}
useNativeControls
resizeMode="contain"
/>
          </View>
          <View>
            <Image
              source={require("../assets/images/sper1.jpg")}
              style={{ height: height / 2.8, width: width }}
              resizeMode="cover"
            />
          </View>
          <View>
            <Image
              source={require("../assets/images/sper2.jpg")}
              style={{ height: height / 2.8, width: width }}
              resizeMode="cover"
            />
          </View>
        </Swiper>
      </View>
 <Text style={{marginLeft:20, marginTop:10, fontSize:15}}>8 neighbors found its helpful</Text>
       
        <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={handlePress}>
    <MaterialCommunityIcons
      name="thumb-up"
      size={24}
      color={clicked ? '#005D7A' : 'black'}
      marginLeft={21}
      marginTop={12}
    />
    
  </TouchableOpacity>
  <Text   style={{
                justifyContent: "center",
                alignItems: isRtl ? "flex-end" : "flex-start",
               marginTop:16,
                marginLeft:10,
                marginRight:21,
                marginBottom:12,
                fontSize:16,
                fontWeight:'bold',
              }}>Helpful
          </Text> 
  </View>
  </View>
     
   <Modal
        animationType="fade"
        transparent={true}
        visible={cancelModal}
       // onRequestClose={() => setCancelModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
       onPressOut={() => setCancelModal(false)}
          style={{ flex: 1 }}
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
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: Default.fixPadding * 2,
                }}
              >
               
                <Text
                  style={{
                    ...Fonts.SemiBold18primary,
                    marginTop: Default.fixPadding,
                  }}
                >
                  {("Are you sure you want to delete this item?")}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    ...Fonts.SemiBold15black,
                    textAlign: "center",
                    maxWidth: "90%",
                    marginTop: Default.fixPadding * 2,
                    overflow: "hidden",
                  }}
                >

                </Text>
              </View>
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  marginTop: Default.fixPadding * 2,
                }}
              >
                <TouchableOpacity
                    
               onPress={() => {
                setCancelModal(false);
              }}
                  style={{
                    ...Default.shadow,
                    backgroundColor: Colors.primary,
                    flex: 1,
                    paddingVertical: Default.fixPadding * 1.2,
                    borderBottomLeftRadius: isRtl ? 0 : 10,
                    borderBottomRightRadius: isRtl ? 10 : 0,
                  }}
                
                   
                 >
                
                  <Text
                    style={{
                      ...Fonts.SemiBold18black,
                      textAlign: "center",
                    }}
                  >

                    {tr("Yes")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...Default.shadow,
                    backgroundColor: Colors.white,
                    flex: 1,
                    paddingVertical: Default.fixPadding * 1.2,
                    borderBottomRightRadius: isRtl ? 0 : 10,
                    borderBottomLeftRadius: isRtl ? 10 : 0,
                  }}
                 onPress={() => {
                  //   deleteItem();
                   setCancelModal(false);
                  //   setCancelToast(true);
                 }}
                >
                  <Text
                    style={{
                    ...Fonts.SemiBold18black,
                      marginHorizontal: Default.fixPadding * 1.5,
                      textAlign: "center",
                    }}
                  >
                    {tr("No")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      
    </SafeAreaView>



  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
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
      marginLeft:296,
      //borderRadius: 5,
    },
    selectedButtonText: {
position:"absolute",
   //   marginRight: 60,
  
    },
    dropdown: {
    //  position: 'absolute',
      top: 1,
      marginLeft:210,
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