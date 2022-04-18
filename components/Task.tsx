import { TaskProps, CompletedTaskProps, ReadonlyTask as ReadonlyTaskType, CompletedTask as CompletedTaskType, Place } from '../types';
import { Text, View } from './Themed'
import styles from '../styles'
import { getPlaceElement } from './Place'
import { Swipeable } from 'react-native-gesture-handler';

const LeftSwipeAction = () => {
    return (
        <View style={[styles.taskList, {alignItems: 'flex-end', justifyContent: 'center', backgroundColor: '#7f7'}]}>
            <Text>
                ✔
            </Text>
        </View>
    )
}

const RightSwipeAction = () => {
    return (
        <View style={[styles.taskList, {flex: 1, alignItems: 'flex-end', justifyContent: 'center', backgroundColor: '#f55'}]}>
            <Text>
                🗑
            </Text>
        </View>
    )
}

export const Task = (props: TaskProps & {toggle: Function}) => {
    const { style, task, toggle, ...otherProps } = props

    const swipeFromLeftOpen = () => {
        toggle(task)
    }
    const swipeFromRightOpen = () => {
        alert('delete')
    }

    return (
        <Swipeable
            renderLeftActions={LeftSwipeAction}
            onSwipeableLeftOpen={swipeFromLeftOpen}
            renderRightActions={RightSwipeAction}
            onSwipeableRightOpen={swipeFromRightOpen}
        >
            <View style={[styles.taskList]}>
                <Text style={[styles.fontMain]}>
                    {task.text}
                </Text>
                {getPlaceElement(task.place as Place)}
            </View>
        </Swipeable>
    );
}

export const CompletedTask = (props: CompletedTaskProps) => {
    const { style, task, ...otherProps } = props
    
    return (
      <View style={[styles.taskList]}>
        <Text style={[styles.completedTask, styles.fontMain]} >
            {task.text}
        </Text>
        {task.place && getPlaceElement(task.place as Place)}
      </View>
    );
  }

export const getTaskElement = (task: ReadonlyTaskType | CompletedTaskType, handleToggleTask: Function) => {
    if(!task.done) {
        return <Task task={task as ReadonlyTaskType} toggle={handleToggleTask} />
    } else {
        return <CompletedTask task={task as CompletedTaskType} />
    }
}