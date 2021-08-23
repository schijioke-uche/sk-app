import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Accordion,
  AccordionItem,
  AccordionSkeleton,
  Button,
  ButtonSet,
} from 'carbon-components-react';
import useAuth from '../../state/useAuth';
import { convertSkillsDataToState, skillRatingChanges } from './utilities';
import { SubtractAlt32 } from '@carbon/icons-react';
import CheckBoxComponent from '../CheckBoxComponent';
import ModalComponent from '../ModalComponent';

//Want To learn limit to 10;

const InfoForm = () => {
  const [skills, setSkills] = useState([]);
  const [orgSkills, setOrgSkills] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalState, setModalState] = useState({});
  const [skillRating, setSkillRating] = useState({});
  const [orgSkillRating, setOrgSkillRating] = useState({});
  const [loading, setLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const { profile } = useAuth();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { displayName, email } = profile;
      const response = await axios.get(`/employees/getid/${email}`);
      if (response.data.length === 0) {
        const userPayload = { name: displayName, email };
        const userResult = await axios.post(
          'employees/registration',
          userPayload
        );
        const employee_id = userResult.data[0]['employee_id'];
        setEmployeeId(employee_id);
        await axios.post('preferences/create_table', {
          employee_id: employee_id,
        });
        const result = await axios.get(`/preferences/${employee_id}`);
        const data = convertSkillsDataToState(result.data);
        setState(data);
        setLoading(false);
        return;
      }
      const employee_id = response.data[0]['employee_id'];
      setEmployeeId(employee_id);
      const result = await axios.get(`/preferences/${employee_id}`);
      const data = convertSkillsDataToState(result.data);
      setState(data);
      setLoading(false);
    }
    fetchData();
  }, [profile]);

  const setState = (data) => {
    setSkills((prevState) => {
      return [...data.categoryList];
    });
    setOrgSkills((prevState) => {
      return [...data.categoryList];
    });
    setSkillRating((prevState) => {
      return { ...prevState, ...data.skillState };
    });
    setOrgSkillRating((prevState) => {
      return { ...prevState, ...data.skillState };
    });
  };

  const handleNumberChange = (e, skill_id, learn) => {
    const { value } = e.imaginaryTarget;
    setSkillRating((prevState) => {
      return {
        ...prevState,
        [skill_id]: { rating: Number(value), want_to_learn: learn },
      };
    });
  };

  const hideCategory = (name) => {
    const newSkills = skills.filter((el) => {
      return el.name !== name;
    });
    setSkills((prevState) => {
      return [...newSkills];
    });
  };

  const cancelChanges = () => {
    setSkillRating((prevState) => {
      return { ...orgSkillRating };
    });
    setSkills(() => {
      return [...orgSkills];
    });
    setModalState({ message: `Changes Discarded!` });
    setOpenModal(true);
  };

  const submitData = (e) => {
    e.preventDefault();
    const delta = skillRatingChanges(skillRating, orgSkillRating);
    if (delta.length > 0) {
      const diffQuery = {};
      delta.forEach((diff) => {
        diffQuery[diff] = skillRating[diff];
      });
      const skillPayload = { skillRating: diffQuery, employee_id: employeeId };
      async function postSkillData() {
        await axios.post('/preferences', skillPayload);
        setModalState({ message: `${delta.length} change(s) saved` });
        setOpenModal(true);
        setOrgSkillRating(skillRating);
      }
      postSkillData();
    } else {
      setModalState({ message: 'No changes' });
      setOpenModal(true);
      return;
    }
  };

  return (
    <div>
      <div className="bx--row info-page__banner">
        <div className="bx--col-lg-16">
          <h1 className="info-page__heading">Enter Your Information</h1>
        </div>
      </div>
      <div className="info-form__container">
        <div className="info-form__accordion_container">
          <ModalComponent
            openModal={openModal}
            setOpenModal={setOpenModal}
            modalState={modalState}
            primaryButtonMessage="Close"
            secondaryButtonMessage=""
          />
          {loading ? (
            <AccordionSkeleton className="info__accordion" open count={10} />
          ) : (
            <Accordion className="info__accordion">
              {skills.map((cat, i) => {
                return (
                  <div key={`${i}_hide_btn`} className="accordion_container">
                    <div className="hide_btn_container">
                      <Button
                        renderIcon={SubtractAlt32}
                        iconDescription="Hide Category"
                        hasIconOnly
                        kind="ghost"
                        onClick={(e) => {
                          hideCategory(cat.name);
                        }}
                      />
                    </div>
                    <AccordionItem
                      key={i}
                      title={cat.name}
                      className="accordion_item"
                    >
                      {cat.list.map((item, index) => (
                        <div key={index} style={{ marginBottom: '1rem' }}>
                          <CheckBoxComponent
                            name={item.name}
                            value={skillRating[item.skill_id]['rating']}
                            orgValue={orgSkillRating[item.skill_id]['rating']}
                            skill_id={item.skill_id}
                            want_to_learn={
                              skillRating[item.skill_id]['want_to_learn']
                            }
                            handleChange={handleNumberChange}
                            setModalState={setModalState}
                            setOpenModal={setOpenModal}
                          />
                        </div>
                      ))}
                    </AccordionItem>
                  </div>
                );
              })}
            </Accordion>
          )}
        </div>
        <div className="info_btn_container">
          <ButtonSet>
            <Button kind="secondary" onClick={cancelChanges}>
              cancel
            </Button>
            <Button
              className="save_info_btn"
              kind="primary"
              onClick={submitData}
            >
              Save
            </Button>
          </ButtonSet>
        </div>
      </div>
    </div>
  );
};

export default InfoForm;
