import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from "@mui/material";

export default function Selectors({ label, options, value, onChange }) {
  return (
    <Box>
    <FormControl sx={{ m: 1, minWidth: 200, display:"flex"}} size="small">
      <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-select-label`}
        id={`${label}-select`}
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)} // uma função de alteração
      >
        <MenuItem value="" >
          <em>Selecione uma opção</em>
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </Box>
  );
}
