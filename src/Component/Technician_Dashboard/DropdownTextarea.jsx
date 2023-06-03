import React, { useState } from 'react';

const TableForm = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [textboxValue, setTextboxValue] = useState('');
  const [tableData, setTableData] = useState([]);

  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleTextboxChange = (event) => {
    setTextboxValue(event.target.value);
  };

  const handleInsertValue = () => {
    const newData = {
      selectedValue,
      textboxValue
    };
    setTableData([...tableData, newData]);
    setSelectedValue('');
    setTextboxValue('');
  };

  return (
    <div>
      <h2>Dropdown, Textbox, and Table Example</h2>
      <select value={selectedValue} onChange={handleDropdownChange}>
        <option value="">Select an option</option>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
      </select>
      <input
        type="text"
        value={textboxValue}
        onChange={handleTextboxChange}
        placeholder="Enter value"
      />
      <button onClick={handleInsertValue}>Insert Value</button>
      <table>
        <thead>
          <tr>
            <th>Selected Value</th>
            <th>Textbox Value</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{data.selectedValue}</td>
              <td>{data.textboxValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableForm;
