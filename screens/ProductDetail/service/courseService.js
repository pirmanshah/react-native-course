import baseService from '../../../services/BaseService';

const courseService = (() => {
  const getDetail = async (courseId) => {
    const responseJson = await baseService.fetchPrivateData(
      `courses/show-detail?courseId=${courseId}`
    );
    const {
      data: { course },
    } = responseJson;

    return course;
  };

  return {
    getDetail,
  };
})();

export default courseService;
