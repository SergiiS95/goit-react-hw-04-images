import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '36598213-1c05ffc9aa6b3be50b197b0cb';

export const fetchImages = async (searcInputForm, page) => {
  const params = {
    page: page,
    key: API_KEY,
    q: searcInputForm,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  };
  try {
    const response = await axios.get(URL,{params});
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
