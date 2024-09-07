const pallete = {
  white: '#FFFFFF',
  black: '#000000',

  primaryWhite: '#FFFFFF',
  primaryBlack: '#01080a',

  deepRed: '#FF0000',
  darkRed: '#942020',
  deepPurple: '#7B35DA',
  purple: '#270B53',
  fadedPurple: 'rgba(39, 11, 83, 0.47)',
  darkPurple: '#230F69',
  midPurple: '#F1E8FF',
  lightPurple: '#F5F2FF',
  purple: '#8754FE',
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
  purple2: '#8754FE',
  grey4: '#47546799',
  green: '#027A48',
  lightGreen: '#D1FADF',
  yellow: '#FFA224',
  lightYellow: '#FCEFD8',
  deepYellow: '#914421',
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

      grey4: pallete.grey4,
      green: pallete.green,
      lightGreen: pallete.lightGreen,
      yellow: pallete.yellow,
      deepYellow: pallete.deepYellow,
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

      grey4: pallete.grey4,
      green: pallete.green,
      lightGreen: pallete.lightGreen,
      yellow: pallete.yellow,
      deepYellow: pallete.deepYellow,
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
