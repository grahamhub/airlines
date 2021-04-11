import React from "react";
import "./App.css";
import DATA from "./data.js";

const App = () => {
  const row = (route) => {
    return (
      <tr>
        <td>{route.airline}</td>
        <td>{route.src}</td>
        <td>{route.dest}</td>
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
