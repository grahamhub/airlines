import React, { useState } from 'react';
import './App.css';
import Table from './components/Table';
import Select from './components/Select';
import DATA from './data.js';

const App = () => {
  const [airline, setAirline] = useState('all');
  const [airport, setAirport] = useState('all');

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

  const selectAirport = (val) => setAirport(val);

  const filteredRoutes = DATA.routes.filter((route) => {
    return (
      (route.airline === airline || airline === 'all') &&
      (route.src === airport || route.dest === airport || airport === 'all')
    );
  });

  const filteredAirlines = DATA.airlines.map((airline) => {
    const active = !!filteredRoutes.find(
      (route) => route.airline === airline.id,
    );
    return Object.assign({}, airline, { active });
  });

  const filteredAirports = DATA.airports.map((airport) => {
    const active = !!filteredRoutes.find(
      (route) => route.src === airport.code || route.dest === airport.code,
    );
    return Object.assign({}, airport, { active });
  });

  const clearFilters = () => {
    setAirport('all');
    setAirline('all');
  };

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
        <Select
          options={filteredAirports}
          valueKey="code"
          titleKey="name"
          allTitle="All Airports"
          value={airport}
          onSelect={selectAirport}
        />
        <button
          onClick={clearFilters}
          disabled={airport === 'all' && airline === 'all'}
        >
          Show All Routes
        </button>
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
