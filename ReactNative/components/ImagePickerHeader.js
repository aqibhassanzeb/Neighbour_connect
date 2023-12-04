import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";
export default WhatsAppHeader = (props) => {
  return (
    <View
      style={{
        height: 80,
        paddingTop: 20,
        paddingLeft: 20,
        width: "100%",
        backgroundColor: Colors.primary,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {props.view == "album" && (
        <Text style={{ color: "white", fontSize: 15 }}>Select Images</Text>
      )}
      {props.view == "gallery" && (
        <>
          <TouchableOpacity onPress={props.goToAlbum}>
            <Ionicons name="arrow-back" size={30} color="#EDF8F5" />
          </TouchableOpacity>
          {props.imagesPicked > 0 && (
            <>
              <Text style={{ color: "white", fontSize: 17, marginRight: 20 }}>
                {props.imagesPicked} selected
              </Text>
              <TouchableOpacity onPress={props.save}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: 15,
                    marginRight: 160,
                    backgroundColor: "white",
                    paddingHorizontal: 34,
                    paddingVertical: 4,
                    borderRadius: 3,
                    marginTop: 10,
                  }}
                >
                  OK
                </Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </View>
  );
};
