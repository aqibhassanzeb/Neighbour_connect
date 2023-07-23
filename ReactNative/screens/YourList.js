import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    Modal,
    FlatList,
    StyleSheet,
    Button,
    BackHandler,
    TextInput,
  } from "react-native";
  
  import React, { useState, useEffect } from "react";
  import { Colors, Default, Fonts } from "../constants/styles";
  
import Feather from "react-native-vector-icons/Feather";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import { useTranslation } from "react-i18next";
  
const { width, height } = Dimensions.get("window");

  const Lostss = ({ navigation }) => {
    const [selectListItemem, setSelectListItemem] = useState(null);
    const items = [
      { id: 1, label: 'Option 1' },
      { id: 2, label: 'Option 2' },
      { id: 3, label: 'Option 3' },
    ];
    
    

    const [cancelModal, setCancelModal] = useState(false);
    
  const [cancelToast, setCancelToast] = useState(false);
  const onToggleSnackBarCancelToast = () => setCancelToast(false);
    const { t, i18n } = useTranslation();
  
    const isRtl = i18n.dir() == "rtl";
  
    function tr(key) {
      return t(`Lostss:${key}`);
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
  
  
    const [allClear, setAllClear] = useState(false);
  
    const [search, setSearch] = useState();
    

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
  
    return (
      
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
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
            {("My Items")}
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {allClear ? null : (
            <>
          
             
  
           
            </>
          )}
         
          <View
            style={{
              //margin: Default.fixPadding * 2,
              marginLeft:20
            }}
          >
             <View
          style={{
           // flexDirection: isRtl ? "row-reverse" : "row",
         //   justifyContent: "space-between",
           // marginHorizontal: Default.fixPadding * 2,
          //  marginBottom: Default.fixPadding * 2,
        //    marginTop: Default.fixPadding,
          }}
        >
        
          <TouchableOpacity
         
         onPress={() =>
          navigation.navigate("Losted", {
            title: "Losted",
          })
        }
            style={{
              ...Default.shadow,
            //  backgroundColor: Colors.white,
          //    borderRadius: 10,
           //   justifyContent: "center",
             // alignItems: "center",
            //  paddingVertical: Default.fixPadding * 3.5,
              paddingTop:48,
              paddingBottom:28,
              paddingLeft:5,

            //  width: width / 1.1,
              flexDirection: 'row',
            }}
          >
            <Image 

              source={require("../assets/images/bag.jpg")}
              style={{ height: 85, width: 75 , ...Default.shadow}}
            />
            <View>
            <Text
              style={{
                ...Fonts.SemiBold15primary,
                overflow: "hidden",
                paddingLeft:20,
                fontWeight:'bold',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight:'900',
             //   height:32,
                fontSize: 20,
                color:'black',
                marginRight:120
              }}
            >
             BAG
            </Text>
            <Text
              style={{
                ...Fonts.SemiBold15primary,
                overflow: "hidden",
                paddingLeft:20,
                
              }}
            >
              Pink Bag
            </Text>
            <Text
              style={{
              //  ...Fonts.SemiBold15primary,
                overflow: "hidden",
                paddingLeft:20,
                
              }}
            >
             Street#04 Harley
            </Text>
          
            <View style={styles.container}>
      <View style={styles.buttonContainer}>
      <View
          style={{
            flex: 2.5,
            justifyContent: "center",
            marginHorizontal: Default.fixPadding,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setCancelModal(true);
            //  setSelectedId(item.key);
            }}
            // style={{
            //   backgroundColor: Colors.primary,
            //   paddingVertical: Default.fixPadding * 0.5,
            //   paddingHorizontal: Default.fixPadding,
            //   borderRadius: 5,
            // }}
          >
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.SemiBold15white,
                textAlign: "center",
                overflow: "hidden",
              }}
            >
              {("Mark As Recovered")}
            </Text>
          </TouchableOpacity>
        </View>

       
      </View>
      
    </View>
            {/* <Button title="Mark As Found" onPress={() => alert('Button pressed')}  style={{
              //  ...Fonts.SemiBold15primary,
              paddingRight:55,
                overflow: "hidden",
                
              }}/> */}
          
            </View>
{/*             
           <Ionicons name="ellipsis-vertical" size={24} color="black" /> */}
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
            onPress={() => navigation.navigate("ListItem")}
          >
            <Ionicons name="create-outline" size={20} color="black" />
            <Text style={styles.dropdownButtonText}>Edit</Text>
          </TouchableOpacity>
         
        </View>
      )}
    </View>
          </TouchableOpacity>
       
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
                  {("Are you sure you want to mark this item as recovered?")}
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
                
                   
                  onPress={() => navigation.navigate("lostTabt")}
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
      
  
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default Lostss;
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
     // paddingHorizontal: 10,
      //marginTop:30,
      //marginBottom:30,
      height:30,
      fontSize:10,
      marginLeft:20
    //  marginHorizontal: Default.fixPadding * 2,
    },
    buttonContainer: {
     // width: '60%',
      //color:'white',
     // padding: Default.fixPadding * 1.2,
      borderRadius: 10,
      
      backgroundColor: Colors.primary,
    },
    contain: {
     // flex: 1,
     // alignItems: 'center',
     position:"absolute",
     marginLeft:230,
      justifyContent: 'center',
      top:55
    },
    selectedButton: {
      flexDirection: 'row',
      alignItems: 'center',
    //  padding: 10,
     // borderWidth: 1,
      borderColor: 'gray',
      
      marginLeft:124
      //borderRadius: 5,
    },
    selectedButtonText: {
     // marginLeft: 10,
      //marginRight: 60,
      
    },
    dropdown: {
        //  position: 'absolute',
          top: 1,
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
          
      marginLeft:80
          
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
        
        marginRight: 20,
       },
       dropdownButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        top:10,
        height:42,
     //   padding: 10,
      //  borderWidth: 1,
      //  borderColor: 'gray',
      //  borderBottomWidth: 1,
      },
  });