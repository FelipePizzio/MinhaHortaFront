import { HStack, Heading, Image, Text, VStack, Icon } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { PlantationDTO } from '@dtos/PlantationDTO'

type Props = TouchableOpacityProps & {
  data: PlantationDTO
}

export function PlantationCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        backgroundColor="gray.500"
        alignItems="center"
        padding={2}
        paddingRight={4}
        rounded="md"
        marginBottom={3}
      >
        <Image
          source={{
            uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.biologianet.com%2Fbiodiversidade%2Fcapivara.htm&psig=AOvVaw3_mskWluFpJXdAWf92SIuG&ust=1681736889571000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKjEi6G8rv4CFQAAAAAdAAAAABAE',
          }}
          alt="Imagem"
          width={16}
          height={16}
          rounded="md"
          marginRight={4}
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading fontSize="lg" color="white" fontFamily="heading">
            CAPIVARA
          </Heading>
          <Text fontSize="sm" color="gray.200" marginTop={1} numberOfLines={2}>
            texto
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  )
}
