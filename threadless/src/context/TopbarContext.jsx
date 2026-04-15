import { createContext, useContext } from 'react';

export const TopbarContext = createContext({});

export const useTopbar = () => {
  const context = useContext(TopbarContext);
  if (!context) {
    throw new Error('useTopbar must be used within TopbarProvider');
  }
  return context;
};

