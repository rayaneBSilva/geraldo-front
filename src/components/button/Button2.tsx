import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
export type ButtonProps = {
  title: string;
  onPress: () => void;
};

export const Button2 = ({ title, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <LinearGradient
        colors={["#FCFF58", "#FEC500"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradiant}
      />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button2;

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 15,
    width: "260%",
    alignItems: "center",
  },
  gradiant: {
    borderRadius: 15,
    flex: 1,
    width: "100%",
    height: "220%",
    position: "absolute",
    
  },
  text: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 18,
  },
});
