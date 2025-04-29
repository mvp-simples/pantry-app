import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#F8D6C5',
    secondary: '#13332E',
    text: '#000000',
    onPrimary: '#13332E', // texto em cima do botão primário
    onBackground: '#000000',
    onSurface: '#000',
    error: '#B00020',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: '#13332E',
    surface: '#FFFFFF',
    primary: '#13332E',
    secondary: '#FBE1E0',
    text: '#F8D6C5',
    onPrimary: '#13332E',
    onBackground: '#F8D6C5',
    onSurface: '#F8D6C5',
    error: '#CF6679',
  },
};
