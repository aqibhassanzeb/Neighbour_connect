// import {
//   Text,
//   View,
//   SafeAreaView,
//   TouchableOpacity,
//   BackHandler,
//   TextInput,
//   Dimensions,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import { Colors, Default, Fonts } from "../constants/styles";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
// import { useTranslation } from "react-i18next";
// import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
// import { useDispatch } from "react-redux";
// import { updateLocation } from "../redux/loanandfoundSlice";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { GOOGLE_APIKEY } from "../config";
// import axios from "axios";

// const { width, height } = Dimensions.get("window");

// const ASPECT_RATIO = width / height;
// const LATITUDE = 33.5651;
// const LONGITUDE = 73.0169;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// const PickAddressScreen = ({ navigation, route }) => {
//   const title = route.params?.title || "";

//   const { t, i18n } = useTranslation();

//   const [poi, setPoi] = useState(null);
//   const [search, setSearch] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   const dispatch = useDispatch();

//   const isRtl = i18n.dir() == "rtl";

//   function tr(key) {
//     return t(`pickAddressScreen:${key}`);
//   }
//   const backAction = () => {
//     navigation.goBack();
//     return true;
//   };
//   useEffect(() => {
//     BackHandler.addEventListener("hardwareBackPress", backAction);

//     return () =>
//       BackHandler.removeEventListener("hardwareBackPress", backAction);
//   }, []);

//   let region = {
//     latitude: LATITUDE,
//     longitude: LONGITUDE,
//     latitudeDelta: LATITUDE_DELTA,
//     longitudeDelta: LONGITUDE_DELTA,
//   };

//   const onPoiClick = (e) => {
//     const poi = e.nativeEvent;
//     setPoi(poi);
//     dispatch(updateLocation(poi));
//   };

//   const handleButtonPress = () => {
//     if (
//       (title && title === "Watch") ||
//       "Sell" ||
//       "Edit_Watch" ||
//       "LostAndFound" ||
//       "Edit_Skill"
//     ) {
//       navigation.goBack();
//     } else {
//       navigation.navigate("AddSkills");
//     }
//   };

//   const getPlaceName = () => {
//     axios
//       .get(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${poi.coordinate.latitude},${poi.coordinate.longitude}&key=`
//       )
//       .then((response) => {
//         // console.log(response.data);
//         // const result = response.data.results[0];
//         // const placeName = result.formatted_address;
//       })
//       .catch((error) => {
//         console.error("Error fetching location:", error);
//       });
//   };

//   const handleSearch = async (searchText) => {
//     setSearch(searchText);
//     try {
//       const apiKey = GOOGLE_APIKEY;
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchText}&types=geocode&key=${apiKey}`
//       );
//       console.log(response.data);
//       if (response.data && response.data.predictions) {
//         setSearchResults(response.data.predictions);
//       }
//     } catch (error) {
//       console.log("Error fetching search results:", error);
//     }
//   };

//   const handleSelectLocation = (placeId) => {
//     try {
//       const apiKey = GOOGLE_APIKEY;
//       axios
//         .get(
//           `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${apiKey}`
//         )
//         .then((response) => {
//           console.log(response.data);
//           // if (
//           //   response.data &&
//           //   response.data.result &&
//           //   response.data.result.geometry &&
//           //   response.data.result.geometry.location
//           // ) {
//           //   const { location } = response.data.result.geometry;
//           //   setRegion({
//           //     latitude: location.lat,
//           //     longitude: location.lng,
//           //     latitudeDelta: LATITUDE_DELTA,
//           //     longitudeDelta: LONGITUDE_DELTA,
//           //   });
//           //   setPoi({
//           //     coordinate: {
//           //       latitude: location.lat,
//           //       longitude: location.lng,
//           //     },
//           //   });
//           // }
//         })
//         .catch((error) => {
//           console.log("Error fetching location details:", error);
//         });
//     } catch (error) {
//       console.log("Error fetching location details:", error);
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={{ flex: 1 }}
//         initialRegion={region}
//         onPoiClick={onPoiClick}
//         // onPress={onPoiClick}
//         showsUserLocation={true}
//       >
//         {poi ? (
//           <Marker
//             coordinate={poi.coordinate}
//             pinColor={Colors.steelBlue}
//             draggable
//           >
//             <Callout />
//           </Marker>
//         ) : (
//           <Marker
//             coordinate={{ latitude: 33.5651, longitude: 73.0169 }}
//             pinColor={Colors.steelBlue}
//             draggable
//           />
//         )}
//       </MapView>
//       {/* Search Area */}
//       <View
//         style={{
//           paddingVertical: Default.fixPadding * 1.6,
//           flexDirection: isRtl ? "row-reverse" : "row",
//           alignItems: "center",
//           position: "absolute",
//         }}
//       >
//         <TouchableOpacity
//           style={{
//             marginLeft: Default.fixPadding * 2,
//             flex: 1,
//           }}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons
//             name={isRtl ? "arrow-forward" : "arrow-back"}
//             size={25}
//             color={Colors.black}
//           />
//         </TouchableOpacity>
//         <View
//           style={{
//             ...Default.shadow,
//             flexDirection: isRtl ? "row-reverse" : "row",
//             borderRadius: 5,
//             flex: 9,
//             backgroundColor: Colors.white,
//             padding: Default.fixPadding * 0.8,
//             marginVertical: Default.fixPadding * 1.5,
//             marginRight: Default.fixPadding * 2,
//           }}
//         >
//           <Ionicons
//             name="search-outline"
//             size={20}
//             color={Colors.grey}
//             style={{ flex: 0.7, alignSelf: "center" }}
//           />
//           <TextInput
//             style={{
//               ...Fonts.SemiBold16black,
//               flex: 8.3,
//               textAlign: isRtl ? "right" : "left",
//               marginHorizontal: Default.fixPadding * 0.8,
//             }}
//             onChangeText={(searchItem) => handleSearch(searchItem)}
//             value={search}
//             placeholder={tr("search")}
//             placeholderTextColor={Colors.grey}
//             selectionColor={Colors.primary}
//           />
//         </View>
//       </View>

//       {/* <GooglePlacesAutocomplete
//         placeholder="Search"
//         onPress={(data, details = null) => {
//           // 'details' is provided when fetchDetails = true
//           console.log(data, details);
//         }}
//         query={{
//           key: "",
//           language: "en",
//         }}
//       /> */}
//       {/* Location Show and Button  */}
//       <View
//         style={{
//           position: "absolute",
//           left: 0,
//           right: 0,
//           bottom: 0,
//           marginHorizontal: Default.fixPadding * 2,
//         }}
//       >
//         <View
//           style={{
//             ...Default.shadow,
//             backgroundColor: Colors.white,
//             paddingVertical: Default.fixPadding * 2,
//             flexDirection: isRtl ? "row-reverse" : "row",
//             alignItems: "center",
//             justifyContent: "center",
//             borderRadius: 10,
//           }}
//         >
//           <View
//             style={{
//               height: 24,
//               width: 24,
//               borderRadius: 12,
//               borderColor: Colors.primary,
//               borderWidth: 1,
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <SimpleLineIcons
//               name="location-pin"
//               size={15}
//               color={Colors.primary}
//             />
//           </View>
//           <Text
//             style={{
//               ...Fonts.Medium14Black,
//               marginHorizontal: Default.fixPadding,
//             }}
//           >
//             {poi ? poi.name : "Rawalpindi"}
//           </Text>
//         </View>
//         <TouchableOpacity
//           onPress={handleButtonPress}
//           style={{
//             backgroundColor: Colors.primary,
//             borderRadius: 10,
//             justifyContent: "center",
//             alignItems: "center",
//             marginVertical: Default.fixPadding * 2,
//             padding: Default.fixPadding * 1.2,
//           }}
//         >
//           <Text style={{ ...Fonts.SemiBold18white }}>{tr("pickLocation")}</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default PickAddressScreen;

// // import React, { useState } from "react";
// // import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
// // import MapView, { Marker } from "react-native-maps";

// // const PickAddressScreen = () => {
// //   const [selectedLocation, setSelectedLocation] = useState(null);
// //   console.log(selectedLocation);

// //   const handleMapPress = (event) => {
// //     const { coordinate } = event.nativeEvent;
// //     setSelectedLocation(coordinate);
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <MapView
// //         style={styles.map}
// //         initialRegion={{
// //           latitude: 37.78825,
// //           longitude: -122.4324,
// //           latitudeDelta: 0.0922,
// //           longitudeDelta: 0.0421,
// //         }}
// //         onPress={handleMapPress}
// //       >
// //         {selectedLocation && (
// //           <Marker
// //             coordinate={selectedLocation}
// //             title="Selected Location"
// //             description="This is the selected location."
// //           />
// //         )}
// //       </MapView>
// //       <View style={styles.textContainer}>
// //         {selectedLocation && (
// //           <Text>
// //             Latitude: {selectedLocation.latitude.toFixed(6)}, Longitude:{" "}
// //             {selectedLocation.longitude.toFixed(6)}
// //           </Text>
// //         )}
// //       </View>
// //       <TouchableOpacity
// //         style={styles.button}
// //         onPress={() => {
// //           // Handle the selected location as needed
// //           if (selectedLocation) {
// //             console.log("Selected Location:", selectedLocation);
// //             // You can save the selected location to your state or perform other actions here.
// //           } else {
// //             console.log("No location selected.");
// //           }
// //         }}
// //       >
// //         <Text style={styles.buttonText}>Save Location</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   map: {
// //     flex: 1,
// //   },
// //   textContainer: {
// //     alignItems: "center",
// //     justifyContent: "center",
// //     padding: 10,
// //   },
// //   button: {
// //     backgroundColor: "blue",
// //     alignItems: "center",
// //     padding: 15,
// //   },
// //   buttonText: {
// //     color: "white",
// //     fontSize: 18,
// //   },
// // });

// // export default PickAddressScreen;

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import axios from "axios";
import { GOOGLE_APIKEY } from "../config";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const PickAddressScreen = ({ navigation, route }) => {
  const { user, lostandfoundCreate } = route.params;
  const [region, setRegion] = useState(null);
  const [poi, setPoi] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // useEffect(() => {
  //   async function fetchLocation() {
  //     const { status } = await Permissions.askAsync(Permissions.LOCATION);
  //     if (status === "granted") {
  //       const location = await Location.getCurrentPositionAsync({});
  //       const initialRegion = {
  //         latitude: location.coords.latitude,
  //         longitude: location.coords.longitude,
  //         latitudeDelta: LATITUDE_DELTA,
  //         longitudeDelta: LONGITUDE_DELTA,
  //       };
  //       setRegion(initialRegion);
  //       setPoi({
  //         coordinate: {
  //           latitude: location.coords.latitude,
  //           longitude: location.coords.longitude,
  //         },
  //       });
  //     }
  //   }
  //   fetchLocation();
  // }, []);

  const onPoiClick = (e) => {
    const poi = e.nativeEvent;
    setPoi(poi);
  };

  const handleSearch = async (searchText) => {
    setSearch(searchText);
    try {
      const apiKey = GOOGLE_APIKEY;
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchText}&types=geocode&key=${apiKey}`
      );
      if (response.data && response.data.predictions) {
        setSearchResults(response.data.predictions);
      }
    } catch (error) {
      console.log("Error fetching search results:", error);
    }
  };

  const handleSelectLocation = (placeId) => {
    try {
      const apiKey = GOOGLE_APIKEY;
      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${apiKey}`
        )
        .then((response) => {
          if (
            response.data &&
            response.data.result &&
            response.data.result.geometry &&
            response.data.result.geometry.location
          ) {
            const { location } = response.data.result.geometry;
            setRegion({
              latitude: location.lat,
              longitude: location.lng,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            });
            setPoi({
              coordinate: {
                latitude: location.lat,
                longitude: location.lng,
              },
            });
          }
        })
        .catch((error) => {
          console.log("Error fetching location details:", error);
        });
    } catch (error) {
      console.log("Error fetching location details:", error);
    }
  };

  const handlePickLocation = () => {
    // if (poi) {
    //   if (lostandfoundCreate) {
    //     navigation.navigate("ListItem", {
    //       address: {
    //         latitude: poi.coordinate.latitude,
    //         longitude: poi.coordinate.longitude,
    //       },
    //     });
    //   } else {
    //     navigation.navigate("Radius", {
    //       user,
    //       address: {
    //         latitude: poi.coordinate.latitude,
    //         longitude: poi.coordinate.longitude,
    //       },
    //     });
    //   }
    // }
  };

  const handleMapRegionChange = (region) => {
    const center = {
      latitude: region.latitude,
      longitude: region.longitude,
    };
    setPoi({ coordinate: center });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {region ? (
        <MapView
          style={{ flex: 1 }}
          region={region}
          onPoiClick={onPoiClick}
          showsUserLocation={true}
          onRegionChangeComplete={handleMapRegionChange}
        >
          {poi && (
            <Marker coordinate={poi.coordinate} pinColor="yellow" draggable>
              <Callout />
            </Marker>
          )}
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}

      <View style={{ padding: 16 }}>
        <TextInput
          style={{
            borderBottomWidth: 1,
            borderColor: "#ccc",
            marginBottom: 16,
          }}
          onChangeText={(searchItem) => handleSearch(searchItem)}
          value={search}
          placeholder="Search location..."
          placeholderTextColor="#888"
          selectionColor="blue"
        />

        {searchResults.map((result) => (
          <TouchableOpacity
            key={result.place_id}
            onPress={() => handleSelectLocation(result.place_id)}
          >
            <Text style={{ paddingVertical: 8 }}>{result.description}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={handlePickLocation}
          style={{
            backgroundColor: "blue",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 16,
            padding: 16,
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Pick Location</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PickAddressScreen;
