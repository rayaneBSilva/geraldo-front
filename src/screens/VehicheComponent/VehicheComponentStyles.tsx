import { StyleSheet } from "react-native";

export const vehicheComponent = StyleSheet.create({
  paragraph: {
    color: "#FFF",
    marginTop: -10,
    marginBottom: 45,
    fontSize: 15,
    fontWeight: "normal",
    textAlign: "center",
    paddingLeft: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },

  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    marginTop: -30,
  },
  input: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  textInput: {
    fontSize: 17,
    width: "100%",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    paddingVertical: 6,
    color: "white",
    marginTop: 20,
  },
  icon: {
    width: 25,
    height: 25,
    padding: 0,
    margin: 0,
    position: "relative",
    top: 8,
    marginRight: 10,
    tintColor: "white",
  },
  view: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    overflow: "visible",
    marginTop: 20,
  },
  containerLoginForm: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -60,
    padding: 20,
  },
});
