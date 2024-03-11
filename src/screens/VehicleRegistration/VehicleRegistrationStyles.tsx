import { StyleSheet } from "react-native";

export const VehicleRegistrationStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold"
  },
  registerForm: {
    width: "100%",
    backgroundColor: "red",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
});
