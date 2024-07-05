import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { Link, useLocalSearchParams } from 'expo-router';
import { Fragment, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;


const Phone = () => {
  const { phone, signin } = useLocalSearchParams<{ phone: string, signin: string }>();
  const [code, setCode] = useState('');
  const { signIn } = useSignIn();
  const { signUp,setActive } = useSignUp();

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    if (code.length == 6) {
      console.log("code", code);

      if (signin === 'true') {
        verifySignIn();
      } else {
        verifyCode();
      }
    }
  }, [code]);

  const verifyCode = async () => {
 try {
  await signUp!.attemptPhoneNumberVerification({
    code,
  });

  await setActive!({ session: signUp!.createdSessionId});
 } catch (error) {
  console.log("error",JSON.stringify(error,null,2));
  if(isClerkAPIResponseError(error)){
    Alert.alert('Error',error.errors[0].message);
  }
  
 }
  };


  const verifySignIn = async () => {
    try {
      await signIn!.attemptFirstFactor({
        strategy:'phone_code',
        code,
      });
    
      await setActive!({ session: signIn!.createdSessionId});
     } catch (error) {
      console.log("error",JSON.stringify(error,null,2));
      if(isClerkAPIResponseError(error)){
        Alert.alert('Error',error.errors[0].message);
      }
      
     }
  };
  return (
    <View style={styles.container}>

      <Text style={styles.header}>6-digit code</Text>
      <Text style={styles.descriptionText}>Code sent to {phone} unless you already have an Account</Text>

      <CodeField
        ref={ref}
        {...props}

        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
        testID="my-code-input"
        renderCell={({ index, symbol, isFocused }) => (

          <Fragment key={index}>
            <View key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              <Text style={styles.cellText}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>

            {index === 2 ? <View key={`seperator-${index}`} style={styles.seperator} /> : ''}
          </Fragment>

        )}
      />
      <Link href={'/login'} replace asChild>
        <TouchableOpacity>
          <Text>Already have an Account? login here</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

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
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 12
  },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    borderRadius: 8
    // lineHeight: 38,
    // fontSize: 24,
    // borderWidth: 2,
    // borderColor: '#00000030',
    // textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  cellText: {
fontSize:35,
color:'#000',
textAlign:'center'
  },
  seperator: {
    height: 2,
    width: 10,
    backgroundColor: 'grey',
    alignSelf: 'center'
  }
})

export default Phone;