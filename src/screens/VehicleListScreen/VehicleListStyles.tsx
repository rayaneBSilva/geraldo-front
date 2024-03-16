import { FlatList, StyleSheet } from "react-native";

export const vehicleListStyles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        marginTop: -30,
      },

      flatListContainer:{
        marginTop: 45,
        backgroundColor: "#fff",
        marginVertical: 10,
        marginHorizontal: 16,
        paddingBottom: 32,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",

      },
      separator:{
        height:2,
        backgroundColor: "#ffff"
      },
      Text: {
        fontSize: 24,
        paddingTop: 6
      },
      
      imageCard: {
        height: 200,
        width: "100%", 
        borderRadius:0,
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30
      }

});