import * as React from 'react';
import { FlatList, ListRenderItem, ListRenderItemInfo, Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed'
import { CompletedTask, ReadonlyTask, StoredTask } from '../types'
import { getTaskElement } from '../components/Task'
import { toggleTask } from '../utils/utils'
import { BorderlessButton } from 'react-native-gesture-handler'
import { asyncAddTask, getStoredTasks, getTaskCount } from '../utils/api'
import { colors } from '../styles';
import { getCount, updateCount, updateCountManually } from '../redux';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

export default function Main() {
  // key: number but storedKeys stored as key: string
  // handleToggleTask throws type error when change above to : string 
  const [tasks, setTasks] = React.useState<{[key:number]: ReadonlyTask}>({
  })
  const [taskAdded, setTaskAdded] = React.useState<boolean>(false)
  const dispatch = useAppDispatch()
  const taskCount = useAppSelector(state => state.count.count)
  console.log('taskCount: ', taskCount)
  // asyncDeleteData()

  const addTask = async () => {
    const count = await getTaskCount()
    // assume null/undefined mean no tasks
    const id: number = count !== null && typeof count !== 'undefined' ? count : 0
    await asyncAddTask({
      id: id,
      text: `This is new task #${id}`,
      done: false,
    })

    dispatch(updateCount())
    setTaskAdded(true)
  }

  const formatData = (data: {[key: string]: ReadonlyTask}): ReadonlyTask[] => {
    let allTasks: ReadonlyTask[] = []
    Object.keys(tasks).forEach((t: string) => {
      const nextTask = data[t]
      allTasks.push(nextTask)
    })
    return allTasks
  }
  
  const DATA: ReadonlyTask[] = formatData(tasks)

  const handleToggleTask = (task: ReadonlyTask) => {
    const updatedTask: ReadonlyTask = toggleTask(task)
    const updatedTasks: ReadonlyTask[] = formatData(tasks).map((t) => {
      if(t.id === task.id) return updatedTask
      else return t
    })
    
    setTasks(updatedTasks)
  }

  const renderItem: ListRenderItem<ReadonlyTask | CompletedTask> = ({ item, index }) => getTaskElement(item, handleToggleTask)
  
  // update state on add task
  React.useEffect(() => {
    const updateData = async () => {
      const storedTasks = await getStoredTasks()
      console.log('stored tasks: ', storedTasks)

      const allTasks = Object.assign({}, tasks, storedTasks)
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
      dispatch(getCount())
      const count = await getTaskCount()
      const storedTasks = await getStoredTasks()
      
      if(count === null) {
        if(storedTasks === null){
          dispatch(updateCountManually('0'))
        } else {
          dispatch(updateCountManually(Object.keys(storedTasks).length.toString()))
        }
      }

      const allTasks: StoredTask = Object.assign({}, tasks, storedTasks)
      dispatch(getCount())
      if(Object.keys(allTasks).length > Object.keys(tasks).length) setTasks(allTasks)
    }
    initData()
  }, [])

  return (
      <SafeAreaView style={[styles.container, {backgroundColor: colors.reactDarkBackground}]}>
        <View style={styles.list}>
          {Object.keys(tasks).length > 0 ? <FlatList<ReadonlyTask | CompletedTask>
              data={DATA}
              renderItem={(item: ListRenderItemInfo<ReadonlyTask | CompletedTask>) => renderItem(item)}
              keyExtractor={(item, index) => index.toString()}
            >
          </FlatList> 
          : <View style={[{flex: 1, alignItems: 'center', paddingTop: 60}]}><Text style={{fontSize: 18}}>No Tasks</Text></View>}
        </View>
        <BorderlessButton style={{flex:1, marginLeft: 10, marginRight: 10,}} onPress={() => addTask()} >
          <View style={[{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue', borderRadius: 10,}]}>
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