import { StatusBar } from 'expo-status-bar';
import { FlatList, ListRenderItem, SafeAreaView, StyleSheet } from 'react-native';
import { Text, View } from './components/Themed'
import useTheme from './hooks/useTheme';
import { CompletedTask, ReadonlyTask } from './types';
import { getTaskElement } from './components/Task'

export default function App() {  
  const theme = useTheme()
  const DATA: ReadonlyTask[] = [
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
  ];

  const renderItem: ListRenderItem<ReadonlyTask | CompletedTask> = ({ item }) => getTaskElement(item)
  
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