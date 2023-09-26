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
import Losted from "../screens/Losted";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");

const OngoingTab = (props) => {
  const { t, i18n } = useTranslation();
  // console.log("params 2",props)
  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`ongoingTab:${key}`);
  }
  const [cancelModal, setCancelModal] = useState(false);

  const [cancelToast, setCancelToast] = useState(false);
  const onToggleSnackBarCancelToast = () => setCancelToast(false);

  const [allClear, setAllClear] = useState(false);

  const { data, loader, searchKeyword } = useSelector(
    (state) => state.loanandfound
  );

  const regexPattern = new RegExp(searchKeyword, "i");
  let newData =
    data.length > 0 && data.filter((elm) => regexPattern.test(elm.title));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {allClear ? null : <></>}

        {/* <View
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
            marginBottom: Default.fixPadding * 2,
            marginTop: Default.fixPadding,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Losted", {
                title: "Losted",
              })
            }
            style={{
              ...Default.shadow,
              backgroundColor: Colors.white,
              borderRadius: 10,
           //   justifyContent: "center",
             // alignItems: "center",
            //  paddingVertical: Default.fixPadding * 3.5,
              paddingTop:38,
              paddingBottom:38,
              paddingLeft:30,

              width: width / 1.1,
              flexDirection: 'row',
            }}
          >
            <Image 

              source={require("../assets/images/bag.jpg")}
              style={{ height: 75, width: 75 , ...Default.shadow}}
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
                height:32,
                fontSize: 22,
                color:'black'
              }}
            >
             BAG
            </Text>
            <Text   style={{
                fontSize:18,
                color:"darkred",
                overflow: "hidden",
                paddingLeft:16,
                fontWeight:'600',
                
              }}> Lost</Text>
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

            <Text
              style={{
               // ...Fonts.SemiBold15primary,
                overflow: "hidden",
                paddingLeft:20,
                
              }}
            >
             Posted by Laiba
            </Text>
            </View>
          </TouchableOpacity>
          </View>
          
  </View> */}
        {/* <View
            style={{
              marginLeft:20
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
            props.navigation.navigate("Losted", {
              title: "Losted",
            })
          }
            style={{
              ...Default.shadow,
              backgroundColor: Colors.white,
              borderRadius: 10,
           //   justifyContent: "center",
             // alignItems: "center",
            //  paddingVertical: Default.fixPadding * 3.5,
              paddingTop:38,
              paddingBottom:38,
              paddingLeft:30,

              width: width / 1.1,
              flexDirection: 'row',
            }}
          >
            <Image

              source={require("../assets/images/wallets.jpg")}
              style={{ height: 75, width: 75 , ...Default.shadow}}
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
                height:32,
                fontSize: 22,
                color:'black'
              }}
            >
             WALLET
            </Text>
            <Text   style={{
                fontSize:18,
                color:"darkred",
                overflow: "hidden",
                paddingLeft:16,
                fontWeight:'600',
                
              }}> Lost</Text>
            <Text
              style={{
                ...Fonts.SemiBold15primary,
                overflow: "hidden",
                paddingLeft:20,
                
              }}
            >
              Brown Wallet
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
            <Text
              style={{
               // ...Fonts.SemiBold15primary,
                overflow: "hidden",
                paddingLeft:20,
                
              }}
            >
             Posted by Laiba
            </Text>
            </View>
          </TouchableOpacity>
          </View>
          
  </View> */}
        {newData.length > 0 ? (
          newData.map((elm, index) => (
            <View
              style={{
                marginLeft: 20,
              }}
              key={elm._id}
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
                    props.navigation.navigate("Losted", {
                      _id: elm._id,
                    })
                  }
                  style={{
                    ...Default.shadow,
                    backgroundColor: Colors.white,
                    borderRadius: 10,
                    //   justifyContent: "center",
                    // alignItems: "center",
                    //  paddingVertical: Default.fixPadding * 3.5,
                    paddingTop: 38,
                    paddingBottom: 38,
                    paddingLeft: 30,

                    width: width / 1.1,
                    flexDirection: "row",
                  }}
                >
                  <Image
                    source={{ uri: elm.gallary_images[0] }}
                    style={{ height: 75, width: 75, ...Default.shadow }}
                  />
                  <View>
                    <Text
                      style={{
                        ...Fonts.SemiBold15primary,
                        overflow: "hidden",
                        paddingLeft: 20,
                        fontWeight: "bold",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "900",
                        height: 32,
                        fontSize: 22,
                        color: "black",
                      }}
                    >
                      {elm.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "darkred",
                        overflow: "hidden",
                        paddingLeft: 16,
                        fontWeight: "600",
                      }}
                    >
                      {" "}
                      {elm.type}
                    </Text>
                    <Text
                      style={{
                        ...Fonts.SemiBold15primary,
                        overflow: "hidden",
                        paddingLeft: 20,
                      }}
                    >
                      3 keys
                    </Text>
                    <Text
                      style={{
                        //  ...Fonts.SemiBold15primary,
                        overflow: "hidden",
                        paddingLeft: 20,
                      }}
                    >
                      Street#04 Harley
                    </Text>
                    <Text
                      style={{
                        // ...Fonts.SemiBold15primary,
                        overflow: "hidden",
                        paddingLeft: 20,

                        paddingRight: 46,
                      }}
                    >
                      {` Posted by ${elm?.posted_by?.name} `}
                    </Text>
                  </View>
                  {elm.mark_found == true && (
                    <View style={styles.container}>
                      <View style={styles.border}>
                        <Text style={styles.text}>Recovered</Text>
                        <View style={styles.bar} />
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text
            style={{
              marginLeft: 50,
            }}
          >
            {" "}
            No Data
          </Text>
        )}
        {/* <View
            style={{
              marginLeft:20
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
            props.navigation.navigate("Losted", {
              title: "Losted",
            })
          }
            style={{
              ...Default.shadow,
              backgroundColor: Colors.white,
              borderRadius: 10,
           //   justifyContent: "center",
             // alignItems: "center",
            //  paddingVertical: Default.fixPadding * 3.5,
              paddingTop:38,
              paddingBottom:38,
              paddingLeft:30,

              width: width / 1.1,
              flexDirection: 'row',
            }}
          >
           

<Ionicons name="image-outline" size={75} color="black" 
 
              style={{ height: 75, width: 75 , ...Default.shadow}}
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
                height:32,
                fontSize: 22,
                color:'black'
              }}
            >
             RING
            </Text>
            <Text   style={{
                fontSize:18,
                color:"darkred",
                overflow: "hidden",
                paddingLeft:16,
                fontWeight:'600',
                
              }}> Lost</Text>
            <Text
              style={{
                ...Fonts.SemiBold15primary,
                overflow: "hidden",
                paddingLeft:20,
                
              }}
            >
              Silver Ring
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
            <Text
              style={{
               // ...Fonts.SemiBold15primary,
                overflow: "hidden",
                paddingLeft:20,
                
              }}
            >
              Posted by Laiba
            </Text>
            </View>
          </TouchableOpacity>
          </View>
          
  </View> */}
        <View
          style={{
            marginLeft: 20,
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
          ></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OngoingTab;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    //  alignItems: 'center',
    //  justifyContent: 'center',
    marginBottom: 100,
  },
  border: {
    backgroundColor: Colors.primary,
    width: 105,
    height: 30,
    bottom: 14,
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    // borderTopColor: 'black',
    // borderBottomColor:'black',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderTopColor: "black",
    borderTopWidth: 1,
    borderLeftColor: "black",
    borderLeftWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text: {
    fontSize: 20,

    color: "white",
  },
  bar: {
    width: 3,
    height: 5,
  },
});
