import { Place, ReadonlyTask, CompletedTask, StoredCompletedTask, StoredTask } from "../types";

//#region PLACE

export const placeToString = (place: Place): string => {
    if(place === 'home') return '🏡 Home'
    else if(place === 'work') return '💼 Work'
    else return `📍 ${place.custom.slice(0,1).toUpperCase()}${place.custom.slice(1).toLowerCase()}`
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