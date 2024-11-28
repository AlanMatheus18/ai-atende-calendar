import TimeButton from "./TimeButton";
import { Box } from "@mui/material";

const Body = ({ times, selectedTime, setSelectedTime }) => {
  const handleTimeClick = (time) => {
    setSelectedTime(time); 
  };
  

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '10px' }}>
      {times?.map((time, index) => (
        <TimeButton
          key={index}  
          text={time}
          selectedTime={selectedTime}
          onClick={handleTimeClick}
        />
      ))}
    </Box>
  );
};

export default Body;
