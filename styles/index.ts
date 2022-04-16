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
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 5,
        paddingBottom: 5,
        color: '#ccc',
        backgroundColor: '#222', 
        borderRadius: 15, 
        overflow: 'hidden', 
        textAlign: 'center', 
        width: '25%',
    },
    fontMain: {
        fontSize: 18,
    },
    fontSubtitle: {
        fontSize: 14,
    }
})

export default styles