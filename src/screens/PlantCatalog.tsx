import { Loading } from '@components/Loading'
import { PlantCard } from '@components/PlantCard'
import { PlantDTO } from '@dtos/PlantDTO'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import {
  FlatList,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  useToast,
} from 'native-base'
import { useCallback, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

export function PlantCatalog() {
  const [list, setList] = useState<PlantDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const toast = useToast()

  function handleOpen(plantId: string) {
    navigation.navigate('plantInfo', { plantId })
  }

  function handleGoBack() {
    navigation.goBack()
  }

  useFocusEffect(
    useCallback(() => {
      async function fetchPlants() {
        try {
          const response = await api.get('/plants')
          setList(response.data.plants)
        } catch (error) {
          const isAppError = error instanceof AppError
          const title = isAppError
            ? error.message
            : 'Não foi possível carregar o catalogo de plantas'

          toast.show({
            title,
            placement: 'top',
            backgroundColor: 'red.500',
          })
        } finally {
          setIsLoading(false)
        }
      }

      fetchPlants()
    }, []),
  )

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
      </HStack>

      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} paddingX={8}>
          <HStack justifyContent="space-between" marginY={5}>
            <Heading fontFamily="heading">Catalogo de Plantas</Heading>
            <Text color="gray.300" fontSize="sm">
              {list?.length || 0}
            </Text>
          </HStack>

          <FlatList
            data={list}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
              paddingBottom: 20,
            }}
            renderItem={({ item }) => (
              <PlantCard data={item} onPress={() => handleOpen(item.id)} />
            )}
          />
        </VStack>
      )}
    </VStack>
  )
}
