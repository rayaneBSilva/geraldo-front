import React, { useState } from "react";
import { View, Image, ImageBackground, Text, FlatList, TouchableOpacity } from "react-native";
import { vehicleListStyles } from "./VehicleListStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Input } from "@rneui/themed";


const VehicleList = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const data = [
        {
            id: 1,
            title: "Gol",
            imageUrl: "https://www.16valvulas.com.ar/wp-content/uploads/2016/08/nuevo-volkswagen-gol.jpg"
        },

        {
            id: 2,
            title: "Bugatti",
            imageUrl: "https://autonxt.net/wp-content/uploads/2021/05/Bugatti-Divo-Ladybug4-2048x1229.jpg"
        },
        {
            id: 3,
            title: "Zenovo TS1",
            imageUrl: "https://static0.topspeedimages.com/wordpress/wp-content/uploads/jpg/201508/2010-zenvo-st1-5.jpg?q=50&amp;fit=contain&amp;w=755&amp;h=430&amp;dpr=1.5"
        },
        {
            id: 4,
            title: "Hilux",
            imageUrl: "https://www.centromotorsa.com.ar/wp-content/uploads/2023/12/Hilux-SRX.jpg"
        }
    ];

    const handleHeartPress = (id:any) => {
        console.log("clicou")
    }

    const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <ImageBackground
            source={require("../../../assets/splashScreen.png")}
            style={vehicleListStyles.backgroundImage}
        >
            <SafeAreaView />

            <View style={vehicleListStyles.containerSearchForm}>
                <FontAwesome
                    name="search"
                    size={24}
                    color="white"
                    style={vehicleListStyles.icon}
                />
                <Input
                    containerStyle={{ width: "90%" }}
                    style={{ color: "white" }}
                    placeholder="Usuário"
                />
            </View>

            <FlatList
                data={filteredData}
                renderItem={({ item }) =>
                    <View style={vehicleListStyles.flatListContainer}>
                        <Image source={{ uri: item.imageUrl }} style={vehicleListStyles.imageCard} />
                        <TouchableOpacity onPress={() => handleHeartPress(item.id)} style={vehicleListStyles.shareItem}>
                            <FontAwesome
                                name="user-plus"
                                size={24}
                                color={"white"}
                            />
                        </TouchableOpacity>
                        <Text style={vehicleListStyles.Text}>{item.title.toString()}</Text>
                    </View>
                }
            />
        </ImageBackground>
    );
};

export default VehicleList;
