import React, { useState } from 'react';
import './App.css';
import Table from './components/Table';
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

  const row = (airline) => (
    <option key={airline.id} value={airline.id}>
      {airline.name}
    </option>
  );

  const selectAirline = (ev) => {
    let value = ev.target.value;

    if (value !== 'all') {
      value = Number(value);
    }

    setAirline(value);
  };

  const filteredRoutes = DATA.routes.filter((route) => {
    return route.airline === airline || airline === 'all';
  });

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <select onChange={selectAirline}>
          <option value="all">Select an Airline</option>
          {DATA.airlines.map(row)}
        </select>
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
