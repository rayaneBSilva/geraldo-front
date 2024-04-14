import React, {useState} from "react";
import { View } from "react-native";
import { Input, Text } from "@rneui/themed";
import { FontAwesome5, FontAwesome6, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import { establishmentStyles } from "./EstablishmentUpdateStyles";
import { FontAwesome } from "@expo/vector-icons";
import CustomButton from "../../components/button";
import { validateEmail, validateCEP, validateName, formatCEP } from "./EstablishmentUpdateValidations";



const EstablishmentUpdateForm = () =>{
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [nomeFantasiaErrorMessage, setNomeFantasiaErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [telefone, setTelefone] = useState("");
  const [telefoneMessageError, setTelefoneMessageErrror] = useState("");

  const [cep, setCep] = useState("");
  const [cepErrorMessage, setCepErrorMessage] = useState("");

  const [address, setAddress] = useState({
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
    });

    /** Search address by CEP and automatically populates the arrowAddress fields */
    const fetchAddressInfo = async (cep:any) => {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const responseData = await response.text();
        console.log(responseData)
        try {
          const data = JSON.parse(responseData);
          setAddress({
            estado: data.uf || "",
            cidade: data.localidade || "",
            bairro: data.bairro || "",
            rua: data.logradouro || ""
          });
        } catch (error) {
         
        }
      } catch (error) {
        console.error("Erro ao buscar informações do endereço:", error);
      }
    };

    /**Clears the fields in case the CEP code is not complete */
    /**
    * Actions as fields change
   */
    const handleNameChange = (nomeFantasia:any) =>{
      setNomeFantasia(nomeFantasia);
      setNomeFantasiaErrorMessage(validateName(nomeFantasia));
    }

      const handleCepChange = (cep:any) => {
        if (cep === "" || cep.length < 8 ) {
          setAddress({
            estado: "",
            cidade: "",
            bairro: "",
            rua: ""
          });
        } else {
          fetchAddressInfo(cep);
        }
        setCep(cep);
        setCepErrorMessage(validateCEP(cep))
      };

    const handleEmailChange = (text:any) => {
      setEmail(text);
      setEmailErrorMessage(validateEmail(text));
    }

    const handleTelefoneChange = (telefone:any) => {
      setTelefone(telefone);
    }

    /**
     * Using the validation function when the field 
     * loses focus
     */
    const handleNameBlur = () => {
      setNomeFantasiaErrorMessage(validateName(nomeFantasia));
    }

    const handleEmailBlur = ()=> {
      setEmailErrorMessage(validateEmail(email)); 
    }

    const handleCepBlur = ()=> {
      setCepErrorMessage(validateCEP(cep)); 
    }


    return(
        <View style={{width: "85%", flexDirection: "column"}}>
            <Text style={establishmentStyles.text}>Atualização de Estabelecimento</Text>
            <View style={establishmentStyles.containerUpdateForm}>
            <FontAwesome
                name="user"
                size={34}
                color={"white"}
              style={establishmentStyles.icon}
            />
            <Input
                containerStyle={{ width: "90%", marginLeft: 3.5 }}
                style={{ color: "white" }}
                placeholder={"Nome Fantasia"}
                onChangeText={handleNameChange}
                onBlur={handleNameBlur}
                errorMessage={nomeFantasiaErrorMessage}
                errorStyle={{ color: "red", marginLeft: -1 }}
        />
 </View>
 <View style={establishmentStyles.containerUpdateForm}>
            <FontAwesome
                name="envelope"
                size={28}
                color={"white"}
              style={establishmentStyles.icon}
            />
            <Input
                containerStyle={{ width: "90%" }}
                style={{ color: "white" }}
                placeholder={"Email"}
                onChangeText={handleEmailChange}
                onBlur={handleEmailBlur}
                errorMessage={emailErrorMessage}
                errorStyle={{ color: "red", marginLeft: -1 }}
        />
 </View>

 <View style={establishmentStyles.containerUpdateForm}>
            <FontAwesome6
                name="phone-volume"
                size={26}
                color={"white"}
              style={establishmentStyles.icon}
            />
            <Input
                containerStyle={{ width: "90%" }}
                style={{ color: "white" }}
                placeholder={"Telefone"}
                onChangeText={(telefone) => handleTelefoneChange(telefone)}
                errorStyle={{ color: "red", marginLeft: -1 }}
        />
 </View>

 <View style={establishmentStyles.containerUpdateForm}>
            <Fontisto
                name="map-marker-alt"
                size={36}
                color={"white"}
              style={establishmentStyles.icon}
            />
            <Input
                containerStyle={{ width: "90%" }}
                style={{ color: "white" }}
                keyboardType={"numeric"}
                placeholder={"CEP"}
                maxLength={10}
                onChangeText={(cep) => handleCepChange(cep)}
                onBlur={handleCepBlur}
                value={formatCEP(cep)} // name only displayed
                errorMessage={cepErrorMessage}
                errorStyle={{ color: "red", marginLeft: -1 }}
        />
 </View>

 <View style={establishmentStyles.containerUpdateForm}>
            <FontAwesome5
                name="city"
                size={26}
                color={"white"}
              style={establishmentStyles.icon}
            />
            <Input
                containerStyle={{ width: "90%", marginLeft: -5}}
                style={{ color: "white", marginLeft:-1 }}
                placeholder={"Estado"}
                value={address.estado}
                editable={false}
                errorStyle={{ color: "red", marginLeft: -1 }}
        />
 </View>

 <View style={establishmentStyles.containerUpdateForm}>
            <MaterialCommunityIcons
                name="calendar-month"
                size={36}
                color={"white"}
                style={establishmentStyles.iconCity}
            />
            <Input
                containerStyle={{ width: "90%", marginLeft:-9}}
                style={{ color: "white", marginLeft:-1 }}
                placeholder={"Cidade"}
                editable={false}
                value={address.cidade}
                errorStyle={{ color: "red", marginLeft: -1 }}
        />
 </View>

 <View style={establishmentStyles.containerUpdateForm}>
            <FontAwesome6
                name="tree-city"
                size={32}
                color={"white"}
              style={establishmentStyles.iconBairro}
            />
            <Input
                containerStyle={{ width: "90%", marginLeft:-9}}
                style={{ color: "white", marginLeft:-1 }}
                placeholder={"Bairro"}
                value={address.bairro}
                editable={false}
                errorStyle={{ color: "red", marginLeft: -1 }}
        />
 </View>

 <View style={establishmentStyles.containerUpdateForm}>
            <FontAwesome
                name="road"
                size={34}
                color={"white"}
              style={establishmentStyles.iconCity}
            />
            <Input
                containerStyle={{ width: "90%", marginLeft:-9}}
                style={{ color: "white", marginLeft:-1 }}
                placeholder={"Rua"}
                value={address.rua}
                editable={false}
                errorStyle={{ color: "red", marginLeft: -1 }}
        />
 </View>


 <View style={establishmentStyles.containerUpdateForm}>
            <MaterialCommunityIcons
                name="pound"
                size={34}
                color={"white"}
              style={establishmentStyles.iconCity}
            />
            <Input
                containerStyle={{ width: "90%", marginLeft:-9}}
                style={{ color: "white", marginLeft:-1 }}
                placeholder={"Número"}
                errorStyle={{ color: "red", marginLeft: -1 }}
        />
 </View>
          <CustomButton title="Atualizar" style={establishmentStyles.button}/>
          <Text style={establishmentStyles.textButton}>Cancelar</Text>
      </View>

         
    );
};

export default EstablishmentUpdateForm;