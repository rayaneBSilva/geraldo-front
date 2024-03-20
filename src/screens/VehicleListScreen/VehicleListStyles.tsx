import { StyleSheet } from "react-native";

export const vehicleListStyles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        marginTop: -30,
        
    },

    flatListContainer: {
        marginTop: 29,
        backgroundColor: "yellow",
        marginVertical: -5,
        marginHorizontal: 25,
        paddingBottom: 15,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },

    separator: {
        height: 2,
        backgroundColor: "#ffff",
    },

    Text: {
        fontSize: 24,
        paddingTop: 6,
        color: "#2D207C",
        textAlign: "right", // Alinha o texto à direita
    },

    imageCard: {
        height: 130,
        width: "100%",
        borderRadius: 0,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },

    gradientBackground: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        borderRadius: 30,
    },

    shareItem: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1,
    },

    icon: {
        marginRight: 10,
    },
    iconPlus: {
      marginRight: 10,
      marginLeft: 14
  },


    containerSearchForm: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,
        width: "85%",
    },
});
