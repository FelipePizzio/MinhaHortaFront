import { Loading } from '@components/Loading'
import { PlantCard } from '@components/PlantCard'
import { PlantDTO } from '@dtos/PlantDTO'
import { useNavigation } from '@react-navigation/native'
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
import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

export function PlantCatalog() {
  const [list, setList] = useState<PlantDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const [total, setTotal] = useState()

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const toast = useToast()

  function handleOpen(plantId: string) {
    navigation.navigate('plantInfo', { plantId })
  }

  function handleGoBack() {
    navigation.goBack()
  }

  function renderFooter() {
    if (totalPages && page <= totalPages) return <Loading />
    return null
  }

  async function fetchPlants() {
    try {
      const response = await api.get(`/plants/${page}`)
      setList([...list, ...response.data.plants])
      setTotalPages(response.data.totalPages)
      setTotal(response.data.totalResults)
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
      setPage(page + 1)
    }
  }

  useEffect(() => {
    fetchPlants()
  }, [])

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
              {total}
            </Text>
          </HStack>

          <FlatList
            data={list}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
              paddingBottom: 20,
            }}
            onEndReached={fetchPlants}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
            renderItem={({ item }) => (
              <PlantCard data={item} onPress={() => handleOpen(item.id)} />
            )}
          />
        </VStack>
      )}
    </VStack>
  )
}
