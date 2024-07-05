import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, Link, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {Text} from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BackHandler, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
const CLERK_PUBLISHER_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(tabs)',
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const Router = useRouter();
  const { isLoaded, isSignedIn} = useAuth();
  const segments = useSegments();
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    console.log("isSignedIn",isSignedIn);
    if(!isLoaded) return;

    const inAuthGroup = segments[0] === '(authenticated)';

    if(isSignedIn && !inAuthGroup){
      router.replace('/(authenticated)/(tabs)/home');
    }else if(!isSignedIn){
      router.replace('/');
    }
    
  }, [isSignedIn]);

  if (!loaded || !isLoaded) {
    return <Text>Loading....</Text>;
  }

  return (

    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/signup" options={{
        title: '', headerTitle: '', headerShadowVisible: false,
        headerStyle: { backgroundColor: 'white' }, headerLeft: () =>
          <TouchableOpacity onPress={Router.back}>
            <Ionicons name="arrow-back" size={30} color={'black'} />
          </TouchableOpacity>

      }} />
      <Stack.Screen name="(auth)/login" options={{
        title: '', headerTitle: '', headerShadowVisible: false,
        headerStyle: { backgroundColor: 'white' },
        headerLeft: () => (
          <TouchableOpacity onPress={Router.back}>
            <Ionicons name="arrow-back" size={30} color={'black'} />
          </TouchableOpacity>),
        headerRight: () => (
          // <Link href={'/help'} asChild>
          <TouchableOpacity onPress={() => Router.push('/help')}>
            <Ionicons name="help-circle-outline" size={30} color={'black'} />
          </TouchableOpacity>
          // </Link>
        )

      }} />

      <Stack.Screen name="help" options={{ title: 'Help', presentation: 'modal' }} />

      <Stack.Screen name="verify/[phone]" options={{
        title: '', headerTitle: '', headerShadowVisible: false,
        headerStyle: { backgroundColor: 'white' }, headerLeft: () =>
          <TouchableOpacity onPress={Router.back}>
            <Ionicons name="arrow-back" size={30} color={'black'} />
          </TouchableOpacity>

      }} />

<Stack.Screen name="(authenticated)/(tabs)" options={{ headerShown:false }} />
    </Stack>
  )

}

const RootLayoutNav = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHER_KEY!} tokenCache={tokenCache}>
    <GestureHandlerRootView>
      <StatusBar style='light' />
      <InitialLayout />
    </GestureHandlerRootView>
    </ClerkProvider>

  );
}

export default RootLayoutNav;
