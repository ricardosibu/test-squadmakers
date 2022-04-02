import axios from 'axios';
import API_URL from '../utils/constants';

async function getCharacters() {
  const url = `${API_URL}/character`;
  try {
    const response = await axios.get(url);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export default {
  getCharacters,
};
