import { BorderlessButton } from 'react-native-gesture-handler';
import { View, Text } from './Themed'
import { styles, appStyles } from '../styles'
import useTheme from '../hooks/useTheme';

interface SwipeButtonProps {
    onPress: (pointerInside: boolean) => void
    color?: string
    backgroundColor?: string
    text?: string
    size?: number
}

export default (props: SwipeButtonProps) => {
    const { onPress, color, backgroundColor, text, size } = props
    const theme = useTheme()
    const appliedColor = color ? color : theme.color
    const appliedBgColor = backgroundColor ? backgroundColor : theme.backgroundColor
    const appliedText = text ? text : 'Press'
    const appliedSize = size ? size : appStyles.swipeButtonPadding
    
    return(
        <BorderlessButton onPress={onPress}>
            <View style={[{flex: 1, alignItems: 'flex-end', justifyContent: 'center', backgroundColor: appliedBgColor, paddingLeft: appliedSize, paddingRight: appliedSize,}]}>
                <Text style={{color: appliedColor}}>
                    {appliedText}
                </Text>
            </View>
        </BorderlessButton>
    )
}