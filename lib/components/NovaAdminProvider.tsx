'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { NovaConfig } from '../types';

interface NovaAdminContextType {
  config: NovaConfig;
}

const NovaAdminContext = createContext<NovaAdminContextType | null>(null);

interface NovaAdminProviderProps {
  children: ReactNode;
  config: NovaConfig;
}

export function NovaAdminProvider({ children, config }: NovaAdminProviderProps) {
  return (
    <NovaAdminContext.Provider value={{ config }}>
      <div className="nova-cms-admin">
        {children}
      </div>
    </NovaAdminContext.Provider>
  );
}

export function useNovaConfig() {
  const context = useContext(NovaAdminContext);
  if (!context) {
    throw new Error('useNovaConfig must be used within NovaAdminProvider');
  }
  return context.config;
}
