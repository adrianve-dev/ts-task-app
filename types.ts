export type Place = 'home' | 'work' | { custom: string }

export type Task = {
    id: number
    text: string
    done: boolean
    place?: Place
}

// Readonly<...> a *mapped type*
// can also create new readonly type like:
// type ReadonlyTask = Readonly<Task>
export type ReadonlyTask = Readonly<Task>

// & creates 'intersection type' of two types
// here: ReadonlyTask and new Type where literal type done: true
// done: true is more speciific than ReadonlyTask's done 
// so it overrides ReadonlyTask's done
export type CompletedTask = ReadonlyTask & {
    readonly done: true
}