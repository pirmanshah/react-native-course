import baseService from '../../../services/BaseService';

const homeService = (() => {
  const getAll = async (userId) => {
    const responseJson = await baseService.fetchPrivateData(
      `courses?userId=${userId}`
    );
    const {
      data: { courses },
    } = responseJson;

    return courses;
  };

  return {
    getAll,
  };
})();

export default homeService;
