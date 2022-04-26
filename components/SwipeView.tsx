import { View, Text } from './Themed'
import { appStyles } from '../styles'
import useTheme from '../hooks/useTheme';
import Ionicons from '@expo/vector-icons/Ionicons';

interface SwipeViewProps {
    iconPosition: 'left' | 'right'
    icon?: typeof Ionicons['defaultProps']
    color?: string
    backgroundColor?: string
    text?: string
    size?: number
}
export default (props: SwipeViewProps) => {
    const { iconPosition, icon, color, backgroundColor, text, size } = props
    const theme = useTheme()
    const alignment = iconPosition === 'left' ? 'flex-start' : 'flex-end'
    const appliedColor = color ? color : theme.color
    const appliedBgColor = backgroundColor ? backgroundColor : theme.backgroundColor
    const appliedText = text ? text : 'Press'
    const appliedSize = size ? size : appStyles.swipeButtonPadding
    
    return(
            <View style={[{flex: 1, alignItems: alignment, justifyContent: 'center', backgroundColor: appliedBgColor, paddingLeft: appliedSize, paddingRight: appliedSize,}]}>
                <View style={{flex: 1, alignItems:'center', justifyContent:'center', backgroundColor: appliedBgColor,}}>
                    {icon && <Ionicons name={icon} color={appliedColor} size={20} style={[{paddingTop: 5, paddingBottom: 1}]} />}
                    {text && <Text style={{color: appliedColor}}>
                        {appliedText}
                    </Text>}
                </View>
            </View>
    )
}