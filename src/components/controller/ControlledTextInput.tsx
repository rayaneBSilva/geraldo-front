import React from 'react';
import { Input, InputProps } from '@rneui/themed';
import { Controller, UseControllerProps, FieldValues } from 'react-hook-form';
import { View } from 'react-native';
import IconTypes from '@expo/vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

type Icon = keyof typeof IconTypes.glyphMap | keyof typeof SimpleLineIcons.glyphMap 

type ExtendedInputProps = InputProps & {
    type?: string;
    iconName?: Icon
};

function isFontAwesomeIcon(iconName: Icon): iconName is keyof typeof IconTypes.glyphMap {
    return iconName in IconTypes.glyphMap;
}

// TO-DO Fix Inputs Size
// TO-DO Mensagem de Cadastro realizado com sucesso!
function ControlledTextInput<FormType extends FieldValues>({ control, rules, name,  ...textInputProps }: UseControllerProps<FormType> & ExtendedInputProps) {
    const { type, iconName, ...restProps } = textInputProps;

    const renderIcon = (iconName: Icon) => {
        if (isFontAwesomeIcon(iconName)) {
            return (
                <FontAwesome
                    name={iconName as keyof typeof IconTypes.glyphMap}
                    size={24}
                    color="white"
                    style={{ marginRight: 10 }}
                />
            );
        } else {
            return (
                <SimpleLineIcons
                    name={iconName as keyof typeof SimpleLineIcons.glyphMap}
                    size={24}
                    color="white"
                    style={{ marginRight: 10 }}
                />
            );
        }
    };

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field, fieldState }) => (
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    {iconName && renderIcon(iconName)}
                    <Input
                        {...restProps}
                        value={field.value}
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                        errorMessage={fieldState.error?.message}
                        keyboardType={type === 'number' ? 'numeric' : 'default'}
                    />
                </View>
            )}
        />
    );
}

export default ControlledTextInput;