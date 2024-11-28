import TimeButton from "./TimeButton"
import { Box } from "@mui/material"

const Body = ({ times }) => {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '10px' }}>
      {times?.map((time, index) => {
        return <TimeButton key={index} text={time} />
      })}
    </Box>
  )
}

export default Body