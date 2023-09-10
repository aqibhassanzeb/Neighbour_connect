import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useTranslation } from "react-i18next";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { useDispatch } from "react-redux";
import { updateLocation } from "../redux/loanandfoundSlice";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_APIKEY } from "../config";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 33.5651;
const LONGITUDE = 73.0169;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const PickAddressScreen = ({ navigation, route }) => {
  const title = route.params?.title || "";

  const { t, i18n } = useTranslation();

  const [poi, setPoi] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const dispatch = useDispatch();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`pickAddressScreen:${key}`);
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

  let region = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const onPoiClick = (e) => {
    const poi = e.nativeEvent;
    setPoi(poi);
    dispatch(updateLocation(poi));
  };

  const handleButtonPress = () => {
    if (
      (title && title === "Watch") ||
      "Sell" ||
      "Edit_Watch" ||
      "LostAndFound" ||
      "Edit_Skill"
    ) {
      navigation.goBack();
    } else {
      navigation.navigate("AddSkills");
    }
  };

  const getPlaceName = () => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${poi.coordinate.latitude},${poi.coordinate.longitude}&key=`
      )
      .then((response) => {
        // console.log(response.data);
        // const result = response.data.results[0];
        // const placeName = result.formatted_address;
      })
      .catch((error) => {
        console.error("Error fetching location:", error);
      });
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
          console.log(response.data);
          // if (
          //   response.data &&
          //   response.data.result &&
          //   response.data.result.geometry &&
          //   response.data.result.geometry.location
          // ) {
          //   const { location } = response.data.result.geometry;
          //   setRegion({
          //     latitude: location.lat,
          //     longitude: location.lng,
          //     latitudeDelta: LATITUDE_DELTA,
          //     longitudeDelta: LONGITUDE_DELTA,
          //   });
          //   setPoi({
          //     coordinate: {
          //       latitude: location.lat,
          //       longitude: location.lng,
          //     },
          //   });
          // }
        })
        .catch((error) => {
          console.log("Error fetching location details:", error);
        });
    } catch (error) {
      console.log("Error fetching location details:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={region}
        onPoiClick={onPoiClick}
        // onPress={onPoiClick}
        showsUserLocation={true}
      >
        {poi ? (
          <Marker
            coordinate={poi.coordinate}
            pinColor={Colors.steelBlue}
            draggable
          >
            <Callout />
          </Marker>
        ) : (
          <Marker
            coordinate={{ latitude: 33.5651, longitude: 73.0169 }}
            pinColor={Colors.steelBlue}
            draggable
          />
        )}
      </MapView>
      {/* Search Area */}
      <View
        style={{
          paddingVertical: Default.fixPadding * 1.6,
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          position: "absolute",
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
            color={Colors.black}
          />
        </TouchableOpacity>
        <View
          style={{
            ...Default.shadow,
            flexDirection: isRtl ? "row-reverse" : "row",
            borderRadius: 5,
            flex: 9,
            backgroundColor: Colors.white,
            padding: Default.fixPadding * 0.8,
            marginVertical: Default.fixPadding * 1.5,
            marginRight: Default.fixPadding * 2,
          }}
        >
          <Ionicons
            name="search-outline"
            size={20}
            color={Colors.grey}
            style={{ flex: 0.7, alignSelf: "center" }}
          />
          <TextInput
            style={{
              ...Fonts.SemiBold16black,
              flex: 8.3,
              textAlign: isRtl ? "right" : "left",
              marginHorizontal: Default.fixPadding * 0.8,
            }}
            onChangeText={(searchItem) => handleSearch(searchItem)}
            value={search}
            placeholder={tr("search")}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
          />
        </View>
      </View>

      {/* <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: "",
          language: "en",
        }}
      /> */}
      {/* Location Show and Button  */}
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <View
          style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            paddingVertical: Default.fixPadding * 2,
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderColor: Colors.primary,
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SimpleLineIcons
              name="location-pin"
              size={15}
              color={Colors.primary}
            />
          </View>
          <Text
            style={{
              ...Fonts.Medium14Black,
              marginHorizontal: Default.fixPadding,
            }}
          >
            {poi ? poi.name : "Rawalpindi"}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleButtonPress}
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: Default.fixPadding * 2,
            padding: Default.fixPadding * 1.2,
          }}
        >
          <Text style={{ ...Fonts.SemiBold18white }}>{tr("pickLocation")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PickAddressScreen;
