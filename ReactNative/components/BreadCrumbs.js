import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/styles";

export default function BreadCrumbs({ children }) {
  const navigation = useNavigation();
  return (
    <View style={{ marginHorizontal: 20, marginTop: 10 }}>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#9ca3af",
          borderRadius: 10,
          alignSelf: "flex-start",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("bottomTab")}>
          <Text
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              //   color: Colors.primary,
            }}
          >
            Home
          </Text>
        </TouchableOpacity>
        {children}
      </View>
    </View>
  );
}
