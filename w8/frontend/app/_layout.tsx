import './global.css'
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="books/index" />
      <Stack.Screen name="books/create" />
      <Stack.Screen name="books/[id]" />
    </Stack>
  );
}
