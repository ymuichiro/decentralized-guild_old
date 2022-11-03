import { ReactNode } from 'react';

import TextField from '@components/atom/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export interface InputBoxProps {
  caption: string;
  value: string;
  placeholder?: string;
  icon?: ReactNode;
  disabled?: boolean;
  onChange?: Function;
}

const InputBox = ({
  caption,
  value,
  placeholder,
  icon,
  disabled,
  onChange,
}: InputBoxProps): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        backgroundColor: '#222',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
      }}
    >
      <TextField
        label={caption}
        variant='standard'
        value={value}
        style={{ width: '100%' }}
        disabled={disabled}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>{icon}</InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default InputBox;
