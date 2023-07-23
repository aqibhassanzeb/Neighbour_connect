import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    StyleSheet,
    Button,
    Image,
    TextInput,
    FlatList,
  } from "react-native";
  import React, { useEffect } from "react";
  import { Colors, Default, Fonts } from "../constants/styles";
  import { useTranslation } from "react-i18next";
  import Ionicons from "react-native-vector-icons/Ionicons";
  
  const ServicesScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == "rtl";
  
    const backAction = () => {
      navigation.goBack();
      return true;
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
          {("Skills Hub")}
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
      <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View flexDirection= "row">
        <Ionicons name="add-circle-outline" size={32} color="white" />

        <Button 
    color="#005D7A"

          title="Add Skills"
          onPress={() => navigation.navigate("AddSkills")}
        />
        </View>
      </View>
      <View style={styles.buttonContainer}>
      <View flexDirection= "row">
        
      <Ionicons name="list-circle-outline" size={32} color="white" />
        <Button     color="#005D7A"
          title="My Skills"
          onPress={() =>
            navigation.navigate("MySkills")
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
        textDecorationLine: 'underline'
         
         }} >Categories</Text>
    </View>
    <View style={{flexDirection:"row"}}>
    <TouchableOpacity
        
        onPress={() =>
          navigation.navigate("SkillShared", {
          })
        }
        style={{
          ...Default.shadowPrimary,
          backgroundColor: Colors.white,
          marginLeft: Default.fixPadding * 2,
          marginRight: Default.fixPadding * 0.2,
          marginTop: Default.fixPadding * 1.2,
         marginBottom:  Default.fixPadding * 1.2 ,
          flex: 1,
          overflow: "hidden",
          borderRadius: 10,
          alignItems: "center",
          paddingVertical: Default.fixPadding * 2,
        }}
      >
        <Image 
        source={require("../assets/images/icon1.png")} style={{ height: 35, width: 35 }} />
        <Text
          style={{
            ...Fonts.SemiBold15primary,
            marginTop: Default.fixPadding * 0.8,
          }}
        >
         Electrician
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
         onPress={() =>
          navigation.navigate("Tutoring", {
          })
        }
        style={{
          ...Default.shadowPrimary,
          backgroundColor: Colors.white,
          marginLeft: Default.fixPadding * 2,
         marginRight: Default.fixPadding * 2,
         marginTop: Default.fixPadding * 1.2,
        marginBottom:  Default.fixPadding * 1.2 ,
          flex: 1,
          overflow: "hidden",
          borderRadius: 10,
          alignItems: "center",
          paddingVertical: Default.fixPadding * 2,
        }}
      >
        <Image 
        source={require("../assets/images/tutoring.png")} style={{ height: 35, width: 35 }} />
        <Text
          style={{
            ...Fonts.SemiBold15primary,
            marginTop: Default.fixPadding * 0.8,
          }}
        >
         Tutoring
        </Text>
      </TouchableOpacity>
      </View>
      <View style={{flexDirection:"row"}}>
     
     <TouchableOpacity
         
         onPress={() =>
          navigation.navigate("Baby", {
          })
        }
         style={{
           ...Default.shadowPrimary,
           backgroundColor: Colors.white,
           marginLeft: Default.fixPadding * 2,
           marginRight: Default.fixPadding * 0.2,
           marginTop: Default.fixPadding * 1.2,
          marginBottom:  Default.fixPadding * 1.2 ,
           flex: 1,
           overflow: "hidden",
           borderRadius: 10,
           alignItems: "center",
           paddingVertical: Default.fixPadding * 2,
         }}
       >
         <Image 
         source={require("../assets/images/baby.png")} style={{ height: 35, width: 35 }} />
         <Text
           style={{
             ...Fonts.SemiBold15primary,
             marginTop: Default.fixPadding * 0.8,
           }}
         >BabySitting
         </Text>
       </TouchableOpacity>
       <TouchableOpacity
         onPress={() =>
          navigation.navigate("Cooking", {
          })
        }
         style={{
           ...Default.shadowPrimary,
           backgroundColor: Colors.white,
           marginLeft: Default.fixPadding * 2,
          marginRight: Default.fixPadding * 2,
          marginTop: Default.fixPadding * 1.2,
         marginBottom:  Default.fixPadding * 1.2 ,
           flex: 1,
           overflow: "hidden",
           borderRadius: 10,
           alignItems: "center",
           paddingVertical: Default.fixPadding * 2,
         }}
       >
         <Image 
         source={require("../assets/images/icon4.png")} style={{ height: 35, width: 35 }} />
         <Text
           style={{
             ...Fonts.SemiBold15primary,
             marginTop: Default.fixPadding * 0.8,
           }}
         >
          Cooking
         </Text>
       </TouchableOpacity>
       </View>
       <View style={{flexDirection:"row"}}>
     
    <TouchableOpacity
        
        onPress={() =>
          navigation.navigate("Gardening", {
          })
        }
        style={{
          ...Default.shadowPrimary,
          backgroundColor: Colors.white,
          marginLeft: Default.fixPadding * 2,
          marginRight: Default.fixPadding * 0.2,
          marginTop: Default.fixPadding * 1.2,
         marginBottom:  Default.fixPadding * 1.2 ,
          flex: 1,
          overflow: "hidden",
          borderRadius: 10,
          alignItems: "center",
          paddingVertical: Default.fixPadding * 2,
        }}
      >
        <Image 
        source={require("../assets/images/icon5.png")} style={{ height: 35, width: 35 }} />
        <Text
          style={{
            ...Fonts.SemiBold15primary,
            marginTop: Default.fixPadding * 0.8,
          }}
        >
         Gardening
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        
        onPress={() =>
          navigation.navigate("Tech", {
          })
        }
        style={{
          ...Default.shadowPrimary,
          backgroundColor: Colors.white,
          marginLeft: Default.fixPadding * 2,
         marginRight: Default.fixPadding * 2,
         marginTop: Default.fixPadding * 1.2,
         marginBottom:  Default.fixPadding * 1.2 ,
          flex: 1,
          overflow: "hidden",
          borderRadius: 10,
          alignItems: "center",
          paddingVertical: Default.fixPadding * 2,
        }}
      >
        <Image 
        source={require("../assets/images/tech.jpg")} style={{ height: 35, width: 35 }} />
        <Text
          style={{
            ...Fonts.SemiBold15primary,
            marginTop: Default.fixPadding * 0.8,
          }}
        >
        Technology
        </Text>
      </TouchableOpacity>
      </View>
      <View style={{flexDirection:"row"}}>
     
    <TouchableOpacity
        
        onPress={() =>
          navigation.navigate("Tailor", {
          })
        }
        style={{
          ...Default.shadowPrimary,
          backgroundColor: Colors.white,
          marginLeft: Default.fixPadding * 2,
          marginRight: Default.fixPadding * 0.2,
          marginTop: Default.fixPadding * 1.2,
         marginBottom:  Default.fixPadding * 2 ,
          flex: 1,
          overflow: "hidden",
          borderRadius: 10,
          alignItems: "center",
          paddingVertical: Default.fixPadding * 2,
        }}
      >
        <Image 
        source={require("../assets/images/tailoring.png")} style={{ height: 35, width: 35 }} />
        <Text
          style={{
            ...Fonts.SemiBold15primary,
            marginTop: Default.fixPadding * 0.8,
          }}
        >
         Tailoring
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        
        onPress={() =>
          navigation.navigate("Salon", {
          })
        }
        style={{
          ...Default.shadowPrimary,
          backgroundColor: Colors.white,
          marginLeft: Default.fixPadding * 2,
         marginRight: Default.fixPadding * 2,
          marginTop: Default.fixPadding * 1.2,
         marginBottom:  Default.fixPadding * 2 ,
          flex: 1,
          overflow: "hidden",
          borderRadius: 10,
          alignItems: "center",
          paddingVertical: Default.fixPadding * 2,
        }}
      >
        <Image 
        source={require("../assets/images/icon8.png")} style={{ height: 35, width: 35 }} />
        <Text
          style={{
            ...Fonts.SemiBold15primary,
            marginTop: Default.fixPadding * 0.8,
          }}
        >
       Salon
        </Text>
      </TouchableOpacity>
      </View>
      <View style={{flexDirection:"row"}}>
     
    <TouchableOpacity
        
        onPress={() =>
          navigation.navigate("Paint", {
          })
        }
        style={{
          ...Default.shadowPrimary,
          backgroundColor: Colors.white,
          marginLeft: Default.fixPadding * 2,
          marginRight: Default.fixPadding * 0.2,
        //  marginTop: Default.fixPadding * 2,
         marginBottom:  Default.fixPadding * 2 ,
          flex: 1,
          overflow: "hidden",
          borderRadius: 10,
          alignItems: "center",
          paddingVertical: Default.fixPadding * 2,
        }}
      >
        <Image 
        source={require("../assets/images/icon9.png")} style={{ height: 35, width: 35 }} />
        <Text
          style={{
            ...Fonts.SemiBold15primary,
            marginTop: Default.fixPadding * 0.8,
          }}
        >
         Paint
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        
        onPress={() =>
          navigation.navigate("Plumber", {
          })
        }
        style={{
          ...Default.shadowPrimary,
          backgroundColor: Colors.white,
          marginLeft: Default.fixPadding * 2,
         marginRight: Default.fixPadding * 2,
       //   marginTop: Default.fixPadding * 2,
         marginBottom:  Default.fixPadding * 2 ,
          flex: 1,
          overflow: "hidden",
          borderRadius: 10,
          alignItems: "center",
          paddingVertical: Default.fixPadding * 2,
        }}
      >
        <Image 
        source={require("../assets/images/icon10.png")} style={{ height: 35, width: 35 }} />
        <Text
          style={{
            ...Fonts.SemiBold15primary,
            marginTop: Default.fixPadding * 0.8,
          }}
        >
         Plumbers
        </Text>
      </TouchableOpacity>
      </View>
      <View style={{flexDirection:"row"}}>
     
    <TouchableOpacity
        
        onPress={() =>
          navigation.navigate("Arts", {
          })
        }
        style={{
          ...Default.shadowPrimary,
          backgroundColor: Colors.white,
          marginLeft: Default.fixPadding * 2,
          marginRight: Default.fixPadding * 0.2,
        //  marginTop: Default.fixPadding * 2,
         marginBottom:  Default.fixPadding * 2 ,
          flex: 1,
          overflow: "hidden",
          borderRadius: 10,
          alignItems: "center",
          paddingVertical: Default.fixPadding * 2,
        }}
      >
        <Image 
        source={require("../assets/images/art.jpg")} style={{ height: 35, width: 35 }} />
        <Text
          style={{
            ...Fonts.SemiBold15primary,
            marginTop: Default.fixPadding * 0.8,
          }}
        >
         Arts & Crafts
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        
        onPress={() =>
          navigation.navigate("Photo", {
          })
        }
        style={{
          ...Default.shadowPrimary,
          backgroundColor: Colors.white,
          marginLeft: Default.fixPadding * 2,
         marginRight: Default.fixPadding * 2,
       //   marginTop: Default.fixPadding * 2,
         marginBottom:  Default.fixPadding * 2 ,
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
  
  export default ServicesScreen;

  
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   // paddingHorizontal: 10,
    marginTop:30,
   
    
    marginHorizontal: Default.fixPadding * 2,
  },
  buttonContainer: {
    width: '49%',
    color:'white',
    padding: Default.fixPadding * 1.2,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
});
  