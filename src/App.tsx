import React from 'react';
import { useRoutes } from 'react-router-dom';
import DeliverablesList from './components/DeliverablesList';
import DeliverableDetail from './components/DeliverableDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from '@mui/material';

const AppRoutes = () => {
  return useRoutes([
    { path: '/', element: <DeliverablesList /> },
    { path: '/deliverable/:id', element: <DeliverableDetail /> },
  ]);
};

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container sx={{ pb: 8 }}> {/* Añadir padding inferior */}
        <AppRoutes />
      </Container>
      <Footer />
    </>
  );
};

export default App;