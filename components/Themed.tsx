import { Text as DefaultText, View as DefaultView } from 'react-native'
import useTheme from "../hooks/useTheme";

export const Text = (props: DefaultText['props']) => {
    const { style, ...otherProps } = props
    const theme = useTheme()
    return (
        <DefaultText style={[{ color: theme.color }, style]} {...otherProps} />
    )
}

export const View = (props: DefaultView['props']) => {
    const { style, ...otherProps } = props
    const theme = useTheme()
    return (
        <DefaultView style={[{ backgroundColor: theme.backgroundColor }, style]} {...otherProps} />
    )
}
