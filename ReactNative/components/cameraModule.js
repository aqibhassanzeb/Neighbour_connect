import { View, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors, Default } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { Camera } from "expo-camera";

const CameraModule = (props) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const { i18n } = useTranslation();
  const isRtl = i18n.dir() == "rtl";

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        props.setShowCamera();
      }}
    >
      <Camera
        style={{ flex: 1 }}
        ratio="16:9"
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.transparent,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: Colors.black,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                marginHorizontal: Default.fixPadding,
              }}
              onPress={() => {
                props.setShowCamera();
                props.toggleCloseUploadImage();
              }}
            >
              <Ionicons name="close" color={Colors.white} size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                if (cameraRef) {
                  let photo = await cameraRef.takePictureAsync();
                  props.setPickedImage(photo);
                  props.setShowCamera();
                  props.toggleCloseUploadImage();
                }
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 50,
                  borderColor: Colors.white,
                  height: 50,
                  width: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: Default.fixPadding * 1.5,
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 50,
                    borderColor: Colors.white,
                    height: 40,
                    width: 40,
                    backgroundColor: Colors.white,
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginHorizontal: Default.fixPadding,
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Ionicons
                name="camera-reverse-outline"
                color={Colors.white}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </Modal>
  );
};

export default CameraModule;
