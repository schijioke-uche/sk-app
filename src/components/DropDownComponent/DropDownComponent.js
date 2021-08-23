import { Dropdown } from 'carbon-components-react';
import React from 'react';

//ADD PROFILE LINK
//BRING YOU TO PROFILE PAGE

const DropDownComponent = ({
  titleText,
  helperText,
  label,
  items,
  onChange,
  itemIndex,
}) => {
  const initialItem = items[itemIndex];
  return (
    <div style={{ marginBottom: '1rem' }}>
      <Dropdown
        id="default"
        titleText={titleText}
        helperText={helperText ? helperText : ''}
        label={label}
        items={items}
        selectedItem={initialItem}
        onChange={onChange}
      />
    </div>
  );
};

export default DropDownComponent;
