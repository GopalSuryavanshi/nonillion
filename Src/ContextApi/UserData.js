// MyContext.js
import React, { createContext, useState, useContext } from 'react';

const MyContext = createContext();

export const UserData = ({ children }) => {
  const [UserID, setUserID] = useState('');
  const updateState = (newState) => {
    setUserID(newState);
  };
  return (
    <MyContext.Provider value={{ UserID, updateState }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
