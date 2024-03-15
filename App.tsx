import { StatusBar } from "expo-status-bar";
import Routes from "./src/routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Routes />
    </GestureHandlerRootView>
  );
}
