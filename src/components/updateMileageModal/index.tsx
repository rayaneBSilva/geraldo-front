import React, { useState } from "react";
import { GestureResponderEvent, StyleSheet, Text, TextInput, View } from "react-native";
import axios from "axios";
import Quilometros from '../../../assets/icons/quilometragem.svg';
import { Button2 } from "../button/Button2";
import { Modal } from "../modal/Modal";
import ServiceBase from "../../services/ServiceBase";
import { TouchableOpacity } from "react-native";

interface UpdateMileageModalProps {
  isVisible: boolean
  onClose: () => void
  idVeiculo: number
  token: string
}

const UpdateMileageModal: React.FC<UpdateMileageModalProps> = ({ isVisible, onClose, idVeiculo, token }) => {
  const [mileageValue, setMileageValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const serviceBaseInstance = new ServiceBase();

  const handleSignUp = async () => {
    const inputMileage = parseInt(mileageValue);
    
    try {
      const response = await serviceBaseInstance.patch({ mileage: inputMileage }, `kilometers/${idVeiculo}`, token);
      console.log("Resposta da API:", response.data);
      onClose(); 
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
        console.error("Erro ao atualizar quilometragem:", error.response.data);
      } else if (error.request) {
        console.error("Não foi recebida resposta do servidor:", error.request);
      } else {
        console.error("Erro ao enviar requisição:", error.message);
      }
    }
  };

  return (
    <Modal isVisible={isVisible}>
      <Modal.Container>
        <View style={styles.modal}>
          <Modal.Header title="Atualizar Quilometragem" />
          <Modal.Body>
            <Text style={styles.text}>Mantenha os km rodados atualizados!</Text>
            <View style={styles.row}>
              <Quilometros width={45} height={45} color={"blue"} />
              <TextInput
                style={styles.input}
                placeholder="Quilometragem Atual"
                keyboardType="numeric"
                value={mileageValue}
                onChangeText={(text) => {
                  setMileageValue(text);
                  setErrorMessage("");
                }}
              />
            </View>
            {errorMessage !== "" && (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}
          </Modal.Body>
          <Modal.Footer>
            <View style={styles.center}>
              <Button2 title="Atualizar" onPress={handleSignUp} />
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.textButton}>
                  {"Deixar para depois"}</Text>
              </TouchableOpacity>
            </View>
          </Modal.Footer>
        </View>
      </Modal.Container>
    </Modal>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    paddingTop: 10,
    paddingVertical: 20,
  },
  textButton: {
    fontSize: 13,
    fontWeight: "400",
    textAlign: "center",
    paddingTop: 15,
    paddingVertical: 20,
    textDecorationLine: "underline",
  },
  button: {
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 15,
    width: 50,
    height: 40,
    alignItems: "center",
  },
  input: {
    paddingTop: 10,
    borderColor: "grey",
    width: "80%",
    borderBottomWidth: 2,
  },
  modal: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
  },
});

export default UpdateMileageModal;
