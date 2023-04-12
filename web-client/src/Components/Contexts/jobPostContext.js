import React, { createContext, useState, useMemo } from 'react';

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const value = useMemo(() => ({ data, setData }), [data, setData]);

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}