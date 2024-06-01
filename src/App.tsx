import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import DeliverablesList from './components/DeliverablesList';
import DeliverableDetail from './components/DeliverableDetail';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<DeliverablesList />} />
        <Route path="/deliverable/:id" element={<DeliverableDetail />} />
      </Routes>
    </>
  );
};

export default App;