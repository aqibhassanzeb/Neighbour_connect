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

  useEffect(() => {
    async function fetchLocation() {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const initialRegion = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setRegion(initialRegion);
        setPoi({
          coordinate: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        });
      }
    }
    fetchLocation();
  }, []);

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
    if (poi) {
      if (lostandfoundCreate) {
        navigation.navigate("ListItem", {
          address: {
            latitude: poi.coordinate.latitude,
            longitude: poi.coordinate.longitude,
          },
        });
      } else {
        navigation.navigate("Radius", {
          user,
          address: {
            latitude: poi.coordinate.latitude,
            longitude: poi.coordinate.longitude,
          },
        });
      }
    }
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
