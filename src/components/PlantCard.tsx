import { PlantDTO } from '@dtos/PlantDTO'
import {
  HStack,
  Heading,
  Icon,
  Image,
  Skeleton,
  Text,
  VStack,
} from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Entypo } from '@expo/vector-icons'

type Props = TouchableOpacityProps & {
  data: PlantDTO
}

const PHOTO_SIZE = 20

export function PlantCard({ data, ...rest }: Props) {
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
        {data.image_url ? (
          <Image
            source={{
              uri: data.image_url,
            }}
            alt="Imagem"
            width={PHOTO_SIZE}
            height={PHOTO_SIZE}
            rounded="md"
            marginRight={4}
            resizeMode="cover"
          />
        ) : (
          <Skeleton
            width={PHOTO_SIZE}
            height={PHOTO_SIZE}
            startColor="gray.500"
            endColor="gray.400"
            marginRight={4}
          />
        )}

        <VStack flex={1}>
          <Heading fontSize="lg" color="white" fontFamily="heading">
            {data.name[0]}
          </Heading>
          <Text fontSize="sm" color="gray.200" marginTop={1} numberOfLines={2}>
            {data?.scientific_name}
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  )
}
