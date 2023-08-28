import baseService from '../../../services/BaseService';

const registerService = (() => {
  const register = async (payload) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    };

    const responseJson = await baseService.fetchData('users', options);
    const { message } = responseJson;

    return message;
  };

  const fetchCategory = async () => {
    const responseJson = await baseService.fetchPrivateData('categories');
    const {
      data: { categories },
    } = responseJson;

    return categories;
  };

  return {
    register,
    fetchCategory,
  };
})();

export default registerService;
