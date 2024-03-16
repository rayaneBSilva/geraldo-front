import React from "react";
import { View, Image, ImageBackground, Text, FlatList } from "react-native";
import {vehicleListStyles} from "./VehicleListStyles"
import { SafeAreaView } from "react-native-safe-area-context";

const VehicleList = () => {

    const data = [
        {id: 1,
        title:"Beautiful LandsCape",
        ImageUrl: "https://cdn.pixabay.com/photo/2017/09/25/18/08/van-2786078_1280.jpg"},
        {id: 2,
            title:"Beautiful LandsCape",
            ImageUrl: "https://cdn.pixabay.com/photo/2017/09/25/18/08/van-2786078_1280.jpg"}
    ]; 
    
    return(
        <ImageBackground
        source={require("../../../assets/splashScreen.png")}
        style={vehicleListStyles.backgroundImage}
      >

        <SafeAreaView/> 
        <FlatList data={data} renderItem={({item}) =>
         <View style={vehicleListStyles.flatListContainer}>
            <Image source={{uri:item.ImageUrl}} style={vehicleListStyles.imageCard}/>
            <Text style={vehicleListStyles.Text}>{item.title.toString()}</Text>
        </View>}/>
      </ImageBackground>
    );

};

export default VehicleList;