import React from 'react'
import { ImageBackground, SafeAreaView, Text, View } from 'react-native'
import { VehicleRegistrationStyles  as styles } from "./VehicleRegistrationStyles";
import CustomButton from '../../components/button';
import ControlledTextInput from '../../components/controller/ControlledTextInput';

type VehicleForm = {
  placa: string,
  anoDeFabricação: string,
  modelo: string,
  quilometragemAtual: number
}


function VehicleRegistration() {
  return (
    <ImageBackground
      source={require("../../../assets/splashScreen.png")}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.headerText}>Cadastro</Text>
          <Text style={styles.headerText}>de Veículo</Text>
        </View>
        <View style={styles.registerForm}>
          <ControlledTextInput
            control={control}
            name={"placa"}
            rules={{required: "placa obrigatória"}}
          >

          </ControlledTextInput>

          <CustomButton title="Cadastrar" onPress={() => console.log("print")}></CustomButton>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default VehicleRegistration