export const getYouTubeVideoId = (url) => {
  const videoIdMatch = url.match(/v=([^&]+)/);
  if (videoIdMatch) {
    return videoIdMatch[1];
  }
  return null;
};
