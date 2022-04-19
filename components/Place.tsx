import { DefaultViewTextProps, Place as PlaceType, PlaceProps } from "../types"
import { Text, View } from './Themed'
import { styles } from '../styles'
import { placeToString } from '../utils/utils';



export const PlaceNone = (props: DefaultViewTextProps ) => {
    const { style, ...otherProps } = props
    return (
        <View style={{alignItems:'center'}}>
            <Text style={[styles.place, styles.fontSubtitle]} >
                + Place
            </Text>
        </View>
    )
}

export const Place = (props: PlaceProps) => {
    const { style, place, ...otherProps } = props
    return (        
        <View style={{alignItems:'center'}}>
            <Text style={[styles.place, styles.fontSubtitle]} >
                {place && placeToString(place)}
            </Text>
        </View>
    )
}

export const getPlaceElement = (place: PlaceType) => {
    if(place) return <Place place={place} />
    else return <PlaceNone />
}