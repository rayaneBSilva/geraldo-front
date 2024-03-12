import React from "react";
import { Text, View } from "react-native";
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';
import { SvgProps } from "react-native-svg";

type PickerProps = PickerSelectProps & {
  icon: React.FC<SvgProps>
  error?: string;
}

const Picker = ({
  "icon":Icon,
  error,
  ...props
}: PickerProps) => {
  return (
    <View
    style={{
      width: "65%",
      alignItems: "center"
    }}
    >
    <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
    >
      <Icon
      width={25}
      height={25}
      style={{
        padding: 0,
        margin: 0,
        position: "relative",
        top: 2,
        marginRight: 10
      }}
      />
      <RNPickerSelect
      {...props}
      />
    </View>
    <Text style={{
      color: "red",
      paddingVertical: 10,
      alignSelf: "flex-start"
    }}>{ error }</Text>
  </View>
  )
}

export { Picker };