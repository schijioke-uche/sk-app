import {
  Checkbox,
  NumberInput,
  FormLabel,
  Tooltip,
  Tile,
} from 'carbon-components-react';
import { helperTextHash } from './utilities';
import React, { useState, useEffect } from 'react';
import HelperText from '../HelperText';
// import axios from 'axios';

const CheckBoxComponent = ({
  name,
  value,
  orgValue,
  handleChange,
  // setOpenModal,
  // setModalState,
  skill_id,
  want_to_learn,
}) => {
  const [isExperienced, setIsExperienced] = useState(false);
  const [willingToLearn, setWillingToLearn] = useState(want_to_learn);

  useEffect(() => {
    value > 0 ? setIsExperienced(true) : setIsExperienced(false);
  }, [value]);

  const handleExperiencedCheck = (e, name) => {
    //To reset value to 0 if unchecking "experienced"
    if (isExperienced) {
      e = { imaginaryTarget: { name, value: 0 } };
      handleChange(e, skill_id, willingToLearn);
    } else {
      e = { imaginaryTarget: { name, value: 1 } };
      handleChange(e, skill_id, willingToLearn);
    }
    setIsExperienced(!isExperienced);
  };

  const handleWillingToLearnCheck = (e, id) => {
    const learn = e;
    e = { imaginaryTarget: { value: value } };
    handleChange(e, skill_id, learn);
    setWillingToLearn(!willingToLearn);

    //WAIT FOR YOURLEARNING API KEY
    //let term = id.split('willing_to_learn_')[1];
    //term = term.replace(/\//g, ' - ');
    // let renderModal = willingToLearn;
    // async function fetchData() {
    //   const response = await axios.get(`/course/${term}`);
    //   setOpenModal(true);
    //   setModalState(response.data);
    // }
    // if (!renderModal) fetchData();
  };

  let render = isExperienced || willingToLearn;

  return (
    <div className="checkbox_component_container">
      <Tile>
        <FormLabel
          style={
            value === orgValue
              ? { fontSize: '15px' }
              : { fontSize: '15px', fontWeight: '600' }
          }
        >
          {name}
        </FormLabel>
        <div className="checkbox_container">
          <Checkbox
            labelText="Experienced"
            checked={isExperienced}
            id={`experienced_${skill_id}`}
            onChange={(e) => handleExperiencedCheck(e, skill_id)}
          />
          <Checkbox
            labelText="Want to Learn"
            checked={willingToLearn}
            id={`willing_to_learn_${skill_id}`}
            onChange={handleWillingToLearnCheck}
          />
        </div>
        {render && (
          <div className="number_input_container">
            <NumberInput
              name={name}
              id={name}
              min={0}
              max={5}
              value={value}
              onChange={(e) => handleChange(e, skill_id, willingToLearn)}
              helperText={helperTextHash[value]}
              invalidText="Number is not valid"
            />
            <Tooltip>
              <HelperText />
            </Tooltip>
          </div>
        )}
      </Tile>
    </div>
  );
};

export default CheckBoxComponent;
