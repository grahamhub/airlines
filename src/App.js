import React from 'react';
import './App.css';
import DATA from './data.js';

const App = () => {
  const row = (route) => {
    const airline = DATA.getAirlineById(route.airline);
    const src = DATA.getAirportByCode(route.src);
    const dest = DATA.getAirportByCode(route.dest);
    const key = `${airline.id}_${src.code}_${dest.code}`;

    return (
      <tr key={key}>
        <td>{airline.name}</td>
        <td>{src.name}</td>
        <td>{dest.name}</td>
      </tr>
    );
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <table>
          <thead>
            <tr>
              <th>Airline</th>
              <th>Source Airport</th>
              <th>Destination Airport</th>
            </tr>
          </thead>
          <tbody>{DATA.routes.map(row)}</tbody>
        </table>
      </section>
    </div>
  );
};

export default App;
