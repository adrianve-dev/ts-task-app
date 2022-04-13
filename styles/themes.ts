//#region TS TYPES

type Theme = {
    color: string,
    backgroundColor: string,
}


type FullTheme = {
    light: Theme,
    dark: Theme,
}

//#endregion

//#region THEMES

const THEME_KEYS = {
    REACT: 'React',
    DEFAULT: 'Default',
}

const DefaultTheme: FullTheme = {
    light: {
        color: 'black',
        backgroundColor: 'white',
    },
    dark: {
        color: 'white',
        backgroundColor: 'black'
    }
}

const ReactTheme: FullTheme = {
    light: {
        color: 'black',
        backgroundColor: '#61dafb',
    },
    dark: {
        color: 'white',
        backgroundColor: '#282c34',
    }
}

//#endregion

export {
    FullTheme,
    Theme,
    THEME_KEYS,
    DefaultTheme,
    ReactTheme,
}