import { StyleSheet } from "react-native"

export const appStyles = {
    swipeButtonPadding: 30,
}

export const colors = {
    blue: '#0d6efd',
    completedTask: '#888',
    dark: '#222',
    muted: '#ccc',
    offWhite: '#eee',
    paleGreen: '#7f7',
    palePurple: '#77f',
    paleRed: '#f77',
    reactDarkBackground: '#282c34',
    reactLightBackground: '#fff',
    red: '#dc3545',
}

export const styles = StyleSheet.create({
    completedTask: {
        color: colors.completedTask,
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
    },
    input: {
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
        borderWidth: 1,
        borderColor:'transparent',
        padding:20
    },
    label: {
        margin: 15,
        marginTop: 30,
    },
})