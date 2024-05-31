import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeliverablesList from './components/DeliverablesList';
import DeliverableDetail from './components/DeliverableDetail';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<DeliverablesList />} />
        <Route path="/deliverable/:id" element={<DeliverableDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
