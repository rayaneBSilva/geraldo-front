import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Button } from 'react-native';
import { forgotPasswordStyles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Mail from '../../assets/mail.svg'


const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const onForgotTap = () => {
    if (email.trim() === "" || !email.includes("@")) {
      console.log('invalid email!');
      return;
    }
    console.log('Reset password for email:', email);
  };

  return (
    <SafeAreaView style={{
      borderStartColor: "grey",
      flex: 1
    }}>
      <LinearGradient
        colors={['rgba(35, 34, 138, 1)', 'rgba(13, 13, 51, 1)']}
        style={{
          flex: 1
        }}

      >
        <ImageBackground
          source={require("../../assets/background.png")}
          resizeMode="cover"
          style={{
            flex: 1
          }}
        >
          <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: 'center',
          }}>
            <Text
              style={{
                fontSize: 35,
                fontWeight: "bold",
                textAlign: "center",
                color: "white"
              }}
            >
              Recuperar Senha
            </Text>
            <View style={{
              marginTop: 20,
              width: "100%",
              alignItems: "center"
            }}>
              <View
                style={{
                  width: "65%",
                  flexDirection: "row",
                  alignItems: "center",
                  overflow: "hidden"
                }}
              >
                <Mail
                  width={25}
                  height={25}
                  style={{
                    padding: 0,
                    margin: 0,
                    position: "relative",
                    top: 8,
                    marginRight: 10
                  }}
                />
                <TextInput
                  placeholder={"Email"}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  style={{
                    fontSize: 15,
                    width: "100%",
                    borderBottomColor: "white",
                    borderBottomWidth: 2,
                    paddingVertical: 6,
                    color: "white",
                    marginTop: 8
                  }}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  autoCorrect={false}
                />
              </View>
            </View>
            <LinearGradient
              colors={['#FCFF58', '#FEC500']}
              end={{ x: 0.85, y: 0 }}
              style={{
                width: "65%",
                marginTop: 25,
              }}
            >
              <Button
                title="Recuperar"
                color="#FEC500"
                onPress={onForgotTap}
              />
            </LinearGradient>
          </View>
        </ImageBackground>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;