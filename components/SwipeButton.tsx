import { BorderlessButton } from 'react-native-gesture-handler';
import { View, Text } from './Themed'
import { appStyles } from '../styles'
import useTheme from '../hooks/useTheme';
import Ionicons from '@expo/vector-icons/Ionicons';

interface SwipeButtonProps {
    onPress: (pointerInside: boolean) => void
    icon?: typeof Ionicons['defaultProps']
    color?: string
    backgroundColor?: string
    text?: string
    size?: number
}

export default (props: SwipeButtonProps) => {
    const { onPress, icon, color, backgroundColor, text, size } = props
    const theme = useTheme()
    const appliedColor = color ? color : theme.color
    const appliedBgColor = backgroundColor ? backgroundColor : theme.backgroundColor
    const appliedText = text ? text : 'Press'
    const appliedSize = size ? size : appStyles.swipeButtonPadding
    
    return(
        <BorderlessButton onPress={onPress}>
            <View style={[{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: appliedBgColor, paddingLeft: appliedSize, paddingRight: appliedSize,}]}>
                {icon && <Ionicons name={icon} color={appliedColor} size={20} style={[{paddingTop: 5, paddingBottom: 1}]} />}
                <Text style={{color: appliedColor}}>
                    {appliedText}
                </Text>
            </View>
        </BorderlessButton>
    )
}