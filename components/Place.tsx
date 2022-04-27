import { useColorScheme, ColorSchemeName } from "react-native"
import { DefaultViewTextProps, Place as PlaceType, PlaceProps } from "../types"
import { Text, View } from './Themed'
import { colors, styles } from '../styles'
import { placeToDisplayString } from '../utils/utils'
import Ionicons from '@expo/vector-icons/Ionicons'

const getColors = (colorScheme: ColorSchemeName): [string, string] => {
    const backgroundColor = colorScheme === 'light' ? colors.offWhite : colors.dark
    const color = colorScheme === 'light' ? 'black' : 'white'
    return [color, backgroundColor]
}

export const PlaceNone = (props: DefaultViewTextProps ) => {
    const { style, ...otherProps } = props
    const colorScheme = useColorScheme() as NonNullable<ColorSchemeName>

    const [color, backgroundColor] = getColors(colorScheme)

    return (
        <View style={{alignItems:'center'}}>
            <Text style={[styles.place, styles.fontSubtitle, { color, backgroundColor, }]} >
                <Ionicons name={'ios-add-circle-sharp'} color={color}/>
                 Place
            </Text>
        </View>
    )
}

export const Place = (props: PlaceProps) => {
    const { style, place, ...otherProps } = props
    const colorScheme = useColorScheme() as NonNullable<ColorSchemeName>

    const [color, backgroundColor] = getColors(colorScheme)

    return (        
        <View style={{alignItems:'center'}}>
            <Text style={[styles.place, styles.fontSubtitle, { color, backgroundColor, }]} >
                {place && placeToDisplayString(place)}
            </Text>
        </View>
    )
}

export const getPlaceElement = (place: PlaceType) => {
    if(place) return <Place place={place} />
    else return <PlaceNone />
}