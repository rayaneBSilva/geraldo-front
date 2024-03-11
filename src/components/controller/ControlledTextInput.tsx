import React from 'react'
import { Controller, UseControllerProps, FieldValues } from 'react-hook-form'
import { TextInput, TextInputProps } from 'react-native'

function ControlledTextInput<FormType extends FieldValues>({ control, rules, name, ...textInputProps }: UseControllerProps<FormType> & TextInputProps) {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field }) => (
                <TextInput
                    {...textInputProps}
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                />
            )}
        />
    )
}

export default ControlledTextInput
