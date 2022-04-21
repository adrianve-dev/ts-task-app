import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { ReadonlyTask, CompletedTask } from '../types';

export const TASKS_STORAGE_KEY = 'adrianve::tasks'
export const TASK_COUNTER = 'adrianve::counter'

export const getStoredTasks = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(TASKS_STORAGE_KEY)
        return jsonValue !== null ? JSON.parse(jsonValue) : null
    } catch (e) {
        Alert.alert('Failed to get Tasks')
    }
}

export const asyncAddTask = async (task: ReadonlyTask) => {
    try {
        return await saveTask(task)
    } catch (e) {
        Alert.alert('Failed to add Task')
    }
}

export const asyncUpdateTask = async (tasks: ReadonlyTask[]) => {
    try {
        return await AsyncStorage.setItem(TASKS_STORAGE_KEY,
            JSON.stringify(tasks))
    } catch (e) {
        Alert.alert('Failed to update Task') 
    }
}

export const asyncCompleteTask = async (task: CompletedTask) => {
    try {
        return await saveTask(task)
    } catch (e) {
        Alert.alert('Failed to add Task')
    }
}

const saveTask = async (task: ReadonlyTask) => {
    return await AsyncStorage.mergeItem(TASKS_STORAGE_KEY,
        JSON.stringify({
            [task.id.toString()]: task
        })
    )
}

export const getTaskCount = async (): Promise<number | null | undefined> => {
    try {
        const jsonValue = await AsyncStorage.getItem(TASK_COUNTER)
        return jsonValue !== null ? parseInt(jsonValue) : null
    } catch (e) {
        Alert.alert('Failed to get task count')
    }
}

/** use to initialize
 *  - if self null
 *  - if storedTasks null
 *  - then initialize to 0 w/ manual argument
 */
export const asyncUpdateTaskCount = async (taskCount?: string) => {
    try {
        // set manual
        if(taskCount && Number(taskCount) >= 0) {
            await AsyncStorage.setItem(TASK_COUNTER, taskCount)
        } else {
            // increment
            const jsonValue = await AsyncStorage.getItem(TASK_COUNTER)
            // assumes null because of no entry
            const count = jsonValue !== null ? parseInt(jsonValue) : 0 
            const value = (count + 1).toString()
            await AsyncStorage.setItem(TASK_COUNTER, value)
        }
        return getTaskCount()
    } catch (e) {
        Alert.alert('Failed to update task count') 
    }
}

export const asyncDeleteData = async () => await AsyncStorage.clear()