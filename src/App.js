import React, { useState } from 'react';
import './App.css';
import Table from './components/Table';
import Select from './components/Select';
import DATA from './data.js';

const App = () => {
  const [airline, setAirline] = useState('all');

  const formatValue = (property, value) => {
    if (property === 'airline') {
      return DATA.getAirlineById(value).name;
    }

    return DATA.getAirportByCode(value).name;
  };

  const columns = [
    { name: 'Airline', property: 'airline' },
    { name: 'Source Airport', property: 'src' },
    { name: 'Destination Airport', property: 'dest' },
  ];

  const selectAirline = (val) => {
    if (val !== 'all') {
      val = Number(val);
    }

    setAirline(val);
  };

  const filteredRoutes = DATA.routes.filter((route) => {
    return route.airline === airline || airline === 'all';
  });

  const filteredAirlines = DATA.airlines.map((airline) => {
    const active = !!filteredRoutes.find(
      (route) => route.airline === airline.id,
    );
    return Object.assign({}, airline, { active });
  });

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <Select
          options={filteredAirlines}
          valueKey="id"
          titleKey="name"
          allTitle="All Airlines"
          value={airline}
          onSelect={selectAirline}
        />
        <Table
          className="routes-table"
          columns={columns}
          rows={filteredRoutes}
          format={formatValue}
        />
      </section>
    </div>
  );
};

export default App;
