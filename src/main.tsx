import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import AiUsagePage from './pages/AiUsagePage';
import ContactPage from './pages/ContactPage';
import { ModalProvider } from './context/ModalContext';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'video', element: <VideoPage /> },
      { path: 'ai-usage', element: <AiUsagePage /> },
      { path: 'lien-he-thuc-tien', element: <ContactPage /> },
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
