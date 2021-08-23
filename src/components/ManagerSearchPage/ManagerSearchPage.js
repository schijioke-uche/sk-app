import { Button, Search } from 'carbon-components-react';
import React, { useState } from 'react';
import ManagerSearchTable from '../ManagerSearchTable';
import axios from 'axios';
import { orderByCategoryAndRating, initialHeadersData } from './utilities';

const ManagerSearchPage = () => {
  const [formData, setFormData] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState(initialHeadersData);
  const [clear, setClear] = useState(false);
  const [managerView, setManagerView] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    if (clear) setClear(false);
    setFormData(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.length < 1) return;
    async function fetchSearchTerm() {
      const result = await axios.get(`/search/${formData}`);
      const state = orderByCategoryAndRating(result.data);
      if (state.length === 0) {
        alert(`No results for ${formData} Found!`);
        setFormData('');
        setSearchTerm('');
        setClear(false);
        setRows([]);
        setManagerView(false);
        return;
      }
      setManagerView(false);
      setRows(state);
      setClear(true);
    }
    fetchSearchTerm();
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setFormData('');
    setRows([]);
    setClear(false);
    setSearchTerm('');
    setManagerView(false);
    return;
  };

  return (
    <div>
      <div className="search_container">
        <Search
          id="search"
          placeholder="Enter Skill to Search"
          labelText="Skill Search"
          onChange={handleChange}
          value={formData}
          onKeyDown={handleEnter}
        />
        {!clear ? (
          <Button onClick={handleSubmit}>Search</Button>
        ) : (
          <Button onClick={handleClear}>Clear</Button>
        )}
      </div>
      <ManagerSearchTable
        managerView={managerView}
        setManagerView={setManagerView}
        rows={rows}
        headers={headers}
        title={
          searchTerm.length > 0
            ? `Search results for "${searchTerm}"`
            : 'Skills Results'
        }
      />
    </div>
  );
};

export default ManagerSearchPage;
