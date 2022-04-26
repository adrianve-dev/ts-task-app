import * as React from 'react'
import { TaskProps, CompletedTaskProps, ReadonlyTask as ReadonlyTaskType, CompletedTask as CompletedTaskType, Place } from '../types'
import { Text, View } from './Themed'
import { getPlaceElement } from './Place'
import { Swipeable } from 'react-native-gesture-handler'
import { Alert, Platform, Pressable } from 'react-native'
import SwipeButton from './SwipeButton'
import SwipeView from './SwipeView'
import { colors, styles } from '../styles'
import { useNavigation } from '@react-navigation/core'
import { RootStackParamList } from '../App'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import useTheme from '../hooks/useTheme'
import { useAppDispatch } from '../hooks/reduxHooks'
import { completeTask, deleteTask, updateTask } from '../redux'
import { toggleTask } from '../utils/utils'

const LeftSwipeAction = () => {
    const icon = Platform.OS === "ios" ? "ios-checkmark-sharp" : "md-checkmark"
    return (
        <SwipeView icon={icon} iconPosition={'left'} color={'white'} backgroundColor={colors.paleGreen} />
    )
}

export const Task = (props: TaskProps) => {
    type AppProps = NativeStackNavigationProp<RootStackParamList, 'EditTask'>
    const theme = useTheme()
    const nav = useNavigation<AppProps>()
    const dispatch = useAppDispatch()
    const swipeable = React.useRef<Swipeable>(null)
    const { style, task, ...otherProps } = props

    const swipeFromLeftOpen = () => {
        const updatedTask = toggleTask(task)
        
        if(updatedTask.done) dispatch(completeTask(updatedTask as CompletedTaskType))
        else dispatch(updateTask(updatedTask))
    }

    const deleteTaskOnPress = () => {
        swipeable.current?.close()
        dispatch(deleteTask(task.id))
    }

    const showEditTaskModal = () => {
        swipeable.current?.close()
        nav.navigate('EditTask', {task: task})
    }

    return (
            <Swipeable
                ref={swipeable}
                renderLeftActions={LeftSwipeAction}
                onSwipeableLeftWillOpen={swipeFromLeftOpen}
                renderRightActions={() => {
                    return (
                        <>
                            <SwipeButton onPress={() => deleteTaskOnPress()} text={'Delete'} icon={'md-trash'} color={theme.color} backgroundColor={colors.paleRed} ></SwipeButton>
                            <SwipeButton onPress={() => showEditTaskModal()} icon={'md-pencil'} text={'Edit'}  color={theme.color} ></SwipeButton>
                        </>
                    )
                }}
            >
                <Pressable onPress={() => showEditTaskModal()}>
                    <View style={[styles.taskList]}>
                        <Text style={[styles.fontMain]}>
                            {task.text}
                        </Text>
                        {getPlaceElement(task.place as Place)}
                    </View>
                </Pressable>
            </Swipeable>
    )
}

export const CompletedTask = (props: CompletedTaskProps) => {
    const { style, task, ...otherProps } = props
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const swipeable = React.useRef<Swipeable>(null)

    const swipeFromLeftOpen = () => {
        const updatedTask = toggleTask(task)
        
        if(updatedTask.done) dispatch(completeTask(updatedTask as CompletedTaskType))
        else dispatch(updateTask(updatedTask))
    }

    const swipeFromRightOpen = () => {
        swipeable.current?.close()
        dispatch(deleteTask(task.id))
    }
    
    return (
        <Swipeable
            ref={swipeable}
            renderLeftActions={LeftSwipeAction}
            onSwipeableLeftWillOpen={swipeFromLeftOpen}
            onSwipeableRightOpen={swipeFromRightOpen}
            renderRightActions={() => {
                return (
                    <>
                        <SwipeView iconPosition={'right'} icon={'md-trash'} text={'Delete'} color={'white'} backgroundColor={colors.paleRed} ></SwipeView>
                    </>
                )
            }}
        >
            <View style={[styles.taskList]}>
                <Text style={[styles.completedTask, styles.fontMain]} >
                    {task.text}
                </Text>
                {getPlaceElement(task.place as Place)}
            </View>
        </Swipeable>
    )
}

export const getTaskElement = (task: ReadonlyTaskType | CompletedTaskType) => {
    if(!task.done) {
        return <Task task={task as ReadonlyTaskType} />
    } else {
        return <CompletedTask task={task as CompletedTaskType} />
    }
}