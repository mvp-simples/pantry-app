import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function TabLayout() {
  const theme = useTheme()

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarBackground: () => (<View style={{ flex: 1, backgroundColor: theme.colors.secondary }} />),
      tabBarActiveTintColor: theme.colors.primary
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
    </Tabs>
  );
}
