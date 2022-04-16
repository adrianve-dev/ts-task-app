import { TaskProps, CompletedTaskProps, ReadonlyTask as ReadonlyTaskType, CompletedTask as CompletedTaskType, Place } from '../types';
import { Text, View } from './Themed'
import styles from '../styles'
import { placeToString } from '../utils/utils';

export const Task = (props: TaskProps) => {
    const { style, task, ...otherProps } = props
    
    return (
      <View style={[styles.taskList]}>
        <Text style={[{fontSize: 18,}]}>
            {task.text}
        </Text>
        <Text style={[styles.place, {color: '#ccc', fontSize: 14,}]} >
            {task.place && placeToString(task.place as Place)}
        </Text>
      </View>
    );
}

export const CompletedTask = (props: CompletedTaskProps) => {
    const { style, task, ...otherProps } = props
    
    return (
      <View style={[styles.taskList]}>
        <Text style={[styles.completedTask, {fontSize: 18, alignItems: 'flex-start'}]} >
            {task.text}
        </Text>
        <Text style={[styles.place, {fontSize: 14, alignItems: 'flex-start'}]} >
            {task.place && placeToString(task.place as Place)}
        </Text>
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