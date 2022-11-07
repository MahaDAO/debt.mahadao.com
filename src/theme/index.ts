import {
  black,
  dark,
  pink,
  purple,
  teal,
  grey,
  transparent,
  gradients,
  red,
  white,
  green,
  yellow,
  transparentog,
  primary,
  light
} from './colors'

const theme = {
  borderRadius: 12,
  color: {
    black,
    grey,
    dark,
    pink,
    purple,
    primary,
    red,
    green,
    secondary: {
      main: teal[200],
    },
    light,
    white,
    teal,
    transparent,
    transparentog,
    gradients,
    yellow
  },
  siteWidth: 1200,
  spacing: {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    7: 64,
  },
  topBarSize: 72,
}

export default theme
