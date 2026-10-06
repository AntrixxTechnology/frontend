import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isOpen: boolean;
  serviceRequirement: string;
  openConsultationModal: (service?: string) => void;
  closeConsultationModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceRequirement, setServiceRequirement] = useState('');

  const openConsultationModal = (service = '') => {
    setServiceRequirement(service);
    setIsOpen(true);
  };

  const closeConsultationModal = () => {
    setIsOpen(false);
    setServiceRequirement('');
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        serviceRequirement,
        openConsultationModal,
        closeConsultationModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
