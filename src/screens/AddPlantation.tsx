import {
  Center,
  HStack,
  Heading,
  Icon,
  VStack,
  useToast,
  Select,
  FormControl,
  WarningOutlineIcon,
} from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useState } from 'react'
import { AppError } from '@utils/AppError'
import { api } from '@services/api'
import { useAuth } from '@hooks/useAuth'
import { PlantDTO } from '@dtos/PlantDTO'

type FormDataProps = {
  name: string
  plantId: string
}

const addPlantationSchema = yup.object({
  name: yup.string().required('Informe um nome para a plantação.'),
  plantId: yup.string().required('Informe a planta'),
})

export function AddPlantation() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const [list, setList] = useState<PlantDTO[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(addPlantationSchema) })
  const { user } = useAuth()

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleAddPlantation({ name, plantId }: FormDataProps) {
    try {
      setIsLoading(true)
      await api.post('/plantation', {
        name,
        plantId,
        userId: user.id,
      })
      handleGoBack()
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível criar a plantação. Tente novamente mais tarde.'

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
      async function fetchPlants() {
        try {
          const response = await api.get('/plants')
          setList(response.data.plants)
        } catch (error) {
          const isAppError = error instanceof AppError
          const title = isAppError
            ? error.message
            : 'Não foi possível carregar as plantas'

          toast.show({
            title,
            placement: 'top',
            backgroundColor: 'red.500',
          })
        } finally {
          setIsLoading(false)
        }
      }

      setIsLoading(true)
      fetchPlants()
    }, [toast]),
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

        <Heading
          color="gray.200"
          marginLeft={1}
          textTransform="capitalize"
          flexShrink={1}
          fontFamily="heading"
        >
          Criar Plantação
        </Heading>
      </HStack>

      <Center>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Nome"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="plantId"
          render={({ field: { onChange } }) => (
            <FormControl>
              <Select onValueChange={onChange} placeholder="Escolha a planta">
                {list.map((item) => {
                  return (
                    <Select.Item
                      key={item.id}
                      label={item.name[0]}
                      value={item.id}
                    />
                  )
                })}
              </Select>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.plantId?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          )}
        />

        <Button
          title="Criar plantação"
          onPress={handleSubmit(handleAddPlantation)}
          isLoading={isLoading}
        />
      </Center>
    </VStack>
  )
}
