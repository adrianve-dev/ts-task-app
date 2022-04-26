import { DefaultViewTextProps, Place as PlaceType, PlaceProps } from "../types"
import { Text, View } from './Themed'
import { styles } from '../styles'
import { placeToDisplayString } from '../utils/utils';
import Ionicons from '@expo/vector-icons/Ionicons';

export const PlaceNone = (props: DefaultViewTextProps ) => {
    const { style, ...otherProps } = props
    return (
        <View style={{alignItems:'center'}}>
            <Text style={[styles.place, styles.fontSubtitle]} >
                <Ionicons name={'ios-add-circle-sharp'} color='white'/>
                 Place
            </Text>
        </View>
    )
}

export const Place = (props: PlaceProps) => {
    const { style, place, ...otherProps } = props
    return (        
        <View style={{alignItems:'center'}}>
            <Text style={[styles.place, styles.fontSubtitle]} >
                {place && placeToDisplayString(place)}
            </Text>
        </View>
    )
}

export const getPlaceElement = (place: PlaceType) => {
    if(place) return <Place place={place} />
    else return <PlaceNone />
}