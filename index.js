/** @format */

import { AppRegistry } from "react-native";
import App from "./App";
import PanResponderExample from "./src/panresponder";
import CircleAnimationExample from "./src/circleAnimation";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => PanResponderExample);
