import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
// import HomeScreen from "./screens/homeScreen";
import Dashboard from "./screens/dashboard";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3366FF',
    text: 'white',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Dashboard />
    </PaperProvider>
  );
}
