import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { GlobalDrawer } from '@/components/global-drawer';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { Alert, Text } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const AuthPass = () => {
  const [isSessionLoading, setIsSessionLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)

  const router = useRouter()

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setIsSessionLoading(false);

        if (!session) {
          // router.push('/auth/login');
        }
      } catch (error) {
        Alert.alert(`Error fetching session ${error}`);
        console.error('Error fetching session:', error);
        setIsSessionLoading(false);
      }
    };

    fetchSession();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsSessionLoading(false);

      if (!session) {
        // router.push('/auth/login');
      }
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  if (isSessionLoading) {
    return (
      <Text>loading session...</Text>
    );
  }

  /*
  if (!session) {
    return (
      <Text>not authenticated</Text>
    )
  }
  */

  // Show only auth stack if not authenticated
  /*
  if (!session) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="auth"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    );
  }
  */

  return (
    <GlobalDrawer />
  );
}


// Custom light theme, if needed
const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',  // Set the background to white or another light color
    text: '#000',        // Set text color to black for better contrast
  },
};

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
  }, [, loaded]);

  if (!loaded) {
    return (
      <Text>asset loading...</Text>
    );
  }

  /*
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Text>hello</Text>
      </QueryClientProvider>
    </ThemeProvider>
  )
  */

  return (
    <ThemeProvider value={LightTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthPass />
      </QueryClientProvider>
    </ThemeProvider>
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
