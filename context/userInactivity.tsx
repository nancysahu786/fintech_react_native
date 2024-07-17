import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const UserInactivityProvider = ({ children }: any) => {
    const appState = useRef(AppState.currentState);
    const router = useRouter();
    const { isSignedIn } = useAuth();

    useEffect(() => {
        const subscription = AppState.addEventListener("change", handleAppStateChange);
        // clearAsyncStorageData(); 
        return () => {
            subscription.remove();
            // clearAsyncStorageData();
        }
    }, []);

    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
        if (nextAppState === 'background') {
            recordStartTime();
        } else if (nextAppState === 'active' && appState.current.match(/background/)) {
            console.log("we are back", await AsyncStorage.getItem('startTime'));
if(isSignedIn){
    const getData: any = await AsyncStorage.getItem('startTime');
    const elapsed = Date.now() - getData;
    console.log("elapsed", elapsed);
    console.log("isSignedIn", isSignedIn);
    console.log("isSignedIn", isSignedIn);
    if (elapsed > 3000 && isSignedIn) {
        console.log("isSignedIn", isSignedIn);

        router.replace('/(authenticated)/(modals)/lock')
    }
    else {
        console.log("cleared");

        clearAsyncStorageData();
    }
}
           

        }

        appState.current = nextAppState;
        console.log(nextAppState);
        console.log("isSignedIn", isSignedIn);
        console.log("isSignedIn", isSignedIn);
    }

    const recordStartTime = async () => {
        console.log("record starting time");

        const now = new Date();
        // const startingTime = JSON.stringify(now);
        // console.log(startingTime);
        const milisec = JSON.stringify(new Date(now).getTime());

        await AsyncStorage.setItem('startTime', milisec);
    }

    const clearAsyncStorageData = async () => {
        await AsyncStorage.removeItem('startTime'); // Remove stored start time
    }

    return children;
}