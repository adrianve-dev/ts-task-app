import * as React from 'react'
import { FlatList, ListRenderItem, ListRenderItemInfo, Pressable, SafeAreaView, StyleSheet } from 'react-native'
import { Text, View } from '../components/Themed'
import { CompletedTask, ReadonlyTask, StoredCompletedTask, StoredTask } from '../types'
import { getTaskElement } from '../components/Task'
import { completeAll, toggleTask } from '../utils/utils'
import { BorderlessButton } from 'react-native-gesture-handler'
import { asyncDeleteData } from '../utils/api'
import { colors } from '../styles'
import { getCount, updateCount, updateCountManually, getTasks, addTask, updateTasks, completeTask, updateTask, allCompletedTasks } from '../redux'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'

export default function Main() {
  // key: number but storedKeys stored as key: string
  // handleToggleTask throws type error when change above to : string 
  const [tasks, setTasks] = React.useState<{[key:number]: ReadonlyTask}>({
  })

  const [taskAdded, setTaskAdded] = React.useState<boolean>(false)
  const dispatch = useAppDispatch()
  const taskCount = useAppSelector(state => state.count.count)
  const allStoredTasks = useAppSelector(state => state.tasks.tasks)
  
  console.log('allStoredTasks: ', allStoredTasks)
  console.log('taskCount: ', taskCount)
//   asyncDeleteData()

  const addTaskToStore = async () => {
    // assume null/undefined mean no tasks
    const id: number = taskCount !== null && typeof taskCount !== 'undefined' ? taskCount : 0

    dispatch(addTask({
        id: id,
        text: `This is new task #${id}`,
        done: false,
      } as ReadonlyTask))
    dispatch(updateCount())
    // setTaskAdded(true)
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

  const handleToggleTask = (task: ReadonlyTask) => {
    const updatedTask: ReadonlyTask = toggleTask(task)
    
    if(updatedTask.done) dispatch(completeTask(updatedTask as CompletedTask))
    else dispatch(updateTask(updatedTask))
  }

  // update state on add task
  React.useEffect(() => {
    const updateData = async () => {
        dispatch(getTasks())

        const allTasks = Object.assign({}, tasks, taskCount)
        if(Object.keys(allTasks).length > Object.keys(tasks).length) setTasks(allTasks)
        setTaskAdded(false)
    }

    if(taskAdded) {
      updateData()
    }
  }, [taskAdded])

  // initialize data on load
  React.useEffect(() => {
    const initData = async () => {
      console.log('init data')
      dispatch(getTasks())
      dispatch(getCount())
      
      if(taskCount === null) {
        if(allStoredTasks === null || typeof allStoredTasks === 'undefined'){
          dispatch(updateCountManually('0'))
        } else {
          dispatch(updateCountManually(Object.keys(allStoredTasks).length.toString()))
        }
      }

      dispatch(getCount())
    }
    initData()
  }, [])

  const hasTasks = (data: StoredTask | null | undefined) => {
    if(data !== null && typeof data !== 'undefined') {
        return Object.keys(allStoredTasks as StoredTask).length > 0
    } else {
        return false
    }
  }
  
  const DATA: ReadonlyTask[] = formatData(allStoredTasks)

  const renderItem: ListRenderItem<ReadonlyTask | CompletedTask> = ({ item, index }) => getTaskElement(item, handleToggleTask)
  

  return (
      <SafeAreaView style={[styles.container, {backgroundColor: colors.reactDarkBackground}]}>
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
        <BorderlessButton style={{flex:1, marginLeft: 10, marginRight: 10,}} onPress={() => addTaskToStore()} >
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