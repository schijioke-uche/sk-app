import { TextInput } from 'carbon-components-react';
import React from 'react';

const TextInputComponent = ({
  id,
  value,
  labelText,
  handleChange,
  placeholder,
}) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <TextInput
        id={id}
        value={value}
        labelText={labelText}
        onChange={handleChange}
        placeholder={placeholder ? placeholder : ''}
      />
    </div>
  );
};

export default TextInputComponent;
