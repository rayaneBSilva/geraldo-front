import React, { useEffect } from 'react';
import { Button, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import axios from 'axios';
import ServiceBase from '../../services/ServiceBase';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function SendNotification() {

    const requestNotificationPermission = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('Permissão de notificação negada');
        }
    };

    const handleCallNotification = async () => {

        await requestNotificationPermission();

        const response = await new ServiceBase().get('check_maintance', 'token');
        const titulo = response.data.titulo != null? response.data.titulo: "Manutenção";
        const corpo = response.data.corpo != null? response.data.corpo: "Está tudo em dia";

        await Notifications.scheduleNotificationAsync({
            content: {
                title: titulo,
                body: corpo,
                data: {},
            },
            trigger: {
                seconds: 1,
            },
        });
    };

    return (
        <View style={styles.container}>
            <Button title="Notificação" onPress={handleCallNotification} />
        </View>
    );

}

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});