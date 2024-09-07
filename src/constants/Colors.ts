const pallete = {
  white: '#FFFFFF',
  black: '#000000',

  primaryWhite: '#e7e5e8',
  primaryBlack: '#01080a',

  deepRed: '#FF0000',
  darkRed: '#942020',
  deepPurple: '#7B35DA',
  purple: '#270B53',
  fadedPurple: 'rgba(39, 11, 83, 0.47)',
  darkPurple: '#230F69',
  lightPurple: '#F5F2FF',
  blue: '#124E78',
  orange: '#FE5F55',
  lightRed: '#FCCCCC',
  lightPink: '#F5F2FFDE',
  black1: '#202020',
  grey1: '#e3e3e3',
  grey2: '#424242',
  grey3: '#475467',
  purpleGrey: '#9589A8',
  purple1: '#5619B8',
} as const;

export const Colors = {
  ...pallete,
  backgroundWhite: pallete.primaryWhite,
  backgroundBlack: pallete.primaryBlack,

  seperator: pallete.primaryBlack,

  textInput: {
    light: {
      main: pallete.primaryWhite,
    },
    dark: {
      main: pallete.primaryWhite,
    },
  },

  texts: {
    light: {
      black: pallete.primaryBlack,
      white: pallete.white,
      deepPurple: pallete.deepPurple,
      darkPurple: pallete.darkPurple,
      purple: pallete.purple,
      grey3: pallete.grey3,
      darkRed: pallete.darkRed,
      purpleGrey: pallete.purpleGrey,
      purple1: pallete.purple1,
    },

    dark: {
      black: pallete.primaryBlack,
      white: pallete.white,
      deepPurple: pallete.deepPurple,
      purple: pallete.purple,
      darkPurple: pallete.darkPurple,
      grey3: pallete.grey3,
      darkRed: pallete.darkRed,
      purpleGrey: pallete.purpleGrey,
      purple1: pallete.purple1,
    },
  },

  buttons: {
    light: {
      primary: pallete.deepPurple,
      secondary: pallete.primaryWhite,
      success: pallete.primaryWhite,
      danger: pallete.primaryWhite,
    },
    dark: {
      primary: pallete.deepPurple,
      secondary: pallete.primaryBlack,
      success: pallete.primaryBlack,
      danger: pallete.primaryBlack,
    },
  },
};
