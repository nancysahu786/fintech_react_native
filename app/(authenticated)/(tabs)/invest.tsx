import {PlatformPay, PlatformPayButton, StripeProvider, usePlatformPay} from '@stripe/stripe-react-native';
import { useEffect } from 'react';
import { Alert } from 'react-native';
const API_URL = 'http://192.168.1.5:3000';
function Invest() {
  const {
    isPlatformPaySupported,
    confirmPlatformPayPayment,
  } = usePlatformPay();

//   useEffect(() => {
//     (async function () {
//       if (!(await isPlatformPaySupported({ googlePay: {testEnv: true} }))) {
//         Alert.alert('Google Pay is not supported.');
//         return;
//       }
//     })();
//   }, []);

  const fetchPaymentIntentClientSecret = async () => {
    // Fetch payment intent created on the server, see above
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: 'usd',
      }),
    });
    console.log(response);
    
    const { client_secret } = await response.json();
console.log("clientSecret",client_secret);

    return client_secret;
  };

  const pay = async () => {
    const clientSecret = await fetchPaymentIntentClientSecret();

    const { error } = await confirmPlatformPayPayment(
      clientSecret,
      {
        googlePay: {
          testEnv: true,
          merchantName: 'My merchant name',
          merchantCountryCode: 'US',
          currencyCode: 'USD',
          billingAddressConfig: {
            format: PlatformPay.BillingAddressFormat.Full,
            isPhoneNumberRequired: true,
            isRequired: true,
          },
        },
      }
    );

    if (error) {
      Alert.alert(error.code, error.message);
      // Update UI to prompt user to retry payment (and possibly another payment method)
      return;
    }
    Alert.alert('Success', 'The payment was confirmed successfully.');
  };

  return (
      <PlatformPayButton
        type={PlatformPay.ButtonType.Pay}
        onPress={pay}
        style={{
          width: '100%',
          height: 50,
        }}
      />

  );
}

export default Invest;