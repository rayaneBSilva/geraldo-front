import React from 'react'
import { ImageBackground, KeyboardAvoidingView, SafeAreaView, Text, View, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { VehicleRegistrationStyles  as styles } from "./VehicleRegistrationStyles";
import CustomButton from '../../components/button';
import ControlledTextInput from '../../components/controller/ControlledTextInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { vehicleSchema } from '../../utils/yupSchemas';
import vehicleService from '../../services/VehicleService';

type VehicleForm = {
  placa: string,
  anoDeFabricação: number,
  modelo: string,
  quilometragemAtual: number
}



function VehicleRegistration() {

  const {control, handleSubmit, formState: { errors } } = useForm<VehicleForm>({
    mode: 'onChange',
    resolver: yupResolver(vehicleSchema)
  })

  const handleCreateVehicle = async (e : VehicleForm ) => {
    // Ver como é para mandar os dados
    const response = await vehicleService.createVehicle(e)
  }

  return (
    <ImageBackground
        source={require("../../../assets/splashScreen.png")}
        style={styles.backgroundImage}
      >
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback accessible={false} touchSoundDisabled onPress={() => Keyboard.dismiss()} >
          <SafeAreaView style={styles.container}>
            <View style={styles.Header}>
              <Text style={styles.headerText}>Cadastro</Text>
              <Text style={styles.headerText}>de Veículo</Text>
            </View>
            <View style={styles.registerForm}>
              <ControlledTextInput
                control={control}
                name="placa"
                rules={{required: "placa obrigatória"}}
                placeholder="Placa"
                style={{ color: "white" }}
                iconName='user'
                containerStyle={{ width: "92%", marginLeft: 10, transform: "uppercase" }}
              >

              </ControlledTextInput>
              <ControlledTextInput
                control={control}
                name="anoDeFabricação"
                rules={{required: "Ano de Fabricação obrigatório"}}
                placeholder="Ano de Fabricação"
                style={{ color: "white" }}
                iconName='calendar'
                containerStyle={{ width: "92%", marginLeft: 5 }}
                type='number'
                maxLength={4}
              >

              </ControlledTextInput>
              <ControlledTextInput
                control={control}
                name="modelo"
                rules={{required: "modelo obrigatório"}}
                placeholder="Modelo"
                style={{ color: "white" }}
                iconName='car'
                containerStyle={{ width: "92%" }}
              >

              </ControlledTextInput>

              <ControlledTextInput
                control={control}
                name="quilometragemAtual"
                rules={{required: "Quilometragem Atual obrigatório"}}
                placeholder="Quilometragem Atual"
                style={{ color: "white" }}
                type='number'
                iconName='speedometer'
                containerStyle={{ width: "92%" }}
              >

              </ControlledTextInput>

              <CustomButton title="Cadastrar" onPress={handleSubmit((e) => handleCreateVehicle(e))}></CustomButton>
            </View>
          </SafeAreaView>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      </ImageBackground>
  )
}

export default VehicleRegistration