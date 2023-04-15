import { Image, IImageProps } from 'native-base'

type Props = IImageProps & {
  size: number
  alt: string
}

export function UserPhoto({ size, alt, ...rest }: Props) {
  return (
    <Image
      width={size}
      height={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      alt={alt}
      {...rest}
    />
  )
}
