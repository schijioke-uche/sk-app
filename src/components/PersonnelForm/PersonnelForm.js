import React, { useState, useEffect } from 'react';
import { FormGroup, ComboBox, Button } from 'carbon-components-react';
import axios from 'axios';

import TextInputComponent from '../TextInputComponent';
import DropDownComponent from '../DropDownComponent';
import useAuth from '../../state/useAuth';

import data from './data.json';
import langData from './languages.json';
import { createStateFromDb, createManagersFromDb } from './utilities';
import ModalComponent from '../ModalComponent';
const roles = data.roles;
const industries = data.industry;
const languages = langData.languages.map((item) => item['name']);
const initialFormData = data.initialFormData;

const PersonnelForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSavedModal, setOpenSavedModal] = useState(false);
  const { name, manager, location, industry, email, role, languageIndex } =
    formData;
  const { profile } = useAuth();

  useEffect(() => {
    async function fetchUserData() {
      setLoading(true);
      const { displayName, email } = profile;
      const response = await axios.get(`/employees/${email}`);
      if (response.data.length === 0) {
        const userPayload = { name: displayName, email };
        const result = await axios.post('employees/registration', userPayload);
        let state = createStateFromDb(result.data[0]);
        setFormData((prevState) => {
          return { ...prevState, ...state };
        });

        await axios.post('preferences/create_table', {
          employee_id: state.employee_id,
        });
        setLoading(false);
        return;
      }
      let state = createStateFromDb(response.data[0]);
      setFormData((prevState) => {
        return { ...prevState, ...state };
      });
      setLoading(false);
    }
    setLoading(false);
    fetchUserData();
  }, [profile]);

  useEffect(() => {
    async function fetchManagers() {
      const response = await axios.get('/managers');
      const managers = createManagersFromDb(response.data);
      setManagers(managers);
    }
    fetchManagers();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [id]: value };
    });
  };

  const handleDropDownChange = (e, key) => {
    const { selectedItem } = e;
    setFormData((prevData) => {
      return { ...prevData, [key]: selectedItem };
    });
  };
  const submitData = (e) => {
    e.preventDefault();
    async function postUpdateProfile() {
      setOpenSavedModal(true);
      await axios.post(`/employees`, formData);
    }
    postUpdateProfile();
  };

  return (
    <div>
      <ModalComponent
        openModal={openSavedModal}
        setOpenModal={setOpenSavedModal}
        modalState={{ message: 'Profile Saved' }}
        primaryButtonMessage="Close"
      />
      <div className="bx--row info-page__banner personnel_banner">
        <div className="bx--col-lg-16">
          <h1 className="info-page__heading">Personnel Information</h1>
        </div>
      </div>
      <div className="personnel_container">
        <FormGroup
          className="info-form__group"
          legendId="formgroup-legend-id"
          legendText="Profile"
        >
          <TextInputComponent id="name" value={name} labelText="Name" />
          <TextInputComponent id="email" value={email} labelText="Email" />
          <DropDownComponent
            titleText="Role"
            label="Role"
            items={roles}
            itemIndex={roles.indexOf(role) > -1 ? roles.indexOf(role) : ''}
            onChange={(e) => handleDropDownChange(e, 'role')}
          />
          <DropDownComponent
            titleText="Choose Manager"
            label="Manager"
            items={managers}
            itemIndex={
              managers.indexOf(manager) > -1 ? managers.indexOf(manager) : ''
            }
            onChange={(e) => handleDropDownChange(e, 'manager')}
          />
          <TextInputComponent
            id="location"
            value={location}
            labelText="Location"
            handleChange={handleChange}
          />
          <DropDownComponent
            titleText="Choose Industry"
            label="Industry"
            items={industries}
            itemIndex={
              industries.indexOf(industry) > -1
                ? industries.indexOf(industry)
                : ''
            }
            onChange={(e) => handleDropDownChange(e, 'industry')}
          />
          <ComboBox
            id="carbon-combobox"
            items={languages}
            onChange={(e) => handleDropDownChange(e, 'language')}
            placeholder="Enter Primary Language"
            titleText="Choose Primary Language"
            selectedItem={languageIndex ? languages[languageIndex] : ''}
          />
        </FormGroup>
        <Button
          className="profile_save_btn"
          onClick={submitData}
          kind="primary"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default PersonnelForm;
