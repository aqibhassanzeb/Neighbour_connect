import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  BackHandler,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";

import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Colors, Default, Fonts } from "../constants/styles";
const MyAccountScreen = (props) => {
  const { t, i18n } = useTranslation();

  const [dropdownOpens, setDropdownOpens] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState("Select reason");

  const handleOptionSelects = (option) => {
    setSelectedOptions(option);
    setDropdownOpens(false);

    props.navigation.navigate("AddSkills");
  };
  const [text, setText] = useState("");

  const handleChangeText = (value) => {
    setText(value);
  };

  const handleSubmit = () => {
    // Handle the submission logic here
  };
  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`editProfileScreen:${key}`);
  }
  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    // Validate the form inputs and perform the password change logic
    if (newPassword !== confirmPassword) {
      // Show an error message that passwords do not match
      return;
    }

    // Perform the password change logic here
    // ...
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.extraLightGrey }}>
      <View
        style={{
          paddingVertical: Default.fixPadding * 1.2,
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          backgroundColor: Colors.primary,
          paddingHorizontal: Default.fixPadding * 2,
        }}
      >
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons
            name={isRtl ? "arrow-forward" : "arrow-back"}
            size={25}
            color={Colors.white}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...Fonts.SemiBold18white,
            marginHorizontal: Default.fixPadding * 1.2,
          }}
        >
          Deactivate Account
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={{ color: Colors.black, fontSize: 17, marginBottom: 32 }}>
          If you are sure you want to deactivate, we'd love to hear any other
          suggestions you have for improving neighbor connect
        </Text>
        <Text style={{ fontWeight: "bold", marginBottom: 23 }}>
          How can we improve Neighbor Connect:
        </Text>

        <TextInput
          style={styles.textarea}
          multiline
          numberOfLines={4}
          placeholder="Enter your suggestions"
          value={text}
          onChangeText={handleChangeText}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("Registers1")}
        >
          <Text style={styles.buttonText}>Deactivate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MyAccountScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#D9D9D9",
    marginRight: 57,
    paddingTop: 13,
    paddingBottom: 13,
  },
  line: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#005D7A",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    marginRight: 190,
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  textarea: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    textAlignVertical: "top",
    height: 140,
  },
});
