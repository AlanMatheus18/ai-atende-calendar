import axios from "axios";

const url = import.meta.env.URL || 'https://teste.aiatende.dev.br/api';

async function listInitialValues(lead_id) {
  try {
    const { data } = await axios.post(`${url}/web/calendar/initial`, {
      lead_id,
    });
    console.log(data)
    return data;
  } catch (error) {
    console.error('Erro ao listar datas padrão:', error.response?.data || error.message);
  }
}

//esses codigos sao instancias se liga
/*Funcao 1*/
async function listDefaultDate(turno, dentista, periodo) {
  try {
    console.log(`Turno: ${turno}, Dentista: ${dentista}, Período: ${periodo}`)
    const { data } = await axios.post(`${url}/web/calendar/default`, {
      turno,
      dentista,
      periodo,
    });
    console.log(data)
    return data;
  } catch (error) {
    console.error('Erro ao listar datas padrão:', error.response?.data || error.message);
  }
}

async function listChoiceDate(turno, dentista, data) {
  try {
    const { data: res } = await axios.post(`${url}/web/calendar/choice`, {
      turno,
      dentista,
      data,
    });
    console.log(res)
    return res;
  } catch (error) {
    console.error('Erro ao listar datas escolhidas:', error.response?.data || error.message);
  }
}

async function registerDate(dentista, data, horario, lead_id) {
  try {
    const { data } = await axios.post(`${url}/web/calendar/register`, {
      dentista,
      data,
      horario,
      lead_id,
    });
    return data;
  } catch (error) {
    console.error('Erro ao registrar data:', error.response?.data || error.message);
  }
}

export { listDefaultDate, listChoiceDate, registerDate, listInitialValues };