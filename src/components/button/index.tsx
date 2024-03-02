import React from "react";
import { View } from "react-native";
import { Button } from "@rneui/themed";

interface CustomButtonProps {
  title: string;
  //   onPress: () => void;
}

// const CustomButton = ({ title, onPress }) => {
const CustomButton: React.FC<CustomButtonProps> = ({ title }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Button
        title={title}
        //   onPress={onPress}
        loading={false}
        loadingProps={{ size: "small", color: "black" }}
        buttonStyle={{
          backgroundColor: "yellow",
          borderRadius: 20,
        }}
        titleStyle={{ fontWeight: "bold", fontSize: 23, color: "black" }}
        containerStyle={{
          marginHorizontal: 50,
          height: 50,
          width: "85%",
          marginVertical: 10,
          marginTop: 60,
        }}
      />
    </View>
  );
};

export default CustomButton;
