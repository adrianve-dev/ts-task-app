import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { ReadonlyTask, CompletedTask, StoredTask, StoredCompletedTask, Place } from '../types';
import { stringToPlace } from './utils';

export const TASKS_STORAGE_KEY = 'adrianve::tasks'
export const TASK_COUNTER = 'adrianve::counter'

//#region Tasks

export const getStoredTasks = async ():Promise<StoredTask | null | undefined> => {
    try {
        const jsonValue = await AsyncStorage.getItem(TASKS_STORAGE_KEY)
        return jsonValue !== null ? JSON.parse(jsonValue) : null
    } catch (e) {
        Alert.alert('Failed to get Tasks')
    }
}

export const asyncAddTask = async (task: string, place?: string) => {
    try {
        const count = await getTaskCount()
        if(count !== null && typeof count !== 'undefined') {
            const id = count + 1
            const newTask = place && typeof place !== 'undefined' 
                ? {
                    id,
                    text: task,
                    done: false,
                    place: stringToPlace(place),
                }
                : {
                    id,
                    text: task,
                    done: false,
                }

            const tasks = await saveTask(newTask)
            // update task count on add
            await asyncUpdateTaskCount()
            return tasks
        }
    } catch (e) {
        Alert.alert('Failed to add Task')
    }
}

export const asyncUpdateTasks = async (tasks: StoredTask): Promise<StoredTask | null | undefined> => {
    try {
        await AsyncStorage.setItem(TASKS_STORAGE_KEY,
            JSON.stringify(tasks))
        return getStoredTasks()
    } catch (e) {
        Alert.alert('Failed to update Tasks') 
    }
}

export const asyncStoreAllCompletedTasks = async (tasks: StoredCompletedTask): Promise<StoredTask | null | undefined> => {
    try {
        await AsyncStorage.setItem(TASKS_STORAGE_KEY,
            JSON.stringify(tasks))
        return getStoredTasks()
    } catch (e) {
        Alert.alert('Failed to update completed Tasks')
    }
}

export const asyncStoreCompletedTask = async (task: CompletedTask): Promise<StoredTask | null | undefined> => {
    try {
        return await saveTask(task)
    } catch (e) {
        Alert.alert('Failed to complete Task')
    }
}

export const asyncUpdateTask = async (task: ReadonlyTask): Promise<StoredTask | null | undefined> => {
    try {
        return await saveTask(task)
    } catch (e) {
        Alert.alert('Failed to update Task')
    }
}

const saveTask = async (task: ReadonlyTask) => {
    await AsyncStorage.mergeItem(TASKS_STORAGE_KEY,
        JSON.stringify({
            [task.id.toString()]: task
        })
    )
    return getStoredTasks()
}

//#endregion

//#region Task Count

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

//#endregion 

export const asyncDeleteData = async () => await AsyncStorage.clear()