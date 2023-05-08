/* eslint-disable react-hooks/exhaustive-deps */
import { PlantationCard } from '@components/PlantationCard'
import { Group } from '@components/Group'
import { Header } from '@components/Header'
import { PlantationDTO } from '@dtos/PlantationDTO'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import {
  VStack,
  FlatList,
  HStack,
  Heading,
  Text,
  useToast,
  Icon,
} from 'native-base'
import { useCallback, useState } from 'react'
import { Loading } from '@components/Loading'
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export function Home() {
  const groups = ['Plantações'] // , 'Tarefas'

  const [list, setList] = useState<PlantationDTO[]>([])
  const [groupSelected, setGroupSelected] = useState('Plantações')
  const [isLoading, setIsLoading] = useState(true)

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const toast = useToast()

  function handleOpen(plantationId: string) {
    navigation.navigate('plantationInfo', { plantationId })
  }

  function handleAddPlantation() {
    navigation.navigate('addPlantation')
  }

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

  return (
    <VStack flex={1}>
      <Header isHome />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          paddingX: 8,
        }}
        marginY={10}
        maxHeight={10}
        minHeight={10}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toUpperCase() === item.toUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
      />
      {isLoading ? (
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
      )}
    </VStack>
  )
}
