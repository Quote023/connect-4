import { FormControl, FormHelperText, FormLabel, Input, InputProps } from '@chakra-ui/react';
import React from 'react';

type FormInputProps = InputProps & {
  label: React.ReactNode,
  helperText?: React.ReactNode;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(({ label, helperText, ...props }, ref) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input ref={ref} {...props} />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
})

export default FormInput;