import { Stack } from 'expo-router';

export default function DocumentsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Typically, auth screens don't have headers
      }}
    >
      {/* Auth stack screens */}
      <Stack.Screen
        name="index"
        options={{
          title: 'Login',
        }}
      />
    </Stack>
  );
}
