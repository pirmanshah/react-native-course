import baseService from '../../../services/BaseService';

const loginService = (() => {
  const login = async (payload) => {
    try {
      const { email, password } = payload;

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
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
