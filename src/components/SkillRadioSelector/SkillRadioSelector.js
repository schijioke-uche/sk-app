import { RadioButtonGroup, RadioButton } from 'carbon-components-react';
import React from 'react';

const SkillRadioSelector = ({ skillName, handleChange, value }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <RadioButtonGroup
        legendText={`${skillName}`}
        name={skillName}
        valueSelected={value}
        onChange={handleChange}
      >
        <RadioButton labelText="0" value="0" id="0" />
        <RadioButton labelText="1" value="1" id="1" />
        <RadioButton labelText="2" value="2" id="2" />
        <RadioButton labelText="3" value="3" id="3" />
        <RadioButton labelText="4" value="4" id="4" />
        <RadioButton labelText="5" value="5" id="5" />
      </RadioButtonGroup>
    </div>
  );
};

export default SkillRadioSelector;
