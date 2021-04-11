import React, { useState } from 'react';

const Table = ({
  className = 'table',
  columns = [{ name: 'header', property: 'value' }],
  rows = [{ id: 1, value: 'cell' }],
  format = (_, value) => value,
  perPage = 25,
}) => {
  const [page, setPage] = useState(0);

  const nextPage = (ev) => {
    ev.preventDefault();
    setPage(page + 1);
  };

  const prevPage = (ev) => {
    ev.preventDefault();
    setPage(page - 1);
  };

  const start = page * perPage;

  const body = rows.slice(start, start + perPage).map((row) => {
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
    <div>
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
      <div className="pagination">
        <p>
          Showing {start + 1}-{start + body.length} of {rows.length} routes
        </p>
        <button key="previous" disabled={page === 0} onClick={prevPage}>
          Previous Page
        </button>
        <button
          key="next"
          disabled={start + perPage >= rows.length}
          onClick={nextPage}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Table;
