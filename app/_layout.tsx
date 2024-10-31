import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GluestackUIProvider} from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme() || 'light';
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
		<GluestackUIProvider config={config} colorMode={colorScheme}>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<Stack initialRouteName='home'>
					<Stack.Screen name="index" options={{ headerShown: false }} />
					<Stack.Screen name="wallet/[id]" options={{ headerShown: false }} />
					<Stack.Screen name="+not-found" />
				</Stack>
			</ThemeProvider>
		</GluestackUIProvider>
  );
}
