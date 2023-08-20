import "./ignoreWarning";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { withTranslation } from "react-i18next";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./screens/splashScreen";
import i18n from "./languages/index"; //don't remove this line
import OnboardingScreen from "./screens/auth/onboardingScreen";
import { Provider } from "react-native-paper";
import VerificationScreen from "./screens/auth/verificationScreen";
import BottomTab from "./components/bottomTab";
import ChatScreen from "./screens/chatScreen";
import ChattingScreen from "./screens/ChattingScreen";
import EditProfileScreen from "./screens/editProfileScreen";
import Address from "./screens/Address";
import Mesaagess from "./screens/Mesaagess";
import SeeAll from "./screens/SeeAll";
import Forgets from "./screens/Forgets";
import Forgetss from "./screens/Forgetss";
import Forgetsss from "./screens/Forgetsss";
import ChangeEmail from "./screens/ChangeEmail";
import VerifysEmail from "./screens/VerifysEmail";
import AdminMain from "./screens/AdminMain";
import Pol from "./screens/Pol";
import Changepass from "./screens/Changepass";
import Deactivate from "./screens/Deactivate";
import Crr from "./screens/Crr";
import policy from "./screens/policy";
import terns from "./screens/terns";
import Messages from "./screens/Messages";
import Form2 from "./screens/Form2";
import Replies from "./screens/Replies";
import MyDis from "./screens/MyDis";
import Replis from "./screens/Replis";
import Rad from "./screens/Rad";
import Lcon from "./screens/Lcon";
import Lcons from "./screens/Lcons";
import Not from "./screens/Not";
import Radius from "./screens/auth/Radius";
import Forgot from "./screens/auth/Forgot";
import Logins1 from "./screens/auth/Logins1";
import Verify2 from "./screens/auth/Verify2";
import Registers1 from "./screens/auth/Registers1";
import Outh from "./screens/auth/Outh";
import homeScreen from "./screens/homeScreen";
import Losted from "./screens/Losted";
import ListItem from "./screens/ListItem";
import LostPosted from "./screens/LostPosted";
import YourList from "./screens/YourList";
import lostTabt from "./screens/lostTabt";
import Location from "./screens/Location";
import Fpos from "./screens/Fpos";
import EditsSus from "./screens/EditsSus";
import EditSuccess from "./screens/EditSuccess";
import Report from "./screens/Report";
import Edit from "./screens/Edit";
import SubmitReport from "./screens/SubmitReport";
import Reported from "./screens/Reported";
import SkillSharing from "./screens/SkillSharing";
import Forget1 from "./screens/auth/Forget1";
import Profile1 from "./screens/Profile1";
import SkillShared from "./screens/SkillShared";
import Connect from "./components/Connect";
import Req from "./components/Req";
import AddSkills from "./screens/AddSkills";
import EditSkill from "./screens/EditSkill";
import Sus from "./screens/Sus";
import Locate from "./screens/Locate";
import SkillPosted from "./screens/SkillPosted";
import SkillUpdated from "./screens/SkillUpdated";
import MySkills from "./screens/MySkills";
import CategorySkill from "./components/CategorySkill";
import BuySell from "./screens/BuySell";
import Suspicious from "./screens/Suspicious";
import Form from "./screens/Form";
import Slocate from "./screens/Slocate";
import Profile3 from "./screens/Profile3";
import Profile4 from "./screens/Profile4";
import Buy from "./components/Buy";
import Sell from "./components/Sell";
import Susp from "./components/Susp";
import Mysus from "./components/Mysus";
import CatsSkill from "./screens/CatsSkill";
import Duplicate from "./screens/Duplicate";
import Cradius from "./screens/Cradius";
import AddBuy from "./screens/AddBuy";
import EditBuy from "./screens/EditBuy";
import PostsSell from "./screens/PostsSell";
import SellCatItems from "./screens/SellCatItems";
import BuyDetails from "./screens/BuyDetails";
import Locat from "./screens/Locat";
import AddSus from "./screens/AddSus";
import AddedSus from "./screens/AddedSus";
import SusUpdated from "./screens/SusUpdated";
import Notify from "./screens/Notify";
import AutoMotive from "./screens/AutoMotive";
import Toy from "./screens/Toy";
import Bicycle from "./screens/Bicycle";
import Cloth from "./screens/Cloth";
import Tool from "./screens/Tool";
import Garden from "./screens/Garden";
import Other from "./screens/Other";
import Fridge from "./screens/Fridge";
import Car from "./screens/Car";
import Furniture from "./screens/Furniture";
import ConnReq from "./screens/ConnReq";
import HomeDecor from "./screens/HomeDecor";
import BuyMy from "./screens/BuyMy";
import Shared from "./screens/Shared";
import CatShared from "./screens/CatShared";
import Baby from "./screens/Baby";
import Cooking from "./screens/Cooking";
import Gardening from "./screens/Gardening";
import Tech from "./screens/Tech";
import Tailor from "./screens/Tailor";
import Salon from "./screens/Salon";
import Paint from "./screens/Paint";
import Plumber from "./screens/Plumber";
import Arts from "./screens/Arts";
import Photo from "./screens/Photo";
import Tutoring from "./screens/Tutoring";
import Appearance from "./screens/Appearance";
import Myaccount from "./screens/Myaccount";
import { store } from "./redux/store";
import { Provider as ReduxProvider } from "react-redux";

const Stack = createStackNavigator();

const MainNavigation = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen
          name="splashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Messages"
          component={Messages}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="chatScreen"
          component={ChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChattingScreen"
          component={ChattingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="editProfileScreen"
          component={EditProfileScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Losted"
          component={Losted}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListItem"
          component={ListItem}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LostPosted"
          component={LostPosted}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="YourList"
          component={YourList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="lostTabt"
          component={lostTabt}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Location"
          component={Location}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Report"
          component={Report}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Forgets"
          component={Forgets}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Forgetss"
          component={Forgetss}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Forgetsss"
          component={Forgetsss}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Reported"
          component={Reported}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SubmitReport"
          component={SubmitReport}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditSuccess"
          component={EditSuccess}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SkillSharing"
          component={SkillSharing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SkillShared"
          component={SkillShared}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AddSkills"
          component={AddSkills}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditSkill"
          component={EditSkill}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Locate"
          component={Locate}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SkillPosted"
          component={SkillPosted}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SkillUpdated"
          component={SkillUpdated}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MySkills"
          component={MySkills}
          options={{ headerShown: false }}
        />

        {/* <Stack.Screen
      name="Categ"
      component={Categ}
      options={{ headerShown: false }}
    /> */}
        <Stack.Screen
          name="CategorySkill"
          component={CategorySkill}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Mesaagess"
          component={Mesaagess}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BuySell"
          component={BuySell}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Buy"
          component={Buy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SeeAll"
          component={SeeAll}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sell"
          component={Sell}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CatsSkill"
          component={CatsSkill}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddBuy"
          component={AddBuy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditBuy"
          component={EditBuy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PostsSell"
          component={PostsSell}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BuyDetails"
          component={BuyDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SellCatItems"
          component={SellCatItems}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AutoMotive"
          component={AutoMotive}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Toy"
          component={Toy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Bicycle"
          component={Bicycle}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cloth"
          component={Cloth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tool"
          component={Tool}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Garden"
          component={Garden}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Other"
          component={Other}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Fridge"
          component={Fridge}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Car"
          component={Car}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Furniture"
          component={Furniture}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="HomeDecor"
          component={HomeDecor}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Shared"
          component={Shared}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CatShared"
          component={CatShared}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tutoring"
          component={Tutoring}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Baby"
          component={Baby}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cooking"
          component={Cooking}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Plumber"
          component={Plumber}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Arts"
          component={Arts}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Photo"
          component={Photo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Paint"
          component={Paint}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Salon"
          component={Salon}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangeEmail"
          component={ChangeEmail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifysEmail"
          component={VerifysEmail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tailor"
          component={Tailor}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tech"
          component={Tech}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Gardening"
          component={Gardening}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="homeScreen"
          component={homeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Outh"
          component={Outh}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ConnReq"
          component={ConnReq}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Connect"
          component={Connect}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Req"
          component={Req}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BuyMy"
          component={BuyMy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Logins1"
          component={Logins1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notify"
          component={Notify}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Radius"
          component={Radius}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registers1"
          component={Registers1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Forgot"
          component={Forgot}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Verify2"
          component={Verify2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminMain"
          component={AdminMain}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Locat"
          component={Locat}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Forget1"
          component={Forget1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile1"
          component={Profile1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Suspicious"
          component={Suspicious}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sus"
          component={Sus}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Susp"
          component={Susp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Mysus"
          component={Mysus}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Form"
          component={Form}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Form2"
          component={Form2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Replies"
          component={Replies}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Fpos"
          component={Fpos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditsSus"
          component={EditsSus}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddSus"
          component={AddSus}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddedSus"
          component={AddedSus}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SusUpdated"
          component={SusUpdated}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Slocate"
          component={Slocate}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="terns"
          component={terns}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="policy"
          component={policy}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Pol"
          component={Pol}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyDis"
          component={MyDis}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Replis"
          component={Replis}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Profile3"
          component={Profile3}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile4"
          component={Profile4}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Appearance"
          component={Appearance}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Myaccount"
          component={Myaccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Changepass"
          component={Changepass}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Deactivate"
          component={Deactivate}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Duplicate"
          component={Duplicate}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Cradius"
          component={Cradius}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Crr"
          component={Crr}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Rad"
          component={Rad}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Lcon"
          component={Lcon}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Not"
          component={Not}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Lcons"
          component={Lcons}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="onboardingScreen"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="verificationScreen"
          component={VerificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="bottomTab"
          component={BottomTab}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const ReloadAppOnLanguageChange = withTranslation("translation", {
  bindI18n: "languageChanged",
  bindStore: false,
})(MainNavigation);

function App() {
  const [loaded] = useFonts({
    Bold: require("./assets/fonts/Inter-Bold.ttf"),
    ExtraBold: require("./assets/fonts/Inter-ExtraBold.ttf"),
    Medium: require("./assets/fonts/Inter-Medium.ttf"),
    SemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    Regular: require("./assets/fonts/Inter-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider>
      <ReloadAppOnLanguageChange />
    </Provider>
  );
}

export default () => {
  return (
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  );
};
