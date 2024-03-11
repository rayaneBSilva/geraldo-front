import React from 'react'
import { ImageBackground, SafeAreaView, Text, View } from 'react-native'
import { VehicleRegistrationStyles  as styles } from "./VehicleRegistrationStyles";
import CustomButton from '../../components/button';
import ControlledTextInput from '../../components/controller/ControlledTextInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

type VehicleForm = {
  placa: string,
  anoDeFabricação: string,
  modelo: string,
  quilometragemAtual: number
}

const formSchema = yup.object({
  placa: yup.string().required(),
  anoDeFabricação: yup.string().required(),
  modelo: yup.string().required(),
  quilometragemAtual: yup.number().required()
})


function VehicleRegistration() {

  const {control, handleSubmit, formState: { errors } } = useForm<VehicleForm>({
    defaultValues: {
      placa: "",
      anoDeFabricação: "",
      modelo: "",
      quilometragemAtual: 0
    },
    resolver: yupResolver(formSchema)
  })

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
            name="placa"
            rules={{required: "placa obrigatória"}}
            placeholder="placa"
          >

          </ControlledTextInput>

          <CustomButton title="Cadastrar" onPress={() => console.log("print")}></CustomButton>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default VehicleRegistration