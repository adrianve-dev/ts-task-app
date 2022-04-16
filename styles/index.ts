import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    completedTask: {
        color: '#888',
        textDecorationLine: 'line-through', 
        textDecorationStyle: 'solid',
    },
    taskList: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
    },
    place: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: '10%',
    }
})

export default styles