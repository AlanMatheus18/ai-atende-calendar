import { useEffect, useState } from "react";
import TimeButton from "./TimeButton";
import { Box, Typography } from "@mui/material";
import Selectors from "./Selectors";
import Btnsend from "./Btnsend";
import DatePickerInput from "./DatePickerInput";
import { listChoiceDate, listDefaultDate, registerDate } from "../utils/Api";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Link, useParams } from "react-router";
import SkeletonRender from "./SkeletonRender";
import SkeletonTimes from "./SkeletonTimes";

const Body = ({ times, data, setData, options, setOptions }) => {
  const [bkpData, setBkpData] = useState({});
  const calendarOptions = ['Dra. Juliana Leite', 'Demais Dentistas', 'Odontopediatria'];
  const periodoOptions = ['Nesta Semana (Até Sábado)', 'Próxima Semana (A partir de Segunda)', 'Escolha o dia'];
  const turnoOptions = ['Manhã (8h às 12h)', 'Tarde (14h às 18h)', 'Noite (18h às 20h)', 'Qualquer horário'];
  const [status, setStatus] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isTurnoActive, setIsTurnoActive] = useState(true);
  const [isSkeleton, setIsSkeleton] = useState(false);
  const { hash } = useParams();

  const handleSchedule = async () => {
    setIsSkeleton(true);
    setOptions({
      dentista: '',
      periodo: '',
      date: '',
      turno: '',
      selectedTime: ''
    });
    setData({
      dentista: '',
      periodo: '',
      date: '',
      turno: '',
      avaiableOptions: []
    });
    try {
      const res = await registerDate(bkpData.dentista, bkpData.date, bkpData.selectedTime, hash);
      if (res.status !== 200 && res.status !== 201) {
        throw new Error(res);
      }
      setStatus('Success');
      setIsSkeleton(false);
    } catch (e) {
      console.error('Erro ao registrar data:', e);
      setStatus('Error');
    }
  }

  const handleTimeClick = async (time) => {
    setOptions({
      ...options,
      selectedTime: time
    });
    setBkpData({
      ...options,
      selectedTime: time
    });
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
      setIsTurnoActive(false); // Desabilita o seletor de turno
    } else {
      setIsActive(false); // Desabilita o seletor de data
      setIsTurnoActive(true); // Habilita o seletor de turno
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
    if (e === null) {
      setIsTurnoActive(false); // Desabilita o seletor de turno
    } else {
      setIsTurnoActive(true); // Habilita o seletor de turno
    }

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
    setBkpData(updatedOptions);
    setData(updatedData);

    // Realize a requisição assíncrona
    try {
      let res;
      if (data.periodo !== periodoOptions[2]) {
        res = await listDefaultDate(e, data.dentista, data.periodo);
      } else {
        res = await listChoiceDate(e, data.dentista, data.date);
      }

      if (res.status !== 200 && res.status !== 201) {
        throw new Error(res);
      }

      // Atualize o estado com os resultados da requisição
      setData((prevData) => ({
        ...prevData,
        date: res.data.date,
        avaiableOptions: res.data.avaiableOptions,
      }));
      setOptions((prevOptions) => ({
        ...prevOptions,
        date: res.data.date,
      }));
    } catch (error) {
      if (error.response) {
        console.error('Erro ao listar datas:', error.response.data);
        setStatus('Error');
        setMessage('Erro ao listar datas. Tente novamente!');
      } else if (error.request) {
        console.error('Erro ao listar datas:', error.request);
        setStatus('Error');
        setMessage('Erro ao listar datas! Tente novamente.');
      } else {
        console.error('Erro ao listar datas:', error.message);
        setStatus('Error');
        setMessage('Erro ao listar datas. Tente novamente.', error);
      }
    }
  };

  return (
    <>
      {!isSkeleton ? (<Box sx={{
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
          disabled={false}
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
            disabled={false}
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
          disabled={!isTurnoActive}
        />

        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {data?.avaiableOptions?.length !== 0 ? (
            <>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Horários disponíveis em {data?.date}
              </Typography>
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
            </>
          ) : <SkeletonTimes />}
        </Box>
        <Btnsend
          handleSchedule={handleSchedule}
          selectedTime={options?.selectedTime}
          date={data?.date}
        />
        {status === 'Success' ? (
          <Stack spacing={2}>
            <Alert severity="success" sx={{ fontSize: '0.875rem' }} >
              Agendado com sucesso no dia <span style={{ fontWeight: 'bold' }}>{bkpData.date}</span> às <span style={{ fontWeight: 'bold' }}>{bkpData.selectedTime}.</span> <Link to={'https://wa.me/558130940025'}>Volte para nossa conversa</Link>
            </Alert>
          </Stack>
        ) : status === 'Error' ? (
          <Stack spacing={2}>
            <Alert severity="error" sx={{ fontSize: '0.875rem' }} >Erro ao registrar data. Tente novamente!</Alert>
          </Stack>
        ) : null}
      </Box>) : (<SkeletonRender />)}
    </>
  );
};

export default Body;
