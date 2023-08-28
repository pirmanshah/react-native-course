import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: { width: '70%' },
  title: {
    fontSize: 22,
    marginBottom: SIZES.medium + 5,
    textAlign: 'center',
  },
  email: {
    height: 45,
    borderWidth: 0.8,
    padding: 10,
    borderRadius: 4,
    marginBottom: 5,
  },
  password: {
    height: 45,
    borderWidth: 0.8,
    padding: 10,
    borderRadius: 4,
    marginVertical: 5,
  },
  errorText: { color: 'red', fontSize: 10, marginBottom: 5 },
  loginButton: {
    alignItems: 'center',
    backgroundColor: 'teal',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 4,
  },
  loginText: { color: '#FFF', fontSize: 18, fontWeight: 600 },
  registerText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginTop: 20,
  },
});
