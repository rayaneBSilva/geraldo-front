import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Button } from 'react-native';
import { forgotPasswordStyles } from './styles';
import { Input } from "@rneui/themed";
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Mail from '../../../assets/mail.svg'
import forgotPasswordService from '../../services/ForgotPasswordService';
import CustomButton from '../../components/button';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationProp, ParamListBase } from '@react-navigation/core';


interface ForgotPasswordProps {
  navigation: NavigationProp<ParamListBase>;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordProps>  = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isEmailInvalid, setisEmailInvalid] = useState(false);

  const onForgotTap = async () => {
    if (email.trim() === "" || !email.includes("@")) {
      setisEmailInvalid(true);
      return;
    } else {
      setisEmailInvalid(false);
    }
    try {
      const response = await forgotPasswordService.recovery({ email });
      if (response.status == 200) {
        alert(response.data["message"]);
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error);
    }
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
        }}>
        <ImageBackground
          source={require("../../../assets/background.png")}
          resizeMode="cover"
          style={{
            flex: 1
          }}>
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
            <View
              style={{
                width: "65%",
                flexDirection: "row",
                alignItems: "center",
                overflow: "hidden",
                marginTop: 20
              }}
            >
              <FontAwesome
                name="envelope"
                size={24}
                color="white"
                style={{ marginRight: 10, }}
              />
              <Input
                containerStyle={{ width: "90%" }}
                style={{ color: "white" }}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                errorMessage={isEmailInvalid ? "Insira um email válido" : ""}
                errorStyle={{ color: isEmailInvalid ? "red" : "black" }}
              />
            </View>
            <View style={{ width: "85%" }}>
              <CustomButton title="Recuperar Senha" onPress={onForgotTap} />
            </View>
          </View>
        </ImageBackground>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;