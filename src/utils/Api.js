import axios from "axios";

const url = `https://aiatende.dev.br/api`

async function listInitialValues(query) {
  try {
    const res = await axios.post(`${url}/web/calendar/initial`, {
      query,
    });
    return res;
  } catch (error) {
    console.error('Erro ao listar datas padrão:', error.response?.data || error.message);
    throw error;
  }
}

async function listChoiceDate(turno, profissional, data) {
  try {
    const res = await axios.post(`${url}/web/calendar/choice`, {
      turno,
      profissional,
      data,
    });
    return res;
  } catch (error) {
    console.error('Erro ao listar datas escolhidas:', error.response?.data || error.message);
    throw error;
  }
}

async function registerDate(profissional, data, horario, query) {
  try {
    const res = await axios.post(`${url}/web/calendar/register`, {
      profissional,
      data,
      horario,
      query,
    });
    return res;
  } catch (error) {
    console.error('Erro ao registrar data:', error.response?.data || error.message);
    throw error;
  }
}

export { listChoiceDate, registerDate, listInitialValues };