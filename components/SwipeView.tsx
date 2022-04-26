import { BorderlessButton } from 'react-native-gesture-handler';
import { View, Text } from './Themed'
import { styles, appStyles } from '../styles'
import useTheme from '../hooks/useTheme';

interface SwipeViewProps {
    iconPosition: 'left' | 'right'
    color?: string
    backgroundColor?: string
    text?: string
    size?: number
}
export default (props: SwipeViewProps) => {
    const { iconPosition, color, backgroundColor, text, size } = props
    const theme = useTheme()
    const alignment = iconPosition === 'left' ? 'flex-start' : 'flex-end'
    const appliedColor = color ? color : theme.color
    const appliedBgColor = backgroundColor ? backgroundColor : theme.backgroundColor
    const appliedText = text ? text : 'Press'
    const appliedSize = size ? size : appStyles.swipeButtonPadding
    
    return(
            <View style={[{flex: 1, alignItems: alignment, justifyContent: 'center', backgroundColor: appliedBgColor, paddingLeft: appliedSize, paddingRight: appliedSize,}]}>
                <Text style={{color: appliedColor}}>
                    {appliedText}
                </Text>
            </View>
    )
}