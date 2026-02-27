import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import Modal from './components/Modal';
import { useModal } from './context/ModalContext';
import LoadingScreen from './components/LoadingScreen';

function AppContent() {
  const { isModalOpen, modalData, closeModal } = useModal();
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <ScrollToTop />
      <CustomCursor />
      <Modal isOpen={isModalOpen} onClose={closeModal} data={modalData} />
    </>
  );
}

export default function App() {
  const [isSiteLoaded, setSiteLoaded] = useState(sessionStorage.getItem('siteLoaded') === 'true');

  const handleLoadingFinished = () => {
    setSiteLoaded(true);
    sessionStorage.setItem('siteLoaded', 'true');
  };

  useEffect(() => {
    if (!isSiteLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isSiteLoaded]);

  return (
    <>
      {!isSiteLoaded ? (
        <LoadingScreen onFinished={handleLoadingFinished} />
      ) : (
        <AppContent />
      )}
    </>
  );
}