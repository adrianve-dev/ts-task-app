import { useRef, useState } from "react"
import { KeyboardAvoidingView, StyleSheet, Platform } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { Text } from "../components/Themed"
import { useAppDispatch } from "../hooks/reduxHooks"
import useTheme from "../hooks/useTheme"
import { addTask } from "../redux"
import { colors, styles as myStyles } from "../styles"


export default function AddTaskScreen() {
    const [taskText, setTaskText] = useState<string>('')
    const [placeText, setPlaceText] = useState<string>('')
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const placeInput = useRef<TextInput>(null)

    const addToStore = () => {
        if(taskText) dispatch(addTask({task: taskText, place: placeText}))
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={[{flex:1, backgroundColor: theme.backgroundColor,}]}
        >
            <Text style={[myStyles.fontSubtitle, styles.label, {color:colors.muted}]}>Task:</Text>
            <TextInput 
                style={[myStyles.fontMain, myStyles.input, {color: theme.color, borderBottomColor: theme.color}]} 
                autoFocus={true}
                placeholder={'My next task is..'} 
                value={taskText}
                returnKeyType='next'
                onChangeText={setTaskText} 
                onSubmitEditing={() => placeInput.current?.focus()}
            />
            <Text style={[myStyles.fontSubtitle, styles.label, {color:colors.muted}]}>Place (Optional):</Text>
            <TextInput
                ref={placeInput}
                style={[myStyles.fontMain, myStyles.input, {color: theme.color, borderBottomColor: theme.color}]} 
                placeholder={'Where am I completing it?'} 
                value={placeText} 
                returnKeyType='done'
                onChangeText={setPlaceText} 
                onSubmitEditing={() => addToStore()}
            />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    label: {
        margin: 15,
        marginTop: 30,
    },
})