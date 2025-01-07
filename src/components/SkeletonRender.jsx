import React from 'react'
import Skeleton from '@mui/material/Skeleton'
import { Box } from '@mui/material'

const SkeletonRender = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      padding: '60px',
    }}>
      <Skeleton animation='wave' variant="rectangular" width='100%' height={50} />
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: '20px',
        width: '100%',
      }}>
        <Skeleton animation='wave' variant="rectangular" width='100%' height={50} />
        <Skeleton animation='wave' variant="rectangular" width='100%' height={50} />
      </Box>
      <Skeleton animation='wave' variant="rectangular" width='100%' height={50} />

      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Skeleton animation='wave' variant='text' />
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '15px 0', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between' }}>
          {[0, 1, 2, 3].map((_, index) => (
            <Skeleton animation='wave' key={index} variant='rectangular' width='49%' height={50} />
          ))}
        </Box>
      </Box>
      <Skeleton animation='wave' variant='rectangular' width='100%' height={50} />
    </Box>
  )
}

export default SkeletonRender