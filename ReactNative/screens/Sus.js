import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  StyleSheet,
  Button,
  TextInput,
  Dimensions,
  Image,
  FlatList,
} from "react-native";

import { Video } from 'expo-av';
import React, { useEffect , useState }  from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Swiper from "react-native-swiper";
const { width, height } = Dimensions.get("window");

const ServicesScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  const backAction = () => {
    navigation.goBack();
    return true;
  };
  const [cancelModal, setCancelModal] = useState(false);
  
  const [cancelToast, setCancelToast] = useState(false);
  const onToggleSnackBarCancelToast = () => setCancelToast(false);

  
  const [allClear, setAllClear] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedValue, setSelectedValue] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const [dropdownOpens, setDropdownOpens] = useState(false);
  const [dropdownOpend, setDropdownOpend] = useState(false);
  
  const [dropdownOpendd, setDropdownOpendd] = useState(false);
  const handleButtonPress = (buttonValue) => {
    setSelectedValue(buttonValue);
    setDropdownOpen(false);
    setDropdownOpens(false);
    setDropdownOpend(false);
    setDropdownOpendd(false);
  };

  const [clicked, setClicked] = useState(false);

  const handlePress = () => {
    setClicked(!clicked);
  };

  const [click, setClick] = useState(false);

  const handlePre = () => {
    setClicked(!clicked);
  };
  const [clicks, setClicks] = useState(false);

  const handlePres = () => {
    setClicks(!clicked);
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  function tr(key) {
    return t(`SkillShared:${key}`);
  }
 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
<ScrollView>
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
        {("Neighbor Watch")}
      </Text>
      
    </View>
    <TouchableOpacity
      //  onPress={() => navigation.navigate("searchScreen")}
        style={{
          ...Default.shadow,
          backgroundColor: Colors.white,
          flexDirection: isRtl ? "row-reverse" : "row",
          borderRadius: 5,
          padding: Default.fixPadding * 0.8,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <Ionicons name="search" size={20} color={Colors.grey} />
        <TextInput 
          style={{
            ...Fonts.SemiBold16grey,
            marginHorizontal: Default.fixPadding * 0.8,
          
          }}
          placeholder="Search"
          
       />
      </TouchableOpacity>
      </View>
    <View style={styles.conta}>
    <View style={styles.buttonConta}>
      <View flexDirection= "row">
      <Ionicons name="add-circle-outline" size={32} color="white" />

      <Button  color="#005D7A"
        title="Post Activity"
        onPress={() => navigation.navigate("Suspicious")}
      />
      </View>
    </View>
    <View style={styles.buttonConta}>
    <View flexDirection= "row">
      
    <Ionicons name="list-circle-outline" size={32} color="white" />
      <Button color="#005D7A"
        title="My Activities"
        onPress={() =>
          navigation.navigate("Mysus")
        }
      />
      </View>
    </View>
  </View>
  <View   style={{
        paddingTop: Default.fixPadding * 2.5,
         paddingLeft: Default.fixPadding * 2.5,
         paddingRight: Default.fixPadding * 5,
         fontWeight:90,
         paddingBottom:20
         
       
       }}>
    <Text  style={{
      ...Fonts.Bold16primary,
       
       }} >Suspicious Activities</Text>
  </View>
  <ScrollView showsVerticalScrollIndicator={false}>
        
        <View   style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            borderRadius: 10,
            marginLeft:12,
            marginRight:12,
        
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
              source={require("../assets/images/fo3.jpg")}
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
                style={{ ...Fonts.SemiBold16black, overflow: "hidden" , marginTop:12}}
              >
               Laraib Khan
              </Text>
          
   
            </View>
          
          </View>
          <View>
          <TouchableOpacity
        onPress={() => setDropdownOpens(!dropdownOpens)}
      >
          <Ionicons name="ellipsis-vertical" size={24} color="black" marginLeft={193} marginTop={10}/>
          </TouchableOpacity>
          {dropdownOpens && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={[
              styles.dropdownButton,

              selectedValue === 'button1' && styles.dropdownButtonSelected,
            ]}
            onPress={() =>  navigation.navigate("Report")}
          >
              
            <Ionicons name="flag-outline" size={20} color="black" />
            <Text style={styles.dropdownButtonText}>Report</Text>
          </TouchableOpacity>
          
         
        </View>
      )}
          </View>
        </View>
      
        <Text   style={{
                justifyContent: "center",
                alignItems: isRtl ? "flex-end" : "flex-start",
                marginTop:12,
                marginLeft:21,
                marginRight:21,
                marginBottom:4,
                fontSize:18,
                fontWeight:'bold'
              }}>Vehicle:A car just pulled up in front of the building
          </Text>
          <Text   style={{
                justifyContent: "center",
                alignItems: isRtl ? "flex-end" : "flex-start",
                marginTop:4,
                marginLeft:21,
                marginRight:21,
                marginBottom:12
              }}>I saw a car parked on the side of the road with no one inside, and the
               engine was running. It's been there for a while now, and I'm worried something might be wrong   </Text>

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
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft:18 , marginTop:2, marginBottom:2}}>
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
              <Image
                source={require("../assets/images/scar.jpg")}
                style={{ height: height / 2.8, width: width }}
                resizeMode="cover"
              />
            </View>
            <View>
              <Image
                source={require("../assets/images/scar1.jpg")}
                style={{ height: height / 2.8, width: width }}
                resizeMode="cover"
              />
            </View>
            <View>
              <Image
                source={require("../assets/images/scar3.jpg")}
                style={{ height: height / 2.8, width: width }}
                resizeMode="cover"
              />
            </View>
          </Swiper>
        </View>
       
   <Text style={{marginLeft:20, marginTop:10, fontSize:15}}>10 neighbors found this helpful</Text>
         
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
               marginTop:12,
                marginLeft:10,
                marginRight:21,
                marginBottom:12,
                fontSize:16,
                fontWeight:'bold',
              }}>Helpful
          </Text> 
          </View>
        </View>
        <View   style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            borderRadius: 10,
            marginLeft:12,
            marginRight:12,
            marginTop:29
        
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
              source={require("../assets/images/fo1.jpg")}
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
                style={{ ...Fonts.SemiBold16black, overflow: "hidden", marginTop:8 }}
              >
              Nisa Waheed
              </Text>
            
   
            </View>
          
          </View>
          <View>
          <TouchableOpacity
        onPress={() => setDropdownOpen(!dropdownOpen)}
      >
          <Ionicons name="ellipsis-vertical" size={24} color="black" marginLeft={179} marginTop={10}/>
          </TouchableOpacity>
          {dropdownOpen && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={[
              styles.dropdownButton,

              selectedValue === 'button1' && styles.dropdownButtonSelected,
            ]}
            onPress={() =>   navigation.navigate("Report")}
          >
              
            <Ionicons name="flag-outline" size={20} color="black" />
            <Text style={styles.dropdownButtonText}>Report</Text>
          </TouchableOpacity>
          
         
        </View>
      )}
          </View>
        </View>
       
        <Text   style={{
                justifyContent: "center",
                alignItems: isRtl ? "flex-end" : "flex-start",
                marginTop:12,
                marginLeft:21,
                marginRight:21,
                marginBottom:4,
                fontSize:18,
                fontWeight:'bold'
              }}>Person:I noticed a man wearing a mask and gloves walking around the neighborhood
          </Text>
          <Text   style={{
                justifyContent: "center",
                alignItems: isRtl ? "flex-end" : "flex-start",
                marginTop:4,
                marginLeft:21,
                marginRight:21,
                marginBottom:12
              }}>I noticed a person wearing a black hoodie hanging around the back of the building 
              for the past half-hour. They were looking around nervously and seemed to be trying
               to avoid being seen. I'm not sure if they're up to something, but it's definitely suspicious."   </Text>
         
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
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft:18 , marginTop:2, marginBottom:2}}>
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
              <Image
                source={require("../assets/images/sper.jpg")}
                style={{ height: height / 2.8, width: width }}
                resizeMode="cover"
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
   <Text style={{marginLeft:20, marginTop:10, fontSize:15}}>6 neighbors found this helpful</Text>
         
          <View style={{flexDirection:"row"}}>
          <TouchableOpacity onPress={handlePre}>
      <MaterialCommunityIcons
        name="thumb-up"
        size={24}
        color={click ? '#005D7A' : 'black'}
        marginLeft={21}
        marginTop={12}
      />
    </TouchableOpacity>

          <Text   style={{
                justifyContent: "center",
                alignItems: isRtl ? "flex-end" : "flex-start",
               marginTop:12,
                marginLeft:10,
                marginRight:21,
                marginBottom:12,
                fontSize:16,
                fontWeight:'bold',
              }}>Helpful
          </Text> 
          </View>
        </View>
        <View   style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            borderRadius: 10,
            marginLeft:12,
            marginRight:12,
            marginTop:29
        
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
          <View>
          <TouchableOpacity
        onPress={() => setDropdownOpendd(!dropdownOpendd)}
      >
          <Ionicons name="ellipsis-vertical" size={24} color="black" marginLeft={200} marginTop={10}/>
          </TouchableOpacity>
          {dropdownOpendd && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={[
              styles.dropdownButton,

              selectedValue === 'button1' && styles.dropdownButtonSelected,
            ]}
            onPress={() =>   navigation.navigate("Report")}
          >
              
            <Ionicons name="flag-outline" size={20} color="black" />
            <Text style={styles.dropdownButtonText}>Report</Text>
          </TouchableOpacity>
          
         
        </View>
      )}
          </View>
        </View>
      
        <Text   style={{
                justifyContent: "center",
                alignItems: isRtl ? "flex-end" : "flex-start",
                marginTop:12,
                marginLeft:21,
                marginRight:21,
                marginBottom:4,
                fontSize:18,
                fontWeight:'bold'
              }}>Vehicle:I noticed a car parked outside my neighbor's house for hours
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
              like they were just waiting for something. It could be nothing, but it's definitely strange     </Text>
               
             
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
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft:18 , marginTop:2, marginBottom:2}}>
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
   <Text style={{marginLeft:20, marginTop:10, fontSize:15}}>8 neighbors found this helpful</Text>
         
          <View style={{flexDirection:"row"}}>
          <TouchableOpacity onPress={handlePres}>
      <MaterialCommunityIcons
        name="thumb-up"
        size={24}
        color={clicks ? '#005D7A' : 'black'}
        marginLeft={21}
        marginTop={12}
      />
    </TouchableOpacity>

          <Text   style={{
                justifyContent: "center",
                alignItems: isRtl ? "flex-end" : "flex-start",
               marginTop:12,
                marginLeft:10,
                marginRight:21,
                marginBottom:12,
                fontSize:16,
                fontWeight:'bold',
              }}>Helpful
          </Text> 
          </View>
        </View>
       </ScrollView>
       </ScrollView>
    </SafeAreaView>
  );
};

export default ServicesScreen;

const styles = StyleSheet.create({
conta: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
 // paddingHorizontal: 10,
  marginTop:30,
 
  
  marginHorizontal: Default.fixPadding * 1.2,
},
buttonConta: {
  width: '49%',
  color:'white',
  padding: Default.fixPadding * 1.2,
  borderRadius: 10,
  backgroundColor: Colors.primary,
},   container: {
  // flex: 1,
 //  alignItems: 'center',
 //  justifyContent: 'center',
 //  marginBottom:100
  
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
 containe: {
 //  flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
 },
 image: {
   width: '100%',
   height: '100%',
   resizeMode: 'cover',
 },
 overlay: {
  position:'absolute',
  top:10,
  left:5

 //  backgroundColor: 'rgba(0, 0, 0, 0.5)',
 },
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
    height:30,
    fontSize:10,
    marginLeft:20,
    zIndex: 7,
  //  marginHorizontal: Default.fixPadding * 2,
  
  
  },
  buttonContainer: {
   // width: '60%',
    //color:'white',
   // padding: Default.fixPadding * 1.2,
    borderRadius: 10,
    
    backgroundColor: Colors.primary,
    zIndex: 7,
   
  },
  contain: {
   // flex: 1,
   // alignItems: 'center',
   position:"absolute",
   marginLeft:20,
    justifyContent: 'center',
marginLeft:93,
    top: -110, 
  },
  selectedButton: {
    flexDirection: 'row',
    alignItems: 'center',
  //  padding: 10,
   // borderWidth: 1,
    borderColor: 'gray',
    zIndex: 108,
    marginLeft:124
    //borderRadius: 5,
  },
  selectedButtonText: {
   // marginLeft: 10,
    //marginRight: 60,
    zIndex: 100,
    
  },
  dropdown: {
      //  position: 'absolute',
        top: 30,
        marginRight:8,
        backgroundColor: 'white',
        width:80,
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
        position:"absolute",
    marginLeft:140,
    zIndex: 107,
        
      },
      dropdowns: {
        //  position: 'absolute',
          top: 30,
          marginRight:13,
          backgroundColor: 'white',
          width:80,
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
          position:"absolute",
      marginLeft:130,
      zIndex: 107,
          
        },
        dropdownss: {
          //  position: 'absolute',
            top: 30,
            marginRight:13,
            backgroundColor: 'white',
            width:80,
            //height:82,
            borderRadius: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            position:"absolute",
        marginLeft:150,
        zIndex: 107,
            
          },
      dropdownButton: {
          zIndex: 107,
          flexDirection: 'row',
          alignItems: 'center',
          
          
          height:42,
       //   padding: 10,
         // borderWidth: 1,
        //  borderColor: 'gray',
        //  borderBottomWidth: 1,
        },
  dropdownButtonSelected: {
    backgroundColor: 'white',
    zIndex: 107,
  },
  dropdownButtonText: {
      zIndex: 107,
      marginRight: 20,
     },
     dropdownButtons: {
      zIndex: 107,
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