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
        backgroundColor: "yellow",
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
        height: 150,
        width: "100%", 
        borderRadius:0,
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30
      },
      
      gradientBackground: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        borderRadius: 30,
      },
      shareItem:{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1
      },
      searchInput: {
        marginTop: 60,
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        color: "white"
      },
      icon: {
        marginRight: 10,
      },
      containerSearchForm: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,
        width: "85%"
      },
    

});