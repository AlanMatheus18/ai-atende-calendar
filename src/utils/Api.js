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

listDefaultDate('turno', 'dentista', 'periodo');

/*Funcao 2*/

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

listChoiceDate('turno', 'dentista', 'data');

/*Funcao 3*/

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


registerDate('dentista', 'data', 'horario', lead_id);




//exemplo de funcoes para Post
// Instanciando o Axios
const api = axios.create({
  baseURL: "https://exemplo.api.com", // Substitua pela sua URL base
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* Função 1: Envia 3 dados */
async function sendThreeData(data1, data2, data3) {
  try {
    const response = await api.post("/endpoint-three", { data1, data2, data3 });
    return handleResponse("success", response.data);
  } catch (error) {
    return handleResponse("error", error.response?.data || error.message);
  }
}

/* Função 2: Envia 4 dados */
async function sendFourData(data1, data2, data3, data4) {
  try {
    const response = await api.post("/endpoint-four", { data1, data2, data3, data4 });
    return handleResponse("success", response.data);
  } catch (error) {
    return handleResponse("error", error.response?.data || error.message);
  }
}

/* Função 3: Recebe mensagem de sucesso ou erro */
function handleResponse(status, message) {
  const dateTime = new Date().toISOString(); // Obtém a data e hora atual no formato ISO
  return {
    status,
    message,
    dateTime,
  };
}

// Exemplo de uso
(async () => {
  const response1 = await sendThreeData("valor1", "valor2", "valor3");
  console.log(response1);

  const response2 = await sendFourData("valor1", "valor2", "valor3", "valor4");
  console.log(response2);
})();
