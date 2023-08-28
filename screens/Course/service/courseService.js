import baseService from '../../../services/BaseService';

const courseService = (() => {
  const getByCourseId = async (courseId) => {
    const responseJson = await baseService.fetchPrivateData(
      `courses/detail?courseId=${courseId}`
    );
    const {
      data: { course },
    } = responseJson;

    return course;
  };

  return {
    getByCourseId,
  };
})();

export default courseService;
