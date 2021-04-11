import React from 'react';

const Select = ({
  options = [],
  valueKey = '',
  titleKey = '',
  allTitle = 'all',
  value = 'all',
  onSelect = (_) => null,
}) => {
  const row = (airline) => {
    const val = airline[valueKey];

    return (
      <option key={val} value={val}>
        {airline[titleKey]}
      </option>
    );
  };

  const selectAirline = (ev) => onSelect(ev.target.value);

  return (
    <select value={value} onChange={selectAirline}>
      <option key="all" value="all">
        {allTitle}
      </option>
      {options.map(row)}
    </select>
  );
};

export default Select;
