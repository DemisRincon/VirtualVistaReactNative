import {KEY, GOOGLE_CLOUD_VISION_URL} from '../constants.js';
import textToSpeach from './textToSpeach';
export const getPictureInfo = async base64 => {
  try {
    let response = await googleCloudVision(base64);

    return response;
  } catch (error) {
   return
  }
};
export default getPictureInfo;

export const googleCloudVision = async base64 => {
  const url = GOOGLE_CLOUD_VISION_URL + KEY;

  const googleVisionRes = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      requests: [
        {
          image: {
            content: base64,
          },
          features: [
            {type: 'LABEL_DETECTION', maxResults: 10},
            {type: 'TEXT_DETECTION', maxResults: 10},
            {type: 'WEB_DETECTION', maxResults: 10},
          ],
        },
      ],
    }),
  });

  return googleVisionRes.json();
};
