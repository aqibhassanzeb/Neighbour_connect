import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,Button,image,
    Image,
      TextInput,
    ScrollView,
    Dimensions,
    StyleSheet,
    BackHandler,
    KeyboardAvoidingView,
  } from "react-native";
  import React, { useState, useCallback, useEffect } from "react";
  import {
    Bubble,
    GiftedChat,
    Send,
    InputToolbar,
  } from "react-native-gifted-chat";
  
  import * as ImagePicker from 'expo-image-picker';
  import { Colors, Default, Fonts } from "../constants/styles";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import { useTranslation } from "react-i18next";
  import FontAwesome from "react-native-vector-icons/FontAwesome";
  
  
  const { width } = Dimensions.get("window");
  const ChatScreen = (props) => {
 
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
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };
    const { t, i18n } = useTranslation();
  
    const isRtl = i18n.dir() == "rtl";
  
    function tr(key) {
      return t(`chatScreen:${key}`);
    }
    const backAction = () => {
      props.navigation.goBack();
      return true;
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
          {("Neighbor Forum")}
        </Text>
        
      </View>
      <TouchableOpacity
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
           placeholder="Search"
            style={{
              ...Fonts.SemiBold16grey,
              marginHorizontal: Default.fixPadding * 0.8,
            }}
          />
        </TouchableOpacity>
        </View>
       
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.containr}>
      <View style={styles.buttonContainr}>
        <View flexDirection= "row">
        <Ionicons name="add-circle-outline" size={32} color="white" />

        <Button color="#005D7A"
          title="Add Discussion"
          onPress={() => props.navigation.navigate("Form2")}
        />
        </View>
      </View>
      <View style={styles.buttonContainr}>
      <View flexDirection= "row">
        
      <Ionicons name="list-circle-outline" size={32} color="white" />
        <Button  color="#005D7A"
          title="My Discussion"
          onPress={() =>
            props.navigation.navigate("MyDis")
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
           
         
         }}>
      <Text  style={{
        ...Fonts.Bold16primary,
         
         }} >Recent Discussions</Text>
    </View>
        <View   style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            borderRadius: 10,
            marginLeft:12,
            marginRight:12,
            marginTop:20
        
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
                style={{ ...Fonts.SemiBold16black, overflow: "hidden" }}
              >
               Laraib Khan
              </Text>
            
   
            </View>
          
          </View>
          <View>
          <TouchableOpacity
        onPress={() => setDropdownOpendd(!dropdownOpendd)}
      >
          <Ionicons name="ellipsis-vertical" size={24} color="black" marginLeft={193} marginTop={10}/>
          </TouchableOpacity>
          {dropdownOpendd && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={[
              styles.dropdownButton,

              selectedValue === 'button1' && styles.dropdownButtonSelected,
            ]}
            onPress={() =>   props.navigation.navigate("Report")}
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
              }}>Can anyone recommend a good family-friendly restaurant within walking distance?
          </Text>
        <Text   style={{
                justifyContent: "center",
                alignItems: isRtl ? "flex-end" : "flex-start",
                marginTop:4,
                marginLeft:21,
                marginRight:21,
                marginBottom:12
              }}>I'm eager to hear recommendations and personal experiences from my neighbors who
               have celebrated birthdays or special occasions at family-friendly restaurants nearby.    </Text>
          <TouchableOpacity
           onPress={() =>
            props.navigation.navigate("Replies")
          }>
          <View style={{flexDirection:"row"}}>
          <Ionicons name="md-chatbox-outline" size={23} color="#000" marginLeft={20}/>
          <Text   style={{
                justifyContent: "center",
                alignItems: isRtl ? "flex-end" : "flex-start",
               // marginTop:4,
                marginLeft:10,
                marginRight:21,
                marginBottom:12,
                fontSize:16,
                fontWeight:'bold',
                marginTop:1,
              }}>4 Replies 
          </Text> 
          </View>
          </TouchableOpacity>
        </View>
        <View   style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            borderRadius: 10,
            marginLeft:12,
            marginRight:12,
            marginTop:25
        
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
              source={require("../assets/images/fo2.jpg")}
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
               Nisa Waheed
              </Text>
            
            </View>
          
          </View>
          <View>
          <TouchableOpacity
        onPress={() => setDropdownOpens(!dropdownOpens)}
      >
          <Ionicons name="ellipsis-vertical" size={24} color="black" marginLeft={179} marginTop={10}/>
          </TouchableOpacity>
          {dropdownOpens && (
        <View style={styles.dropdowns}>
          <TouchableOpacity
            style={[
              styles.dropdownButton,

              selectedValue === 'button1' && styles.dropdownButtonSelected,
            ]}
            onPress={() =>   props.navigation.navigate("Report")}
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
              }}>Has anyone installed a security camera system for their home? Any recommendations?
          </Text>
        <Text   style={{
                justifyContent: "center",
                alignItems: isRtl ? "flex-end" : "flex-start",
                marginTop:4,
                marginLeft:21,
                marginRight:21,
                marginBottom:12
              }}>I want to enhance the security of my home and I'm interested in installing a 
              reliable security camera system. As I navigate through the numerous options available, 
              I would greatly appreciate
               the advice and recommendations from neighbors who have already gone through the process.     </Text>
          <TouchableOpacity
           onPress={() =>
            props.navigation.navigate("Replies")
          }>
          <View style={{flexDirection:"row"}}>
          <Ionicons name="md-chatbox-outline" size={23} color="#000" marginLeft={20}/>
          <Text   style={{
                justifyContent: "center",
                alignItems: isRtl ? "flex-end" : "flex-start",
               // marginTop:4,
                marginLeft:10,
                marginRight:21,
                marginBottom:12,
                fontSize:16,
                fontWeight:'bold',
                marginTop:1,

              }}>2 Replies 
          </Text> 
          </View>
          </TouchableOpacity>
        </View>
        <View   style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            borderRadius: 10,
            marginLeft:12,
            marginRight:12,
            marginTop:25
        
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
                style={{ ...Fonts.SemiBold16black, overflow: "hidden" }}
              >
              Laiba Riaz
              </Text>
             
            </View>
          
          </View>
          <View>
          <TouchableOpacity
        onPress={() => setDropdownOpend(!dropdownOpend)}
      >
          <Ionicons name="ellipsis-vertical" size={24} color="black" marginLeft={199} marginTop={10}/>
          </TouchableOpacity>
          {dropdownOpend && (
        <View style={styles.dropdownss}>
          <TouchableOpacity
            style={[
              styles.dropdownButton,

              selectedValue === 'button1' && styles.dropdownButtonSelected,
            ]}
            onPress={() =>   props.navigation.navigate("Report")}
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
              }}>I'm interested in organizing a park clean-up day. Who would like to volunteer?
          </Text>
        <Text   style={{
                justifyContent: "center",
                alignItems: isRtl ? "flex-end" : "flex-start",
                marginTop:4,
                marginLeft:21,
                marginRight:21,
                marginBottom:12
              }}>If you're interested in volunteering for the park clean-up day, please 
              express your willingness by commenting below.   </Text>
          <TouchableOpacity
           onPress={() =>
            props.navigation.navigate("Replies")
          }>
          <View style={{flexDirection:"row"}}>
          <Ionicons name="md-chatbox-outline" size={23} color="#000" marginLeft={20}/>
          <Text   style={{
                justifyContent: "center",
                alignItems: isRtl ? "flex-end" : "flex-start",
               // marginTop:4,
                marginLeft:10,
                marginRight:21,
                marginBottom:12,
                fontSize:16,
                fontWeight:'bold',
                marginTop:1,

              }}>3 Replies 
          </Text> 
          </View>
          </TouchableOpacity>
        </View>
        <View   style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            borderRadius: 10,
            marginLeft:12,
            marginRight:12,
            marginTop:25
        
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
             Aiza Khan
              </Text>
             
            </View>
          
          </View>
          <View>
          <TouchableOpacity
        onPress={() => setDropdownOpen(!dropdownOpen)}
      >
          <Ionicons name="ellipsis-vertical" size={24} color="black" marginLeft={199} marginTop={10}/>
          </TouchableOpacity>
          {dropdownOpen && (
        <View style={styles.dropdownss}>
          <TouchableOpacity
            style={[
              styles.dropdownButton,

              selectedValue === 'button1' && styles.dropdownButtonSelected,
            ]}
            onPress={() =>   props.navigation.navigate("Report")}
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
              }}>Can anyone suggest me a good dentist nearby?
          </Text>
        <Text   style={{
                justifyContent: "center",
                alignItems: isRtl ? "flex-end" : "flex-start",
                marginTop:4,
                marginLeft:21,
                marginRight:21,
                marginBottom:12
              }}>Hello neighbors,

              I'm currently dealing with a troublesome toothache and in urgent need of dental care. 
              I'm reaching out to our supportive community in the hopes 
              that someone can recommend a good dentist located nearby who can provide prompt assistance.   </Text>
          <TouchableOpacity
           onPress={() =>
            props.navigation.navigate("Replies")
          }>
          <View style={{flexDirection:"row"}}>
          <Ionicons name="md-chatbox-outline" size={23} color="#000" marginLeft={20}/>
          <Text   style={{
                justifyContent: "center",
                alignItems: isRtl ? "flex-end" : "flex-start",
               // marginTop:4,
                marginLeft:10,
                marginRight:21,
                marginBottom:12,
                fontSize:16,
                fontWeight:'bold',
                marginTop:1,

              }}>2 Replies 
          </Text> 
          </View>
          </TouchableOpacity>
        </View>
</ScrollView>
  
       
    
      </SafeAreaView>
    );
  };
  
  export default ChatScreen;
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
         // marginRight:70,
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
      containr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
       // paddingHorizontal: 10,
        marginTop:30,
       
        
        marginHorizontal: Default.fixPadding * 2,
      },
      buttonContainr: {
        width: '49%',
        color:'white',
        padding: Default.fixPadding * 1.2,
        borderRadius: 10,
        backgroundColor: Colors.primary,
      },
  });