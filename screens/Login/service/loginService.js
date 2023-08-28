import baseService from '../../../services/BaseService';

const loginService = (() => {
  const login = async (payload) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      };

      const responseJson = await baseService.fetchData('auth', options);
      const { status, message, data } = responseJson;

      return {
        status: status,
        accessToken: data.accessToken,
        user: data.user,
        message: message,
      };
    } catch (error) {
      return {
        status: 'fail',
        accessToken: null,
        message: error.message,
      };
    }
  };

  return {
    login,
  };
})();

export default loginService;
