import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Alert, ImageBackground, Modal, Pressable, Text, TouchableOpacity, View,  StyleSheet, } from "react-native";
import { FlatList, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import Plus from '../../../assets/icons/plus.svg';
import { AppFrame } from "../../components/app-frame";
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Icon } from '@rneui/themed';
import vehicheComponentService, { ComponentData } from '../../services/VehicheComponentService';
import { useAuth } from '../../context/authContext';

const FlatListItemSeparator = () => {
    return (
        <View
            style={{
                height: 1,
                width: "100%",
                backgroundColor: "white",
            }}
        />
    );
}

const modalStyle = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        width: 200 ,
        borderRadius: 10,
        padding: 10,
        margin: 15,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

const BackCard = () => {
    const [components, setComponents] = useState<ComponentData[]>([]);
    const { authState } = useAuth();
    const [modalVisible, setModalVisible] = useState(false);
    const [tappedItemId, setTappedItemId] = useState(0);

    useEffect(() => {
        (async () => {
            if (authState?.token) {
                const components = await vehicheComponentService.listAllComponents(authState.token);
                setComponents(components);
            }
        })();
    }, []);

    const handleComponentTap = async (id: any) => {
        setModalVisible(true);
        setTappedItemId(id);
    };

    const refreshItem = async() => {
        if (authState?.token) {
            const components = await vehicheComponentService.listAllComponents(authState.token);
            setComponents(components);
        }
    }

    const handleEditTap = async () => {
        setModalVisible(false);
    };

    const handleDeleteTap = async () => {
        if (authState?.token){
            await vehicheComponentService.deleteComponent(tappedItemId,authState.token,"Componente excluído com sucesso!");
        }
        await setModalVisible(false);
        await refreshItem();
    };

    return (
        <View style={{
            flex: 1,
            transform: "rotateY(180deg)"
        }}>
            <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={modalStyle.centeredView}>
                        <View style={modalStyle.modalView}>
                            <Text style={modalStyle.modalText}>O que deseja fazer com este componente?</Text>
                            <Pressable
                                style={[modalStyle.button, modalStyle.buttonClose]}
                                onPress={() => handleEditTap()}>
                                <Text style={modalStyle.textStyle}>Editar</Text>
                            </Pressable>
                            <Pressable
                                style={[modalStyle.button, modalStyle.buttonOpen]}
                                onPress={() => handleDeleteTap()}>
                                <Text style={modalStyle.textStyle}>Excluir</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: "#E0E0E0",
                    paddingVertical: 10
                }}
            >
                <Text
                    style={{
                        marginHorizontal: 15,
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#13164B"
                    }}
                >
                    Componentes do Veiculo
                </Text>
            </View>
            <View
                style={{
                    flex: 1,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20
                }}>
                <FlatList
                    data={components}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => handleComponentTap(item.id)}>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    paddingHorizontal: 15,
                                    paddingVertical: 10,
                                    backgroundColor: "#13164B",
                                }}>
                                <FontAwesome
                                    name="gear"
                                    size={24}
                                    color="white"
                                    style={{ marginRight: 10, }}
                                />
                                <View
                                    style={{
                                        padding: 5,
                                        flex: 1,
                                    }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            backgroundColor: "#1F1546",
                                        }}>
                                        <Text
                                            style={{
                                                fontWeight: "bold",
                                                color: "white"
                                            }}
                                        >Tipo:</Text>
                                        <Text
                                            style={{
                                                color: "white"
                                            }}
                                        >{item.componentType}</Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                        <Text
                                            style={{
                                                fontWeight: "bold",
                                                color: "white"
                                            }}
                                        >Data de troca:</Text>
                                        <Text
                                            style={{
                                                color: "white"
                                            }}
                                        >{item.dateLastExchange}</Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                        <Text
                                            style={{
                                                fontWeight: "bold",
                                                color: "white",
                                                backgroundColor: "#1F1546",
                                            }}
                                        >Km até a troca:</Text>
                                        <Text
                                            style={{
                                                color: "white"
                                            }}
                                        >{item.kilometersLastExnchange}</Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                        <Text
                                            style={{
                                                fontWeight: "bold",
                                                color: "white"
                                            }}
                                        >Lembretes:</Text>
                                        <Text
                                            style={{
                                                color: "white"
                                            }}
                                        >{item.maintenanceFrequency}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor={(item) => `${item.id}`}
                />
            </View>
        </View>
    )
}



export default BackCard;