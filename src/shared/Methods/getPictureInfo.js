import googleCloudVision from '../Apis/googleCloudVision';

export const getPictureInfo = async base64 => {
  try {
    let response = await googleCloudVision(base64);
    return response;
  } catch (error) {
    return;
  }
};
export default getPictureInfo;
