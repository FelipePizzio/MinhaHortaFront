import { PlantDTO } from '@dtos/PlantDTO'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import {
  Center,
  FlatList,
  HStack,
  Heading,
  Icon,
  Image,
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
    navigation.navigate('plantCatalog')
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
          {plant?.name[0]}
        </Heading>
      </HStack>

      {isLoadingPlant ? (
        <Loading />
      ) : (
        <VStack height={250}>
          <Center>
            {plant?.image_url ? (
              <Image
                source={{
                  uri: plant.image_url,
                }}
                alt="Imagem"
                width={PHOTO_SIZE}
                height={PHOTO_SIZE}
                rounded="md"
                resizeMode="cover"
                marginTop={10}
                marginBottom={5}
              />
            ) : (
              <Skeleton
                width={PHOTO_SIZE}
                height={PHOTO_SIZE}
                startColor="gray.500"
                endColor="gray.400"
                marginTop={10}
                marginBottom={5}
              />
            )}
          </Center>

          <VStack paddingLeft={16}>
            <Text marginBottom={2}>
              Nome científico:{' '}
              <Text fontWeight={'bold'}>
                {plant?.scientific_name.toUpperCase()}
              </Text>
            </Text>
            <Text>Nomes:</Text>
            <FlatList
              marginBottom={2}
              data={plant?.name.sort(function (a, b) {
                if (a < b) return -1
                if (a > b) return 1
                return 0
              })}
              renderItem={({ item }) => (
                <Text fontWeight={'bold'} marginLeft={5}>
                  {item}
                </Text>
              )}
            />
            <Text>Tarefas:</Text>
            <FlatList
              data={plant?.tasks}
              renderItem={({ item }) => (
                <Text fontWeight={'bold'} marginLeft={5}>
                  {item}
                </Text>
              )}
            />
          </VStack>
        </VStack>
      )}
    </VStack>
  )
}
