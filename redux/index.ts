import { configureStore, createAsyncThunk, createSlice, MiddlewareArray, PayloadAction } from "@reduxjs/toolkit"
import { ReadonlyTask, CompletedTask, StoredTask, StoredCompletedTask, Place } from "../types"
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { asyncUpdateTasks, asyncUpdateTaskCount, getStoredTasks, getTaskCount, asyncAddTask, asyncUpdateTask, asyncStoreCompletedTask, asyncStoreAllCompletedTasks } from "../utils/api"


interface TasksState {
    tasks: StoredTask | null | undefined
}

const taskState = { 
    tasks: null
} as TasksState

export const getTasks = createAsyncThunk<
    StoredTask | null | undefined
>('tasks/get',
    async (thunkAPI) => {
        return await getStoredTasks()
    }
)

export const updateTasks = createAsyncThunk<
    StoredTask | null | undefined,
    StoredTask | null | undefined
>('tasks/updateAll',
    async(tasks, thunkAPI) => {
        return await asyncUpdateTasks(tasks as StoredTask)
    }
)

export const addTask = createAsyncThunk<
    StoredTask | null | undefined,
    { task: string, place: string }
>('tasks/add',
   async (args, thunkAPI) => {
       return await asyncAddTask(args.task, args.place)
   }
)

export const updateTask = createAsyncThunk<
    StoredTask | null | undefined,
    ReadonlyTask
>('tasks/update',
    async (task, thunkAPI) => {
        return await asyncUpdateTask(task)
    })

export const completeTask = createAsyncThunk<
    StoredTask | null | undefined,
    CompletedTask
>('tasks/complete',
    async (task, thunkAPI) => {
        return await asyncStoreCompletedTask(task)
    })

export const allCompletedTasks = createAsyncThunk<
    StoredTask | null | undefined,
    StoredCompletedTask
>('task/completeAll',
    async (tasks, thunkAPI) => {
        return await asyncStoreAllCompletedTasks(tasks)
    })

const setTaskState = (state: TasksState, action: PayloadAction<StoredTask | null | undefined>) => {
    if(typeof action.payload !== 'undefined' && action.payload !== null)
        return action.payload
    return null
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState: taskState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTasks.fulfilled, (state: TasksState, action: PayloadAction<StoredTask | null | undefined>) => {
            state.tasks = setTaskState(state, action)
        }),
        builder.addCase(addTask.fulfilled, (state: TasksState, action: PayloadAction<StoredTask | null | undefined>) => {
            state.tasks = setTaskState(state, action)
        }),
        builder.addCase(updateTasks.fulfilled, (state: TasksState, action: PayloadAction<StoredTask | null | undefined>) => {
            state.tasks = setTaskState(state, action)
        }),
        builder.addCase(updateTask.fulfilled, (state: TasksState, action: PayloadAction<StoredTask | null | undefined>) => {
            state.tasks = setTaskState(state, action)
        }),
        builder.addCase(completeTask.fulfilled, (state: TasksState, action: PayloadAction<StoredTask | null | undefined>) => {
            state.tasks = setTaskState(state, action)
        }),
        builder.addCase(allCompletedTasks.fulfilled, (state: TasksState, action: PayloadAction<StoredTask | null | undefined>) => {
            state.tasks = setTaskState(state, action)
        })
    }
})

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

const setCountState = (state:CountState, action: PayloadAction<number | null | undefined>) => {
    return typeof action.payload !== 'undefined' ? action.payload : null
}

const countSlice = createSlice({
    name: 'count',
    initialState: countState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCount.fulfilled, (state:CountState, action: PayloadAction<number | null | undefined>) => {
                if(typeof action.payload !== 'undefined')
                    state.count = setCountState(state, action)
            }),
        builder.addCase(updateCount.fulfilled, ((state:CountState, action: PayloadAction<number | null | undefined>) => {
            if(typeof action.payload !== 'undefined')
                state.count = setCountState(state, action)
        })),
        builder.addCase(updateCountManually.fulfilled, ((state:CountState, action: PayloadAction<number | null | undefined>) => {
            if(typeof action.payload !== 'undefined')
                state.count = setCountState(state, action)
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