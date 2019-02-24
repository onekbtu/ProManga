import api from '@/api';

export interface Parser {
  (url: string): Promise<[string]>;
}


export const getImagesFromMangaRockByUrl: Parser = async (url: string): Promise<[string]> => {
  const response = await api.get(url);
  return response.data.data.map((value: any) => `https://mri-image-decoder.now.sh/?url=${value.url}`);
};

export const getImagesFromLHScanByUrl: Parser = async (url: string): Promise<[string]> => {
  const response = await api.get(url);
  const doc = new DOMParser().parseFromString(response.data, 'text/xml');
  return Array.from(
    doc.getElementsByClassName('chapter-img'),
  ).map(
    (el: any) => el.currentSrc,
  ) as [string];
};
