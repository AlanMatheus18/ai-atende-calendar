import axios from "axios";
//esses codigos sao instancias se liga
/*Funcao 1*/
async function listDefaultDate(turno, dentista, periodo) {
  try {
    const response = await axios.post('https://teste.aiatende.dev.br/api/web/calendar/default', {
      turno,
      dentista,
      periodo,
    });
    console.log(response.data);
  } catch (error) {
    console.error('Erro ao listar datas padrão:', error.response?.data || error.message);
  }
}

async function listChoiceDate(turno, dentista, data) {
  try {
    const response = await axios.post('https://teste.aiatende.dev.br/api/web/calendar/choice', {
      turno,
      dentista,
      data,
    });
    console.log(response.data);
  } catch (error) {
    console.error('Erro ao listar datas escolhidas:', error.response?.data || error.message);
  }
}

async function registerDate(dentista, data, horario, lead_id) {
  try {
    const response = await axios.post('https://teste.aiatende.dev.br/api/web/calendar/register', {
      dentista,
      data,
      horario,
      lead_id,
    });
    console.log('Registro concluído:', response.data);
  } catch (error) {
    console.error('Erro ao registrar data:', error.response?.data || error.message);
  }
}

export { listDefaultDate, listChoiceDate, registerDate };