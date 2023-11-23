import {
  Center,
  FlatList,
  FormControl,
  HStack,
  Heading,
  Icon,
  Image,
  Select,
  Skeleton,
  Text,
  VStack,
  WarningOutlineIcon,
  useToast,
} from 'native-base'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { useEffect, useState } from 'react'
import { AppError } from '@utils/AppError'
import { api } from '@services/api'
import { PlantationDTO } from '@dtos/PlantationDTO'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Loading } from '@components/Loading'
import { PlantDTO } from '@dtos/PlantDTO'
import { Button } from '@components/Button'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '@components/Input'
import moment from 'moment'

type RouteParamsProps = {
  plantationId: string
}

type FormDataProps = {
  name: string
  plantId: string
}

const updatePlantationSchema = yup.object({
  name: yup.string().required('Informe um nome para a plantação.'),
  plantId: yup.string().required('Informe a planta'),
})

const PHOTO_SIZE = 56

export function PlantationInfo() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const route = useRoute()
  const toast = useToast()

  const [isLoadingPlantation, setIsLoadingPlantation] = useState(true)
  const [isLoadingPlant, setIsLoadingPlant] = useState(false)
  const [isLoadingListPlants, setIsLoadingListPlants] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)

  const [enableEdit, setEnableEdit] = useState(false)
  const [plantation, setPlantation] = useState<PlantationDTO>()
  const [plant, setPlant] = useState<PlantDTO>()
  const [listPlants, setListPlants] = useState<PlantDTO[]>([])

  let date = moment()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(updatePlantationSchema) })

  const { plantationId } = route.params as RouteParamsProps

  async function fetchPlants() {
    setIsLoadingListPlants(true)
    try {
      const response = await api.get('/plants')
      setListPlants(response.data.plants)
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
      setIsLoadingListPlants(false)
    }
  }

  function handleGoBack() {
    navigation.goBack()
  }

  function handleEnableEdit() {
    setEnableEdit(!enableEdit)
  }

  async function handleUpdatePlantation({ name, plantId }: FormDataProps) {
    setIsLoadingUpdate(true)
    try {
      await api.put('/plantation', {
        plantationId,
        name,
        plantId,
        image: plantation?.image,
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível atualizar a plantação'

      toast.show({
        title,
        placement: 'top',
        backgroundColor: 'red.500',
      })
    } finally {
      setIsLoadingUpdate(false)
      setEnableEdit(false)
    }
  }

  useEffect(() => {
    async function fetchPlantationInfo() {
      try {
        const response = await api.get(`/plantation/${plantationId}`)
        setPlantation(response.data.plantation)
        setIsLoadingPlantation(false)
      } catch (error) {
        const isAppError = error instanceof AppError
        const title = isAppError
          ? error.message
          : 'Não foi possível carregar a plantação'

        toast.show({
          title,
          placement: 'top',
          backgroundColor: 'red.500',
        })
      }
    }

    if (!isLoadingUpdate) {
      fetchPlantationInfo()
      date = moment(plantation?.created_at)
    }
  }, [plantationId, isLoadingUpdate])

  useEffect(() => {
    async function fetchPlantInfo() {
      setIsLoadingPlant(true)
      try {
        const response = await api.get(`/plant/${plantation?.plantId}`)
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

    if (!isLoadingPlantation) {
      fetchPlantInfo()
    }
  }, [isLoadingPlantation])

  /**
  useEffect(() => {
    setEnableEdit(false)
  }, [])

  useEffect(() => {
    if (enableEdit) {
      fetchPlants()
    }
  }, [enableEdit])
  */

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
          {plantation?.name}
        </Heading>
      </HStack>

      {isLoadingPlant ? (
        <Loading />
      ) : (
        <VStack height={250}>
          <Center>
            {plantation?.image ? (
              <Image
                source={{
                  uri: plantation.image,
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
              />
            )}
          </Center>

          <VStack paddingLeft={16}>
            {enableEdit && !isLoadingListPlants ? (
              <VStack>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Nome"
                      onChangeText={onChange}
                      value={value}
                      defaultValue={plantation?.name}
                      errorMessage={errors.name?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="plantId"
                  render={({ field: { onChange } }) => (
                    <FormControl>
                      <Select
                        placeholder={plant?.name[0]}
                        onValueChange={onChange}
                      >
                        {listPlants.map((item) => {
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
              </VStack>
            ) : (
              <VStack>
                <Text marginBottom={2}>
                  Planta: <Text fontWeight={'bold'}> {plant?.name[0]} </Text>
                </Text>
                <Text marginBottom={2}>
                  Dia plantado:
                  <Text fontWeight={'bold'}> {date.format('DD/MM/YY')} </Text>
                </Text>
                {plant && plant.name.length > 1 && (
                  <>
                    <Text>Conhecida por:</Text>
                    <FlatList
                      marginBottom={2}
                      data={plant?.name
                        .slice(1, plant.name.length)
                        .sort(function (a, b) {
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
                  </>
                )}

                <Text>Regar a cada {plant?.water_frequency} dias</Text>
              </VStack>
            )}
          </VStack>
          {/** 
          <HStack
            justifyContent="space-around"
            width="full"
            marginTop={20}
            marginBottom={5}
          >
            {enableEdit ? (
              <>
                <Button
                  title="Cancelar"
                  onPress={handleEnableEdit}
                  width="1/4"
                />
                <Button
                  title="Salvar"
                  onPress={handleSubmit(handleUpdatePlantation)}
                  width="1/4"
                  isLoading={isLoadingUpdate}
                />
              </>
            ) : (
              <Button title="Editar" onPress={handleEnableEdit} width="1/2" />
            )}
          </HStack>
          */}
        </VStack>
      )}
    </VStack>
  )
}
