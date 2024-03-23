import { StatusBar } from "expo-status-bar";
import Routes from "./src/routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./src/context/authContext";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <StatusBar style="light" />
        <Routes />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}