const pallete = {
  white: '#FFFFFF',
  black: '#000000',

  primaryWhite: '#e7e5e8',
  primaryBlack: '#01080a',

  deepRed: '#FF0000',
  deepPurple: '#8754FE',
  blue: '#124E78',
  orange: '#FE5F55',
  black1: '#202020',
  grey1: '#e3e3e3',
  grey2: '#424242',
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
      white: pallete.primaryBlack,
    },

    dark: {
      black: pallete.primaryWhite,
      white: pallete.primaryWhite,
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
      primary: pallete.primaryBlack,
      secondary: pallete.primaryBlack,
      success: pallete.primaryBlack,
      danger: pallete.primaryBlack,
    },
  },
};
