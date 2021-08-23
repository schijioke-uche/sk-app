import { MultiSelect } from 'carbon-components-react';
import React from 'react';

const MultiSelectDropDownComponent = ({
  titleText,
  helperText,
  label,
  items,
  onChange,
}) => {
  return (
    <MultiSelect.Filterable
      id="default"
      items={items}
      titleText={titleText}
      helperText={helperText}
      label={label}
      itemToString={(item) => (item ? item.text : '')}
      onChange={onChange}
    />
  );
};

export default MultiSelectDropDownComponent;
