import {KEY, GOOGLE_TRANSLATE} from '../constants.js';

export const googleTranslate = async textToTranslate => {
  const url = GOOGLE_TRANSLATE + KEY;
  const googleTranslateResponse = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      q: textToTranslate,
      target: 'es',
    }),
  });
  return await googleTranslateResponse.json();
};
export default googleTranslate;
