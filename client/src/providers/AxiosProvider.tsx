'use client';

import axios from 'axios';
import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { AxiosInstance } from 'axios';

const AxiosContext = createContext<AxiosInstance | null>(null);

// Crea la única instancia de Axios de la app y la comparte por contexto.
// Solo los providers (EventsProvider, etc.) usan useAxios para hacer peticiones.
export const AxiosProvider = ({ children }: { children: ReactNode }) => {
  const instance = useMemo(() => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || '';
    return axios.create({ baseURL });
  }, []);

  return (
    <AxiosContext.Provider value={instance}>{children}</AxiosContext.Provider>
  );
};

export const useAxios = () => {
  const ctx = useContext(AxiosContext);
  if (!ctx) throw new Error('useAxios must be used within AxiosProvider');
  return ctx;
};
