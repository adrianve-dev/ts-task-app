import { useState } from "react"
import { KeyboardAvoidingView, Keyboard, Platform } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { useAppDispatch } from "../hooks/reduxHooks"
import useTheme from "../hooks/useTheme"
import { addTask } from "../redux"
import { styles } from "../styles"

export default function AddTaskScreen() {
    const [text, setText] = useState<string>('')
    const theme = useTheme()
    const dispatch = useAppDispatch()

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={[{flex:1, backgroundColor: theme.backgroundColor,}]}
        >
                <TextInput 
                    style={[styles.fontMain, {color: theme.color ,margin: 30, borderWidth: 1, borderColor:'transparent', borderBottomColor: theme.color, padding:20}]} 
                    placeholder={'My next task is..'} 
                    value={text} 
                    onChangeText={setText} 
                    onSubmitEditing={(e) => setText(e.nativeEvent.text)} 
                />
        </KeyboardAvoidingView>
    )
}