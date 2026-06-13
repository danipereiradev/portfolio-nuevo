import React, { createContext, useContext, useState } from 'react';

interface ContactModalContextType {
  isOpen: boolean;
  openModal: (preselectedPlan?: string) => void;
  closeModal: () => void;
  preselectedPlan?: string;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(
  undefined
);

export const ContactModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedPlan, setPreselectedPlan] = useState<string | undefined>();

  const openModal = (plan?: string) => {
    setPreselectedPlan(plan);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    setPreselectedPlan(undefined);
    document.body.style.overflow = 'unset';
  };

  return (
    <ContactModalContext.Provider
      value={{ isOpen, openModal, closeModal, preselectedPlan }}
    >
      {children}
    </ContactModalContext.Provider>
  );
};

export const useContactModal = () => {
  const context = useContext(ContactModalContext);
  if (context === undefined) {
    throw new Error(
      'useContactModal must be used within a ContactModalProvider'
    );
  }
  return context;
};
