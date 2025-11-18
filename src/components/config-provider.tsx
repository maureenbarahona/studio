'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { AppConfig } from '@/lib/types';
import { initialConfig } from '@/lib/config-data';
import { useAuth } from './auth-provider';
import { useRouter } from 'next/navigation';

interface ConfigContextType {
  config: AppConfig;
  setConfig: (config: AppConfig) => void;
  loading: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfigState] = useState<AppConfig>(initialConfig);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const storedConfig = localStorage.getItem('appConfig');
    if (storedConfig) {
      try {
        const parsedConfig = JSON.parse(storedConfig);
        setConfigState(parsedConfig);
      } catch (error) {
        console.error("Failed to parse config from localStorage", error);
        localStorage.setItem('appConfig', JSON.stringify(initialConfig));
      }
    }
    setLoading(false);
  }, []);

  const setConfig = (newConfig: AppConfig) => {
    setConfigState(newConfig);
    localStorage.setItem('appConfig', JSON.stringify(newConfig));
  };
  
  useEffect(() => {
    document.title = `${config.company.name} | Control`;
  }, [config.company.name]);


  const contextValue = { config, setConfig, loading };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Cargando configuración...
      </div>
    );
  }

  return (
    <ConfigContext.Provider value={contextValue}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}
