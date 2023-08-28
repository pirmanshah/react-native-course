import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableHighlight, Alert } from 'react-native';
import LoadingOverlay from '../../components/LoadingOverlay';
import { AuthContext } from '../../store/AuthContext';
import loginService from './service/loginService';
import { SIZES } from '../../constants';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const showAlertFail = () => {
    return Alert.alert(
      'Authentication failed!',
      'Could not log you in. Please check your credentials or try again later!'
    );
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Email required!'),
      password: Yup.string().required('Password required!'),
    }),
    onSubmit: async (values) => {
      await handleLogin(JSON.stringify(values, null, 2));
    },
  });

  const handleLogin = async (payload) => {
    try {
      setIsAuthenticating(true);
      const { accessToken, user, status } = await loginService.login(payload);

      if (status !== 'success') {
        return showAlertFail();
      }

      authCtx?.authenticate(accessToken, user);
    } catch (error) {
      showAlertFail();
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Welcome Back 🎉</Text>
        <TextInput
          style={[
            styles.email,
            {
              borderColor:
                formik.errors.email && formik.touched.email ? 'red' : 'gray',
            },
          ]}
          placeholder="Email"
          value={formik.values.email}
          keyboardType="email-address"
          onChangeText={formik.handleChange('email')}
        />
        {formik.errors.email && formik.touched.email && (
          <Text style={styles.errorText}>{formik.errors.email}</Text>
        )}
        <TextInput
          style={[
            styles.password,
            {
              borderColor:
                formik.errors.password && formik.touched.password
                  ? 'red'
                  : 'gray',
            },
          ]}
          secureTextEntry
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
        />
        {formik.errors.password && formik.touched.password && (
          <Text style={styles.errorText}>{formik.errors.password}</Text>
        )}
        <View style={{ marginTop: SIZES.large }}>
          <TouchableHighlight onPress={formik.handleSubmit}>
            <View style={styles.loginButton}>
              <Text style={styles.loginText}>Login</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.registerText}>
          <Text>Don't have account?</Text>
          <Text
            style={{ color: 'teal' }}
            onPress={() => navigation.navigate('Register')}
          >
            register.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
