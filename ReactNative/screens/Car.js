import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    BackHandler,
    Share,
    StyleSheet,
    Dimensions,
    Platform,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { Colors, Default, Fonts } from "../constants/styles";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
  import { useTranslation } from "react-i18next";
  import Stars from "react-native-stars";
  import SnackbarToast from "../components/snackbarToast";
  import Swiper from "react-native-swiper";
  import ChatScreen from "../screens/chatScreen";
  const { width, height } = Dimensions.get("window");
  
  const Losted = ({ navigation, route }) => {
    const { name } = route.params;
  
    const { t, i18n } = useTranslation();
  
    const isRtl = i18n.dir() == "rtl";
  
    function tr(key) {
      return t(`detailsScreen:${key}`);
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
  
    const shareMessage = () => {
      Share.share({
        message: "Helping Hand",
      });
    };
    const [like, setLike] = useState(false);
  
    const [likeRemove, setLikeRemove] = useState(false);
    const onToggleSnackBarRemove = () => setLikeRemove(false);
  
    const [likeAdd, setLikeAdd] = useState(false);
    const onToggleSnackBarAdd = () => setLikeAdd(false);
  
    const [readMore, setReadMore] = useState(false);
  
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
       <View
          style={{
            paddingVertical: Default.fixPadding * 1.2,
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            backgroundColor: Colors.primary,
          }}
        >
          <TouchableOpacity
            style={{
              marginLeft: Default.fixPadding * 2,
              flex: 1,
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name={isRtl ? "arrow-forward" : "arrow-back"}
              size={25}
              color={Colors.white}
            />
          </TouchableOpacity>
          <View
            style={{
             
            }}
          >
           
           
          </View>
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
                source={require("../assets/images/c1.webp")}
                style={{ height: height / 2.8, width: width }}
                resizeMode="cover"
              />
            </View>
            <View>
              <Image
                source={require("../assets/images/c2.webp")}
                style={{ height: height / 2.8, width: width }}
                resizeMode="cover"
              />
            </View>
            <View>
              <Image
                source={require("../assets/images/c3.webp")}
                style={{ height: height / 2.8, width: width }}
                resizeMode="cover"
              />
            </View>
          </Swiper>
        </View>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            paddingVertical: Default.fixPadding * 1.6,
            position: "absolute",
          }}
        >
          <View
            style={{
              flex: 8,
              flexDirection: isRtl ? "row-reverse" : "row",
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            <TouchableOpacity
              style={{
                alignSelf: isRtl ? "flex-end" : "flex-start",
              }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name={isRtl ? "arrow-forward" : "arrow-back"}
                size={25}
                color={Colors.white}
              />
            </TouchableOpacity>
  
            <Text
              style={{
                ...Fonts.SemiBold18white,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: Default.fixPadding * 1.2,
              }}
            >
              {name}
            </Text>
          </View>
  
        
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ backgroundColor: Colors.extraLightGrey }}>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                marginHorizontal: Default.fixPadding * 2,
                paddingBottom: Default.fixPadding * 2,
                paddingBottom:30
              }}
            >
              <View
                style={{ flex: 7, alignItems: isRtl ? "flex-end" : "flex-start" }}
              >
                <Text
                  style={{
                    ...Fonts.SemiBold16black,
                    marginTop: Default.fixPadding * 1.5,
                    
                  }}
                >
                 Car Front Part
                </Text>
  
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                    alignItems: "center",
                    marginTop: Default.fixPadding * 0.5,
                  }}
                >
                
                  <Text
                    style={{
                      ...Fonts.SemiBold12grey,
                      marginLeft: Default.fixPadding * 0.3,
                    }}
                  >
                    RS 30000
                  </Text>
                </View>
               
              </View>
  
              <View
                style={{
                 // flex: 3,
                 // flexDirection: isRtl ? "row-reverse" : "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight:20
                }}
              >
                <TouchableOpacity
              
            onPress={() => navigation.navigate("Report")}
                  style={{
                    ...Default.shadow,
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    backgroundColor: Colors.white,
                    justifyContent: "center",
                    alignItems: "center",
                  //  marginHorizontal: Default.fixPadding * 1.5,
                  
  
                  }}
                >
                <Ionicons name="ios-flag-outline" size={24} color="black" />
                </TouchableOpacity>
              
              </View>
            </View>
  
            <View style={{ marginHorizontal: Default.fixPadding * 2 , ...Default.shadow}}>
             
              
          
  
    
           
    <TouchableOpacity
           
            style={{
              ...Default.shadow,
              backgroundColor: Colors.white,
              borderRadius: 10,
           //   justifyContent: "center",
             // alignItems: "center",
            //  paddingVertical: Default.fixPadding * 3.5,
              paddingTop:38,
              paddingBottom:38,
              paddingLeft:10,
  
              width: width / 1.1,
              flexDirection: 'row',
            }}
          >
           
           
            <View>
                
         
            <Text
              style={{
                ...Fonts.SemiBold15primary,
                overflow: "hidden",
                paddingLeft:20,
                
              }}
            >
                
      <Ionicons name="location" style={styles.image} size={20} color="black"   />
              Address
            </Text>
            
            <Text
              style={{
              //  ...Fonts.SemiBold15primary,
                overflow: "hidden",
                paddingLeft:20,
                paddingBottom:30
                
              }}
            >
          2206 Pine st, Harley, Street #04 ,Rawalpindi
            </Text>
              
            <Text
              style={{
                ...Fonts.SemiBold15primary,
                overflow: "hidden",
                paddingLeft:10,
                
              }}
            >  <Ionicons name="ios-information-circle" size={20} color="black" />
     
              Description
            </Text>
            <Text
              style={{
              //  ...Fonts.SemiBold15primary,
                overflow: "hidden",
                paddingLeft:20,
                paddingBottom:30
                
              }}
            >
           Car Front Part
            </Text>
            <Text
              style={{
                ...Fonts.SemiBold15primary,
                overflow: "hidden",
                paddingLeft:20,
                
              }}
            >
              
                
      
                <Ionicons name="checkmark-circle-outline" style={styles.image} size={20} color="green"   />
                Posted By
            </Text>
            <Text
              style={{
              //  ...Fonts.SemiBold15primary,
                overflow: "hidden",
                paddingLeft:20,
                paddingBottom:30
                
              }}
            >
          Laiba Riaz
            </Text>
        
            <Text
              style={{
                ...Fonts.SemiBold15primary,
                overflow: "hidden",
                paddingLeft:20,
                
              }}
            >
                
      
                <Ionicons name="ios-folder-open-outline" style={styles.image} size={20} color="black"   />
              Category
            </Text>
            <Text
              style={{
              //  ...Fonts.SemiBold15primary,
                overflow: "hidden",
                paddingLeft:20,
                
                paddingBottom:30
                
              }}
            >
         AutoMotive
            </Text>
            <Text
              style={{
                ...Fonts.SemiBold15primary,
                overflow: "hidden",
                paddingLeft:20,
                
              }}
            >
                
      
                <Ionicons name="pricetag" style={styles.image} size={20} color="black"   />
              Price
            </Text>
            <Text
              style={{
              //  ...Fonts.SemiBold15primary,
                overflow: "hidden",
                paddingLeft:20,
                
              }}
            >
         30000
            </Text>
    
            </View>
            
          </TouchableOpacity>
          </View>
          
  </View>
  <View
            style={{
              marginLeft:20
            }}
          >
             <View
          style={{
           // flexDirection: isRtl ? "row-reverse" : "row",
         //   justifyContent: "space-between",
           // marginHorizontal: Default.fixPadding * 2,
       //     marginBottom: Default.fixPadding * 2,
            marginTop: Default.fixPadding,
          }}
        >
            </View>
            <TouchableOpacity
           onPress={() => navigation.navigate("chatScreen")}
        style={{
          backgroundColor: Colors.primary,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginLeft:2,
          marginRight:18,
          paddingVertical: Default.fixPadding * 1.2,
        }}
      >
        <Text style={{ ...Fonts.SemiBold18white }}>{("Message")}</Text>
      </TouchableOpacity>
  
          
  
          </View>
        </ScrollView>
      
      
      </SafeAreaView>
    );
  };
  
  export default Losted;
  
  const styles = StyleSheet.create({
    containe: {
       
          borderRadius:20,
        //flex: 1,
     //   justifyContent: 'flex-end',
        alignItems: 'left',
        paddingBottom: 50,
        
        //
      },
    container: {
        flexDirection: 'row',
      //  alignItems: 'center',
      //  justifyContent: 'center',
      //  marginVertical: 10,
      },
     image:{
  
     },
      text: {
        flex: 1,
      },
  
  
  
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  
  },
  info: {
    fontSize: 16,
    marginTop: 5,
  },
  });
  