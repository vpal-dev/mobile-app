import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { PostHogProvider, usePostHog } from 'posthog-react-native'

import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { GlobalDrawer } from '@/components/global-drawer';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import { supabase } from '@/lib/supabase';
import { Alert, Text } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const AuthPass = () => {
  const [isSessionLoading, setIsSessionLoading] = useState(true)
  const posthog = usePostHog();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsSessionLoading(false);

        // identify for analytics
        posthog.identify(session?.user?.id, {
          name: session?.user?.user_metadata?.full_name,
        });

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
      <PostHogProvider apiKey="phc_eNOKoryFVm1I5UWRHNFGCGW8C8JUpKT2FnoO7XPESuQ" options={{
        host: "https://us.i.posthog.com",

        enableSessionReplay: true,
        sessionReplayConfig: {
          // Whether text inputs are masked. Default is true.
          // Password inputs are always masked regardless
          // maskAllTextInputs: true,
          maskAllTextInputs: false,
          // Whether images are masked. Default is true.
          // maskAllImages: true,
          maskAllImages: false,
          // Capture logs automatically. Default is true.
          // Android only (Native Logcat only)
          captureLog: true,
          // Whether network requests are captured in recordings. Default is true
          // Only metric-like data like speed, size, and response code are captured.
          // No data is captured from the request or response body.
          // iOS only
          captureNetworkTelemetry: true,
          // Deboucer delay used to reduce the number of snapshots captured and reduce performance impact. Default is 500ms
          androidDebouncerDelayMs: 500,
          // Deboucer delay used to reduce the number of snapshots captured and reduce performance impact. Default is 1000ms
          iOSdebouncerDelayMs: 1000,
        },
      }}>
        <QueryClientProvider client={queryClient}>
          <AuthPass />
        </QueryClientProvider>
      </PostHogProvider>
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

