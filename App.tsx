import { StatusBar } from "expo-status-bar";
import Routes from "./src/routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./src/context/authContext";
import Toast from "react-native-toast-message";
import toastConfig from "./src/components/toastMessage/toastConfig";

export default function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <StatusBar style="light" />
          <Routes />
        </AuthProvider>
      </GestureHandlerRootView>
      <Toast config={toastConfig} />
    </>
  );
}