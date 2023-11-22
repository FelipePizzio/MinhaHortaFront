import { PlantationDTO } from '@dtos/PlantationDTO'
import { TaskDTO } from '@dtos/TaskDTO'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { Checkbox, HStack, Text, VStack, useToast } from 'native-base'
import { useEffect, useState } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Loading } from './Loading'

type Props = TouchableOpacityProps & {
  data: TaskDTO
  handleTagOpenTask: (arg0: boolean) => void
}

export function TaskCard({ data, handleTagOpenTask, ...rest }: Props) {
  const [isCompleted, setIsCompleted] = useState<boolean>(data.completed)
  const [isLoading, setIsLoading] = useState(true)
  const [plantation, setPlantation] = useState<PlantationDTO>()

  const toast = useToast()

  useEffect(() => {
    async function getPlantationName() {
      try {
        const response = await api.get(`/plantation/${data?.plantationId}`)
        setPlantation(response.data.plantation)
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

    getPlantationName()
  }, [])

  async function handleCompleteTask() {
    try {
      await api.put('/task', {
        taskId: data.id,
        name: data.name,
        userId: data.userId,
        plantationId: data.plantationId,
        completed: !isCompleted,
      })
      setIsCompleted(!isCompleted)
      handleTagOpenTask(!isCompleted)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível concluir a tarefa'

      toast.show({
        title,
        placement: 'top',
        backgroundColor: 'red.500',
      })
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <HStack
      alignItems="center"
      padding={2}
      paddingRight={4}
      marginBottom={3}
      onTouchEnd={handleCompleteTask}
    >
      <Checkbox
        value={data.name}
        isChecked={isCompleted}
        onChange={handleCompleteTask}
        marginRight={5}
        aria-label={data.name}
      />
      <TouchableOpacity {...rest}>
        <VStack>
          <Text>Plantação: {plantation?.name}</Text>
          <Text>
            {data.name}: {plantation?.water} ml
          </Text>
        </VStack>
      </TouchableOpacity>
    </HStack>
  )
}
