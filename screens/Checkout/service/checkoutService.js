import { baseUrl } from '../../../constants';
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
    const options = {
      method: 'POST',
      body: formData,
    };
    const response = await fetch(`${baseUrl}/transactions`, options);
    const responseJson = await response.json();

    console.log(responseJson);

    return;
  };

  return {
    fetchCarts,
    fetchBanks,
    post,
  };
})();

export default checkoutService;
