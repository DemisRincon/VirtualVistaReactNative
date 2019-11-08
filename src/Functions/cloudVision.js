/* eslint-disable no-sparse-arrays */
import config from '../../config';
const callGoogleVIsionApi = async base64 => {
  let googleVisionRes = await fetch(
    config.googleCloud.api + config.googleCloud.apiKey,
    {
      method: 'POST',
      body: JSON.stringify({
        requests: [
          {
            image: {
              content: base64,
            },
            features: [
              {type: 'LABEL_DETECTION', maxResults: 10},
              {type: 'LANDMARK_DETECTION', maxResults: 5},
              {type: 'FACE_DETECTION', maxResults: 5},
              {type: 'LOGO_DETECTION', maxResults: 5},
              {type: 'TEXT_DETECTION', maxResults: 5},
              {type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5},
              {type: 'SAFE_SEARCH_DETECTION', maxResults: 5},
              {type: 'IMAGE_PROPERTIES', maxResults: 5},
              {type: 'CROP_HINTS', maxResults: 5},
              {type: 'WEB_DETECTION', maxResults: 5},
              ,
            ],
          },
        ],
      }),
    },
  );

  await googleVisionRes
    .json()
    .then(res => {
       
      return res;
    })
    .catch(error => {
      console.log(error);
    });
};

export default callGoogleVIsionApi;
