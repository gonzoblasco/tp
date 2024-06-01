import React from 'react';
import { useRoutes } from 'react-router-dom';
import DeliverablesList from './components/DeliverablesList';
import DeliverableDetail from './components/DeliverableDetail';
import Header from './components/Header';

const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <DeliverablesList /> },
    { path: '/deliverable/:id', element: <DeliverableDetail /> },
  ]);
  return routes;
};

const App: React.FC = () => {
  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
};

export default App;