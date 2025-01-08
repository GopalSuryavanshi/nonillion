import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [LoginState, setMyState] = useState({});

  useEffect(() => {
    const loadState = async () => {
      try {
        const savedStateJSON = await AsyncStorage.getItem('LoginState');
        if (savedStateJSON !== null) {
          const savedState = JSON.parse(savedStateJSON);
          setMyState(savedState);
        }
      } catch (error) {
        console.error('Error loading state:', error);
      }
    };
    loadState();
  }, []);

  const updateState = async (newState) => {
    try {
      setMyState(newState);
      const newStateJSON = JSON.stringify(newState);
      await AsyncStorage.setItem('LoginState', newStateJSON);
    } catch (error) {
      console.error('Error updating state:', error);
    }
  };

  return (
    <MyContext.Provider value={{ LoginState, updateState }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
