import { useRef, useState } from "react"
import { KeyboardAvoidingView, Platform, ColorSchemeName, useColorScheme } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { Text } from "../components/Themed"
import { useAppDispatch } from "../hooks/reduxHooks"
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from "../App"
import useTheme from "../hooks/useTheme"
import { addTask } from "../redux"
import { colors, styles as myStyles } from "../styles"

type AppProps = NativeStackScreenProps<RootStackParamList, 'AddTask'>

export default function AddTaskScreen({ navigation, route }: AppProps) {
    const [taskText, setTaskText] = useState<string>('')
    const [placeText, setPlaceText] = useState<string>('')

    const colorScheme = useColorScheme() as NonNullable<ColorSchemeName>
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const placeInput = useRef<TextInput>(null)

    const addToStore = () => {
        if(taskText) {
            dispatch(addTask({task: taskText, place: placeText}))
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
                keyboardAppearance={colorScheme}
                returnKeyType='next'
                onChangeText={setTaskText} 
                onSubmitEditing={() => placeInput.current?.focus()}
            />
            <Text style={[myStyles.fontSubtitle, myStyles.label, {color:colors.muted}]}>Place (Optional):</Text>
            <TextInput
                ref={placeInput}
                style={[myStyles.fontMain, myStyles.input, {color: theme.color, borderBottomColor: theme.color}]} 
                placeholder={'Where am I completing it?'} 
                value={placeText}
                keyboardAppearance={colorScheme}
                returnKeyType='done'
                onChangeText={setPlaceText} 
                onSubmitEditing={() => addToStore()}
            />
        </KeyboardAvoidingView>
    )
}