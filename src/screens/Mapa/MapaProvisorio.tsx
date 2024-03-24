import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import UpdateMileageModal from "../../components/updateMileageModal";
import { useRoute } from "@react-navigation/native"; // Importe o useRoute


export default function App() {
  const [modalVisible, setModalVisible] = useState<boolean>(true); 

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <UpdateMileageModal isVisible={modalVisible} onClose={closeModal} idVeiculo="1" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});