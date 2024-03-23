import React from "react";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { DateTimePickerProps, default as NativeDatePicker } from 'react-native-modal-datetime-picker';
import { SvgProps } from "react-native-svg";

type InputProps = DateTimePickerProps & {
    icon: React.FC<SvgProps>;
    error?: string;
    containerStyle?: StyleProp<ViewStyle>;
    iconStyle?: StyleProp<ViewStyle>;
    errorMessageStyle?: StyleProp<TextStyle>;
    inputStyle?: StyleProp<TextStyle>;
    onPress?: () => void;
}

export const DatePicker = ({
    "icon":Icon,
    error,
    containerStyle,
    iconStyle,
    errorMessageStyle,
    inputStyle,
    onPress,
    ...props
  }: InputProps) => {

    return (
        <View
        onTouchStart={onPress}
        style={containerStyle && {
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
            style={iconStyle && {
              padding: 0,
              margin: 0,
              position: "relative",
              top: 2,
              marginRight: 10
            }}
            />
            <NativeDatePicker
            { ...props }
            mode="date"
            />
            <TextInput
            style={inputStyle}
            readOnly={true}
            value={props.date?.toLocaleDateString("pt-BR")}
            />
        </View>
        <Text style={errorMessageStyle && {
          color: "red",
          paddingVertical: 10,
          alignSelf: "flex-start"
        }}>{ error }</Text>
      </View>
    )
}