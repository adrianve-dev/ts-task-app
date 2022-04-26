import * as React from 'react'
import { FlatList, ListRenderItem, ListRenderItemInfo, Pressable, SafeAreaView, StyleSheet } from 'react-native'
import { Text, View } from '../components/Themed'
import { CompletedTask, ReadonlyTask, StoredCompletedTask, StoredTask } from '../types'
import { getTaskElement } from '../components/Task'
import { completeAll, toggleTask } from '../utils/utils'
import { BorderlessButton } from 'react-native-gesture-handler'
import { asyncDeleteData } from '../utils/api'
import { colors } from '../styles'
import { getCount, updateCountManually, getTasks, allCompletedTasks } from '../redux'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import useTheme from '../hooks/useTheme'

type AppProps = NativeStackScreenProps<RootStackParamList, 'Tasks'>

export default function MainScreen({navigation, route} : AppProps) {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const taskCount = useAppSelector(state => state.count)
  const allStoredTasks = useAppSelector(state => state.tasks)
  
  console.log('allStoredTasks: ', allStoredTasks)
  console.log('taskCount: ', taskCount)
  // asyncDeleteData()

  const showAddTaskModal = async () => {
    navigation.navigate('AddTask')
  }

  const completeAllTasks = async () => {
      if(allStoredTasks !== null && typeof allStoredTasks !== 'undefined') {
        const completedTasks: StoredCompletedTask = completeAll(allStoredTasks)
        if(completedTasks) dispatch(allCompletedTasks(completedTasks))
      }
  }

  const formatData = (data: {[key: string]: ReadonlyTask} | null | undefined): ReadonlyTask[] => {
    let allTasks: ReadonlyTask[] = []
    if(data !== null && typeof data !== 'undefined') {
        Object.keys(data).forEach((t: string) => {
          const nextTask = data[t]
          allTasks.push(nextTask)
        })
    }
    return allTasks
  }

  // initialize data on load
  React.useEffect(() => {
    // get initial data from local storage
    dispatch(getTasks())
    dispatch(getCount())
    
    if(taskCount === null) {
      // no taskCount and no stored tasks means brand new open
      if(allStoredTasks === null || typeof allStoredTasks === 'undefined'){
        dispatch(updateCountManually('0'))
      }
    }
  }, [])

  const hasTasks = (data: StoredTask | null | undefined) => {
    if(data !== null && typeof data !== 'undefined') {
        return Object.keys(data).length > 0
    } else {
        return false
    }
  }
  
  const DATA: ReadonlyTask[] = formatData(allStoredTasks)

  const renderItem: ListRenderItem<ReadonlyTask | CompletedTask> = ({ item, index }) => getTaskElement(item)
  

  return (
      <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
        <View style={styles.list}>
          {hasTasks(allStoredTasks) ? <FlatList<ReadonlyTask | CompletedTask>
              data={DATA}
              renderItem={(item: ListRenderItemInfo<ReadonlyTask | CompletedTask>) => renderItem(item)}
              keyExtractor={(item, index) => index.toString()}
            >
          </FlatList> 
          : <View style={[{flex: 1, alignItems: 'center', paddingTop: 60}]}><Text style={{fontSize: 18}}>No Tasks</Text></View>}
        </View>
        <Pressable style={{flex:1, margin: 10}} onPress={() => completeAllTasks()} >
          <View style={[{flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 10,}]}>
                <Text style={{fontSize: 18, color: colors.blue}}>
                    Mark all as Complete
                </Text>
            </View>
        </Pressable>
        <BorderlessButton style={{flex:1, marginLeft: 10, marginRight: 10,}} onPress={() => showAddTaskModal()} >
          <View style={[{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.blue, borderRadius: 10,}]}>
                <Text style={{fontSize: 18}}>
                    Add Task
                </Text>
            </View>
        </BorderlessButton>
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
    flex: 9,
  }
})