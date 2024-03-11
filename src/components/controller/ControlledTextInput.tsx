import { Input, InputProps } from '@rneui/themed'
import React from 'react'
import { Controller, UseControllerProps, FieldValues } from 'react-hook-form'

// Definindo um novo tipo para adicionar a propriedade 'types'
type ExtendedInputProps = InputProps & {
    type?: string; 
};

function ControlledTextInput<FormType extends FieldValues>({ control, rules, name,  ...textInputProps }: UseControllerProps<FormType> & ExtendedInputProps) {
    const { type, ...restProps } = textInputProps;

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field, fieldState }) => (
                <Input
                    {...restProps} // Passando todas as outras props
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    errorMessage={fieldState.error?.message}
                    keyboardType={type === 'number' ? 'numeric' : 'default'} // Utilizando a propriedade 'type'
                />
            )}
        />
    )
}

export default ControlledTextInput
