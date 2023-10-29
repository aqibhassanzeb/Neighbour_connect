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
import React, { useEffect, useState } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import { useTranslation } from "react-i18next";

import Ionicons from "react-native-vector-icons/Ionicons";
import SnackbarToast from "./snackbarToast";
import { useSelector } from "react-redux";
import Loader from "./loader";
import moment from "moment";
import useGetUserId from "./useGetUserId";
//import Founded from "../screens/Founded";
const { width } = Dimensions.get("window");

const OngoingTab = (props) => {
  const { t, i18n } = useTranslation();
  const userId = useGetUserId();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`ongoingTab:${key}`);
  }
  const [cancelModal, setCancelModal] = useState(false);

  const [cancelToast, setCancelToast] = useState(false);
  const onToggleSnackBarCancelToast = () => setCancelToast(false);

  const [allClear, setAllClear] = useState(false);
  const [foundDatalist, setFoundDatalist] = useState([]);

  const { data, loader, searchKeyword } = useSelector(
    (state) => state.loanandfound
  );

  const regexPattern = new RegExp(searchKeyword, "i");
  let newData =
    data.length > 0 && data.filter((elm) => regexPattern.test(elm.title));

  const truncateString = (str) => {
    const words = str.split(" ");
    const truncated = words.slice(0, 2).join(" ");
    return words.length > 2 ? truncated + "..." : truncated;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Loader visible={loader} />
        {newData.length > 0 &&
          newData.map((elm, index) => (
            <View
              style={{
                //margin: Default.fixPadding * 2,
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
                      name: "Found",
                      userId,
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
                      {truncateString(elm.description)}
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
                      }}
                    >
                      {`Posted by ${elm?.posted_by?.name}`}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingLeft: 20,
                      }}
                    >
                      <Text style={{ marginRight: 2 }}>
                        <Ionicons name="time-outline" size={15} />
                      </Text>
                      <Text style={{ fontSize: 13 }}>
                        {" "}
                        {moment(elm.createdAt).fromNow()}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}

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
              title: "Founded",
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
                
              }}> Found</Text>
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
            marginBottom: Default.fixPadding * 2,
            marginTop: Default.fixPadding,
          }}
        >
          <TouchableOpacity
           onPress={() =>
            props.navigation.navigate("Losted", {
              title: "Founded",
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

              source={require("../assets/images/key.jpg")}
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
             KEYS
            </Text>
            <Text   style={{
                fontSize:18,
                color:"darkred",
                overflow: "hidden",
                paddingLeft:16,
                fontWeight:'600',
                
              }}> Found</Text>
            <Text
              style={{
                ...Fonts.SemiBold15primary,
                overflow: "hidden",
                paddingLeft:20,
                
              }}
            >
              3 keys
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
            marginBottom: Default.fixPadding * 2,
            marginTop: Default.fixPadding,
          }}
        >
          <TouchableOpacity
           onPress={() =>
            props.navigation.navigate("Losted", {
              title: "Founded",
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
                
              }}> Found</Text>
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
            marginBottom: Default.fixPadding * 2,
            marginTop: Default.fixPadding,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Losted", {
                title: "Founded",
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

              source={require("../assets/images/hat.jpg")}
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
             CAP
            </Text>
            <Text   style={{
                fontSize:18,
                color:"darkred",
                overflow: "hidden",
                paddingLeft:16,
                fontWeight:'600',
                
              }}> Found</Text>
            <Text
              style={{
                ...Fonts.SemiBold15primary,
                overflow: "hidden",
                paddingLeft:20,
                
              }}
            >
              Red
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
         
  </View>  */}
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
    width: 115,
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
    paddingRight: 10,
  },
  text: {
    fontSize: 20,
    marginRight: 10,
    paddingLeft: 2,
    paddingRight: 9,

    color: "white",
  },
  bar: {
    width: 3,
    height: 5,
  },
});
