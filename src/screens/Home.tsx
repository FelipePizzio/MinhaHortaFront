import { Group } from '@components/Group'
import { Header } from '@components/Header'
import { VStack, FlatList } from 'native-base'
import { useState } from 'react'
import { PlantationList } from './PlantationList'
import { TasksList } from './TasksList'

export function Home() {
  const groups = ['Plantações', 'Tarefas']

  const [groupSelected, setGroupSelected] = useState('Plantações')

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

      {
        {
          Plantações: <PlantationList />,
          Tarefas: <TasksList />,
        }[groupSelected]
      }
    </VStack>
  )
}
