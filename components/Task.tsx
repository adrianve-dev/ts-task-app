import { TaskProps, CompletedTaskProps, ReadonlyTask as ReadonlyTaskType, CompletedTask as CompletedTaskType, Place } from '../types';
import { Text, View } from './Themed'
import { getPlaceElement } from './Place'
import { Swipeable } from 'react-native-gesture-handler'
import { Alert, Pressable } from 'react-native'
import SwipeButton from './SwipeButton'
import { colors, styles } from '../styles'
import { useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const LeftSwipeAction = () => {
    return (
        <View style={[{alignItems: 'flex-end', justifyContent: 'center', backgroundColor:colors.paleGreen, paddingLeft: 30, paddingRight: 30,}]}>
            <Text>
                ✔
            </Text>
        </View>
    )
}

const RightSwipeButtons = () => {
    return (
        <>
            <SwipeButton onPress={() => Alert.alert('Item deleted')} text={'🗑'} backgroundColor={colors.paleRed} ></SwipeButton>
            <SwipeButton onPress={() => Alert.alert('Editing Item')} text={'✏'} backgroundColor={colors.palePurple} ></SwipeButton>
        </>
    )
}

export const Task = (props: TaskProps & {toggle: Function}) => {
    type AppProps = NativeStackNavigationProp<RootStackParamList, 'EditTask'>
    const nav = useNavigation<AppProps>()
    const { style, task, toggle, ...otherProps } = props

    const swipeFromLeftOpen = () => {
        toggle(task)
    }

    return (
            <Swipeable
                renderLeftActions={LeftSwipeAction}
                onSwipeableLeftWillOpen={swipeFromLeftOpen}
                renderRightActions={RightSwipeButtons}
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
    );
}

export const CompletedTask = (props: CompletedTaskProps & {toggle: Function}) => {
    const { style, task, toggle, ...otherProps } = props

    const swipeFromLeftOpen = () => {
        toggle(task)
    }
    
    return (
        <Swipeable
            renderLeftActions={LeftSwipeAction}
            onSwipeableLeftWillOpen={swipeFromLeftOpen}
            renderRightActions={RightSwipeButtons}
        >
            <View style={[styles.taskList]}>
                <Text style={[styles.completedTask, styles.fontMain]} >
                    {task.text}
                </Text>
                {getPlaceElement(task.place as Place)}
            </View>
        </Swipeable>
    );
  }

export const getTaskElement = (task: ReadonlyTaskType | CompletedTaskType, handleToggleTask: Function) => {
    if(!task.done) {
        return <Task task={task as ReadonlyTaskType} toggle={handleToggleTask} />
    } else {
        return <CompletedTask task={task as CompletedTaskType} toggle={handleToggleTask} />
    }
}