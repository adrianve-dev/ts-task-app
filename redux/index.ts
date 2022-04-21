import { configureStore, createAsyncThunk, createSlice, MiddlewareArray, PayloadAction } from "@reduxjs/toolkit"
import { ReadonlyTask, StoredTask } from "../types"
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { asyncUpdateTaskCount, getTaskCount } from "../utils/api"


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
    count: number | null
}

const countState = { count: 0 } as CountState

export const getCount = createAsyncThunk<number | null | undefined>(
    'count/getCount',
    async (thunkAPI) => {
        return await getTaskCount()
    }
)

export const updateCount = createAsyncThunk<number | null | undefined>(
    'count/updateCount',
    async (thunkAPI) => {
        return await asyncUpdateTaskCount()
    }
)

export const updateCountManually = createAsyncThunk<
    number | null | undefined,
    string
>('count/updateCountManually',
    async (count, thunkAPI) => {
        return await asyncUpdateTaskCount(count)
    }
)

const countSlice = createSlice({
    name: 'count',
    initialState: countState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCount.fulfilled, (state:CountState, action: PayloadAction<number | null | undefined>) => {
                if(typeof action.payload !== 'undefined')
                    state.count = action.payload
            }),
        builder.addCase(updateCount.fulfilled, ((state:CountState, action: PayloadAction<number | null | undefined>) => {
            if(typeof action.payload !== 'undefined')
                state.count = action.payload
        })),
        builder.addCase(updateCountManually.fulfilled, ((state:CountState, action: PayloadAction<number | null | undefined>) => {
            if(typeof action.payload !== 'undefined')
                state.count = action.payload
        }))
    }
})

export const countReducer = countSlice.reducer

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        count: countReducer,
    },
    middleware: new MiddlewareArray().concat(thunk as ThunkMiddleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {tasks: tasksState, count: countState}
export type AppDispatch = typeof store.dispatch