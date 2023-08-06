import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Dimensions,
   DrawerLayoutAndroid,
  FlatList,
  Animated, PanResponder,
  StatusBar,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useTranslation } from "react-i18next";
import Stars from "react-native-stars";

  import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");



const HomeScreen = ({ navigation }) => {

  
  const [cancelModal, setCancelModal] = useState(false);
  const [userData, setUserData] = useState("")
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };
  

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`homeScreen:${key}`);
  }

const handleLogout=async()=>{
   try {
     await AsyncStorage.clear();
     navigation.navigate("Logins1")
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  
}


const loadUserData = async () => {
  try {
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserData(userData?.user)
    } else {
      console.log('No user data found in AsyncStorage.');
    }
  } catch (error) {
    console.error('Error loading user data:', error);
  }
};

useEffect(() => {
  // Load user data from AsyncStorage when the component mounts
  loadUserData();
}, []);
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
          paddingVertical: Default.fixPadding * 1.2,
          paddingTop: Default.fixPadding,
      //    marginBottom:56
        }}
      >
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginBottom: Default.fixPadding * 1.5,
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
        
            //  paddingHorizontal: Default.fixPadding * 2,
            }}
          >
            
          

          <TouchableOpacity
            style={{
              flex: 1,
              paddingHorizontal: Default.fixPadding * 4.5,
              flexDirection: isRtl ? "row-reverse" : "row",
            }}
            onPress={() => navigation.navigate("AdminMain")}
          >
            <SimpleLineIcons
              name="location-pin"
              size={22}
              color={Colors.white}
            />
             <Text
              style={{
                ...Fonts.Medium14white,
                paddingTop:3
              }}
            >
             
             2464 Royal Ln. Mesa, New Jersey 45463
            </Text>
          </TouchableOpacity>
        </View>
       
</View>
<View    style={{
              
              flexDirection: isRtl ? "row-reverse" : "row",
              }}>
<TouchableOpacity onPress={toggleSidePanel}>
  <Ionicons name="md-menu"size={38} color="white" />
</TouchableOpacity>
        <TouchableOpacity
          style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            flexDirection: isRtl ? "row-reverse" : "row",
            borderRadius: 5,
            padding: Default.fixPadding * 0.8,
            marginHorizontal: Default.fixPadding * 0.2,
            width:320,
            marginRight:6
          }}
        >
          <Ionicons name="search" size={20} color={Colors.grey} />
          <TextInput
        style={{
          // Add your custom styles here
          flex: 1,
          marginLeft: Default.fixPadding * 0.6,
          ...Fonts.SemiBold16grey,
        }}
        placeholder={tr('search')}
        placeholderTextColor={Colors.grey}
      //  value={searchText}
    //    onChangeText={setSearchText}
      />
        </TouchableOpacity>
        <TouchableOpacity     onPress={() =>
              navigation.navigate("Messages", {
                title: "Electrician",
              })
            }>
  <Ionicons name="chatbubbles-outline" size={38} color="white" />
</TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
       

    
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            marginLeft: Default.fixPadding * 3,
            
            marginBottom: Default.fixPadding * 3,
            marginTop: Default.fixPadding * 3,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("lostTabt", {
                title: "Electrician",
              })
            }
            style={{
              ...Default.shadow,
              backgroundColor: Colors.white,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: Default.fixPadding * 2,
              width: width /2.5,
              
            }}
          >
            <Image
              source={require("../assets/images/losn.png")}
              style={{ height: 65, width: 65 }}
            />
            <Text
              numberOfLines={1}
              style={{
               
                ...Fonts.SemiBold15primary,
                overflow: "hidden",
                marginTop: Default.fixPadding * 0.8,
              }}
            >
              Lost&Found
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Sus", {
                title: "Carpenter",
              })
            }
            style={{
              ...Default.shadow,
              backgroundColor: Colors.white,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: Default.fixPadding * 3,
              width: width /2.5,
              marginRight:23
            }}
          >
            <Image
              source={require("../assets/images/jj.png")}
              style={{ height: 65, width: 65 }}
            />
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.SemiBold15primary,
                overflow: "hidden",
                marginTop: Default.fixPadding * 0.8,
              }}
            >
             Neighbor Watch
            </Text>
          </TouchableOpacity>
         
        </View>
        <View
          style={{ 
             flexDirection: isRtl ? "row-reverse" : "row",
          justifyContent: "space-between",
          marginLeft: Default.fixPadding * 3,
          
          marginBottom: Default.fixPadding * 2,
          marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SkillSharing", {
                title: "Skill Sharing",
              })
            }
            style={{
              ...Default.shadow,
              backgroundColor: Colors.white,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: Default.fixPadding * 2,
              width: width /2.5,
            }}
          >
            <Image
              source={require("../assets/images/toi.png")}
              style={{ height: 72, width: 125 }}
            />
            <Text
             numberOfLines={1}
             style={{
               ...Fonts.SemiBold15primary,
               overflow: "hidden",
               marginTop: Default.fixPadding * 0.8,
              }}
            >
             Skills Hub
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("BuySell", {
                title: "Buy&Sell",
              })
            }
            style={{
              ...Default.shadow,
              backgroundColor: Colors.white,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: Default.fixPadding * 3,
              width: width /2.5,
              marginRight:23
            }}
          >
            <Image
              source={require("../assets/images/u.png")}
              style={{ height: 70, width: 95 }}
            />
            
            <Text
              numberOfLines={1}
              style={{
         ...Fonts.SemiBold15primary,
               overflow: "hidden",
               marginTop: Default.fixPadding * 0.8,
              }}
            >
             Sell Zone
            </Text>
          </TouchableOpacity>
      
        </View>
        <View
          style={{ 
             flexDirection: isRtl ? "row-reverse" : "row",
          justifyContent: "space-between",
          marginLeft: Default.fixPadding * 12,
          
          marginBottom: Default.fixPadding * 3,
          marginTop: 28,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Form", {
                title: "Skill Sharing",
              })
            }
            style={{
              ...Default.shadow,
              backgroundColor: Colors.white,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: Default.fixPadding * 3,
              width: width /2.5,
              marginRight:23
            }}
          >
            <Image
              source={require("../assets/images/nntt.png")}
              style={{ height: 69, width: 85 }}
            />
            <Text
             numberOfLines={1}
             style={{
               ...Fonts.SemiBold15primary,
               overflow: "hidden",
               marginTop: Default.fixPadding * 0.8,
               marginLeft:3
              }}
            >
            Neighbor Forum
            </Text>
          </TouchableOpacity>
         
      
        </View>

      
     
        <View style={isSidePanelOpen ? styles.sidePanelOpen : styles.sidePanelClosed}>

  <TouchableOpacity style={styles.panelButton} onPress={() => { 
    toggleSidePanel();
    navigation.navigate('Myaccount', {
        userData: userData,
  })}}>
    <Text style={styles.panelButtonText}>Account Settings</Text>
  </TouchableOpacity>
 
  <TouchableOpacity style={styles.panelButton}  onPress={() =>  navigation.navigate('Not', {
        title: "Losted",
  })}>
    <Text style={styles.panelButtonText}>Notification Settings</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.panelButton} onPress={() =>  navigation.navigate('Cradius', {
         userData: userData,
  })}>
    <Text style={styles.panelButtonText}>Customize Radius</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.panelButton} onPress={() =>   navigation.navigate('Appearance', {
        title: "Losted",
  })}>
    <Text style={styles.panelButtonText}>Appearance</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.panelButton} onPress={() =>   navigation.navigate('terns', {
        title: "Losted",
  })}>
    <Text style={styles.panelButtonText}>Neighborhood Guidelines</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.panelButton} onPress={() =>   navigation.navigate('Pol', {
        title: "Losted",
  })}>
    <Text style={styles.panelButtonText}>Privacy Policy</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.panelButton}     onPress={() => {
      toggleSidePanel();
     setCancelModal(true) }}
     
     >
    <Text style={styles.panelButtonText}>Sign out</Text>
  </TouchableOpacity>
  
</View>  

      </ScrollView>
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
                  {("Are you sure you want to signout?")}
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
               //  onPress={() => setCancelModal(false)}
                  style={{
                    ...Default.shadow,
                    backgroundColor: Colors.primary,
                    flex: 1,
                    paddingVertical: Default.fixPadding * 1.2,
                    borderBottomLeftRadius: isRtl ? 0 : 10,
                    borderBottomRightRadius: isRtl ? 10 : 0,
                  }}
                
                   
                  onPress={() => handleLogout()}
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

export default HomeScreen;

const styles = StyleSheet.create({

  sidePanelOpen: {
    flex: 1,
    width: '70%',
    backgroundColor: Colors.extraLightGrey,
    position: 'absolute',
    top: 2,
    bottom: -190,
    left: 0,
    zIndex: 999,
    height: height,
    ...Default.shadow
  },
  sidePanelClosed: {
    display: 'none',
  },
  panelButton: {
    backgroundColor: '#fff',
    //borderBottomColor:'#000',
    //borderBottomWidth:2,
    //borderTopColor:'#000',
    //borderTopWidth:2,
    ...Default.shadow,
    padding: 10,
    margin: 10,
    borderRadius: 5,

  },
  panelButtonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
