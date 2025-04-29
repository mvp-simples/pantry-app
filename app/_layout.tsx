import "@/src/i18n";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "../src/theme/themeProvider";
import { useState } from "react";
import { SessionProvider } from "@/ctx";
import AppBar from "@/src/componets/appBar";

export default function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <SessionProvider>
      <ThemeProvider>
        <StatusBar style="dark" backgroundColor="#13332E" translucent={false} />

        <Stack>
          {/* Aqui você define por tela se tem ou não header */}
          <Stack.Screen
            name="login" // 👈 este é o login
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="register" // 👈 este é o login
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(app)" // 👈 este é o login
            options={{
              header: () => <AppBar />, // <<< define o seu próprio header
            }}
          />
          {/* as outras telas usam header normalmente */}
        </Stack>
      </ThemeProvider>
    </SessionProvider>
  );
}
