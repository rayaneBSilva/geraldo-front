import React from 'react'
import { Controller } from 'react-hook-form'
import { TextInput } from 'react-native'

function ControlledTextInput( {control, rules, name, ...textInputProps} ) {
  return (
    <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field}) => (
            <TextInput
                {...textInputProps}
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
            />
        ) }
    >
        
    </Controller>

  )
}

export default ControlledTextInput