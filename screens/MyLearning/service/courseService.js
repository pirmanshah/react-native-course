import baseService from '../../../services/BaseService';

const courseService = (() => {
  const fetchCourses = async (userId) => {
    const responseJson = await baseService.fetchPrivateData(
      `courses/user?userId=${userId}`
    );
    const {
      data: { courses },
    } = responseJson;

    return courses;
  };

  return {
    fetchCourses,
  };
})();

export default courseService;
