import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
    <View
      style={
        style
          ? [style, { alignItems: "center", marginBottom: -100 }]
          : { alignItems: "center", marginBottom: -100 }
      }
    >
      <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
        <LinearGradient
          colors={["#FCFF58", "#FEC500"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.container}
        >
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    height: 50,
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  text: {
    color: "#2D207C",
    fontWeight: "500",
    fontSize: 23,
  },
});

export default CustomButton;
