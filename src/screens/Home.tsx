import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { Header } from '@components/Header'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { VStack, FlatList, HStack, Heading, Text } from 'native-base'
import { useState } from 'react'

export function Home() {
  const [groups, setGroups] = useState(['teste', 'teste2', 'teste3'])
  const [list, setList] = useState(['teste', 'teste2', 'teste3'])
  const [groupSelected, setGroupSelected] = useState('teste')

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpen() {
    navigation.navigate('exercise')
  }

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

      <VStack flex={1} paddingX={8}>
        <HStack justifyContent="space-between" marginBottom={5}>
          <Heading fontFamily="heading">Teste</Heading>
          <Text color="gray.200" fontSize="sm">
            {list.length}
          </Text>
        </HStack>

        <FlatList
          data={list}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 20,
          }}
          renderItem={({ item }) => <ExerciseCard onPress={handleOpen} />}
        />
      </VStack>
    </VStack>
  )
}
