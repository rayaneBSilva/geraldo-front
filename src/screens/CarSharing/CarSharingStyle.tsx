import { StyleSheet } from "react-native";

export const carSharingStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    textAlign: "center",
    
  },
  icon: {
    marginRight: 10,
  
  },
  textButton: {
    color: "white",
    marginTop: 50,
    fontSize: 14,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
     fontSize: 50,
     marginTop: 70,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    marginTop: -30,
  },
  containerCarSharingForm: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
  },
  text:{
    color:"#FFF",
    marginTop: 150,
    marginBottom:45,
    fontSize: 44,
    fontWeight: "bold",
    textAlign: "center"
  },
});
