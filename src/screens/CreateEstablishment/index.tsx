import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { Button, ImageBackground, SafeAreaView, Text, TextInput, View } from "react-native";
import { SvgProps } from "react-native-svg";
import City from '../../../assets/icons/city.svg';
import Id from '../../../assets/icons/cnpj.svg';
import Form from '../../../assets/icons/form.svg';
import Loc from '../../../assets/icons/loc.svg';
import Mail from '../../../assets/icons/mail.svg';
import Neighborhood from '../../../assets/icons/neighborhood.svg';
import Number from '../../../assets/icons/number.svg';
import Phone from '../../../assets/icons/phone.svg';
import State from '../../../assets/icons/state.svg';
import Street from '../../../assets/icons/street.svg';
import User from '../../../assets/icons/user.svg';

type InputProps = {
  placeholder: string;
  icon: React.FC<SvgProps>
}

const Input = ({
  placeholder,
  "icon":Icon
}: InputProps) => {
  return (
    <View
    style={{
      width: "65%",
      flexDirection: "row",
      alignItems: "center",
      overflow: "hidden"
    }}
  >
    <Icon
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
    placeholder={placeholder}
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
    />
  </View>
  )
}

const CreateEstablishment = () => {
  return (
    <SafeAreaView style={{
      backgroundColor: "grey",
      flex: 1
    }}>
        <LinearGradient
        colors={['rgba(35, 34, 138, 1)', 'rgba(13, 13, 51, 1)']}
        style={{
          flex: 1
        }}
        >
        <ImageBackground
        source={require("../../../assets/create-establishment-background.png")}
        resizeMode="cover"
        style={{
          flex: 1
        }}
        >
          <View style={{ 
            alignItems: "center",
            marginTop: 50
          }}>
            <Text
            style={{
              fontSize: 35,
              fontWeight: "bold",
              textAlign: "center",
              color: "white"
            }}
            >
              Cadastro do {"\n"} Estabelecimento
            </Text>
            <View style={{
              marginTop: 20,
              width: "100%",
              alignItems: "center"
            }}>
              <Input
              placeholder={"CNPJ"}
              icon={Id}
              />
              <Input
              placeholder={"Nome Fantasia"}
              icon={User}
              />
              <Input
              placeholder={"Categoria"}
              icon={Form}
              />
              <Input
              placeholder={"E-mail"}
              icon={Mail}
              />
              <Input
              placeholder={"Telefone"}
              icon={Phone}
              />
              <Input
              placeholder={"CEP"}
              icon={Loc}
              />
              <Input
              placeholder={"Estado"}
              icon={State}
              />
              <Input
              placeholder={"Cidade"}
              icon={City}
              />
              <Input
              placeholder={"Bairro"}
              icon={Neighborhood}
              />
              <Input
              placeholder={"Rua"}
              icon={Street}
              />
              <Input
              placeholder={"Número"}
              icon={Number}
              />
            </View>
            <LinearGradient
            colors={['#FCFF58', '#FEC500']}
            end={{x: 0.85, y: 0}}
            style={{
              width: "65%",
              marginTop: 25,
              borderRadius: 15,
              paddingVertical: 3
            }}
            >
              <Button
              title="Cadastrar"
              color="#2D207C"
              />
            </LinearGradient>
          </View>
        </ImageBackground>
        </LinearGradient>
    </SafeAreaView>
  );
};

export default CreateEstablishment;