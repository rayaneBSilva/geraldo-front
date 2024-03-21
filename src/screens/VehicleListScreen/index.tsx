import React, { useState } from "react";
import { View, Image, ImageBackground, Text, FlatList, TouchableOpacity } from "react-native";
import { vehicleListStyles } from "./VehicleListStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Input } from "@rneui/themed";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";


const VehicleList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigation = useNavigation();


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
        },
        {
            id: 5,
            title: "Hilux",
            imageUrl: "https://www.centromotorsa.com.ar/wp-content/uploads/2023/12/Hilux-SRX.jpg"
        }
    ];

    const handleSharePress = (id:any) => {
        navigation.navigate("CarSharing" as never);

    }

    const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <ImageBackground
            source={require("../../../assets/splashScreen -without-border.png")}
            style={vehicleListStyles.backgroundImage}
        >
            <SafeAreaView />
            <View style={{alignItems:"center", marginHorizontal: -10, marginRight: 20}}>
                <View style={vehicleListStyles.containerSearchForm}>
                    <FontAwesome
                        name="search"
                        size={24}
                        color="white"
                        style={vehicleListStyles.icon}
                    />
                    <Input
                        containerStyle={{ width: "90%", marginTop: 30 }} // Adiciona margem superior
                        placeholder="Procure por um carro"
                        placeholderTextColor="white" // Define a cor do texto do placeholder
                        inputStyle={{ color: 'white' }} // Define a cor do texto do input
                        underlineColorAndroid="transparent" // Oculta a linha padrão do input no Android
                        style={{ borderBottomColor: 'white', borderBottomWidth: 1 }}
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                    <FontAwesome
                        name="plus"
                        size={24}
                        color="white"
                        style={vehicleListStyles.iconPlus}
                    />
                </View>
            </View>
            <View style={{ paddingHorizontal: 4, paddingTop: 0, paddingBottom: 20, flex: 1 }}> 
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) =>
                        <LinearGradient
                            colors={['rgba(252,255,88,1)', 'rgba(254,197,0,1)']} //cores
                            start={{ x: 0, y: 0.5 }} //início do gradiente na horizontal
                            end={{ x: 1, y: 0.5 }} //fim do gradiente na horizontal
                            style={vehicleListStyles.flatListContainer}
                        >
                            <Image source={{ uri: item.imageUrl }} style={vehicleListStyles.imageCard} />
                            <TouchableOpacity onPress={() => handleSharePress(item.id)} style={vehicleListStyles.shareItem}>
                                <FontAwesome
                                    name="user-plus"
                                    size={24}
                                    color={"white"}
                                />
                            </TouchableOpacity>
                            <Text style={vehicleListStyles.Text}>{item.title.toString()}</Text>
                        </LinearGradient>
                    }
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </View>
        </ImageBackground>
    );
};

export default VehicleList;
