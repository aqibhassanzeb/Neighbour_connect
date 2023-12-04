import React, { useRef, useEffect } from "react";
import { View, Text, Animated, Easing, StyleSheet } from "react-native";

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

const Placeholder = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingTop: 16,
        }}
      >
        <ShimmerBox width={180} height={180} />
        <ShimmerBox width={180} height={180} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingLeft: 5,
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

export default Placeholder;
