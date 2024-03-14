import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MainTitle = ({ title }: { title: string }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#FFF",
    marginTop: 100,
    marginBottom: 45,
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MainTitle;
