import { Place, ReadonlyTask, CompletedTask, StoredCompletedTask, StoredTask } from "../types";

//#region PLACE

const HOME_TEXT = 'home'
const WORK_TEXT = 'work'
const HOME_DISPLAY = '🏡 Home'
const WORK_DISPLAY = '💼 Work'

export const placeToDisplayString = (place: Place): string => {
    if(place === HOME_TEXT) return HOME_DISPLAY
    else if(place === WORK_TEXT) return WORK_DISPLAY
    else return `📍 ${place.custom.slice(0,1).toUpperCase()}${place.custom.slice(1).toLowerCase()}`
}

export const placeToString = (place: Place): string => {
    if(typeof place === 'string') return place.toLowerCase()
    else return place.custom.toLowerCase()
}

export const stringToPlace = (place: string): Place => {
    const normalizedPlace = place.toLowerCase()
    if(normalizedPlace === HOME_TEXT) return HOME_TEXT
    else if(normalizedPlace === WORK_TEXT) return WORK_TEXT
    else return { custom: normalizedPlace }
}

//#endregion

//#region TASK

export const completeAll = (tasks: StoredTask): StoredCompletedTask => {
    const keys: string[] = Object.keys(tasks)
    let completedTasks: StoredCompletedTask = {}
    keys.forEach((k) => {
        const t = tasks[k]
        completedTasks = Object.assign(completedTasks, {
            [t.id.toString()]: {
                ...t,
                done: true
            }
        } as StoredCompletedTask)
    })
    return completedTasks
}

export const deleteTask = (tasks: readonly ReadonlyTask[], task: ReadonlyTask): ReadonlyTask[] => {
    return tasks.filter((t) => t.id !== task.id)
}

export const toggleTask = (_task: ReadonlyTask): ReadonlyTask => {
    return {
        ..._task,
        done: !_task.done
    }
}

//#endregion