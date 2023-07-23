import React from "react";
import { Modal, Text, View, Dimensions } from "react-native";
import { Colors, Default, Fonts } from "../constants/styles";
import { useTranslation } from "react-i18next";
import { UIActivityIndicator } from "react-native-indicators";

const { width } = Dimensions.get("window");

const Loader = (props) => {
  const { t } = useTranslation();

  function tr(key) {
    return t(`loader:${key}`);
  }

  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.transparentBlack,
        }}
      >
        <View
          style={{
            width: width * 0.7,
            backgroundColor: Colors.white,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            ...Default.shadow,
            paddingVertical: Default.fixPadding * 4,
          }}
        >
          <UIActivityIndicator
            color={Colors.primary}
            size={35}
            style={{ marginTop: Default.fixPadding * 1.5 }}
          />
          <Text
            style={{
              ...Fonts.SemiBold16primary,
              marginTop: Default.fixPadding * 2,
            }}
          >
            {tr("pleaseWait")}
          </Text>
        </View>
      </View>
    </Modal>
  );
};
export default Loader;
