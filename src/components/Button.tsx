import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base'

type Props = IButtonProps & {
  title: string
  variant?: 'solid' | 'outline'
}

export function Button({ title, variant = 'solid', ...rest }: Props) {
  return (
    <NativeBaseButton
      width="full"
      height={14}
      backgroundColor={variant === 'outline' ? 'transparent' : 'green.700'}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor={variant === 'outline' ? 'white' : 'green.500'}
      rounded="sm"
      _pressed={{
        backgroundColor: variant === 'outline' ? 'gray.100' : 'green.500',
      }}
      {...rest}
    >
      <Text color="white" fontFamily="heading" fontSize="sm">
        {title}
      </Text>
    </NativeBaseButton>
  )
}
