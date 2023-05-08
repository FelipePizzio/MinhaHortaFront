import { PlantDTO } from '@dtos/PlantDTO'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import {
  Center,
  HStack,
  Heading,
  Icon,
  Skeleton,
  Text,
  VStack,
  useToast,
} from 'native-base'
import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Loading } from '@components/Loading'

type RouteParamsProps = {
  plantId: string
}

const PHOTO_SIZE = 56

export function PlantInfo() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const route = useRoute()
  const toast = useToast()

  const [isLoadingPlant, setIsLoadingPlant] = useState(false)
  const [plant, setPlant] = useState<PlantDTO>()

  const { plantId } = route.params as RouteParamsProps

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    async function fetchPlantInfo() {
      setIsLoadingPlant(true)
      try {
        const response = await api.get(`/plant/${plantId}`)
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
        setIsLoadingPlant(false)
      }
    }

    fetchPlantInfo()
  }, [plantId])

  return (
    <VStack flex={1}>
      <HStack
        justifyContent="space-between"
        paddingX={8}
        backgroundColor="gray.600"
        paddingTop={12}
        paddingBottom={5}
      >
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <Heading
          color="gray.200"
          marginLeft={1}
          textTransform="capitalize"
          flexShrink={1}
          fontFamily="heading"
        >
          {plant?.name}
        </Heading>
      </HStack>

      {isLoadingPlant ? (
        <Loading />
      ) : (
        <Center>
          <Skeleton
            width={PHOTO_SIZE}
            height={PHOTO_SIZE}
            startColor="gray.500"
            endColor="gray.400"
            marginY={10}
          />
          <VStack>
            <Text marginBottom={5}>Planta: {plant?.name}</Text>
          </VStack>
        </Center>
      )}
    </VStack>
  )
}
