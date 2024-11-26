import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { GlobalDrawer } from '@/components/global-drawer';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Itim: require('../assets/fonts/Itim-Regular.ttf'),
    ['Satoshi-300']: require('../assets/fonts/Satoshi/300.ttf'),
    ['Satoshi-400']: require('../assets/fonts/Satoshi/400.ttf'),
    ['Satoshi-500']: require('../assets/fonts/Satoshi/500.ttf'),
    ['Satoshi-600']: require('../assets/fonts/Satoshi/600.ttf'),
    ['Satoshi-700']: require('../assets/fonts/Satoshi/700.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  const isAuthenticated = true;

  // Show only auth stack if not authenticated
  if (!isAuthenticated) {
    return (
      <Stack>
        <Stack.Screen
          name="auth"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    );
  }


  return (
    <GlobalDrawer />
  );

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
