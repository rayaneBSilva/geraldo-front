import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import { SvgProps } from "react-native-svg";

type InputProps = TextInputProps & {
    icon: React.FC<SvgProps>
    error?: string;
    mask?: string;
  }
  
const Input = ({
  "icon":Icon,
  onChange,
  error,
  mask,
  ...props
}: InputProps) => {

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
      {
        mask ? (
          <MaskedTextInput
          {...props}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          onChangeText={(_, text) => {
            if(props.onChangeText) props.onChangeText(text)
          }}
          mask={mask}
          style={{
            fontSize: 15,
            flex: 1,
            borderBottomColor: "white",
            borderBottomWidth: 2,
            paddingVertical: 3,
            color: "white",
          }}
        />
        ) : (
          <TextInput
            {...props}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            onChangeText={text => {
              if(props.onChangeText) props.onChangeText(text)
            }}
            style={{
              fontSize: 15,
              flex: 1,
              borderBottomColor: "white",
              borderBottomWidth: 2,
              paddingVertical: 3,
              color: "white",
            }}
          />
        )
      }
    </View>
    <Text style={{
      color: "red",
      paddingVertical: 10,
      alignSelf: "flex-start"
    }}>{ error }</Text>
  </View>
  )
}

export { Input };