
import TimeButton from "./TimeButton";
import { Box } from "@mui/material";

const Body = ({ times, selectedTime, setSelectedTime }) => {

  const handleTimeClick = (time) => {
    setSelectedTime(time); 
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
