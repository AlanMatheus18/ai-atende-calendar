
import TimeButton from "./TimeButton";
import { Box, Typography } from "@mui/material";
import Selectors from "./Selectors";
import Btnsend from "./Btnsend";

const Body = ({ times, selectedTime, setSelectedTime, data, setData, options, setOptions }) => {
  const calendarOptions = ['Dra. Juliana Leite', 'Demais Dentistas', 'Odontopediatria'];
  const periodOptions = ['Nesta Semana', 'Próxima Semana', 'Próximo Mês'];
  const turnoOptions = ['Manhã', 'Tarde', 'Noite'];

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleCalendarChange = (e) => {
    setOptions({ ...options, calendar: e });
  };

  const handlePeriodChange = (e) => {
    setOptions({ ...options, period: e });
  }

  const handleTurnoChange = (e) => {
    setOptions({ ...options, turno: e });
  }

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
        label="Calendário"
        options={calendarOptions}
        value={options?.calendar}
        onChange={handleCalendarChange}
      />
      <Selectors
        label="Período"
        options={periodOptions}
        value={options?.period}
        onChange={handlePeriodChange}
      />
      <Selectors
        label="Turno"
        options={turnoOptions}
        value={options?.turno}
        onChange={handleTurnoChange}
      />
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Horários disponíveis em {data?.date}</Typography>
        {times?.map((time, index) => (
          <TimeButton
            key={index}
            text={time}
            selectedTime={selectedTime}
            onClick={handleTimeClick}
          />
        ))}
      </Box>
      <Btnsend
        selectedTime={selectedTime}
        date={data?.date}
      />
    </Box>
  );
};

export default Body;
