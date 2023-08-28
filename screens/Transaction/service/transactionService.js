import baseService from '../../../services/BaseService';

const transactionService = (() => {
  const getByUserId = async (userId) => {
    const responseJson = await baseService.fetchPrivateData(
      `transactions?userId=${userId}`
    );
    const {
      data: { transactions },
    } = responseJson;

    return transactions;
  };

  return {
    getByUserId,
  };
})();

export default transactionService;
