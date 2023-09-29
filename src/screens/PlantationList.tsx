import {
  FlatList,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  useToast,
} from 'native-base'
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { PlantationCard } from '@components/PlantationCard'
import { PlantationDTO } from '@dtos/PlantationDTO'
import { useCallback, useState } from 'react'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { Loading } from '@components/Loading'

export function PlantationList() {
  const [list, setList] = useState<PlantationDTO[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const toast = useToast()

  useFocusEffect(
    useCallback(() => {
      async function fetchPlantations() {
        try {
          const response = await api.get('/plantations')
          setList(response.data.plantations)
        } catch (error) {
          const isAppError = error instanceof AppError
          const title = isAppError
            ? error.message
            : 'Não foi possível carregar as plantações'

          toast.show({
            title,
            placement: 'top',
            backgroundColor: 'red.500',
          })
        } finally {
          setIsLoading(false)
        }
      }

      fetchPlantations()
    }, []),
  )

  function handleAddPlantation() {
    navigation.navigate('addPlantation')
  }

  function handleOpen(plantationId: string) {
    navigation.navigate('plantationInfo', { plantationId })
  }

  return isLoading ? (
    <Loading />
  ) : (
    <VStack flex={1} paddingX={8}>
      <HStack justifyContent="space-between" marginBottom={5}>
        <Heading fontFamily="heading">Plantações</Heading>
        <Text color="gray.300" fontSize="sm">
          {list?.length || 0}
        </Text>
        <TouchableOpacity onPress={handleAddPlantation}>
          <Icon
            as={MaterialIcons}
            name="add-circle-outline"
            color="gray.300"
            size={7}
          />
        </TouchableOpacity>
      </HStack>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{
          paddingBottom: 20,
        }}
        renderItem={({ item }) => (
          <PlantationCard data={item} onPress={() => handleOpen(item.id)} />
        )}
      />
    </VStack>
  )
}
