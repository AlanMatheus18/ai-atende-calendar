import { useEffect, useState } from "react";
import TimeButton from "./TimeButton";
import { Box, Button, Divider, FormControl, Typography } from "@mui/material";
import Selectors from "./Selectors";
import Btnsend from "./Btnsend";
import DatePickerInput from "./DatePickerInput";
import { listChoiceDate, registerDate } from "../utils/Api";
import { useParams } from "react-router";
import SkeletonRender from "./SkeletonRender";
import SkeletonTimes from "./SkeletonTimes";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ButtonComponent from "./ButtonComponent";

const Body = ({ options, setOptions }) => {
  const [send, setSend] = useState({
    date: '',
    time: ''
  });
  const [isAppear, setIsAppear] = useState(false);
  const calendarOptions = ['Dra. Juliana Leite', 'Demais Dentistas', 'Odontopediatria'];
  const turnoOptions = ['Manhã (8h às 12h)', 'Tarde (14h às 18h)', 'Noite (18h às 20h)', 'Qualquer horário'];
  const [status, setStatus] = useState('');
  const [isSkeleton, setIsSkeleton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { query } = useParams();

  const handleSchedule = async () => {
    setIsSkeleton(true);
    setSend({
      date: options.date,
      time: options.selectedTime
    });
    try {
      const res = await registerDate(options.profissional, options.date, options.selectedTime, query);
      if (res.status !== 200 && res.status !== 201) {
        throw new Error(res);
      }
      setStatus('Success');
      setOptions({
        profissional: '',
        date: '',
        turno: '',
        selectedTime: '',
        times: []
      });
      setIsSkeleton(false);
      window.location.href = 'https://wa.me/558130940025';
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
    setSend({
      ...send,
      time: time,
    });
  };

  const handleProfissionalChange = (e) => {
    setOptions({
      ...options,
      profissional: e,
      selectedTime: ''
    });
    setIsAppear(true);
  };

  const handleDateChange = (e) => {
    setOptions({
      ...options,
      date: e.format('DD/MM/YYYY'),
      selectedTime: ''
    });
    setSend({
      ...send,
      date: e.format('DD/MM/YYYY')
    });
    setIsAppear(true);
  };

  const handleTurnoChange = async (e) => {
    setOptions({
      ...options,
      turno: e,
      selectedTime: ''
    });
    setIsAppear(true);
  };

  const handleUpdateData = async () => {
    setIsLoading(true);
    setIsAppear(false);
    setOptions({
      ...options,
      selectedTime: ''
    })
    setSend({
      ...send,
      time: ''
    })
    setStatus('');

    // Realize a requisição assíncrona
    try {
      let res;
      res = await listChoiceDate(options.turno, options.profissional, options.date);

      if (res.status !== 200 && res.status !== 201) {
        throw new Error(res);
      }

      if (res.data.availableOptions.length === 0) {
        setStatus('NoOptions');
        setIsLoading(false);
        setOptions({
          ...options,
          times: [],
          selectedTime: ''
        });
        return;
      } else {
        setStatus('');
      }

      // Atualize o estado com os resultados da requisição
      // setData((prevData) => ({
      //   ...prevData,
      //   date: res.data.date,
      //   availableOptions: res.data.availableOptions,
      // }));

      setOptions((prevOptions) => ({
        ...prevOptions,
        date: res.data.date,
        times: res.data.availableOptions,
      }));

      setStatus('');
      setIsLoading(false);
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

  useEffect(() => {
    setSend({
      ...send,
      date: options.date,
    });

    if (options.times.length === 0) {
      setStatus('NoOptions');
    }
  }, []);

  return (
    <>
      {!isSkeleton ? (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          padding: '30px',
        }}>

          {!isAppear && (
            <>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {isLoading ? (<SkeletonTimes />) : options.times?.length !== 0 ? (
                  <>
                    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                      <Typography marginBottom={2} variant="h5" align={"center"} sx={{
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                      }} >
                        Data disponível
                      </Typography>
                      <Typography marginBottom={2} variant="h4" align={"center"} sx={{ fontWeight: 'bold' }}>
                        {options?.date}
                      </Typography>
                      <Typography variant="h6" sx={{
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                      }}>
                        Horários disponíveis
                      </Typography>
                      <Typography sx={{
                        fontWeight: 'bold',
                        fontSize: '0.875rem'
                      }}>
                        (Clique no horário desejado)
                      </Typography>

                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '15px 0', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between' }}>
                      {options.times?.map((time, index) => (
                        <TimeButton
                          key={index}
                          text={time}
                          selectedTime={options?.selectedTime}
                          onClick={handleTimeClick}
                        />
                      ))}
                    </Box>
                  </>
                ) : null}
                <Btnsend
                  endIcon={<CalendarMonthIcon />}
                  status={status}
                  handleSchedule={handleSchedule}
                  selectedTime={send?.time}
                  date={send?.date}
                />
              </Box>
            </>
          )}

          {!isAppear && status !== 'Success' && status !== 'Error' && status !== 'NoOptions' && (
            <Divider sx={{ width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.26)', marginTop: "1.250rem", marginBottom: "1.250rem" }} />
          )}

          {status !== 'Success' && status !== 'Error' && (
            <Box component={"form"} onSubmit={
              (e) => {
                e.preventDefault();
                handleUpdateData();
              }
            } sx={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
              <Typography align="center" variant="h6" fontWeight={600} textTransform={"uppercase"}>
                Buscar novos horários
              </Typography>
              <Selectors
                required={true}
                label="Dentista | Especialidade"
                options={calendarOptions}
                value={options?.profissional}
                onChange={handleProfissionalChange}
                disabled={false}
              />
              <DatePickerInput
                required={true}
                label={"Selecione a data desejada"}
                date={options?.date ?? null} // Mostra a data escolhida
                onChangeDate={handleDateChange} // Atualiza a data escolhida
              />
              <Selectors
                required={true}
                label="Selecione o turno preferido"
                options={turnoOptions}
                value={options?.turno}
                onChange={handleTurnoChange}
              />

              <Box width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} gap={2} marginTop={2}>
                <Typography component={"p"} align={"center"} fontSize={"0.935rem"}>
                  Selecione as opções acima <br /> clique abaixo para confirmar
                </Typography>
                <ButtonComponent type={"submit"} text={"Confirmar"} color={"green"} onClick={handleUpdateData} endIcon={<EventRepeatIcon />} />
              </Box>

            </Box>
          )}
        </Box>
      ) : (<SkeletonRender />)}
    </>
  );
};

export default Body;
