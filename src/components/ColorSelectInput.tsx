import { Box, HStack, RadioGroupProps, useRadio, useRadioGroup, UseRadioProps } from '@chakra-ui/react';
import React from 'react';

type ColorSelectInputProps = Omit<RadioGroupProps, "children"> & {
  colors: string[]
}


const ColorSelectInput = React.forwardRef<HTMLDivElement, ColorSelectInputProps>(({ colors, ...props }, ref) => {
  const { getRootProps, getRadioProps } = useRadioGroup(props)

  return (
    <HStack ref={ref} {...getRootProps()}>
      {colors.map((c,i) => {
        return (
        <ColorRadio key={c + i} color={c} {...getRadioProps({ value: c })}></ColorRadio>
      )})}
    </HStack >
  )
})

const ColorRadio: React.FC<UseRadioProps & {color: string}> = ({color,...props}) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        bg={color}
        boxShadow='md'
        filter="grayscale(10  0%)"
        _checked={{
          bg: color,
          color: 'white',
          filter: "unset",
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      />
    </Box>
  )
}

export default ColorSelectInput;