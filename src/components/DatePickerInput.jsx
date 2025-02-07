import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControl } from '@mui/material';
import { ptBR } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

export default function DatePickerInput({ label, disabled = false, date, onChangeDate, required }) {
  const [open, setOpen] = React.useState(false);

  const isSunday = (date) => {
    return date.day() === 0;
  }

  const oneMonth = dayjs().add(1, 'month').add(1, 'day');

  return (
    <FormControl sx={{ width: '100%' }} required={required} >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br' localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
        <DatePicker
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          label={label}
          shouldDisableDate={isSunday}
          minDate={dayjs()}
          maxDate={oneMonth}
          defaultValue={!date ? null : dayjs(date, 'DD/MM/YYYY')}
          format='DD/MM/YYYY'
          value={dayjs(date, 'DD/MM/YYYY')}
          onChange={(newValue) => onChangeDate(newValue)}
          sx={{ width: '100%' }} disabled={disabled}
          slotProps={{
            textField: {
              required: required,
              onClick: (e) => setOpen(true),
            },
            field: {
              readOnly: true,
            }
          }}
        />
      </LocalizationProvider>
    </FormControl>
  );
}
