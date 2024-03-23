import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Input } from "@rneui/themed";
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from "react";
import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/authContext";
import vehicleServiceList, { VehicleData } from "../../services/VehicleServiceList";
import { vehicleListStyles } from "./VehicleListStyles";

const VehicleList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [vehicles, setVehicles] = useState<VehicleData[]>([]);
    const {
        authState
    } = useAuth()
    const navigation = useNavigation();
    const imageUrl =  "https://static0.topspeedimages.com/wordpress/wp-content/uploads/jpg/201508/2010-zenvo-st1-5.jpg?q=50&amp;fit=contain&amp;w=755&amp;h=430&amp;dpr=1.5"
    
    useEffect(() => {
        (async () => {
            if (authState?.token) {
                const vehicles = await vehicleServiceList.getVehicles(authState.token);
                setVehicles(vehicles);
            }
        })();
    },[]);
   

    const handleSharePress = (id:any) => {
        navigation.navigate("CarSharing" as never);
    }

    const handlePlusPress = (id:any) => {
        navigation.navigate("VehicleRegistration" as never);

    }
    const filteredVehicles = vehicles.filter(item =>
        item.model.toLowerCase().includes(searchTerm.toLowerCase())
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
                <TouchableOpacity onPress={handlePlusPress}>
                    <FontAwesome
                        name="plus"
                        size={24}
                        color="white"
                        style={vehicleListStyles.iconPlus}
                    />
                </TouchableOpacity>
                </View>
                {filteredVehicles.length === 0 && (
        <Text style={{ color: 'white', marginTop: 10 }}>Nenhum modelo encontrado.</Text>
    )}
            </View>
            <View style={{ paddingHorizontal: 4, paddingTop: 0, paddingBottom: 20, flex: 1 }}> 
                <FlatList
                    data={filteredVehicles}
                    renderItem={({ item }) =>
                        <LinearGradient
                            colors={['rgba(252,255,88,1)', 'rgba(254,197,0,1)']} //cores
                            start={{ x: 0, y: 0.5 }} //início do gradiente na horizontal
                            end={{ x: 1, y: 0.5 }} //fim do gradiente na horizontal
                            style={vehicleListStyles.flatListContainer}
                        >
                            <Image source={{ uri: imageUrl }} style={vehicleListStyles.imageCard} />
                            <TouchableOpacity onPress={() => handleSharePress(item.id)} style={vehicleListStyles.shareItem}>
                                <FontAwesome
                                    name="user-plus"
                                    size={24}
                                    color={"white"}
                                />
                            </TouchableOpacity>
                            <Text style={vehicleListStyles.Text}>{item.model.toString()}</Text>
                        </LinearGradient>
                    }
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </View>
        </ImageBackground>
    );
};

export default VehicleList;
