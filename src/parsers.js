import api from '@/api';

export const getImagesFromMangaRockByUrl = async (url) => {
  const response = await api.get(url);
  return response.data.data.map(value => `https://mri-image-decoder.now.sh/?url=${value.url}`);
};
export const getImagesFromLHScanByUrl = async (url) => {
  const response = await api.get(url);
  const doc = new DOMParser().parseFromString(response.data, 'text/xml');
  return Array.from(doc.getElementsByClassName('chapter-img')).map(el => el.currentSrc);
};
// # sourceMappingURL=parsers.js.map
