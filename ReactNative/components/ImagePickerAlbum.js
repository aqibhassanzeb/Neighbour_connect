import { Image, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default ImagePickerAlbum = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.goToGallery(props.album)}
      style={{ flex: 1, height: 200 }}
    >
      <Image
        source={{ uri: props.thumb.uri }}
        style={{ width: "100%", height: "100%" }}
      ></Image>
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.2)",
          justifyContent: "flex-end",
        }}
      >
        <View style={{ padding: 5, flexDirection: "row" }}>
          <Entypo name="folder" color="white" size={16} />
          <Text
            style={{
              color: "white",
              fontSize: 16,
              marginLeft: 5,
            }}
          >
            {props.album.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
