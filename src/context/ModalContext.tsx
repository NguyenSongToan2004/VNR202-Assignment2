import { createContext, useContext, useState, ReactNode } from 'react';
import { TimelineEvent } from '../constants';

interface ModalContextType {
  isModalOpen: boolean;
  modalData: TimelineEvent | null;
  openModal: (data: TimelineEvent) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<TimelineEvent | null>(null);

  const openModal = (data: TimelineEvent) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, modalData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
