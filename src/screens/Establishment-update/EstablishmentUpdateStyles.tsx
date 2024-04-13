import {StyleSheet} from "react-native";

export const establishmentStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    marginTop: -30,
    },
  text: {
    color: "#FFF",
    marginTop: 70,
    marginBottom: 30,
    fontSize: 41.5,
    fontWeight: "bold",
    textAlign: "center",
    },
    containerUpdateForm: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: -10,
    },
    icon: {
      marginRight: 10,
      marginBottom: 20,
    },
    iconCity: {
      marginRight: 12,
      marginLeft:-3,
      marginBottom: 20,
    },
    iconBairro: {
      marginRight: 12,
      marginLeft:-7,
      marginBottom: 20,
    },
    button: {
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
      width: "100%"
    },
});