import React, { useEffect } from 'react';
import { Button, View } from 'react-native';
import * as Notifications from 'expo-notifications';

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

        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Está na hora da revisão!',
                body: 'Body Test',
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