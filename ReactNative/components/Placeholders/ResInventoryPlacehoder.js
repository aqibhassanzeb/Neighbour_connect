import React, { useRef, useEffect } from "react";
import { View, Text, Animated, Easing, StyleSheet } from "react-native";
import { COLOURS } from "../../components/items2";

const ShimmerBox = ({ width, height }) => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  const startShimmerAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startShimmerAnimation();
  }, []);

  const interpolateColor = shimmerValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      "rgba(200, 200, 200, 0.5)",
      "rgba(200, 200, 200, 1)",
      "rgba(200, 200, 200, 0.5)",
    ],
  });

  return (
    <Animated.View
      style={[
        styles.shimmer,
        {
          width,
          height,
          backgroundColor: interpolateColor,
        },
      ]}
    />
  );
};

const SuppliersList = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          paddingTop: 10,
          paddingHorizontal: 20,
          fontSize: 18,
          fontWeight: "700",
          color: COLOURS.black,
          letterSpacing: 1,
          textAlign: "left",
          marginBottom: 10,
        }}
      >
        Categories
      </Text>
      <View style={{ flexDirection: "row" }}>
        <ShimmerBox width={120} height={170} />
        <ShimmerBox width={120} height={170} />
        <ShimmerBox width={120} height={170} />
        <ShimmerBox width={120} height={170} />
        <ShimmerBox width={120} height={170} />
        <ShimmerBox width={120} height={170} />
      </View>
      <Text
        style={{
          paddingTop: 10,
          paddingHorizontal: 20,
          fontSize: 18,
          fontWeight: "700",
          color: COLOURS.black,
          letterSpacing: 1,
          textAlign: "left",
          marginBottom: 10,
        }}
      >
        Items
      </Text>
      <ShimmerBox width={420} height={120} />
      <ShimmerBox width={420} height={120} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingLeft: 25,
  },
  shimmer: {
    borderRadius: 10,
    marginBottom: 8,
    marginRight: 8,
  },
  content: {
    flex: 1,
    marginLeft: 8,
  },
});

export default SuppliersList;
