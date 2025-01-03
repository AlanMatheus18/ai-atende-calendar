import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';
import { ptBR } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/pt-br';

export default function DatePickerInput({disabled=false}) {
  return (
    <Box sx={{ width: '100%' }} >
      <LocalizationProvider  dateAdapter={AdapterDayjs} adapterLocale='pt-br' localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
        <DatePicker defaultValue={dayjs('')} format='DD/MM/YYYY' sx={{ width: '100%' }} disabled={disabled} />
      </LocalizationProvider>
    </Box>
  );
}
