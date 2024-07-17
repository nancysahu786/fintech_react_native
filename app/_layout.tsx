import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, Link, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {Text, View} from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BackHandler, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
// const CLERK_PUBLISHER_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const CLERK_PUBLISHER_KEY = "pk_test_c2tpbGxlZC1tYW1tb3RoLTg3LmNsZXJrLmFjY291bnRzLmRldiQ";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import { UserInactivityProvider } from '@/context/userInactivity';
import { StripeProvider } from '@stripe/stripe-react-native';
const queryClient = new QueryClient();


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
<Stack.Screen name="(authenticated)/crypto/[id]" options={{ 
  title:'',
  headerLeft: () => (
    <TouchableOpacity onPress={Router.back}>
      <Ionicons name="arrow-back" size={30} color={'black'} />
    </TouchableOpacity>),
    headerTransparent:true,
    headerLargeTitle:true,
    headerRight: () => (
      <View style={{flexDirection:'row',gap:10}}>
 <TouchableOpacity onPress={Router.back}>
      <Ionicons name="notifications-outline" size={30} color={'black'} />
    </TouchableOpacity>
    <TouchableOpacity onPress={Router.back}>
      <Ionicons name="star-outline" size={30} color={'black'} />
    </TouchableOpacity>
      </View>
    )
 }} />
 <Stack.Screen name="(authenticated)/(modals)/lock" options={{ headerShown:false,animation:'none' }} />
 <Stack.Screen name="(authenticated)/(modals)/account" options={{presentation:'transparentModal',
  animation:'fade',title:'',headerTransparent:true,
  headerLeft: () => (
    <TouchableOpacity onPress={Router.back}>
      <Ionicons name="close-outline" size={30} color={'white'} />
    </TouchableOpacity>),
  }} />
    </Stack>
  )

}

const RootLayoutNav = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHER_KEY!} tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <UserInactivityProvider>
        <StripeProvider publishableKey='pk_test_51PcOMjRxXTmQy86Asl8fb0ZQLyqRxr0NbUTSMTNj4yBLZqP5TQJne6bAQP0wJB5z2LPd41RR73U1Nt3B8PM8wulL003eSQmNVl'>

    <GestureHandlerRootView>
      <StatusBar style='light' />
      <InitialLayout />
    </GestureHandlerRootView>
    </StripeProvider>
    </UserInactivityProvider>
    </QueryClientProvider>
    </ClerkProvider>

  );
}

export default RootLayoutNav;
