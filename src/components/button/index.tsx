import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <LinearGradient
        colors={["#FCFF58", "#FEC500"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
          <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    height: 50,
    width: "85%",
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  text: {
    position: "absolute",
    color: "black",
    fontWeight: "500",
    fontSize: 23,
  },
});

export default CustomButton;
