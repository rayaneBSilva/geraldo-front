import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  logo: {
    height: 350,
    width: 350,
  },
  icon: {
    marginRight: 10,
  },
  textButton: {
    color: "white",
    marginTop: 15,
    fontSize: 14,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  containerLoginForm: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -10,
  },
});
