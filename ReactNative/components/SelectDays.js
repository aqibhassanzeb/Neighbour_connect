import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Colors, Default } from "../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { DAYS } from "../utils";

const Checkbox = ({ label, onChange, checked }) => (
  <TouchableOpacity
    style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}
    onPress={onChange}
  >
    <Ionicons
      name={checked ? "checkbox" : "checkbox-outline"}
      size={24}
      color={checked ? "black" : "black"}
    />
    <Text style={{ fontSize: 16, marginLeft: 10 }}>{label}</Text>
  </TouchableOpacity>
);

const SelectDays = ({ days, setDays, checkedValues, setCheckedValues }) => {
  const [timeModal, setTimeModal] = useState(false);
  const [timeDetails, setTimeDetails] = useState({});

  const handleCheckboxChange = (day) => {
    const updatedDays = [...days];
    const dayIndex = updatedDays.findIndex((d) => d.name === day);

    if (dayIndex !== -1) {
      if (checkedValues.includes(day)) {
        setCheckedValues(checkedValues.filter((item) => item !== day));
      } else {
        setCheckedValues([...checkedValues, day]);
      }
    }

    setDays(updatedDays);
  };

  function setDayTime(value) {
    const { nativeEvent, type } = value;

    if (type === "dismissed") {
      setTimeModal(false);
    } else if (type === "set") {
      setTimeModal(false);

      const updatedDays = [...days];
      const dayIndex = updatedDays.findIndex(
        (day) => day.name === timeDetails.day
      );

      if (dayIndex !== -1) {
        if (timeDetails.type === "startHours") {
          updatedDays[dayIndex].timeSlots[timeDetails.index].startHours =
            nativeEvent.timestamp;
        } else if (timeDetails.type === "endHours") {
          updatedDays[dayIndex].timeSlots[timeDetails.index].endHours =
            nativeEvent.timestamp;
        }

        const dayExists = updatedDays.some(
          (day) => day.name === timeDetails.day
        );

        if (!dayExists) {
          const newDay = {
            name: timeDetails.day,
            timeSlots: [{ startHours: null, endHours: null }],
          };
          updatedDays.push(newDay);
        }

        setDays(updatedDays);
      }
    }
  }

  function showStartValue(day, index) {
    const foundDay = days.find((d) => d.name === day);
    return foundDay && foundDay.timeSlots[index].startHours
      ? moment(foundDay.timeSlots[index].startHours).format("LT")
      : false;
  }

  function showEndValue(day, index) {
    const foundDay = days.find((d) => d.name === day);
    return foundDay && foundDay.timeSlots[index].endHours
      ? moment(foundDay.timeSlots[index].endHours).format("LT")
      : false;
  }

  const handleRemoveTimeSlot = (day, index) => {
    const updatedDays = [...days];
    const dayIndex = updatedDays.findIndex((d) => d.name === day);

    if (dayIndex !== -1 && updatedDays[dayIndex].timeSlots.length > 1) {
      updatedDays[dayIndex].timeSlots.splice(index, 1);
      setDays(updatedDays);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#fafafa",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 10,
        zIndex: 21,
      }}
    >
      <View style={{ marginVertical: 20 }}>
        <View
          style={{
            flexDirection: "row",
            paddingBottom: 10,
          }}
        >
          <Text style={{ fontSize: 16, paddingBottom: 10 }}>Select Days:</Text>
          {checkedValues.length > 0 && (
            <>
              <Text style={{ fontSize: 14, paddingBottom: 10, marginLeft: 85 }}>
                Start Hour
              </Text>
              <Text style={{ fontSize: 14, paddingBottom: 10, marginLeft: 25 }}>
                End Hour
              </Text>
            </>
          )}
        </View>

        {DAYS.map((day) => (
          <View key={day}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Checkbox
                label={day}
                checked={checkedValues.includes(day)}
                onChange={() => handleCheckboxChange(day)}
              />
              {checkedValues.includes(day) && (
                <View>
                  {days
                    .find((d) => d.name === day)
                    .timeSlots.map((_, index) => (
                      <View key={index}>
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 10,
                            marginBottom: 10,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              setTimeModal(true);
                              setTimeDetails({
                                day,
                                type: "startHours",
                                index,
                              });
                            }}
                            style={{
                              flexDirection: "row",
                              gap: 3,
                            }}
                          >
                            <MaterialIcons
                              name="access-time"
                              size={20}
                              color={Colors.grey}
                            />
                            <Text
                              numberOfLines={1}
                              style={{
                                color: showStartValue(day, index)
                                  ? "black"
                                  : "gray",
                                fontSize: 14,
                              }}
                            >
                              {showStartValue(day, index)
                                ? showStartValue(day, index)
                                : `00:00‎ ‎ ‎ ‎ ‎ `}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              setTimeModal(true);
                              setTimeDetails({
                                day,
                                type: "endHours",
                                index,
                              });
                            }}
                            style={{
                              flexDirection: "row",
                              gap: 3,
                            }}
                          >
                            <MaterialIcons
                              name="access-time"
                              size={20}
                              color={Colors.grey}
                            />
                            <Text
                              numberOfLines={1}
                              style={{
                                color: showEndValue(day, index)
                                  ? "black"
                                  : "gray",
                                fontSize: 14,
                              }}
                            >
                              {showEndValue(day, index)
                                ? showEndValue(day, index)
                                : `00:00‎ ‎ ‎ ‎ `}
                            </Text>
                          </TouchableOpacity>
                          {index !== 0 ? (
                            <TouchableOpacity
                              onPress={() => handleRemoveTimeSlot(day, index)}
                            >
                              <AntDesign
                                name="minuscircleo"
                                size={17}
                                color="red"
                              />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity>
                              <AntDesign
                                name="minuscircleo"
                                size={17}
                                color="white"
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    ))}
                  {/* Render the "plus" button only once for each day */}
                  <TouchableOpacity
                    onPress={() => {
                      const updatedDays = [...days];
                      const dayIndex = updatedDays.findIndex(
                        (d) => d.name === day
                      );

                      if (dayIndex !== -1) {
                        updatedDays[dayIndex].timeSlots.push({
                          startHours: null,
                          endHours: null,
                        });
                        setDays(updatedDays);
                      }
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10,
                    }}
                  >
                    <AntDesign name="pluscircleo" size={20} color="green" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View
              style={{
                height: 2,
                backgroundColor: "lightgray",
                marginVertical: 10,
              }}
            />
          </View>
        ))}
        {timeModal && (
          <DateTimePicker
            value={new Date()}
            onChange={(value) => setDayTime(value)}
            mode="time"
          />
        )}
      </View>
    </View>
  );
};

export default SelectDays;
