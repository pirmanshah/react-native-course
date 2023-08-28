import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useQuery } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import RadioGroup from 'react-native-radio-buttons-group';
import { View, Text, TextInput, TouchableHighlight, Alert } from 'react-native';
import registerService from './service/registerService';
import { SIZES } from '../../constants';
import { styles } from './styles';

const Register = () => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState();

  const { data: categories = [] } = useQuery(
    'categories',
    registerService.fetchCategory
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required!'),
      email: Yup.string()
        .email('Must be a valid email')
        .required('Email is required!'),
      password: Yup.string()
        .required('Password is required!')
        .min(3, 'Must be at least 3 characters long'),
    }),
    onSubmit: async (values) => {
      await handleRegister(values);
    },
  });

  const handleRegister = async (payload) => {
    try {
      if (selectedId === null || selectedId === undefined) {
        return Alert.alert(
          'Register failed!',
          'Could not register. Please choose one interest!'
        );
      }

      await registerService.register(
        JSON.stringify({
          ...payload,
          interest: selectedId,
        })
      );

      formik.resetForm();
      Alert.alert('Register success!', 'Registration has been successful!');
    } catch (error) {
      Alert.alert(
        'Register failed!',
        'Could not register. Please check your input or try again later!'
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Create new account 📝</Text>
        <TextInput
          style={[
            styles.name,
            {
              borderColor:
                formik.errors.name && formik.touched.name ? 'red' : 'gray',
            },
          ]}
          placeholder="Name"
          value={formik.values.name}
          onChangeText={formik.handleChange('name')}
        />
        {formik.errors.name && formik.touched.name && (
          <Text style={styles.errorText}>{formik.errors.name}</Text>
        )}

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

        <Text>Minat Belajar:</Text>
        <View>
          <RadioGroup
            containerStyle={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
            selectedId={selectedId}
            onPress={setSelectedId}
            radioButtons={categories}
          />
        </View>

        <View style={{ marginTop: SIZES.large }}>
          <TouchableHighlight onPress={formik.handleSubmit}>
            <View style={styles.registerButton}>
              <Text style={styles.registerText}>Register</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.loginText}>
          <Text>Already have account?</Text>
          <Text
            style={{ color: 'teal' }}
            onPress={() => navigation.navigate('Login')}
          >
            login.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Register;
