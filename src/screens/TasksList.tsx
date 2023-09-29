import { Loading } from '@components/Loading'
import { TaskCard } from '@components/TaskCard'
import { TaskDTO } from '@dtos/TaskDTO'
import { useFocusEffect } from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { FlatList, HStack, Heading, Text, VStack, useToast } from 'native-base'
import { useCallback, useState } from 'react'

export function TasksList() {
  const [list, setList] = useState<TaskDTO[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const toast = useToast()

  useFocusEffect(
    useCallback(() => {
      async function fecthTasks() {
        try {
          const response = await api.get('/tasks')
          setList(response.data.tasks)
        } catch (error) {
          const isAppError = error instanceof AppError
          const title = isAppError
            ? error.message
            : 'Não foi possível carregar as tarefas'

          toast.show({
            title,
            placement: 'top',
            backgroundColor: 'red.500',
          })
        } finally {
          setIsLoading(false)
        }
      }

      fecthTasks()
    }, []),
  )

  return isLoading ? (
    <Loading />
  ) : (
    <VStack flex={1} paddingX={8}>
      <HStack justifyContent="space-between" marginBottom={5}>
        <Heading fontFamily="heading">Tarefas</Heading>
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
        renderItem={({ item }) => <TaskCard data={item} />}
      />
    </VStack>
  )
}
