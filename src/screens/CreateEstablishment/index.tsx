import { Maybe, just, none } from '@sweet-monads/maybe';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from "react";
import { Button, ImageBackground, SafeAreaView, ScrollView, Text, View } from "react-native";
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
import { CreateEstablishmentCommand } from '../../api/commands/CreateEstablishment';
import { FindAddressQuery } from '../../api/queries/FindAddress';
import { Input } from '../../components/input';
import { Picker } from '../../components/picker';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface CreateEstablishmentProps {
  navigation: NavigationProp<ParamListBase>;
}

const defaultValidator = (value: any): Maybe<Error> => {
  if (!value) return just(new Error("Campo Obrigatório"))
  return none()
}

function createFields(): Record<string, string> {
  return Object
  .keys(Fields)
  .reduce((prev, curr) => {
    return {
      ...prev,
      [curr]: ""
    }
  }, {})
}

enum Fields {
  cnpj = "cnpj",
  name = "name",
  category = "category",
  email = "email",
  phone = "phone",
  cep = "cep",
  state = "state",
  city = "city",
  neighborhood = "neighborhood",
  street = "street",
  number = "number"
}

const CreateEstablishment: React.FC<CreateEstablishmentProps> = ({ navigation }) => {
  const [fieldsValues, setFieldsValues] = useState<Record<string, string>>(createFields())
  const [fieldsErrors, setFieldsErrors] = useState<Record<string, string>>(createFields())

  async function handleSubmit() {
    const validationErrors = Object.keys(Fields).reduce((prev, curr) => {
      const isFieldValid = defaultValidator(fieldsValues[curr])
      if (isFieldValid.isJust()) {
        const error = isFieldValid.value;
        return [
          ...prev,
          {
            name: curr,
            error: error.message
          }
        ]
      } else return [
        ...prev,
        {
          name: curr,
          error: ""
        }
      ]
    }, [] as Array<{
      name: string;
      error: string;
    }>)

    if (validationErrors.length > 0) {
      const newFieldsErrorsState = validationErrors.reduce((prev, curr) => {
        return {
          ...prev,
          [curr.name]: curr.error
        }
      }, fieldsErrors)
      setFieldsErrors(newFieldsErrorsState)
      return
    }

    const result = await CreateEstablishmentCommand.execute({
      areaCode: fieldsValues[Fields.phone].slice(0, 2),
      category: fieldsValues[Fields.category],
      cep: fieldsValues[Fields.cep],
      cnpj: fieldsValues[Fields.cnpj],
      email: fieldsValues[Fields.email],
      name: fieldsValues[Fields.name],
      number: fieldsValues[Fields.number],
      phone: fieldsValues[Fields.phone].slice(2)
    })

    if (result.isLeft()) {
      alert("Não foi possível criar o estabelecimento agora.")
    } else {
      alert("Estabelecimento cadastrado com sucesso.")
      setFieldsValues(createFields())
      navigation.navigate("Login")
    }
  }

  async function fillFieldByCEPQuery() {
    const cep = fieldsValues[Fields.cep];
    const queryResult = await FindAddressQuery.execute(cep);
    if (queryResult.isRight()) {
      const result = queryResult.value;
      setFieldsValues(values => ({
        ...values,
        [Fields.state]: result.state,
        [Fields.street]: result.address,
        [Fields.neighborhood]: result.district,
        [Fields.city]: result.city
      }))
    } else {
      setFieldsValues(values => ({
        ...values,
        [Fields.state]: "",
        [Fields.street]: "",
        [Fields.neighborhood]: "",
        [Fields.city]: ""
      }))
    }
  }

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
          <ScrollView 
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={{
            alignItems: "center",
            marginTop: 50,
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
              marginTop: 30
            }}>
              <Input
              placeholder="CNPJ"
              keyboardType="numeric"
              icon={Id}
              value={fieldsValues[Fields.cnpj]}
              error={fieldsErrors[Fields.cnpj]}
              mask="99.999.999/9999-99"
              onChangeText={(text: string) => {
                setFieldsValues(values => ({
                  ...values,
                  [Fields.cnpj]: text
                }))
              }}
              />
              <Input
              placeholder="Nome Fantasia"
              icon={User}
              value={fieldsValues[Fields.name]}
              error={fieldsErrors[Fields.name]}
              onChangeText={(text: string) => {
                setFieldsValues(values => ({
                  ...values,
                  [Fields.name]: text
                }))
              }}
              />
              <Picker
              icon={Form}
              error={fieldsErrors[Fields.category]}
              placeholder={
                { label: 'Selecione uma Categoria', value: null }
              }
              textInputProps={fieldsValues[Fields.category] ? {
                style: {
                  color: "white"
                }
              } as any : {}}
              pickerProps={{
                style: {
                  color: "red"
                }
              }}
              style={{
                placeholder: {
                  color: "rgba(255, 255, 255, 0.5)"
                },
                viewContainer: {
                  borderBottomWidth: 2,
                  borderBottomColor: "white",
                  paddingVertical: 3,
                  alignSelf: "center",
                  flex: 1
                }
              }}
              value={fieldsValues[Fields.category]}
              onValueChange={(value) => setFieldsValues(values => ({
                ...values,
                [Fields.category]: value
              }))}
              items={[
                { label: 'Posto de Gasolina', value: 'GAS_STATION' }
              ]}
              />
              <Input
              placeholder="E-mail"
              keyboardType="email-address"
              icon={Mail}
              value={fieldsValues[Fields.email]}
              error={fieldsErrors[Fields.email]}
              onChangeText={(text: string) => {
                setFieldsValues(values => ({
                  ...values,
                  [Fields.email]: text
                }))
              }}
              />
              <Input
              placeholder="Telefone"
              keyboardType="numeric"
              icon={Phone}
              mask="(99) 99999-9999"
              value={fieldsValues[Fields.phone]}
              error={fieldsErrors[Fields.phone]}
              onChangeText={(text: string) => {
                setFieldsValues(values => ({
                  ...values,
                  [Fields.phone]: text
                }))
              }}
              />
              <Input
              placeholder="CEP"
              keyboardType="numeric"
              icon={Loc}
              value={fieldsValues[Fields.cep]}
              error={fieldsErrors[Fields.cep]}
              mask="99.999-999"
              onEndEditing={fillFieldByCEPQuery}
              onChangeText={(text: string) => {
                setFieldsValues(values => ({
                  ...values,
                  [Fields.cep]: text
                }))
              }}
              />
              <Input
              placeholder="Estado"
              icon={State}
              value={fieldsValues[Fields.state]}
              readOnly={true}
              />
              <Input
              placeholder="Cidade"
              icon={City}
              value={fieldsValues[Fields.city]}
              readOnly={true}
              />
              <Input
              placeholder="Bairro"
              icon={Neighborhood}
              value={fieldsValues[Fields.neighborhood]}
              readOnly={true}
              />
              <Input
              placeholder="Rua"
              icon={Street}
              value={fieldsValues[Fields.street]}
              readOnly={true}
              />
              <Input
              placeholder="Número"
              keyboardType="numeric"
              icon={Number}
              value={fieldsValues[Fields.number]}
              error={fieldsErrors[Fields.number]}
              onChangeText={(text: string) => {
                setFieldsValues(values => ({
                  ...values,
                  [Fields.number]: text
                }))
              }}
              />
            </View>
            <LinearGradient
            colors={['#FCFF58', '#FEC500']}
            end={{x: 0.85, y: 0}}
            style={{
              width: "65%",
              marginTop: 15,
              borderRadius: 15,
              paddingVertical: 3,
              marginBottom: 70
            }}
            >
              <Button
              title="Cadastrar"
              color="#2D207C"
              onPress={handleSubmit}
              />
            </LinearGradient>
          </ScrollView>
        </ImageBackground>
        </LinearGradient>
    </SafeAreaView>
  );
};

export default CreateEstablishment;