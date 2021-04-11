import React from 'react';

const Select = ({
  options = [],
  valueKey = '',
  titleKey = '',
  enabledKey = undefined,
  allTitle = 'all',
  value = 'all',
  onSelect = (_) => null,
}) => {
  const row = (airline) => {
    const val = airline[valueKey];
    const enabled = enabledKey === undefined || !!airline[enabledKey];

    return (
      <option key={val} value={val} disabled={!enabled}>
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
