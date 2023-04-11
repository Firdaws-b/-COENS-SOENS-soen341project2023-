import React, { useMemo, useState } from 'react';
export const CandidateContext = React.createContext();
export function CandidateProvider ({ children }) {
    const [selectedCandidate, setSelectedCandidate] = useState({});
    const value = useMemo(() => ({ selectedCandidate, setSelectedCandidate }), [selectedCandidate]);
  
    return (
      <CandidateContext.Provider value={value}>
        {children}
      </CandidateContext.Provider>
    );
  };