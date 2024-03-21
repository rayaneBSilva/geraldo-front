import React from "react";
import { View, Image, ImageBackground, Text, FlatList, TouchableOpacity  } from "react-native";
import { vehicleListStyles } from "./VehicleListStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons"; 

const VehicleList = () => {

    const data = [
        {
            id: 1,
            title: "Beautiful Landscape",
            imageUrl: "https://cdn.pixabay.com/photo/2017/09/25/18/08/van-2786078_1280.jpg"
        },
        {
            id: 2,
            title: "Beautiful Landscape",
            imageUrl: "https://cdn.pixabay.com/photo/2017/09/25/18/08/van-2786078_1280.jpg"
        }
    ]; 
    
    const handleHeartPress = (id:any) => {
        console.log("clicou")
    }

    return(
        <ImageBackground
            source={require("../../../assets/splashScreen.png")}
            style={vehicleListStyles.backgroundImage}
        >
            <SafeAreaView/> 
            <FlatList 
                data={data} 
                renderItem={({item}) =>
                    <View style={vehicleListStyles.flatListContainer}>
                        <Image source={{uri:item.imageUrl}} style={vehicleListStyles.imageCard} />
                        <TouchableOpacity onPress={() => handleHeartPress(item.id)} style={vehicleListStyles.shareItem}>
                            <FontAwesome
                                name="heart"
                                size={24}
                                color={"red"}
                            />
                        </TouchableOpacity>
                        <Text style={vehicleListStyles.Text}>{item.title.toString()}</Text>
                        <TouchableOpacity onPress={() => handleHeartPress(item.id)}>
                        </TouchableOpacity>
                    </View>
                }
            />
        </ImageBackground>
    );
};

export default VehicleList;
