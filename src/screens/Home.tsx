/* eslint-disable react-hooks/exhaustive-deps */
import { PlantationCard } from '@components/PlantationCard'
import { Group } from '@components/Group'
import { Header } from '@components/Header'
import { PlantationDTO } from '@dtos/PlantationDTO'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { VStack, FlatList, HStack, Heading, Text, useToast } from 'native-base'
import { useCallback, useState } from 'react'
import { Loading } from '@components/Loading'

export function Home() {
  const groups = ['Plantações', 'Tarefas']
  const [list, setList] = useState<PlantationDTO[]>([])
  const [groupSelected, setGroupSelected] = useState('Plantações')
  const [isLoading, setIsLoading] = useState(true)

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const toast = useToast()

  function handleOpen() {
    navigation.navigate('exercise')
  }

  async function fetchPlantation() {
    try {
      const response = await api.get('/plantations')
      setList(response.data)
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

  useFocusEffect(
    useCallback(() => {
      fetchPlantation()
      console.log('list', list)
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
            <Text color="gray.200" fontSize="sm">
              {list.length}
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
              <>
                <Text>a</Text>
                <PlantationCard data={item} onPress={handleOpen} />
              </>
            )}
          />
        </VStack>
      )}
    </VStack>
  )
}
