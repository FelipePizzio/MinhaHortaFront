import {
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  Icon,
  Skeleton,
  useToast,
} from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { PlantationDTO } from '@dtos/PlantationDTO'
import { useEffect, useState } from 'react'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { PlantDTO } from '@dtos/PlantDTO'
import { Loading } from './Loading'

type Props = TouchableOpacityProps & {
  data: PlantationDTO
}

const PHOTO_SIZE = 20

export function PlantationCard({ data, ...rest }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [plant, setPlant] = useState<PlantDTO>()

  const toast = useToast()

  useEffect(() => {
    async function fetchPlantInfo() {
      try {
        const response = await api.get(`/plant/${data?.plantId}`)
        setPlant(response.data.plant)
      } catch (error) {
        const isAppError = error instanceof AppError
        const title = isAppError
          ? error.message
          : 'Não foi possível carregar a planta'

        toast.show({
          title,
          placement: 'top',
          backgroundColor: 'red.500',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlantInfo()
  }, [])

  return (
    <TouchableOpacity {...rest}>
      {isLoading ? (
        <Loading />
      ) : (
        <HStack
          backgroundColor="gray.500"
          alignItems="center"
          padding={2}
          paddingRight={4}
          rounded="md"
          marginBottom={3}
        >
          {data.image ? (
            <Image
              source={{
                uri: data.image,
              }}
              alt="Imagem"
              width={PHOTO_SIZE}
              height={PHOTO_SIZE}
              rounded="md"
              marginRight={4}
              resizeMode="contain"
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
              {data.name}
            </Heading>
            <Text
              fontSize="sm"
              color="gray.200"
              marginTop={1}
              numberOfLines={2}
            >
              {plant?.name}
            </Text>
          </VStack>

          <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
        </HStack>
      )}
    </TouchableOpacity>
  )
}
