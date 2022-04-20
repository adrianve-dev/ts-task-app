import { configureStore, createSlice, MiddlewareArray, PayloadAction } from "@reduxjs/toolkit"
import { ReadonlyTask, StoredTask } from "../types"
import thunk from 'redux-thunk'

const tasksState = {} as StoredTask

const taskSlice = createSlice({
    name: 'tasks',
    initialState: tasksState,
    reducers: {
        get: (state, action: PayloadAction<StoredTask>) => {
                state = { 
                    ...state,
                    ...action.payload
                }
        },
        add: (state, action: PayloadAction<ReadonlyTask>) => {
            const { id, text, done, place } = action.payload
            state = {
                ...state,
                [id.toString()]: {id, text, done, place},
            }
        },
        update: (state, action: PayloadAction<StoredTask>) => {
            state = {
                ...action.payload
            }
        },
        toggle: (state, action: PayloadAction<ReadonlyTask>) => {
            const { id, text, done, place } = action.payload
            const key = id.toString()
            state = {
                ...state,
                [key]: {
                    ...state[key],
                    done,
                }
            }
        }

    }
})

export const { get, add, update, toggle } = taskSlice.actions
export const taskReducer = taskSlice.reducer

interface CountState {
    count: number
}

const countState = { count: 0 } as CountState

const countSlice = createSlice({
    name: 'count',
    initialState: countState,
    reducers: {
        getCount(state, action: PayloadAction<number>) {
            action.payload
        },
        updateCount(state, action: PayloadAction<number>) {
            action.payload
        }
    }

})

export const { getCount, updateCount } = countSlice.actions
export const countReducer = countSlice.reducer

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        count: countReducer,
    },
    middleware: new MiddlewareArray().concat(thunk)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {tasks: tasksState, count: countState}
export type AppDispatch = typeof store.dispatch