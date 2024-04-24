import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@rneui/themed";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  style,
}) => {
  return (
    <View style={{ alignItems: "center" }}>
      <LinearGradient
        colors={["#FCFF58", "#FEC500"]}
        end={{ x: 0.85, y: 0 }}
        style={[styles.container, style]}
      >
        <Button
          title={title}
          type="clear"
          onPress={onPress}
          buttonStyle={styles.buttonContainer}
          titleStyle={styles.text}
          
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "65%",
    marginTop: 50,
    borderRadius: 15,
    paddingVertical: 3,
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderRadius: 0,
    width: "100%",
  },
  text: {
    color: "#2D207C",
    fontSize: 18,
  },
});

export default CustomButton;
