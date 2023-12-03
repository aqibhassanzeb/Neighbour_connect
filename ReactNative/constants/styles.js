import { Dimensions } from "react-native";

export const screenHeight = Dimensions.get("screen").height;
export const ScreenWidth = Dimensions.get("screen").width;
export const WindowWidth = Dimensions.get("window").width;
export const WindowHeight = Dimensions.get("window").height;

export const Colors = {
  primary: "#005D7A",
  lightPrimary: "#DCEFF5",
  extraLightPrimary: "#f3fcff",
  white: "#FFFFFF",
  transparentBlack: "#00000080",
  black: "#000000",
  grey: "#949494",
  lightGrey: "#D9D9D9",
  extraLightGrey: "#f2f2f2",
  darkGrey: "#333333",
  lightBlue: "#115698",
  blue: "#064886",
  darkRed: "#BA1E14",
  red: "#E82E20",
  lightRed: "#FA4335",
  transparent: "transparent",
  orange: "#DF8C2B",
  green: "#1E996D",
  extraLightGreen: "#25D366",
  lightGreen: "#457584",
  lawnGreen: "#7CB548",
  orange: "#F09433",
  lightOrange: "#DBB471",
  darkPink: "#BC1888",
  steelBlue: "#4682b4",
};

export const Fonts = {
  Medium30white: {
    fontFamily: "Medium",
    fontSize: 30,
    color: Colors.white,
  },
  SemiBold22primary: {
    fontFamily: "SemiBold",
    fontSize: 22,
    color: Colors.primary,
  },
  SemiBold16primary: {
    fontFamily: "SemiBold",
    fontSize: 16,
    color: Colors.primary,
  },
  SemiBold20darkRed: {
    fontFamily: "SemiBold",
    fontSize: 20,
    color: Colors.darkRed,
  },
  SemiBold20primary: {
    fontFamily: "SemiBold",
    fontSize: 20,
    color: Colors.primary,
  },
  SemiBold15primary: {
    fontFamily: "SemiBold",
    fontSize: 15,
    color: Colors.primary,
  },
  SemiBold22black: {
    fontFamily: "SemiBold",
    fontSize: 22,
    color: Colors.black,
  },
  SemiBold14primary: {
    fontFamily: "SemiBold",
    fontSize: 14,
    color: Colors.primary,
  },
  SemiBold18primary: {
    fontFamily: "SemiBold",
    fontSize: 18,
    color: Colors.primary,
  },
  SemiBold18white: {
    fontFamily: "SemiBold",
    fontSize: 18,
    color: Colors.white,
  },
  SemiBold16red: {
    fontFamily: "SemiBold",
    fontSize: 16,
    color: Colors.red,
  },
  SemiBold14white: {
    fontFamily: "SemiBold",
    fontSize: 14,
    color: Colors.white,
  },
  SemiBold16white: {
    fontFamily: "SemiBold",
    fontSize: 16,
    color: Colors.white,
  },
  SemiBold20white: {
    fontFamily: "SemiBold",
    fontSize: 20,
    color: Colors.white,
  },
  SemiBold15white: {
    fontFamily: "SemiBold",
    fontSize: 15,
    color: Colors.white,
  },
  SemiBold14black: {
    fontFamily: "SemiBold",
    fontSize: 14,
    color: Colors.black,
  },
  SemiBold18black: {
    fontFamily: "SemiBold",
    fontSize: 18,
    color: Colors.black,
  },
  SemiBold15black: {
    fontFamily: "SemiBold",
    fontSize: 15,
    color: Colors.black,
  },
  SemiBold14grey: {
    fontFamily: "SemiBold",
    fontSize: 14,
    color: Colors.grey,
  },
  SemiBold16grey: {
    fontFamily: "SemiBold",
    fontSize: 16,
    color: Colors.grey,
  },
  SemiBold12grey: {
    fontFamily: "SemiBold",
    fontSize: 12,
    color: Colors.grey,
  },
  SemiBold16black: {
    fontFamily: "SemiBold",
    fontSize: 16,
    color: Colors.black,
  },
  Medium14grey: {
    fontFamily: "Medium",
    fontSize: 14,
    color: Colors.grey,
  },
  Medium16grey: {
    fontFamily: "Medium",
    fontSize: 16,
    color: Colors.grey,
  },
  Medium16white: {
    fontFamily: "Medium",
    fontSize: 16,
    color: Colors.white,
  },
  Medium14white: {
    fontFamily: "Medium",
    fontSize: 14,
    color: Colors.white,
  },
  Medium15grey: {
    fontFamily: "Medium",
    fontSize: 15,
    color: Colors.grey,
  },
  Medium14primary: {
    fontFamily: "Medium",
    fontSize: 14,
    color: Colors.primary,
  },
  Medium18primary: {
    fontFamily: "Medium",
    fontSize: 18,
    color: Colors.primary,
  },
  Medium15Black: {
    fontFamily: "Medium",
    fontSize: 15,
    color: Colors.black,
  },
  Medium14Black: {
    fontFamily: "Medium",
    fontSize: 14,
    color: Colors.black,
  },
  Medium16Black: {
    fontFamily: "Medium",
    fontSize: 16,
    color: Colors.black,
  },
  Medium12Black: {
    fontFamily: "Medium",
    fontSize: 12,
    color: Colors.black,
  },
  Medium16primary: {
    fontFamily: "Medium",
    fontSize: 16,
    color: Colors.primary,
  },
  Medium14lightGreen: {
    fontFamily: "Medium",
    fontSize: 14,
    color: Colors.lightGreen,
  },
  Bold18white: {
    fontFamily: "Bold",
    fontSize: 18,
    color: Colors.white,
  },
  Bold16white: {
    fontFamily: "Bold",
    fontSize: 16,
    color: Colors.white,
  },
  Bold16lightGrey: {
    fontFamily: "Bold",
    fontSize: 16,
    color: Colors.lightGrey,
  },
  Bold18primary: {
    fontFamily: "Bold",
    fontSize: 18,
    color: Colors.primary,
  },
  Bold16primary: {
    fontFamily: "Bold",
    fontSize: 16,
    color: Colors.primary,
  },
  Bold15primary: {
    fontFamily: "Bold",
    fontSize: 15,
    color: Colors.primary,
  },
  Bold14white: {
    fontFamily: "Bold",
    fontSize: 14,
    color: Colors.white,
  },
  Regular14grey: {
    fontFamily: "Regular",
    fontSize: 14,
    color: Colors.grey,
  },
};
export const Default = {
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  shadowPrimary: {
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  fixPadding: 10,
};
export default { Colors, Fonts, Default };
