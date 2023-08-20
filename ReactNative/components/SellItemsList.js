import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors, Default, Fonts } from "../constants/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import Emoji from "react-native-emoji";

const SellItemsList = ({
  setCancelModal,
  navigation,
  setCancelModals,
  selectedValue,
  sell,
  setMarkId,
  soldLoading,
  markId,
  setDeleteId,
}) => {
  const [dropdownOpend, setDropdownOpend] = useState(false);
  const { _id, is_sold } = sell;
  return (
    <View
      style={{
        marginLeft: 20,
      }}
    >
      <View style={{}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("BuyDetails", {
              item: sell,
            })
          }
          style={{
            ...Default.shadow,

            paddingTop: 48,
            paddingBottom: 18,
            paddingLeft: 5,

            flexDirection: "row",
          }}
        >
          <Image
            source={{ uri: sell.images[0] }}
            style={{ height: 85, width: 75, ...Default.shadow }}
          />
          <View>
            <Text
              style={{
                ...Fonts.SemiBold15primary,
                overflow: "hidden",
                paddingLeft: 20,
                fontWeight: "bold",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "900",

                fontSize: 15,
                color: "black",
              }}
            >
              {sell.title}
            </Text>
            <Text
              style={{
                ...Fonts.SemiBold15primary,
                overflow: "hidden",
                paddingLeft: 20,
              }}
            >
              RS {sell.price}
            </Text>
            <Text
              style={{
                overflow: "hidden",
                paddingLeft: 20,
              }}
            ></Text>

            <View style={styles.container}>
              <View style={styles.buttonContainer}>
                <View
                  style={{
                    flex: 2.5,
                    justifyContent: "center",
                    marginHorizontal: Default.fixPadding,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setCancelModal(true);
                      setMarkId(sell._id);
                    }}
                    disabled={sell.is_sold}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        ...Fonts.SemiBold15white,
                        textAlign: "center",
                        overflow: "hidden",
                      }}
                    >
                      {soldLoading && markId === _id ? (
                        <Emoji
                          name="hourglass_flowing_sand"
                          style={{ fontSize: 17 }}
                        />
                      ) : is_sold ? (
                        "Solded"
                      ) : (
                        "Mark Sold"
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View>
            <View style={styles.contain}>
              <TouchableOpacity
                style={styles.selectedButton}
                onPress={() => setDropdownOpend(!dropdownOpend)}
              >
                <Ionicons name="ellipsis-vertical" size={24} color="black" />
                <Text style={styles.selectedButtonText}>{selectedValue}</Text>
              </TouchableOpacity>

              {dropdownOpend && (
                <View style={styles.dropdown}>
                  <TouchableOpacity
                    style={[
                      styles.dropdownButton,

                      selectedValue === "button1" &&
                        styles.dropdownButtonSelected,
                    ]}
                    onPress={() =>
                      navigation.navigate("EditBuy", { data: sell })
                    }
                  >
                    <Ionicons name="create-outline" size={20} color="black" />
                    <Text style={styles.dropdownButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.dropdownButtons,

                      styles.dropdownButtonSelected,
                    ]}
                    onPress={() => {
                      setCancelModals(true);
                      setDeleteId(sell._id);
                    }}
                  >
                    <Ionicons name="trash-outline" size={20} color="black" />
                    <Text style={styles.dropdownButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SellItemsList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    height: 30,
    fontSize: 10,
    marginLeft: 20,
  },
  buttonContainer: {
    borderRadius: 10,

    backgroundColor: Colors.primary,
  },
  contain: {
    position: "absolute",
    marginLeft: -20,
    justifyContent: "center",
  },
  selectedButton: {
    flexDirection: "row",
    alignItems: "center",

    borderColor: "gray",

    marginLeft: 124,
  },
  selectedButtonText: {},
  dropdown: {
    top: 1,
    marginRight: 8,
    backgroundColor: "white",
    width: 80,

    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    marginLeft: 80,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",

    height: 42,
  },
  dropdownButtonSelected: {
    // backgroundColor: "gray",
  },
  dropdownButtonText: {
    marginRight: 20,
  },
  dropdownButtons: {
    flexDirection: "row",
    alignItems: "center",
    top: 4,
    height: 42,
  },
});
