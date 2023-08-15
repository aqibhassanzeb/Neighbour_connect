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
  const [search, setSearch] = useState();

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
    if (title && title === "Edit_Skill") {
      navigation.goBack(); // Go back if title is "Edit_Skill"
    } else {
      navigation.navigate("AddSkills");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={region}
        onPoiClick={onPoiClick}
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

      {/* Search Area  */}
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
            onChangeText={(searchItem) => setSearch(searchItem)}
            value={search}
            placeholder={tr("search")}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
          />
        </View>
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
