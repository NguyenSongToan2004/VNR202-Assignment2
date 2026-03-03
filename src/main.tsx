import { StrictMode, Suspense, lazy, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import { ModalProvider } from './context/ModalContext';
import './index.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const VideoPage = lazy(() => import('./pages/VideoPage'));
const AiUsagePage = lazy(() => import('./pages/AiUsagePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const GamePage = lazy(() => import('./pages/GamePage'));
const NoiDungCuongLinhPage = lazy(() => import('./pages/NoiDungCuongLinhPage'));
const QuizAccessPage = lazy(() => import('./pages/QuizAccessPage'));

function PageLoader({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-primary text-secondary-4 flex items-center justify-center">
          Đang tải trang...
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <PageLoader><HomePage /></PageLoader> },
      { path: 'video', element: <PageLoader><VideoPage /></PageLoader> },
      { path: 'ai-usage', element: <PageLoader><AiUsagePage /></PageLoader> },
      { path: 'lien-he-thuc-tien', element: <PageLoader><ContactPage /></PageLoader> },
      { path: 'noi-dung-cuong-linh-1930', element: <PageLoader><NoiDungCuongLinhPage /></PageLoader> },
      { path: 'game', element: <PageLoader><GamePage /></PageLoader> },
      { path: 'quiz', element: <PageLoader><QuizAccessPage /></PageLoader> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  </StrictMode>
);
