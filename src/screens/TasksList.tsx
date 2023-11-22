import { Loading } from '@components/Loading'
import { TaskCard } from '@components/TaskCard'
import { TaskDTO } from '@dtos/TaskDTO'
import { useFocusEffect } from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import moment from 'moment'
import { FlatList, HStack, Heading, Text, VStack, useToast } from 'native-base'
import { useCallback, useState } from 'react'
import { OneSignal } from 'react-native-onesignal'

export function TasksList() {
  const [list, setList] = useState<TaskDTO[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [openTasks, setOpenTask] = useState<number>(0)

  const date = moment()
  const toast = useToast()

  function handleTagOpenTask(isCompleted: boolean) {
    const open = isCompleted ? openTasks - 1 : openTasks + 1
    OneSignal.User.addTag('open_tasks', open.toString())
    setOpenTask(open)
  }

  useFocusEffect(
    useCallback(() => {
      async function fecthTasks() {
        let open = 0
        try {
          const response = await api.get('/tasks')
          setList(response.data.tasks)
          response.data.tasks.forEach((task: TaskDTO) => {
            if (!task.completed) open = +1
          })
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
          setOpenTask(open)
          OneSignal.User.addTag('open_tasks', open.toFixed())
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
        <Heading fontFamily="heading">
          Tarefas - {date.format('DD/MM/YY')}
        </Heading>
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
          <TaskCard data={item} handleTagOpenTask={handleTagOpenTask} />
        )}
      />
    </VStack>
  )
}
