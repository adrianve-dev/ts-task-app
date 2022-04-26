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
import { deleteTask } from '../redux'

const LeftSwipeAction = () => {
    const icon = Platform.OS === "ios" ? "ios-checkmark-sharp" : "md-checkmark"
    return (
        <SwipeView icon={icon} iconPosition={'left'} color={'white'} backgroundColor={colors.paleGreen} />
    )
}

export const Task = (props: TaskProps & {toggle: Function}) => {
    type AppProps = NativeStackNavigationProp<RootStackParamList, 'EditTask'>
    const theme = useTheme()
    const nav = useNavigation<AppProps>()
    const dispatch = useAppDispatch()
    const { style, task, toggle, ...otherProps } = props

    const swipeFromLeftOpen = () => {
        toggle(task)
    }

    return (
            <Swipeable
                renderLeftActions={LeftSwipeAction}
                onSwipeableLeftWillOpen={swipeFromLeftOpen}
                renderRightActions={() => {
                    return (
                        <>
                            <SwipeButton onPress={() => dispatch(deleteTask(task.id))} text={'Delete'} icon={'md-trash'} color={theme.color} backgroundColor={colors.paleRed} ></SwipeButton>
                            <SwipeButton onPress={() => nav.navigate('EditTask', {task: task})} icon={'md-pencil'} text={'Edit'}  color={theme.color} ></SwipeButton>
                        </>
                    )
                }}
            >
                <Pressable onPress={() => nav.navigate('EditTask', {task: task})}>
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

export const CompletedTask = (props: CompletedTaskProps & {toggle: Function}) => {
    const { style, task, toggle, ...otherProps } = props
    const theme = useTheme()
    const dispatch = useAppDispatch()

    const swipeFromLeftOpen = () => {
        toggle(task)
    }

    const swipeFromRightOpen = () => {
        dispatch(deleteTask(task.id))
    }
    
    return (
        <Swipeable
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

export const getTaskElement = (task: ReadonlyTaskType | CompletedTaskType, handleToggleTask: Function) => {
    if(!task.done) {
        return <Task task={task as ReadonlyTaskType} toggle={handleToggleTask} />
    } else {
        return <CompletedTask task={task as CompletedTaskType} toggle={handleToggleTask} />
    }
}