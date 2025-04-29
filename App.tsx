import { Slot } from 'expo-router';
import { ThemeProvider } from './src/theme/themeProvider';
import { StatusBar } from 'expo-status-bar'; // importa a StatusBar do Expo

export default function App() {
  return (
    <ThemeProvider>
      {/* Define a aparência da StatusBar para o app todo */}
      <StatusBar style="light" backgroundColor="#13332E" translucent={false} />

      <Slot />
    </ThemeProvider>
  );
}
