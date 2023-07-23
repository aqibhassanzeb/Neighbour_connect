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
                source={require("../assets/images/Elec1.jpg")}
                style={{ height: height / 2.8, width: width }}
                resizeMode="cover"
              />
            </View>
            <View>
              <Image
                source={require("../assets/images/Elec2.jpg")}
                style={{ height: height / 2.8, width: width }}
                resizeMode="cover"
              />
            </View>
            <View>
              <Image
                source={require("../assets/images/Elec3.jpg")}
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
                 Esther Howard
                </Text>
  
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                    alignItems: "center",
                    marginTop: Default.fixPadding * 0.5,
                  }}
                >
                  <SimpleLineIcons
                    name="location-pin"
                    size={15}
                    color={Colors.grey}
                  />
                  <Text
                    style={{
                      ...Fonts.SemiBold12grey,
                      marginLeft: Default.fixPadding * 0.3,
                    }}
                  >
                    Westheimer Rd.USA
                  </Text>
                </View>
                
                <View
                  style={{
                    marginVertical: Default.fixPadding * 0.5,
                    alignItems: "center",
                    flexDirection: isRtl ? "row-reverse" : "row",
                  }}
                >
                
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.SemiBold14grey,
                      marginHorizontal: Default.fixPadding * 0.3,
                      overflow: "hidden",
                    }}
                  >
                    Skilled Electrician
                  </Text>
                </View>
                <TouchableOpacity
          onPress={() => navigation.navigate("chatScreen")}
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            margin: Default.fixPadding * 0.6,
            paddingVertical: Default.fixPadding * 0.5,
            paddingHorizontal:Default.fixPadding *1.2

          }}
        >
          <Text style={{ ...Fonts.SemiBold18white }}>{tr("Endorse")}</Text>
        </TouchableOpacity>
              </View>
  
         
            </View>
  
            <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
         
           
         
  <TouchableOpacity
         
         style={{
           ...Default.shadow,
           backgroundColor: Colors.white,
           borderRadius: 10,
        //   justifyContent: "center",
          // alignItems: "center",
         //  paddingVertical: Default.fixPadding * 3.5,
           paddingTop:28,
           paddingBottom:38,
           paddingLeft:8,

           width: width / 1.1,
           flexDirection: 'row',
         }}
       >
        
        
         <View>
             
      
         <Text
                style={{
                  ...Fonts.SemiBold16primary,
                  marginBottom: Default.fixPadding * 0.5,
                 
              
                }}
              > <Ionicons name="ios-information-circle" size={20} color="black" />
                {tr("description")}
              </Text>
  
              {readMore ? (
                <Text style={{ ...Fonts.Medium14grey }}>
                  {tr("longDescription")}
                  <Text
                    style={{ ...Fonts.Medium14primary }}
                    onPress={() => setReadMore((desc) => !desc)}
                  >
                    {" "}
                    {tr("readLess")}
                  </Text>
                </Text>
              ) : (
                <Text style={{ ...Fonts.Medium14grey,  paddingBottom:20}}>
                  {tr("shortDescription")}
                  <Text
                    style={{ ...Fonts.Medium14primary }}
                    onPress={() => setReadMore((desc) => !desc)}
                  >
                    {tr("readMore")}
                  </Text>
                </Text>
              )}
         <Text
                style={{
                  ...Fonts.SemiBold16primary,
                  marginBottom: Default.fixPadding * 0.5,
                  
                }}
              ><Ionicons name="md-pricetag" size={20} color="black" />

                {("Price")}
              </Text>
              <Text style={{ ...Fonts.Medium14grey,  paddingBottom:20 }}>
                 RS:2000/hr
                </Text>
              <Text
                style={{
                  ...Fonts.SemiBold16primary,
                  marginBottom: Default.fixPadding * 0.5,
                }}
              ><Ionicons name="md-time" size={20} color="black" />

                {("Availability")}
              </Text>
              <Text style={{ ...Fonts.Medium14grey }}>
                8am to 2pm
            
                </Text>
                <Text style={{ ...Fonts.Medium14grey }}>
                Monday to Thursday
            
                </Text>
       
      
         
             
   </View>
       </TouchableOpacity>
              </View>
  
           

          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate("chatScreen")}
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            margin: Default.fixPadding * 2,
            paddingVertical: Default.fixPadding * 1.2,
          }}
        >
          <Text style={{ ...Fonts.SemiBold18white }}>{("Message Laiba")}</Text>
        </TouchableOpacity>
        <SnackbarToast
          visible={likeAdd}
          onDismiss={onToggleSnackBarAdd}
          title={tr("added")}
        />
        <SnackbarToast
          visible={likeRemove}
          onDismiss={onToggleSnackBarRemove}
          title={tr("remove")}
        />
        
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
  