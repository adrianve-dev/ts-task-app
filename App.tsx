import { StatusBar } from 'expo-status-bar';
import { FlatList, ListRenderItem, SafeAreaView, StyleSheet, Text as DefaultText, View as DefaultView } from 'react-native';
import { Text, View } from './components/Themed'
import useTheme from './hooks/useTheme';
import { ReadonlyTask } from './types';

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
  ];
  
  const Task = (props: DefaultView['props'] & DefaultText['props'] & { task: ReadonlyTask }) => {
    const { style, task, ...otherProps } = props
    
    return (
      <View>
        <Text>{task.text}</Text>
      </View>
    );
  }

  const renderItem: ListRenderItem<ReadonlyTask> = ({ item }) => (
    <Task task={item}  />
  );
  
  return (
    <SafeAreaView style={[styles.container, {backgroundColor:'#282c34'}]}>
      <View style={ styles.header }>
        <Text>Open up App.tsx to start working on your app!</Text>
        <Text>theme color: {theme.color}</Text>
        <Text>theme backgroundColor: {theme.backgroundColor}</Text>
        <StatusBar style="auto" />
      </View>
      <View style={styles.list}>
        <FlatList<ReadonlyTask>
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
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 15,
    marginBottom: 15,
  },
  list: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});