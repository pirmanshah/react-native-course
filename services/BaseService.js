import { AcsessToken } from '../constants';
import { baseUrl } from '../constants/path';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BaseUrl = baseUrl;

const baseService = (() => {
  const fetchData = async (endpoint, options) => {
    const response = await fetch(`${BaseUrl}/${endpoint}`, options);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson;
  };

  const fetchPrivateData = async (endpoint, method = 'GET', payload) => {
    try {
      const token = await AsyncStorage.getItem(AcsessToken);

      const options = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      if (method === 'POST' || method === 'PUT') {
        options.body = JSON.stringify(payload);
      }

      const response = await fetch(`${BaseUrl}/${endpoint}`, options);
      const responseJson = await response.json();

      const { status, message } = responseJson;

      if (status !== 'success') {
        throw new Error(message);
      }

      return responseJson;
    } catch (error) {
      throw new Error(`Warning: ${error.message}`);
    }
  };

  const fetchFeatures = async () => {
    const responseJson = await fetchData('features');
    const { data } = responseJson;

    return data.items;
  };

  return {
    fetchData,
    fetchFeatures,
    fetchPrivateData,
  };
})();

export default baseService;
