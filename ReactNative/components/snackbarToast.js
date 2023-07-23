import { Text, Dimensions } from "react-native";
import React from "react";
import { Snackbar } from "react-native-paper";
import { Colors, Fonts, Default } from "../constants/styles";

const { width } = Dimensions.get("window");

const SnackbarToast = (props) => {
  return (
    <Snackbar
      style={{
        backgroundColor: Colors.darkGrey,
      }}
      width={width / 1.3}
      height={20}
      wrapperStyle={{
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: Default.fixPadding * 2,
      }}
      visible={props.visible}
      onDismiss={props.onDismiss}
      duration={1000}
    >
      <Text style={{ ...Fonts.SemiBold14white, textAlign: "center" }}>
        {props.title}
      </Text>
    </Snackbar>
  );
};

export default SnackbarToast;
