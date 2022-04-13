import { Place, ReadonlyTask, CompletedTask } from "../types";

//#region PLACE

export const placeToString = (place: Place): string => {
    if(place === 'home') return '🏡 Home'
    else if(place === 'work') return '💼 Work'
    else return `📍 ${place.custom.slice(0,1).toUpperCase()}${place.custom.slice(1).toLowerCase()}`
}

//#endregion

//#region TASK

export const completeAll = (tasks: readonly ReadonlyTask[]): CompletedTask[] => {
    // We want it to return a new array
    // instead of modifying the original array
    return tasks.map(task => ({
        ...task,
        done: true
    }))
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