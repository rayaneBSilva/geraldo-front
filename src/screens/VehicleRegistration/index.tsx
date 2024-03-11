import React from 'react'
import { ImageBackground, KeyboardAvoidingView, SafeAreaView, Text, View, Platform } from 'react-native'
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
  placa: yup.string()
    .required('Por favor, informe a placa do veículo.')
    .matches(/^([A-Z]{3}\d{4})$/, 'Por favor, informe uma placa válida no formato AAA1234.'),
  anoDeFabricação: yup.string().required('Por favor, informe o ano de fabricação do veículo.'),
  modelo: yup.string().required('Por favor, informe o modelo do veículo.'),
  quilometragemAtual: yup.number()
    .typeError('Por favor, informe a quilometragem atual do veículo.')
    .required('Por favor, informe a quilometragem atual do veículo.')
    .min(0, 'A quilometragem atual não pode ser menor que 0.')
});


function VehicleRegistration() {

  const {control, handleSubmit, formState: { errors } } = useForm<VehicleForm>({
    defaultValues: {
      placa: "",
      anoDeFabricação: "",
      modelo: "",
      quilometragemAtual: 0
    },
    mode: 'onChange',
    resolver: yupResolver(formSchema)
  })

  return (
    <ImageBackground
      source={require("../../../assets/splashScreen.png")}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
            >

            </ControlledTextInput>
            <ControlledTextInput
              control={control}
              name="anoDeFabricação"
              rules={{required: "Ano de Fabricação obrigatório"}}
              placeholder="Ano de Fabricação"
              style={{ color: "white" }}
            >

            </ControlledTextInput>
            <ControlledTextInput
              control={control}
              name="modelo"
              rules={{required: "modelo obrigatório"}}
              placeholder="Modelo"
              style={{ color: "white" }}
            >

            </ControlledTextInput>

            <ControlledTextInput
              control={control}
              name="quilometragemAtual"
              rules={{required: "Quilometragem Atual obrigatório"}}
              placeholder="Quilometragem Atual"
              style={{ color: "white" }}
              type='number'

            >

            </ControlledTextInput>

            <CustomButton title="Cadastrar" onPress={() => console.log("print")}></CustomButton>
          </View>
        </SafeAreaView>
    </KeyboardAvoidingView>
    </ImageBackground>
  )
}

export default VehicleRegistration