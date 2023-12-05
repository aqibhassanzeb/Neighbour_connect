import { View, Text, Image } from "react-native";
import React from "react";

export default function Empty({ text, marginTop }) {
  return (
    <View
      style={{
        alignItems: "center",
        marginTop,
      }}
    >
      <Image
        source={require("../assets/icons/no-connections.png")}
        style={{ width: 200, height: 200 }}
      />
      <Text style={{ fontSize: 17, letterSpacing: 2 }}>{text}</Text>
    </View>
  );
}
