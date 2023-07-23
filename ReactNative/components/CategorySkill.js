import { Text, View, StyleSheet,TouchableOpacity, Image } from "react-native";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import Stars from "react-native-stars";

import React, { useState, useEffect } from "react";

const CategoryCard = (props, navigation) => {
    
const [selectedValue, setSelectedValue] = useState('');

const [dropdownOpend, setDropdownOpend] = useState(false);
const handleButtonPress = (buttonValue) => {
    setSelectedValue(buttonValue);
    setDropdownOpend(false);
  };
  
  const { i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";
  return (
    <TouchableOpacity
      onPress={() => props.onClick({ name: props.cleaner })}
      style={{
        ...Default.shadow,
        backgroundColor: Colors.white,
        marginTop: props.marginTop,
        marginHorizontal: props.marginHorizontal,
        marginBottom: props.marginBottom,
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
          source={props.img}
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
          style={{ ...Fonts.SemiBold15black, overflow: "hidden" , marginLeft:36}}
        >
          {props.title}
        </Text>
        <Text
          numberOfLines={1}
          style={{ ...Fonts.SemiBold14grey, overflow: "hidden" , marginLeft:36}}
        >
          {props.cleaner}
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
            {props.Text}
          </Text>
        
        </View>
       
      </View>
      <View>
      <View style={styles.contain}>
      <TouchableOpacity
        style={styles.selectedButton}
        onPress={() => setDropdownOpend(!dropdownOpend)}
      >
         <Ionicons name="ellipsis-vertical" size={24} color="black" /> 
        <Text style={styles.selectedButtonText}>{selectedValue}</Text>
      </TouchableOpacity>

      {dropdownOpend && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={[
              styles.dropdownButton,

              selectedValue === 'button1' && styles.dropdownButtonSelected,
            ]}
          >
            <Ionicons name="create-outline" size={20} color="black" />
            <Text style={styles.dropdownButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.dropdownButtons,
            

              selectedValue === 'button1' && styles.dropdownButtonSelected,
            ]}
            
     onPress={() =>    props.navigation.navigate("Losted", {
      title: "Losted",
    })}
          >
            <Ionicons name="trash-outline" size={20} color="black" />
            <Text style={styles.dropdownButtonText}>Delete</Text>
          </TouchableOpacity>
         
        </View>
      )}
    </View>
    </View>
   
    </TouchableOpacity>
  );
};

export default CategoryCard;

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