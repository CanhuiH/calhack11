// /app/_layout.tsx
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'index') {
            iconName = 'home';
          } else if (route.name === 'playing') {
            iconName = 'play-circle';
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#A259FF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Library',
          tabBarLabel: 'home',
        }}
      />
      <Tabs.Screen
        name="[storyId]"
        options={{
          title: 'Now Playing',
          tabBarLabel: '',
        }}
      />
    </Tabs>
  );
}