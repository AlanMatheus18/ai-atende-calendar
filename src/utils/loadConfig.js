import axios from "axios"

export const loadConfig = async () => {
  try {
    const res = await axios.get('/config.json');
    return res.data;
  } catch (error) {
    console.error('Erro ao carregar configurações:', error.response?.data || error.message);
    throw error;
  }
}