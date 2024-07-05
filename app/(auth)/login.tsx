import { useSignIn } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

enum SignInType {
    phone,
    email,
    google,
    apple
}
const Login = () => {
    const [countryCode, setCountryCode] = useState('+91');
    const [phoneNumber, setPhoneNumber] = useState('');
    const keyboardVerticalOffset = Platform.OS === 'android' ? 90 : 0;
    const router = useRouter();
    const { signIn } = useSignIn();

    const onSignIn = async (type: SignInType) => {
        if (type === SignInType.phone) {

            try {
                const fullPhoneNumber = `${countryCode}${phoneNumber}`;
                const { supportedFirstFactors } = await signIn!.create({
                    identifier: fullPhoneNumber
                });

                const findPhoneNumber:any = supportedFirstFactors.find((factor:any)=>{
                    return factor.strategy === 'phone_code';
                })

                const {phoneNumberId} = findPhoneNumber;

                await signIn!.prepareFirstFactor({
                    strategy :'phone_code',
                     phoneNumberId
                });

                router.push({pathname: '/verify/[phone]',params: {phone:findPhoneNumber,signin:'true'}})
            } catch (error) {
console.log("error",JSON.stringify(error,null,2));

            }

        }
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}>


            <View style={styles.container}>
                <Text style={styles.header}>Welcome Back</Text>
                <Text style={styles.descriptionText}>Enter your phone number. we will send you confirmation code there</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={[styles.input, { width: 100 }]} keyboardType='numeric' placeholder='Country Code' placeholderTextColor='grey' value={countryCode} />
                    <TextInput style={[styles.input, { flex: 1 }]} keyboardType='numeric' placeholder='Mobile Number' value={phoneNumber}
                        onChangeText={setPhoneNumber} />
                </View>

                <TouchableOpacity onPress={() => onSignIn(SignInType.phone)}
                    style={[(phoneNumber !== '' ? styles.enabled : styles.disabled), { marginTop: 20, borderRadius: 18, marginHorizontal: 10, marginBottom: 20 }]}  >
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, padding: 10 }}>Continue</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                    <View style={{ flex: 1, backgroundColor: 'grey', height: 1 }} />
                    <Text style={{ color: 'black', fontSize: 25 }}>or</Text>
                    <View style={{ flex: 1, backgroundColor: 'grey', height: 1 }} />
                </View>

                <TouchableOpacity onPress={() => onSignIn(SignInType.email)}
                    style={{ justifyContent: 'center', padding: 10, flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: 'white', borderRadius: 18, marginHorizontal: 10, height: '7%' }}>
                    <Ionicons size={24} name="mail" color={'black'} />
                    <Text style={{ fontSize: 20, color: 'black', fontWeight: '600', marginLeft: 5 }}>Continue with email</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onSignIn(SignInType.google)}
                    style={{ justifyContent: 'center', padding: 10, flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: 'white', borderRadius: 18, marginHorizontal: 10, height: '7%' }}>
                    <Ionicons size={24} name="logo-google" color={'black'} />
                    <Text style={{ fontSize: 20, color: 'black', fontWeight: '600', marginLeft: 5 }}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onSignIn(SignInType.apple)}
                    style={{ justifyContent: 'center', padding: 10, flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: 'white', borderRadius: 18, marginHorizontal: 10, height: '7%' }}>
                    <Ionicons size={24} name="logo-apple" color={'black'} />
                    <Text style={{ fontSize: 20, color: 'black', fontWeight: '600', marginLeft: 5 }}>Continue with Apple</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent:'center',
        // backgroundColor: 'white'
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    descriptionText: {
        fontSize: 18,
        fontWeight: '300',
        padding: 5,
        marginTop: 15,
        marginLeft: 10
    },
    inputContainer: {
        marginVertical: 40,
        flexDirection: 'row',
        marginLeft: 10
    },
    input: {
        backgroundColor: 'lightgrey',
        padding: 20,
        fontSize: 20,
        borderRadius: 16,
        marginRight: 10
    },
    enabled: {
        backgroundColor: 'black'
    },
    disabled: {
        backgroundColor: 'grey'
    },
    buttontext: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
})

export default Login;