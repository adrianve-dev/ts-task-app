import { ColorSchemeName, useColorScheme } from "react-native";
import { ReactTheme, Theme, DefaultTheme, THEME_KEYS } from "../styles/themes";

const useTheme = (): Theme => {
    // gets color scheme preference
    const colorScheme = useColorScheme() as NonNullable<ColorSchemeName>

    // TODO: check redux store for custom theme selection
    const customTheme: string = THEME_KEYS.REACT

    // return color scheme
    switch(customTheme) {
        case THEME_KEYS.REACT: return ReactTheme[colorScheme]
        default: return DefaultTheme[colorScheme]
    }
}

export default useTheme