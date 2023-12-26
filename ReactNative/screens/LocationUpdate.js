import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  TextInput,
  Dimensions,
  Image,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useTranslation } from "react-i18next";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "../redux/loanandfoundSlice";
import { GOOGLE_APIKEY } from "../config";
import axios from "axios";
import * as Location from "expo-location";
import { setLocation } from "../redux/authSlice";
import MapLoading from "../assets/map_loading.gif";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const { width, height } = Dimensions.get("window");

const PickAddressScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.authReducer?.location);
  const userData = route.params?.userData || {};

  const ASPECT_RATIO = width / height;
  const LATITUDE = 33.5651;
  const LONGITUDE = 73.0169;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const { t, i18n } = useTranslation();
  const mapRef = useRef(null);

  const [isNameLoading, setIsNameLoading] = useState(false);
  // const [status, setStatus] = useState("");
  // const [location, setLocation] = useState(null);
  const [poi, setPoi] = useState();
  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`pickAddressScreen:${key}`);
  }

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    setPoi({
      name: userData?.address?.name,
      coordinate: {
        latitude: parseFloat(userData?.address?.latitude),
        longitude: parseFloat(userData?.address?.longitude),
      },
    });
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  function getCurrentLocation() {
    if (location) {
      handleZoomToLocation(location?.latitude, location?.longitude);
    } else {
      LocationPermission();
    }
  }

  const LocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const { coords } = await Location.getCurrentPositionAsync({});
      dispatch(
        setLocation({ latitude: coords.latitude, longitude: coords.longitude })
      );
      handleZoomToLocation(
        poi?.coordinate?.latitude,
        poi?.coordinate?.longitude
      );
    } else if (status === "rejected") {
      alert("Permission to access location was denied");
    }
  };

  useEffect(() => {
    LocationPermission();
  }, []);

  const onPoiClick = (e) => {
    const selectedLocation = e.nativeEvent;
    setPoi(selectedLocation);
  };

  const handleButtonPress = async () => {
    if (!poi.name) {
      const placeName = await getPlaceName(
        poi.coordinate.latitude,
        poi.coordinate.longitude
      );
      navigation.navigate("LocationName", {
        name: placeName,
        latitude: poi.coordinate.latitude,
        longitude: poi.coordinate.longitude,
      });
    } else {
      navigation.navigate("LocationName", {
        latitude: poi.coordinate.latitude,
        longitude: poi.coordinate.longitude,
        name: poi.name,
      });
    }
  };

  const getPlaceName = async (latitude, longitude) => {
    try {
      setIsNameLoading(true);
      const response = await axios.get(
        ` https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=${GOOGLE_APIKEY}`
      );
      setIsNameLoading(false);
      const locationName = response.data?.results[0]?.formatted_address;
      if (locationName) {
        var result = locationName.split(" ").slice(1).join(" ");
        return result;
      } else {
        alert(response.data.error_message);
      }
    } catch (error) {
      setIsNameLoading(false);
      alert(error.message);
    }
  };

  const handleZoomToLocation = (latitude, longitude) => {
    if (mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude,
          longitude,
        },
        zoom: 14, // Adjust the zoom level as needed
        altitude: 2000, // Optional: You can adjust the altitude (zoom level) as needed
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: parseFloat(userData?.address?.latitude),
          longitude: parseFloat(userData?.address?.longitude),
          latitudeDelta: 2,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        showsMyLocationButton={false}
        onPoiClick={onPoiClick}
        onPress={onPoiClick}
        showsUserLocation={true}
        mapPadding={{ top: 100, right: 0, bottom: 80, left: 0 }}
        zoomControlEnabled
      >
        {poi && poi.coordinate.latitude && (
          <Marker
            coordinate={poi.coordinate}
            pinColor={Colors.steelBlue}
            draggable
          >
            <Callout />
          </Marker>
        )}
      </MapView>

      <TouchableOpacity
        style={{
          position: "absolute",
          right: 12,
          bottom: 200,
          backgroundColor: "white",
          padding: 2,
          borderRadius: 5,
          width: 37,
          alignItems: "center",
        }}
        onPress={() => getCurrentLocation()}
      >
        <Image
          source={require("../assets/icons/my-location.png")}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>

      {/* <View
          style={{
            flex: 1,
            justifyContent: "center", // Vertical centering
            alignItems: "center",
          }}
        >
          <Image source={MapLoading} />
        </View> */}
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
        {/* <View
          style={{
            ...Default.shadow,
            flexDirection: isRtl ? "row-reverse" : "row",
            borderRadius: 5,
            flex: 9,
            backgroundColor: Colors.white,
            // padding: Default.fixPadding * 0.8,
            marginVertical: Default.fixPadding * 1.5,
            marginRight: Default.fixPadding * 2,
          }}
        >
          <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(details.geometry, details.name);
              handleZoomToLocation(
                details.geometry.location.lat,
                details.geometry.location.lng
              );
              setPoi({
                coordinate: {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                },
                name: details.name,
              });
            }}
            query={{
              key: GOOGLE_APIKEY,
              language: "en",
            }}
            fetchDetails={true}
          />
        </View> */}
      </View>

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
        {/* <View
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
          <TextInput
            style={{
              marginHorizontal: Default.fixPadding,
              width: 300,
              fontSize: 14,
              borderWidth: 1,
              padding: 2,
              borderRadius: 10,
            }}
            value={poi.name ? poi.name : locationName}
            onChangeText={(value) => setLocationName(value)}
          ></TextInput>
        </View> */}

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
          disabled={isNameLoading}
        >
          <Text style={{ ...Fonts.SemiBold18white }}>
            {isNameLoading ? "Getting Location Info ..." : tr(`pickLocation`)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PickAddressScreen;