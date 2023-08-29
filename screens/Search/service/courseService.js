import baseService from '../../../services/BaseService';

const courseService = (() => {
  const getByTitle = async (title) => {
    const responseJson = await baseService.fetchPrivateData(
      `courses/search?title=${title}`
    );
    const {
      data: { courses },
    } = responseJson;

    return courses;
  };

  return {
    getByTitle,
  };
})();

export default courseService;
