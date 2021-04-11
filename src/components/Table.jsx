import React from 'react';

const Table = ({
  columns = [{ name: 'header', property: 'value' }],
  rows = [{ id: 1, value: 'cell' }],
  format = (_, value) => value,
  className = 'table',
}) => {
  const body = rows.map((row) => {
    const routeInfo = columns.map((col) => {
      const routeItem = row[col.property];
      return (
        <td key={col.property + routeItem}>
          {format(col.property, routeItem)}
        </td>
      );
    });

    return <tr key={Object.values(row).join('_')}>{routeInfo}</tr>;
  });

  return (
    <table className={className}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.name}>{col.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>{body}</tbody>
    </table>
  );
};

export default Table;
