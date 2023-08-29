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

  const fetchLevel = async () => {
    const responseJson = await baseService.fetchPrivateData('level');
    const {
      data: { levels },
    } = responseJson;

    return levels;
  };

  const fetchTopic = async () => {
    const responseJson = await baseService.fetchPrivateData('topic');
    const {
      data: { topics },
    } = responseJson;

    return topics;
  };

  return {
    register,
    fetchLevel,
    fetchTopic,
    fetchCategory,
  };
})();

export default registerService;
