import { TaskProps, CompletedTaskProps, ReadonlyTask as ReadonlyTaskType, CompletedTask as CompletedTaskType, Place } from '../types';
import { Text, View } from './Themed'
import styles from '../styles'
import { placeToString } from '../utils/utils';
import { getPlaceElement } from './Place';

export const Task = (props: TaskProps) => {
    const { style, task, ...otherProps } = props
    
    return (
      <View style={[styles.taskList]}>
        <Text style={[styles.fontSubtitle]}>
            {task.text}
        </Text>
        {getPlaceElement(task.place as Place)}
      </View>
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

export const getTaskElement = (task: ReadonlyTaskType | CompletedTaskType) => {
    if(!task.done) {
        return <Task task={task as ReadonlyTaskType} />
    } else {
        return <CompletedTask task={task as CompletedTaskType} />
    }
}