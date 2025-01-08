// import { useState } from 'react';
// import { View, Pressable } from 'react-native';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';


// GoogleSignin.configure({
// 	webClientId: GOOGLE_WEB_CLIENT_ID,
// 	androidClientId: GOOGLE_ANDROID_CLIENT_ID,
// 	iosClientId: GOOGLE_IOS_CLIENT_ID,
// 	scopes: ['profile', 'email'],
// });

// const GoogleLogin = async () => {
// 	await GoogleSignin.hasPlayServices();
// 	const userInfo = await GoogleSignin.signIn();
// 	return userInfo;
// };

// export default function Goooglelogin() {
// 	const [error, setError] = useState('');
// 	const [loading, setLoading] = useState(false);

// 	const handleGoogleLogin = async () => {
// 		setLoading(true);
// 		try {
// 			const response = await GoogleLogin();
// 			const { idToken, user } = response;

// 			if (idToken) {
// 				const resp = await authAPI.validateToken({
// 					token: idToken,
// 					email: user.email,
// 				});
// 				await handlePostLoginData(resp.data);
// 			}
// 		} catch (apiError) {
// 			setError(
// 				apiError?.response?.data?.error?.message || 'Something went wrong'
// 			);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return (
// 		<View>
// 			<Pressable onPress={handleGoogleLogin}>Continue with Google</Pressable>
// 		</View>
// 	);
// }


import React from 'react'
import { View } from 'react-native'

const Goooglelogin = () => {
  return (
	<View>Goooglelogin</View>
  )
}

export default Goooglelogin