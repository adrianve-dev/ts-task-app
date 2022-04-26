import { useRef, useState } from "react"
import { KeyboardAvoidingView, Platform } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { Text } from "../components/Themed"
import { useAppDispatch } from "../hooks/reduxHooks"
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import useTheme from "../hooks/useTheme"
import { updateTask } from "../redux"
import { colors, styles as myStyles } from "../styles"
import { placeToString, stringToPlace } from "../utils/utils"
import { RootStackParamList } from "../App"

type AppProps = NativeStackScreenProps<RootStackParamList, 'EditTask'>

export default function EditTaskScreen({ navigation, route }: AppProps) {
    const { task } = route.params
    const currentPlace = typeof task.place !== 'undefined' ? placeToString(task.place) : ''

    const [taskText, setTaskText] = useState<string>(task.text)
    const [placeText, setPlaceText] = useState<string>(currentPlace)

    const theme = useTheme()
    const dispatch = useAppDispatch()
    const placeInput = useRef<TextInput>(null)

    const addToStore = () => {
        // task exists
        if(taskText) {
            // has changed
            if(taskText !== task.text || placeText !== task.place)
                dispatch(updateTask({
                    id: task.id,
                    text: taskText,
                    done: task.done,
                    place: stringToPlace(placeText)
                }))
                navigation.goBack()
        }
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={[{flex:1, backgroundColor: theme.backgroundColor,}]}
        >
            <Text style={[myStyles.fontSubtitle, myStyles.label, {color:colors.muted}]}>Task:</Text>
            <TextInput 
                style={[myStyles.fontMain, myStyles.input, {color: theme.color, borderBottomColor: theme.color}]} 
                autoFocus={true}
                placeholder={'My next task is..'} 
                value={taskText}
                returnKeyType='next'
                keyboardAppearance={'dark'}
                onChangeText={setTaskText} 
                onSubmitEditing={() => placeInput.current?.focus()}
            />
            <Text style={[myStyles.fontSubtitle, myStyles.label, {color:colors.muted}]}>Place (Optional):</Text>
            <TextInput
                ref={placeInput}
                style={[myStyles.fontMain, myStyles.input, {color: theme.color, borderBottomColor: theme.color}]} 
                placeholder={'Where am I completing it?'} 
                value={placeText} 
                returnKeyType='done'
                keyboardAppearance={'dark'}
                onChangeText={setPlaceText} 
                onSubmitEditing={() => addToStore()}
            />
        </KeyboardAvoidingView>
    )
}