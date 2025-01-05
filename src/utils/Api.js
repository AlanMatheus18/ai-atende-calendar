
import axios from 'axios';


export default class WebCalendar {
    /**
     * Faz uma requisição com os 3 campos padrão: período, turno e dentista
     * @param {string} periodo - Período selecionado
     * @param {string} turno - Turno selecionado
     * @param {string} dentista - Dentista selecionado
     * @returns {Promise} - Resposta da API
     */
    static async listDefaultDate(periodo, turno, dentista) {
      try {
        const response = await axios.post('/api/calendar/list-default-date', {
          periodo,
          turno,
          dentista,
        });
        return response.data;
      } catch (error) {
        throw new Error(`Erro ao listar dados padrão: ${error.message}`);
      }
    }
  
    /**
     * Faz uma requisição com os 4 campos: turno, dentista, data e período como "Escolha o dia".
     * @param {string} turno - Turno selecionado
     * @param {string} dentista - Dentista selecionado
     * @param {string} data - Data específica escolhida
     * @returns {Promise} - Resposta da API
     */
    static async listChoiceDate(turno, dentista, data) {
      try {
        const response = await axios.post('/api/calendar/list-choice-date', {
          turno,
          dentista,
          data,
        });
        return response.data;
      } catch (error) {
        throw new Error(`Erro ao listar dados por escolha de data: ${error.message}`);
      }
    }
  
    /**
     * Faz uma requisição inicial para carregar os dados padrão ao abrir o calendário
     * @param {string} periodo - Período padrão
     * @param {string} turno - Turno padrão
     * @param {string} dentista - Dentista padrão
     * @returns {Promise} - Resposta da API
     */
    static async listInitialDate(periodo, turno, dentista) {
      try {
        const response = await axios.post('/api/calendar/list-initial-date', {
          periodo,
          turno,
          dentista,
        });
        return response.data;
      } catch (error) {
        throw new Error(`Erro ao carregar dados iniciais: ${error.message}`);
      }
    }
  
    /**
     * Envia os dados de agendamento: data e horário
     * @param {string} data - Data do agendamento
     * @param {string} horario - Horário do agendamento
     * @returns {Promise} - Resposta da API com mensagem de sucesso ou erro
     */
    static async registerDate(data, horario) {
      try {
        const response = await axios.post('/api/calendar/register-date', {
          data,
          horario,
        });
        return response.data; 
      } catch (error) {
        throw new Error(`Erro ao registrar agendamento: ${error.message}`);
      }
    }
  }
  