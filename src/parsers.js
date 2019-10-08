import api from '@/api';

function decodeMRI(buffer) {
  if (buffer[0] !== 69) {
    return buffer;
  }

  const result = new Uint8Array(buffer.length + 15);
  const n = buffer.length + 7;

  result[0] = 82; // R
  result[1] = 73; // I
  result[2] = 70; // F
  result[3] = 70; // F
  result[7] = (n >> 24) & 255;
  result[6] = (n >> 16) & 255;
  result[5] = (n >> 8) & 255;
  result[4] = 255 & n;
  result[8] = 87; // W
  result[9] = 69; // E
  result[10] = 66; // B
  result[11] = 80; // P
  result[12] = 86; // V
  result[13] = 80; // P
  result[14] = 56; // 8

  for (let i = 0; i < buffer.length; i++) {
    result[i + 15] = 101 ^ buffer[i];
  }

  return result;
}

function d(e) {
  const t = (function (e) {
    for (var t = [], o = 0; o < e.length; o += 32768) t.push(String.fromCharCode.apply(null, e.subarray(o, o + 32768)));
    return t.join('');
  }(e));
  return btoa(t);
}

const decodeMangaImg = async function decodeMangaImg(url) {
  if (!url.endsWith('.mri')) {
    return url;
  }
  const queryUrl = url.split('mri-image-decoder.now.sh/?url=')[1];
  const request = await fetch(queryUrl);
  const buffer = new Uint8Array(await request.arrayBuffer());
  return `data:image/webp;base64,${d(decodeMRI(buffer))}`;
};

export default decodeMangaImg;
