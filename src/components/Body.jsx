import { useEffect, useState } from "react";
import TimeButton from "./TimeButton";
import { Box, Typography } from "@mui/material";
import Selectors from "./Selectors";
import Btnsend from "./Btnsend";
import DatePickerInput from "./DatePickerInput";
import { listChoiceDate, listDefaultDate } from "../utils/Api";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Body = ({ times, data, setData, options, setOptions }) => {
  const calendarOptions = ['Dra. Juliana Leite', 'Demais Dentistas', 'Odontopediatria'];
  const periodoOptions = ['Nesta Semana (Até Sábado)', 'Próxima Semana (A partir de segunda)', 'Escolha o dia'];
  const turnoOptions = ['Manhã (8h às 12h)', 'Tarde (14h às 18h)', 'Noite (18h às 20h)', 'Qualquer horário'];
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleTimeClick = async (time) => {
    setOptions({
      ...options,
      selectedTime: time
    });

    try {
      setStatus('Success');
      setMessage(`Você foi agendado com sucesso para o dia ${data.date} às ${options.selectedTime}`)
    } catch (e) {
      setStatus('Error');
      setMessage('Ocorreu um erro ao finalizar seu agendamento, nos informe os dias para agendamento pelo WhatsApp!')
      console.error("Erro ao registrar datas no Google Calendar:", e);
    }
  };

  const handleDentistaChange = (e) => {
    setOptions({
      dentista: e,
      periodo: '',
      data: '',
      turno: '',
      selectedTime: ''
    });
    setData({
      dentista: e,
      periodo: '',
      data: '',
      turno: '',
      avaiableOptions: []
    });
  };

  const handlePeriodoChange = (e) => {
    if (e === "Escolha o dia") {
      setIsActive(true); // Habilita o seletor de data
    } else {
      setIsActive(false); // Desabilita o seletor de data
    }
    setOptions({
      ...options,
      periodo: e,
      date: '',
      turno: '',
      selectedTime: ''
    });
    setData({
      ...data,
      periodo: e,
      date: '',
      turno: '',
      avaiableOptions: []
    });
  };

  const handleDateChange = (e, dayjs) => {
    const value = dayjs(e).format('DD/MM/YYYY');
    setOptions({
      ...options,
      date: value,
      turno: '',
      selectedTime: ''
    });
    setData({
      ...data,
      date: value,
      turno: '',
      avaiableOptions: []
    });
  };

  const handleTurnoChange = async (e) => {
    // Faça uma cópia local do estado atual
    const updatedOptions = { ...options, turno: e };
    const updatedData = { ...data, turno: e, avaiableOptions: [] };

    // Atualize a interface imediatamente para refletir as mudanças
    setOptions(updatedOptions);
    setData(updatedData);

    // Realize a requisição assíncrona
    try {
      let res;
      if (data.periodo !== periodoOptions[2]) {
        res = await listDefaultDate(e, data.dentista, data.periodo);
      } else {
        res = await listChoiceDate(e, data.dentista, data.date);
      }

      // Atualize o estado com os resultados da requisição
      setData((prevData) => ({
        ...prevData,
        date: res.date,
        avaiableOptions: res.avaiableOptions,
      }));
      setOptions((prevOptions) => ({
        ...prevOptions,
        date: res.date,
      }));
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      padding: '60px',
    }}>
      <Selectors
        label="Dentista"
        options={calendarOptions}
        value={options?.dentista}
        onChange={handleDentistaChange}
      />
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: '20px',
        width: '100%',
      }}>
        <Selectors
          label="Período"
          options={periodoOptions}
          value={options?.periodo}
          onChange={handlePeriodoChange}
        />
        <DatePickerInput
          disabled={!isActive} // Habilita ou desabilita o seletor de data
          date={options?.date}
          onChangeDate={handleDateChange} // Atualiza a data escolhida
        />
      </Box>
      <Selectors
        label="Turno"
        options={turnoOptions}
        value={options?.turno}
        onChange={handleTurnoChange}
      />

      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {data?.avaiableOptions?.length !== 0 ? (
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Horários disponíveis em {data?.date}
          </Typography>) : null}
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '15px 0', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between' }}>
          {times?.map((time, index) => (
            <TimeButton
              key={index}
              text={time}
              selectedTime={options?.selectedTime}
              onClick={handleTimeClick}
            />
          ))}
        </Box>
      </Box>
      <Btnsend
        selectedTime={options?.selectedTime}
        date={data?.date}
      />
      {status === 'Success' ? (
        <Stack>
          <Alert severity="success">{message}</Alert>
        </Stack>
      ) : (
        <Stack>
          <Alert severity="error">{message}</Alert>
        </Stack>
      )}
    </Box>
  );
};

export default Body;
