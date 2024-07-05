import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import Phone from '../verify/[phone]';

const Signup = () => {
    const [countryCode, setCountryCode] = useState('+91');
    const [phoneNumber, setPhoneNumber] = useState('');
    const keyboardVerticalOffset = Platform.OS === 'android' ? 90 :0;
    const router = useRouter();
    const {signUp} = useSignUp();

    const onSignup = async () => {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;
        try {
            await signUp!.create({
                phoneNumber:fullPhoneNumber
            });
            signUp!.preparePhoneNumberVerification();
            router.push({pathname:'/verify/[phone]',params:{phone:fullPhoneNumber}})
        } catch (error) {
            console.log("Error sign in up",error);
            
        }

    }
    return (
        <KeyboardAvoidingView style={{flex:1}} behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}>

        
        <View style={styles.container}>
            <Text style={styles.header}>Let's get started!</Text>
            <Text style={styles.descriptionText}>Enter your phone number. we will send you confirmation code there</Text>
            <View style={styles.inputContainer}>
                <TextInput style={[styles.input, { width: 100 }]} keyboardType='numeric' placeholder='Country Code' placeholderTextColor='grey' value={countryCode} />
                <TextInput style={[styles.input, { flex: 1 }]} keyboardType='numeric' placeholder='Mobile Number' value={phoneNumber}
                    onChangeText={setPhoneNumber} />
            </View>

            <Link href={'/login'} replace asChild>
                <TouchableOpacity>
                    <Text>Already have an Account? login here</Text>
                </TouchableOpacity>
            </Link>
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={onSignup}
                style={[(phoneNumber !== '' ? styles.enabled : styles.disabled), {  marginTop: 20, borderRadius: 16, marginHorizontal: 10, marginBottom: 20 }]}  >
                <Text style={{ color: 'white', textAlign: 'center', padding: 10 }}>Sign Up</Text>
            </TouchableOpacity>
        </View>
         </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent:'center',
        backgroundColor:'white'
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
    }
})

export default Signup;