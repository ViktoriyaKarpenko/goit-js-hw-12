import axios from 'axios';

export async function getImagesByQuery(query, page) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const url = `${BASE_URL}${END_POINT}`;

  const params = {
    key: '55161607-9b63bc502ca8d8d43be331324',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  };
  console.log('Запрос с параметрами:', query, page);
  const res = await axios.get(url, { params });
  return res.data;
}
