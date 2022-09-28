import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from "@react-navigation/native";
import Home from "../Screens/HomeScreen";
import Visitor from "../Screens/VisitorScreen";

const screens = {
  Visitor: {
    screen: Visitor,
  },
  Home: {
    screen: Home,
  },
};

const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);
