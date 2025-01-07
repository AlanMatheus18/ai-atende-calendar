import React from 'react'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

const SkeletonTimes = () => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Skeleton animation='wave' variant='text' />
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '15px 0', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between' }}>
        {[0, 1, 2, 3].map((_, index) => (
          <Skeleton animation='wave' key={index} variant='rectangular' width='49%' height={50} />
        ))}
      </Box>
    </Box>
  )
}

export default SkeletonTimes