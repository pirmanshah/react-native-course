import { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableHighlight, Alert } from 'react-native';
import LoadingOverlay from '../../components/LoadingOverlay';
import { AuthContext } from '../../store/AuthContext';
import loginService from './service/loginService';
import { SIZES } from '../../constants';

const Login = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authCtx = useContext(AuthContext);

  async function loginHandler() {
    setIsAuthenticating(true);
    try {
      if (email === '' || password === '') {
        setIsAuthenticating(false);
        return Alert.alert(
          'Authentication failed!',
          'Could not log you in. Please check your credentials or try again later!'
        );
      }
      const { accessToken, user } = await loginService.login({
        email,
        password,
      });
      authCtx.authenticate(accessToken, user);
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{ width: '70%' }}>
        <Text
          style={{
            fontSize: 22,
            marginBottom: SIZES.medium,
            textAlign: 'center',
          }}
        >
          Welcome Back 🎉
        </Text>
        <TextInput
          style={{
            height: 45,
            borderWidth: 0.8,
            padding: 10,
            borderColor: 'gray',
            borderRadius: 4,
            marginBottom: 10,
          }}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={{
            height: 45,
            borderWidth: 0.8,
            padding: 10,
            borderColor: 'gray',
            borderRadius: 4,
          }}
          secureTextEntry
          value={password}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
        />
        <View style={{ marginTop: SIZES.xLarge }}>
          <TouchableHighlight onPress={loginHandler}>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'teal',
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 4,
              }}
            >
              <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 600 }}>
                Login
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default Login;
