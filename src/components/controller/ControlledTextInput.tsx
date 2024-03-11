import React from 'react';
import { Input, InputProps } from '@rneui/themed';
import { Controller, UseControllerProps, FieldValues } from 'react-hook-form';
import { View } from 'react-native';
import IconTypes from '@expo/vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';

type ExtendedInputProps = InputProps & {
    type?: string;
    iconName?: keyof typeof IconTypes.glyphMap;
};

function ControlledTextInput<FormType extends FieldValues>({ control, rules, name,  ...textInputProps }: UseControllerProps<FormType> & ExtendedInputProps) {
    const { type, iconName, ...restProps } = textInputProps;

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field, fieldState }) => (
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    {iconName && (
                        <FontAwesome
                            name={iconName}
                            size={24}
                            color="white"
                            style={{ marginRight: 10 }}
                        />
                    )}
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