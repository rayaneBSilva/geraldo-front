import { StyleSheet } from "react-native";

export const registerDriverStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  text:{
    color:"#FFF",
    marginTop:-60,
    marginBottom:45,
    fontSize:50,
    fontWeight: "bold",
    textAlign: "center"
  },
  icon: {
    marginRight: 10,
    marginBottom:20
  },
 
  button: {
    flexDirection: "row", 
    justifyContent:"center",
    textAlign: "center",
    alignItems: "center",
  },

  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  containerRegisterForm: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -10,
  },
});