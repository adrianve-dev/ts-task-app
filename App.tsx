import * as React from 'react';
import { FlatList, ListRenderItem, SafeAreaView, StyleSheet } from 'react-native';
import { Text, View } from './components/Themed'
import useTheme from './hooks/useTheme';
import { CompletedTask, ReadonlyTask } from './types';
import { getTaskElement } from './components/Task'
import { toggleTask } from './utils/utils';


export default function App() {
  const [tasks, setTasks] = React.useState<ReadonlyTask[]>([
    {
      id: 0,
      text: 'Do the Laundry',
      done: false,
      place: 'home'
    },
    {
      id: 1,
      text: 'Do the analysis report',
      done: false,
      place: 'work'
    },
    {
      id: 2,
      text: 'Hit all PRs',
      done: false,
    },
    {
      id: 3,
      text: 'Hit all PRs',
      done: true,
      place: { custom: 'gym' },
    },
  ])

  const theme = useTheme()
  const DATA: ReadonlyTask[] = tasks

  const handleToggleTask = (task: ReadonlyTask) => {
    const updatedTask: ReadonlyTask = toggleTask(task)
    const updatedTasks: ReadonlyTask[] = tasks.map((t) => {
      if(t.id === task.id) return updatedTask
      else return t
    })
    
    setTasks(updatedTasks)
  }

  const renderItem: ListRenderItem<ReadonlyTask | CompletedTask> = ({ item }) => getTaskElement(item, handleToggleTask)
  
  return (
    <SafeAreaView style={[styles.container, {backgroundColor:'#282c34'}]}>
      <View style={styles.list}>
        <FlatList<ReadonlyTask | CompletedTask>
            data={DATA}
            renderItem={renderItem}
          >
        </FlatList>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    flex: 0,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  list: {
    flex: 1,
  }
});