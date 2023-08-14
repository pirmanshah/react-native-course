import baseService from './BaseService';

const cartService = (() => {
  const fetchCarts = async () => {
    const responseJson = await baseService.fetchPrivateData('carts');
    const { data } = responseJson;

    return data.carts;
  };

  const post = async (payload) => {
    const responseJson = await baseService.fetchPrivateData(
      `carts`,
      'POST',
      payload
    );
    const { message } = responseJson;

    return message;
  };

  const deleted = async (cartId) => {
    const responseJson = await baseService.fetchPrivateData(
      `carts/${cartId}`,
      'DELETE'
    );
    const { message } = responseJson;

    return message;
  };

  return {
    fetchCarts,
    deleted,
    post,
  };
})();

export default cartService;
