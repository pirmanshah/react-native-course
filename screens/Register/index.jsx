import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useQuery } from 'react-query';
import {
  View,
  Text,
  Alert,
  TextInput,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import LoadingOverlay from '../../components/LoadingOverlay';
import CheckboxList from '../../components/CheckboxList';
import registerService from './service/registerService';
import { SIZES } from '../../constants';
import { styles } from './styles';

const Register = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);

  const { data: categories = [] } = useQuery(
    'categories',
    registerService.fetchCategory
  );

  const { data: level = [], isLoading: levelLoading = false } = useQuery(
    'level',
    registerService.fetchLevel
  );

  const { data: topic = [], isLoading: topicLoading = false } = useQuery(
    'topic',
    registerService.fetchTopic
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
      if (
        selectedCategory.length <= 0 ||
        selectedTopic.length <= 0 ||
        selectedLevel.length <= 0
      ) {
        return Alert.alert(
          'Register failed!',
          'Could not register. Please choose one interest!'
        );
      }

      await registerService.register(
        JSON.stringify({
          ...payload,
          category: selectedCategory.join(', '),
          level: selectedLevel.join(', '),
          topic: selectedTopic.join(', '),
        })
      );

      formik.resetForm();
      Alert.alert('Register success!', 'Registration has been successful! ✅');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert(
        'Register failed!',
        'Could not register. Please check your input or try again later!'
      );
    }
  };

  const handleLevelChange = (selectedItems) => {
    setSelectedLevel(selectedItems);
  };

  const handleTopicChange = (selectedItems) => {
    setSelectedTopic(selectedItems);
  };

  const handleCategoryChange = (selectedItems) => {
    setSelectedCategory(selectedItems);
  };

  if (levelLoading || topicLoading) {
    return <LoadingOverlay />;
  }

  return (
    <ScrollView style={{ marginTop: 55, paddingBottom: 20 }}>
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

          <CheckboxList
            title="Level Belajar:"
            items={level}
            onChange={handleLevelChange}
          />

          <CheckboxList
            items={topic}
            title="Topic Belajar:"
            onChange={handleTopicChange}
          />

          <CheckboxList
            items={categories}
            title="Kategori:"
            onChange={handleCategoryChange}
          />

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
    </ScrollView>
  );
};

export default Register;
