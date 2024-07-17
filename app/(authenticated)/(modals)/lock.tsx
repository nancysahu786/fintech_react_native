import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from 'expo-haptics';
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as LocalAuthentication from 'expo-local-authentication';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import { transform } from "@babel/core";
const Lock = () => {
    const user = useUser();
    console.log("user", user);

    const [firstName, setFirstName] = useState(user?.user?.firstName);
    const [code, setCode] = useState<number[]>([]);
    const codeLength = Array(6).fill(0);
    const router = useRouter();
    const offset = useSharedValue(0);

    const style = useAnimatedStyle(()=>{
        return {
            transform: [ {translateX: offset.value}]
        }
    })
    const OFFSET = 20;
    const TIME = 80;

    const onNumberPress = async (number: number) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setCode([...code, number])
    }

    const numberBackSpace = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setCode(code.slice(0, -1));
    }

    const onBiometricAuthPress = async () => {
        const { success } = await LocalAuthentication.authenticateAsync();
        console.log("success",success);
        
        if (success) {
            router.replace('/(authenticated)/(tabs)/home');
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
    }

    useEffect(() => {
        if (code.length === 6) {
            console.log("code", code.join(''));

            if (code.join('') === '123456') {
                router.replace('/(authenticated)/(tabs)/home');
                setCode([])
            } else {
                offset.value = withSequence(
                    withTiming(-OFFSET,{duration:TIME/2}),
                    withRepeat(withTiming(-OFFSET,{duration:TIME}),4,true),
                    withTiming(0,{duration:TIME/2}),
                )
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                setCode([])
            }

        }
    }, [code])
    return (
        <SafeAreaView>
            <Text style={inStyles.greetings}>Welcome Back, {firstName}</Text>
            <Animated.View style={[inStyles.codeView,style]}>
                {
                    codeLength.map((_, index) => (
                        <View key={index} style={[inStyles.codeEmpty, {
                            backgroundColor: code[index] ? 'black' : 'lightblue'
                        }]} />
                    ))
                }
            </Animated.View>
            <View style={[inStyles.numbersView]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


                    {
                        [1, 2, 3].map((number, index) => (
                            <TouchableOpacity key={index} onPress={() => onNumberPress(number)}>
                                <Text style={inStyles.number}>{number}</Text>
                            </TouchableOpacity>
                        ))
                    }

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


                    {
                        [4, 5, 6].map((number, index) => (
                            <TouchableOpacity key={index} onPress={() => onNumberPress(number)}>
                                <Text style={inStyles.number}>{number}</Text>
                            </TouchableOpacity>
                        ))
                    }

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


                    {
                        [7, 8, 9].map((number, index) => (
                            <TouchableOpacity key={index} onPress={() => onNumberPress(number)}>
                                <Text style={inStyles.number}>{number}</Text>
                            </TouchableOpacity>
                        ))
                    }

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>


                    <TouchableOpacity onPress={onBiometricAuthPress}>
                        <MaterialCommunityIcons name="face-recognition" size={26} color={'black'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onNumberPress(0)}>
                        <Text style={inStyles.number}>0</Text>
                    </TouchableOpacity>
                    <View style={{ minWidth: 30 }}>
                        {
                            code.length > 0 &&
                            <TouchableOpacity onPress={numberBackSpace}>
                                <Text style={inStyles.number}>
                                    <MaterialCommunityIcons name="backspace-outline" size={26} color={'black'} />
                                </Text>
                            </TouchableOpacity>
                        }
                    </View>

                </View>
                <Text style={{ alignSelf: 'center', color: 'black', fontSize: 18, fontWeight: '500' }}>
                    Forget your Password?
                </Text>
            </View>
        </SafeAreaView>
    )
}

const inStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    greetings: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 80,
        alignSelf: 'center'
    },
    codeView: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginVertical: 100,
        alignItems: 'center'
    },
    codeEmpty: {
        width: 20,
        height: 20,
        borderRadius: 10,

    },
    numbersView: {
        marginHorizontal: 80,
        gap: 60
    },
    number: {
        fontSize: 32
    }
})

export default Lock;