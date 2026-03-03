import { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import Modal from './components/Modal';
import { useModal } from './context/ModalContext';
import LoadingScreen from './components/LoadingScreen';

const SWIPE_ROUTE_ORDER = [
  '/',
  '/noi-dung-cuong-linh-1930',
  '/lien-he-thuc-tien',
  '/video',
  '/quiz',
  '/ai-usage',
  '/game',
];

function AppContent() {
  const { isModalOpen, modalData, closeModal } = useModal();
  const location = useLocation();
  const navigate = useNavigate();
  const swipeStateRef = useRef({
    accumulatedX: 0,
    lastNavigationAt: 0,
    resetTimerId: 0,
  });

  useEffect(() => {
    const swipeCooldown = 520;
    const swipeThreshold = 110;
    const swipeIdleResetMs = 140;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) {
        return;
      }

      if (Math.abs(event.deltaX) < 4) {
        return;
      }

      const now = Date.now();
      if (now - swipeStateRef.current.lastNavigationAt < swipeCooldown) {
        return;
      }

      swipeStateRef.current.accumulatedX += event.deltaX;

      if (swipeStateRef.current.resetTimerId) {
        window.clearTimeout(swipeStateRef.current.resetTimerId);
      }

      swipeStateRef.current.resetTimerId = window.setTimeout(() => {
        swipeStateRef.current.accumulatedX = 0;
      }, swipeIdleResetMs);

      if (Math.abs(swipeStateRef.current.accumulatedX) < swipeThreshold) {
        return;
      }

      const currentIndex = SWIPE_ROUTE_ORDER.indexOf(location.pathname);
      if (currentIndex === -1) {
        swipeStateRef.current.accumulatedX = 0;
        return;
      }

      const direction = swipeStateRef.current.accumulatedX > 0 ? 1 : -1;
      const routeCount = SWIPE_ROUTE_ORDER.length;
      const targetIndex = (currentIndex + direction + routeCount) % routeCount;
      const targetPath = SWIPE_ROUTE_ORDER[targetIndex];

      swipeStateRef.current.accumulatedX = 0;
      swipeStateRef.current.lastNavigationAt = now;
      navigate(targetPath);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      if (swipeStateRef.current.resetTimerId) {
        window.clearTimeout(swipeStateRef.current.resetTimerId);
      }
      window.removeEventListener('wheel', handleWheel);
    };
  }, [location.pathname, navigate]);

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