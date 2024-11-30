import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Typically, auth screens don't have headers
      }}
    >
      {/* Auth stack screens */}
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
        }}
      />

      <Stack.Screen
        name="otp-verify"
        options={{
          title: 'OTP Verify',
        }}
      />

      <Stack.Screen
        name="privacy-policy"
        options={{
          title: 'Privacy Policy',
        }}
      />

      <Stack.Screen
        name="terms-of-service"
        options={{
          title: 'Terms of Service',
        }}
      />
    </Stack>
  );
}
