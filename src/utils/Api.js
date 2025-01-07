import axios from "axios";
import { loadConfig } from "./loadConfig";

async function listInitialValues(lead_id) {
  try {
    const config = await loadConfig();
    const subdomain = config.SUBDOMAIN || 'teste';
    const url = `https://${subdomain}.aiatende.dev.br/api`
    const res = await axios.post(`${url}/web/calendar/initial`, {
      lead_id,
    });
    return res;
  } catch (error) {
    console.error('Erro ao listar datas padrão:', error.response?.data || error.message);
    throw error;
  }
}

async function listDefaultDate(turno, dentista, periodo) {
  try {
    const config = await loadConfig();
    const subdomain = config.SUBDOMAIN || 'teste';
    const url = `https://${subdomain}.aiatende.dev.br/api`
    const res = await axios.post(`${url}/web/calendar/default`, {
      turno,
      dentista,
      periodo,
    });
    return res;
  } catch (error) {
    console.error('Erro ao listar datas padrão:', error.response?.data || error.message);
    throw error;
  }
}

async function listChoiceDate(turno, dentista, data) {
  try {
    const config = await loadConfig();
    const subdomain = config.SUBDOMAIN || 'teste';
    const url = `https://${subdomain}.aiatende.dev.br/api`
    const res = await axios.post(`${url}/web/calendar/choice`, {
      turno,
      dentista,
      data,
    });
    return res;
  } catch (error) {
    console.error('Erro ao listar datas escolhidas:', error.response?.data || error.message);
    throw error;
  }
}

async function registerDate(dentista, data, horario, lead_id) {
  try {
    const config = await loadConfig();
    const subdomain = config.SUBDOMAIN || 'teste';
    const url = `https://${subdomain}.aiatende.dev.br/api`
    const res = await axios.post(`${url}/web/calendar/register`, {
      dentista,
      data,
      horario,
      lead_id,
    });
    return res;
  } catch (error) {
    console.error('Erro ao registrar data:', error.response?.data || error.message);
    throw error;
  }
}

export { listDefaultDate, listChoiceDate, registerDate, listInitialValues };