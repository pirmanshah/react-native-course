import AsyncStorage from '@react-native-async-storage/async-storage';
import { AcsessToken, baseUrl } from '../../../constants';
import baseService from '../../../services/BaseService';

const checkoutService = (() => {
  const fetchCarts = async () => {
    const responseJson = await baseService.fetchPrivateData('carts');
    const {
      data: { carts },
    } = responseJson;

    return carts;
  };

  const fetchBanks = async () => {
    const responseJson = await baseService.fetchPrivateData('banks');
    const {
      data: { banks },
    } = responseJson;

    return banks;
  };

  const post = async (formData) => {
    const token = await AsyncStorage.getItem(AcsessToken);

    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${baseUrl}/transactions`, options);
    const responseJson = await response.json();

    return responseJson;
  };

  return {
    fetchCarts,
    fetchBanks,
    post,
  };
})();

export default checkoutService;
